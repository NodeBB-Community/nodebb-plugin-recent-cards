'use strict';

define('admin/plugins/recentcards', ['settings'], function (settings) {
	const admin = {};
	admin.init = function () {
		settings.sync('recentcards', $('#recentcards'));

		$('#save').click(function () {
			settings.persist('recentcards', $('#recentcards'));
		});
	};
	return admin;
});
