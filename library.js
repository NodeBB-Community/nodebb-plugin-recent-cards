'use strict';

const nconf = require.main.require('nconf');
const _ = require.main.require('lodash');
const validator = require.main.require('validator');
const db = require.main.require('./src/database');
const topics = require.main.require('./src/topics');
const settings = require.main.require('./src/settings');
const groups = require.main.require('./src/groups');
const socketAdmin = require.main.require('./src/socket.io/admin');
const defaultSettings = {
	enableCarousel: 0,
	enableCarouselPagination: 0,
};

const plugin = module.exports;
let app;

plugin.init = async function (params) {
	app = params.app;
	const router = params.router;
	var middleware = params.middleware;

	router.get('/admin/plugins/recentcards', middleware.admin.buildHeader, renderAdmin);
	router.get('/api/admin/plugins/recentcards', renderAdmin);

	router.get('/plugins/nodebb-plugin-recent-cards/render', renderExternal);
	router.get('/plugins/nodebb-plugin-recent-cards/render/style.css', renderExternalStyle);
	router.get('/admin/plugins/nodebb-plugin-recent-cards/tests/external', testRenderExternal);

	plugin.settings = new settings('recentcards', '1.0.0', defaultSettings);

	socketAdmin.settings.syncRecentCards = function () {
		plugin.settings.sync();
	};
};

plugin.addAdminNavigation = async function (header) {
	header.plugins.push({
		route: '/plugins/recentcards',
		icon: 'fa-tint',
		name: 'Recent Cards',
	});
	return header;
};

plugin.defineWidgets = async function (widgets) {
	const groupNames = await db.getSortedSetRevRange('groups:visible:createtime', 0, -1);
	let groupsData = await groups.getGroupsData(groupNames);
	groupsData = groupsData.filter(Boolean);
	groupsData.forEach(function (group) {
		group.name = validator.escape(String(group.name));
	});

	const html = await app.renderAsync('admin/plugins/nodebb-plugin-recent-cards/widget', {
		groups: groupsData,
	});

	widgets.push({
		widget: 'recentCards',
		name: 'Recent Cards',
		description: 'Recent topics carousel',
		content: html,
	});
	return widgets;
};

plugin.getConfig = async function (config) {
	config.recentCards = {
		title: plugin.settings.get('title'),
		opacity: plugin.settings.get('opacity'),
		textShadow: plugin.settings.get('shadow'),
		enableCarousel: plugin.settings.get('enableCarousel'),
		enableCarouselPagination: plugin.settings.get('enableCarouselPagination'),
	};
	return config;
};

plugin.renderWidget = async function (widget) {
	const cid = parseInt(widget.data.cid || widget.templateData.cid || 0, 10);
	let fromGroups = widget.data.fromGroups || [];
	if (fromGroups && !Array.isArray(fromGroups)) {
		fromGroups = [fromGroups];
	}
	const topics = await getTopics(widget.uid, cid, fromGroups);

	widget.html = await app.renderAsync('partials/nodebb-plugin-recent-cards/header', {
		topics: topics,
		config: widget.templateData.config,
		title: widget.data.title || '',
	});
	return widget;
};


async function getTopics(uid, filterCid, fromGroups) {
	async function getTopicsFromSet(set, start, stop) {
		const tids = await db.getSortedSetRevRange(set, start, stop);
		const topicsData = await topics.getTopics(tids, { uid: uid, teaserPost: 'first' });
		return { topics: topicsData };
	}

	let topicsData = {
		topics: [],
	};

	if (fromGroups.length) {
		const uids = _.uniq(_.flatten(await groups.getMembersOfGroups(fromGroups)));
		const sets = uids.map((uid) => {
			if (filterCid) {
				return 'cid:' + filterCid + ':uid:' + uid + ':tids';
			}
			return 'uid:' + uid + ':topics';
		});
		topicsData = await getTopicsFromSet(sets, 0, 19);
	} else if (plugin.settings.get('popularTerm')) {
		topicsData = await topics.getSortedTopics({
			uid: uid,
			start: 0,
			stop: 19,
			term: plugin.settings.get('popularTerm'),
			sort: 'posts',
			cids: filterCid,
		});
	} else if (filterCid) {
		topicsData = await getTopicsFromSet('cid:' + filterCid + ':tids:lastposttime', 0, 19);
	} else {
		topicsData = await getTopicsFromSet('topics:recent', 0, 19);
	}

	let i = 0;
	const cids = [];
	let finalTopics = [];

	if (!plugin.settings.get('enableCarousel')) {
		while (finalTopics.length < 4 && i < topicsData.topics.length) {
			var cid = parseInt(topicsData.topics[i].cid, 10);

			if (filterCid || !cids.includes(cid)) {
				cids.push(cid);
				finalTopics.push(topicsData.topics[i]);
			}

			i += 1;
		}
	} else {
		finalTopics = topicsData.topics;
	}
	return finalTopics;
}


function renderExternal(req, res, next) {
	plugin.getCategories({
		templateData: {},
	}, function (err, data) {
		if (err) {
			return next(err);
		}

		data.templateData.relative_url = data.relative_url;
		data.templateData.config = {
			relative_path: nconf.get('url'),
		};

		res.render('partials/nodebb-plugin-recent-cards/header', data.templateData);
	});
}

function renderExternalStyle(req, res) {
	res.render('partials/nodebb-plugin-recent-cards/external/style', {
		forumURL: nconf.get('url'),
	});
}

function testRenderExternal(req, res) {
	res.render('admin/plugins/nodebb-plugin-recent-cards/tests/external', {
		forumURL: nconf.get('url'),
	});
}

async function renderAdmin(req, res) {
	res.render('admin/plugins/recentcards', { });
}
