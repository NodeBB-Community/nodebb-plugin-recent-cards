'use strict';

$(document).ready(function () {
	$(window).on('action:ajaxify.end', function () {
		var recentCards = $('.recent-cards');

		if (recentCards.length) {
			if (config.recentCards && config.recentCards.enableCarousel) {
				const rtl = $('html').attr('data-dir') === 'rtl';
				const nextArrow = '<i class="fa fa-fw fa-chevron-right slick-next"></i>';
				const prevArrow = '<i class="fa fa-fw fa-chevron-left slick-prev"></i>';
				const slideCount = parseInt(config.recentCards.maxSlides, 10) || 4;
				const slideMargin = 20;
				const env = utils.findBootstrapEnvironment();
				if (['xxl', 'xl', 'lg'].includes(env)) {
					$('.recent-card').css({
						width: (recentCards.width() - ((slideCount - 1) * slideMargin)) / slideCount,
					});
				} else {
					$('.recent-card').css({
						width: 250,
					});
				}
				recentCards.slick({
					infinite: false,
					slidesToShow: slideCount,
					slidesToScroll: slideCount,
					rtl: rtl,
					variableWidth: true,
					dots: !!config.recentCards.enableCarouselPagination,
					nextArrow: rtl ? prevArrow : nextArrow,
					prevArrow: rtl ? nextArrow : prevArrow,
					responsive: [{
						breakpoint: 992, // md
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							infinite: false,
						},
					}, {
						breakpoint: 768, // sm/xs
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							infinite: false,
						},
					}],
				});
				recentCards.removeClass('overflow-hidden');
			} else {
				recentCards.removeClass('carousel-mode');
			}
		}
	});
});
