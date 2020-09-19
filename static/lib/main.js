'use strict';

/* global $, document, window, config */

$(document).ready(function () {
	$(window).on('action:ajaxify.end', function () {
		var recentCards = $('.recent-cards');

		if (recentCards.length) {
			if (config.recentCards && config.recentCards.enableCarousel) {
				recentCards.bxSlider({
					slideWidth: 290,
					minSlides: 1,
					maxSlides: 4,
					touchEnabled: false, // breaks ajaxify on latest nodebb
					pager: !!config.recentCards.enableCarouselPagination,
				});
			} else {
				recentCards.removeClass('carousel-mode');
			}
		}
	});
});
