"use strict";

var nconf = require.main.require('nconf');
var validator = require.main.require('validator');
var topics = require.main.require('./src/topics');
var settings = require.main.require('./src/settings');
var groups = require.main.require('./src/groups');
var socketAdmin = require.main.require('./src/socket.io/admin');
var defaultSettings = { title: 'Recent Topics', opacity: '1.0', textShadow: 'none', enableCarousel: 0, enableCarouselPagination: 0 };

var plugin = module.exports;
var app;

plugin.init = function(params, callback) {
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

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/recentcards',
		icon: 'fa-tint',
		name: 'Recent Cards'
	});

	callback(null, header);
};

plugin.defineWidgets = function(widgets, callback) {
	var widget = {
		widget: "recentCards",
		name: "Recent Cards",
		description: "Recent topics carousel",
	};
	app.render('admin/plugins/nodebb-plugin-recent-cards/widget', {}, function (err, html) {
		if (err) {
			return callback(err);
		}
		widget.content = html;
		widgets.push(widget);
		callback(null, widgets);
	});
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
},

plugin.renderWidget = async function(widget) {
	const topics = await getTopics(widget.uid, widget.data.cid || widget.templateData.cid || 0);
	widget.html = await app.renderAsync('partials/nodebb-plugin-recent-cards/header', {
		topics: topics,
		config: {
			relative_path: nconf.get('relative_path'),
		},
	});
	return widget;
}

function renderExternal(req, res, next) {
	plugin.getCategories({
		templateData: {}
	}, function(err, data) {
		if (err) {
			return next(err);
		}

		data.templateData.relative_url = data.relative_url;
		data.templateData.config = {
			relative_path: nconf.get('url')
		};

		res.render('partials/nodebb-plugin-recent-cards/header', data.templateData);
	});
}

function renderExternalStyle(req, res, next) {
	res.render('partials/nodebb-plugin-recent-cards/external/style', {
		forumURL: nconf.get('url')
	});
}

function testRenderExternal(req, res, next) {
	res.render('admin/plugins/nodebb-plugin-recent-cards/tests/external', {
		forumURL: nconf.get('url')
	});
}

async function getTopics(uid, filterCid) {
	filterCid = parseInt(filterCid, 10);
	let topicsData = { topics: [] };
	if (plugin.settings.get('groupName')) {
		const posts =  await groups.getLatestMemberPosts(plugin.settings.get('groupName'), 19, uid);
		const tidMap = {};
		posts.forEach(function (post) {
			if (post.topic && post.category && !tidMap[post.topic.tid]) {
				tidMap[post.topic.tid] = 1;
				const topic = post.topic;
				topic.category = post.category;
				topic.timestampISO = post.timestampISO;
				topicsData.topics.push(topic);
			}
		});
	} else if (plugin.settings.get('popularTerm')) {
		topicsData = await topics.getSortedTopics({
			uid: uid,
			start: 0,
			stop: 19,
			term: plugin.settings.get('popularTerm'),
			sort: 'posts',
			cids: filterCid,
		});
	} else {
		if (filterCid) {
			topicsData = await topics.getTopicsFromSet('cid:' + filterCid + ':tids:lastposttime', uid, 0, 19);
		} else {
			topicsData = await topics.getTopicsFromSet('topics:recent', uid, 0, 19);
		}
	}

	var i = 0;
	var cids = [];
	var finalTopics = [];

	if (!plugin.settings.get('enableCarousel')) {
		while (finalTopics.length < 4 && i < topicsData.topics.length) {
			var cid = parseInt(topicsData.topics[i].cid, 10);

			if (filterCid || !cids.includes(cid)) {
				cids.push(cid);
				finalTopics.push(topicsData.topics[i]);
			}

			i++;
		}
	} else {
		finalTopics = topicsData.topics;
	}
	return finalTopics;
};

function renderAdmin(req, res, next) {
	var list = [];

	groups.getGroups('groups:createtime', 0, -1, function(err, groupsData) {
		if (err) {
			return next(err);
		}
		groupsData.forEach(function(group) {
			if (groups.isPrivilegeGroup(group)) {
				return;
			}

			list.push({
				name: group,
				value: validator.escape(String(group)),
			});
		});

		res.render('admin/plugins/recentcards', { groups: list });
	});
}
