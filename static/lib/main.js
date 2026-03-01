'use strict';

$(document).ready(function () {
	$(window).on('action:ajaxify.contentLoaded', async function () {
		const recentCards = $('.recent-cards');
		if (!recentCards.length) {
			return;
		}
		const translator = await app.require('translator');
		const [nextTitle, prevTitle] = await translator.translateKeys([
			'[[global:pagination.nextpage]]', '[[global:pagination.previouspage]]',
		], config.userLang);
		if (!config.recentCards || !config.recentCards.enableCarousel) {
			recentCards.removeClass('carousel-mode invisible');
			return;
		}
		const rtl = $('html').attr('data-dir') === 'rtl';
		const arrowClasses = 'link-secondary position-absolute top-50 translate-middle-y p-1 z-1';
		const nextIcon = rtl ? 'fa-chevron-left' : 'fa-chevron-right';
		const prevIcon = rtl ? 'fa-chevron-right' : 'fa-chevron-left';
		const nextArrow = `<a href="#" class="${arrowClasses} ${rtl ? ' slick-prev' : ' slick-next'}" title="${nextTitle}">
			<i class="fa-solid fa-fw ${nextIcon} fa-lg"></i>
		</a>`;
		const prevArrow = `<a href="#" class="${arrowClasses} ${rtl ? 'slick-next' : 'slick-prev'}" title="${prevTitle}">
			<i class="fa-solid fa-fw ${prevIcon} fa-lg"></i>
		</a>`;
		const slideCount = parseInt(config.recentCards.maxSlides, 10) || 4;
		const slideMargin = 16;
		const env = utils.findBootstrapEnvironment();
		if (['xxl', 'xl', 'lg'].includes(env)) {
			$('.recent-card').css({
				width: (recentCards.width() - ((slideCount - 1) * slideMargin)) / slideCount,
			});
		}
		recentCards.slick({
			infinite: false,
			slidesToShow: slideCount,
			slidesToScroll: slideCount,
			rtl: rtl,
			variableWidth: true,
			dots: !!config.recentCards.enableCarouselPagination,
			nextArrow: nextArrow,
			prevArrow: prevArrow,
			responsive: [{
				breakpoint: 992, // md
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
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
		recentCards.removeClass('overflow-hidden invisible');
	});
});
