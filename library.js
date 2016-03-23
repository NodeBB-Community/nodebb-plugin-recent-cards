"use strict";

var plugin = {},
	async = module.parent.require('async'),
	topics = module.parent.require('./topics'),
	categories = module.parent.require('./categories'),
	settings = module.parent.require('./settings'),
	socketAdmin = module.parent.require('./socket.io/admin'),
	emitter = module.parent.require('./emitter'),
	defaultSettings = { opacity: '1.0', textShadow: 'none' };

emitter.on('nodebb:ready', modifyCategoryTpl);

plugin.init = function(params, callback) {
	var app = params.router,
		middleware = params.middleware,
		controllers = params.controllers;

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
	topics.getTopicsFromSet('topics:recent', data.req.uid, 0, 19, function(err, topics) {
		if (err) {
			return next(err);
		}

		var i = 0, cids = [], finalTopics = [];
		while (finalTopics.length < 4 && i < topics.topics.length) {
			var cid = parseInt(topics.topics[i].cid, 10);

			if (cids.indexOf(cid) === -1) {
				cids.push(cid);
				finalTopics.push(topics.topics[i]);
			}

			i++;
		}

		async.each(finalTopics, function (topic, next) {
			categories.getCategoryField(topic.cid, 'image', function (err, image) {
				topic.category.backgroundImage = image;
				next();
			});
		}, function () {
			data.templateData.topics = finalTopics;
			data.templateData.recentCards = {
				opacity: plugin.settings.get('opacity'),
				textShadow: plugin.settings.get('shadow')
			};
			callback(null, data);
		});
	});
};

function renderAdmin(req, res, next) {
	res.render('admin/plugins/recentcards', {});
}

function modifyCategoryTpl(callback) {
	callback = callback || function() {};

	var fs = require('fs'),
		path = require('path'),
		nconf = module.parent.require('nconf'),
		tplPath = path.join(nconf.get('base_dir'), 'public/templates/categories.tpl'),
		headerPath = path.join(nconf.get('base_dir'), 'node_modules/nodebb-plugin-recent-cards/static/templates/partials/nodebb-plugin-recent-cards/header.tpl');

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

module.exports = plugin;