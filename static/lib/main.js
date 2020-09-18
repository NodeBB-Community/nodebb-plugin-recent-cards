"use strict";
/*global ajaxify*/

$(document).ready(function(){
	$(window).on('action:ajaxify.end', function(ev, data) {
		if ($('.recent-cards').length) {
			if (config.recentCards && config.recentCards.enableCarousel) {
				$('.recent-cards').bxSlider({
					slideWidth: 290,
					minSlides: 1,
					maxSlides: 4,
					pager: config.recentCards.enableCarouselPagination ? true: false,
				});
			} else {
				$('.recent-cards').removeClass('carousel-mode');
			}
		}
	});
});