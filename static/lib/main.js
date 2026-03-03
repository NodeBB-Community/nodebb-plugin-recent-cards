'use strict';

$(document).ready(function () {
	const rtl = $('html').attr('data-dir') === 'rtl';
	const arrowClasses = 'link-secondary position-absolute top-50 translate-middle-y p-1 z-1';
	const nextIcon = rtl ? 'fa-chevron-left' : 'fa-chevron-right';
	const prevIcon = rtl ? 'fa-chevron-right' : 'fa-chevron-left';
	const nextArrow = `<a href="#" class="${arrowClasses} slick-next" title="">
			<i class="fa-solid fa-fw ${nextIcon} fa-lg"></i>
		</a>`;
	const prevArrow = `<a href="#" class="${arrowClasses} slick-prev" title="">
			<i class="fa-solid fa-fw ${prevIcon} fa-lg"></i>
		</a>`;

	async function initSlick(container) {
		if (!container.length || container.hasClass('slick-initialized')) {
			return;
		}

		if (!config.recentCards || !config.recentCards.enableCarousel) {
			container.removeClass('carousel-mode invisible');
			return;
		}

		const slideCount = parseInt(config.recentCards.maxSlides, 10) || 4;
		const slideMargin = 16;
		const env = utils.findBootstrapEnvironment();
		if (['xxl', 'xl', 'lg'].includes(env)) {
			container.find('.recent-card').css({
				width: (container.width() - ((slideCount - 1) * slideMargin)) / slideCount,
			});
		}
		container.slick({
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

		container.removeClass('overflow-hidden invisible');
		container.find('.slick-prev').translateAttr('title', '[[global:pagination.previouspage]]');
		container.find('.slick-next').translateAttr('title', '[[global:pagination.nextpage]]');
	}

	$('.recent-cards').each(function () {
		const recentCards = $(this);
		initSlick(recentCards);
	});

	$(window).on('action:ajaxify.contentLoaded', function () {
		$('.recent-cards').each((index, element) => {
			initSlick($(element));
		});
	});
});
