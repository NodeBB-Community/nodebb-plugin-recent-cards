"use strict";

var plugin = {},
	async = module.parent.require('async');

plugin.init = function(params, callback) {
	var app = params.router,
		middleware = params.middleware,
		controllers = params.controllers;
		
	app.get('/admin/plugins/quickstart', middleware.admin.buildHeader, renderAdmin);
	app.get('/api/admin/plugins/quickstart', renderAdmin);

	modifyCategoryTpl(callback);
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/quickstart',
		icon: 'fa-tint',
		name: 'Quickstart'
	});

	callback(null, header);
};


function renderAdmin(req, res, next) {
	res.render('admin/plugins/quickstart', {});
}

function modifyCategoryTpl(callback) {
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