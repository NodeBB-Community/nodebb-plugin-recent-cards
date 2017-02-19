"use strict";

var nconf = module.parent.require('nconf');
var async = module.parent.require('async');
var topics = module.parent.require('./topics');
var settings = module.parent.require('./settings');
var groups = module.parent.require('./groups');
var socketAdmin = module.parent.require('./socket.io/admin');
var defaultSettings = { title: 'Recent Topics', opacity: '1.0', textShadow: 'none', enableCarousel: 0, enableCarouselPagination: 0 };

var plugin = module.exports;

plugin.init = function(params, callback) {
	var app = params.router;
	var middleware = params.middleware;

	app.get('/admin/plugins/recentcards', middleware.admin.buildHeader, renderAdmin);
	app.get('/api/admin/plugins/recentcards', renderAdmin);

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

plugin.getCategories = function(data, callback) {
	function renderCards(err, topics) {
		if (err) {
			return callback(err);
		}

		var i = 0, cids = [], finalTopics = [];

		if (!plugin.settings.get('enableCarousel')) {
			while (finalTopics.length < 4 && i < topics.topics.length) {
				var cid = parseInt(topics.topics[i].cid, 10);

				if (cids.indexOf(cid) === -1) {
					cids.push(cid);
					finalTopics.push(topics.topics[i]);
				}

				i++;
			}
		} else {
			finalTopics = topics.topics;
		}

		data.templateData.topics = finalTopics;
		data.templateData.recentCards = {
			title: plugin.settings.get('title'),
			opacity: plugin.settings.get('opacity'),
			textShadow: plugin.settings.get('shadow'),
			enableCarousel: plugin.settings.get('enableCarousel'),
			enableCarouselPagination: plugin.settings.get('enableCarouselPagination')
		};

		callback(null, data);
	}

	if (plugin.settings.get('groupName')) {
		groups.getLatestMemberPosts(plugin.settings.get('groupName'), 19, data.req.uid, function(err, posts) {
			var topics = {topics: []};
			for (var p = 0, pp = posts.length; p < pp; p++) {
				var topic = posts[p].topic;
				topic.category = posts[p].category;
				topic.timestampISO = posts[p].timestampISO;
				topics.topics.push(topic);
			}

			renderCards(err, topics);
		});
	} else {
		topics.getTopicsFromSet('topics:recent', data.req.uid, 0, 19, renderCards);
	}
};

plugin.onNodeBBReady = function () {
	if (nconf.get('isPrimary') === 'true') {
		modifyCategoryTpl();
	}
};

function renderAdmin(req, res) {
	var list = [];

	groups.getGroups('groups:createtime', 0, -1, function(err, groups) {
		groups.forEach(function(group) {
			if (group.match(/cid:([0-9]*):privileges:groups:([\s\S]*)/) !== null) {
				return;
			}

			list.push({
				name: group,
				value: group
			});
		});

		res.render('admin/plugins/recentcards', {groups: list});
	});
}

function modifyCategoryTpl(callback) {
	callback = callback || function() {};

	var fs = require('fs');
	var path = require('path');
	var tplPath = path.join(nconf.get('base_dir'), 'build/public/templates/categories.tpl');
	var headerPath = path.join(nconf.get('base_dir'), 'node_modules/nodebb-plugin-recent-cards/static/templates/partials/nodebb-plugin-recent-cards/header.tpl');

	async.parallel({
		original: function(next) {
			fs.readFile(tplPath, next);
		},
		header: function(next) {
			fs.readFile(headerPath, next);
		}
	}, function(err, tpls) {
		if (err) {
			return callback(err);
		}

		var tpl = tpls.original.toString();

		if (!tpl.match('<!-- Recent Cards plugin -->')) {
			tpl = tpls.header.toString() + tpl;
		}

		fs.writeFile(tplPath, tpl, callback);
	});
}
