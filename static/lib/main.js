"use strict";
/*global ajaxify*/

$(document).ready(function(){
	$(window).on('action:ajaxify.end', function(ev, data) {
		if ($('.recent-cards').length) {
			if (ajaxify.data.recentCards && ajaxify.data.recentCards.enableCarousel) {
				$('.recent-cards').bxSlider({
					slideWidth: 292,
					minSlides: 1,
					maxSlides: 4,
					pager: ajaxify.data.recentCards.enableCarouselPagination ? true: false
				});
			} else {
				$('.recent-cards').removeClass('carousel-mode');
			}
		}
	});
});