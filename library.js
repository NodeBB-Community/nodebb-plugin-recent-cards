/* eslint-disable no-await-in-loop */

'use strict';

const nconf = require.main.require('nconf');
const _ = require.main.require('lodash');
const validator = require.main.require('validator');
const db = require.main.require('./src/database');
const topics = require.main.require('./src/topics');
const settings = require.main.require('./src/settings');
const groups = require.main.require('./src/groups');
const user = require.main.require('./src/user');

const defaultSettings = {
	enableCarousel: 1,
	enableCarouselPagination: 0,
	minSlides: 1,
	maxSlides: 4,
};

const plugin = module.exports;
let app;

plugin.init = async function (params) {
	app = params.app;
	const { router } = params;
	const routeHelpers = require.main.require('./src/routes/helpers');
	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/recentcards', renderAdmin);

	router.get('/plugins/nodebb-plugin-recent-cards/render', renderExternal);
	router.get('/plugins/nodebb-plugin-recent-cards/render/style.css', renderExternalStyle);
	router.get('/admin/plugins/nodebb-plugin-recent-cards/tests/external', testRenderExternal);

	plugin.settings = new settings('recentcards', '1.0.0', defaultSettings);
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
	groupsData.forEach((group) => {
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
		minSlides: plugin.settings.get('minSlides'),
		maxSlides: plugin.settings.get('maxSlides'),
	};
	return config;
};

plugin.renderWidget = async function (widget) {
	if (!isVisibleInCategory(widget)) {
		return null;
	}
	const topics = await getTopics(widget);

	widget.html = await app.renderAsync('partials/nodebb-plugin-recent-cards/header', {
		topics: topics,
		config: widget.templateData.config,
		title: widget.data.title || '',
		carouselMode: plugin.settings.get('enableCarousel'),
	});
	return widget;
};

function getIdsArray(data, field) {
	const ids = String(data[field] || '');
	return ids.split(',').map(c => parseInt(c.trim(), 10)).filter(Boolean);
}

function isVisibleInCategory(widget) {
	const cids = getIdsArray(widget.data, 'cid');
	return !(
		cids.length &&
		(widget.templateData.template.category || widget.templateData.template.topic) &&
		!cids.includes(parseInt(widget.templateData.cid, 10))
	);
}

async function getTopics(widget) {
	async function getTopicsFromSet(set) {
		let start = 0;
		const topicsData = [];

		do {
			let tids = await db.getSortedSetRevRangeByScore(set, start, 20, Date.now(), '-inf');
			if (!tids.length) {
				break;
			}

			tids = await topics.filterNotIgnoredTids(tids, widget.uid);
			let nextTopics = await topics.getTopics(tids, {
				uid: widget.uid,
				teaserPost: widget.data.teaserPost || 'first',
				teaserParseType: 'default',
				thumbsOnly: true,
			});

			nextTopics = await user.blocks.filter(widget.uid, nextTopics);
			topicsData.push(...nextTopics);
			start += 20;
		} while (topicsData.length < 20);
		return { topics: topicsData.slice(0, 20) };
	}

	let topicsData = {
		topics: [],
	};
	let filterCids = getIdsArray(widget.data, 'topicsFromCid');
	if (!filterCids.length && widget.templateData.cid) {
		filterCids = [parseInt(widget.templateData.cid, 10)];
	}

	widget.data.sort = widget.data.sort || 'recent';
	let fromGroups = widget.data.fromGroups || [];
	if (fromGroups && !Array.isArray(fromGroups)) {
		fromGroups = [fromGroups];
	}
	// hard coded to show these topic tids only
	const topicsTids = getIdsArray(widget.data, 'topicsTids');
	if (topicsTids.length) {
		topicsData.topics = await topics.getTopics(topicsTids, {
			uid: widget.uid,
			teaserPost: widget.data.teaserPost || 'first',
			teaserParseType: 'default',
			thumbsOnly: true,
		});
	} else if (fromGroups.length) {
		const uids = _.uniq(_.flatten(await groups.getMembersOfGroups(fromGroups)));
		const sets = uids.map((uid) => {
			if (filterCids.length) {
				return filterCids.map(cid => `cid:${cid}:uid:${uid}:tids`);
			}
			return `uid:${uid}:topics`;
		});
		topicsData = await getTopicsFromSet(sets.flat());
		topicsData.topics.sort((t1, t2) => {
			if (widget.data.sort === 'recent') {
				return t2.lastposttime - t1.lastposttime;
			} else if (widget.data.sort === 'votes') {
				return t2.votes - t1.votes;
			} else if (widget.data.sort === 'posts') {
				return t2.postcount - t1.postcount;
			}
			return 0;
		});
	} else if (filterCids.length) {
		let searchSuffix = '';
		if (widget.data.sort === 'recent') {
			searchSuffix += ':lastposttime';
		} else if (widget.data.sort === 'votes' || widget.data.sort === 'posts' || widget.data.sort === 'create') {
			searchSuffix += `:${widget.data.sort}`;
		}
		topicsData = await getTopicsFromSet(
			filterCids.map(cid => `cid:${cid}:tids${searchSuffix}`)
		);
	} else {
		const map = {
			votes: 'topics:votes',
			posts: 'topics:posts',
			recent: 'topics:recent',
			create: 'topics:tid',
		};
		topicsData = await getTopicsFromSet(map[widget.data.sort]);
	}

	let i = 0;
	const cids = [];
	let finalTopics = [];

	if (!plugin.settings.get('enableCarousel')) {
		while (finalTopics.length < 4 && i < topicsData.topics.length) {
			const cid = parseInt(topicsData.topics[i].cid, 10);

			if (filterCids.length || !cids.includes(cid) || topicsData.topics.length <= 4) {
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

async function renderExternal(req, res, next) {
	try {
		const topics = await getTopics({
			uid: req.uid,
			data: {
				teaserPost: 'first',
			},
			templateData: {},
		});

		res.render('partials/nodebb-plugin-recent-cards/header', {
			topics: topics,
			config: {
				relative_path: nconf.get('url'),
			},
		});
	} catch (err) {
		next(err);
	}
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
	res.render('admin/plugins/recentcards', {
		title: 'Recent Cards',
	});
}
