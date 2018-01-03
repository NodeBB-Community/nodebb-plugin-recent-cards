#nodebb-plugin-recent-cards .topic-info, #nodebb-plugin-recent-cards .description, #nodebb-plugin-recent-cards .post-count {
	font-family: Roboto;
}

#nodebb-plugin-recent-cards .topic-info .h4 {
	margin-top: 10px;
	margin-bottom: 10px;
	font-weight: 500;
	line-height: 1.1;
	font-size: 18px;
}

#nodebb-plugin-recent-cards .bx-viewport {
	height: 150px !important;
}

#nodebb-plugin-recent-cards .categories {
	display: none;
}

#nodebb-plugin-recent-cards .recent-cards {
	list-style-type: none;
	padding: 0;
}

#nodebb-plugin-recent-cards .recent-cards .recent-card {
	cursor: pointer;
	height: 110px;
	width: 100%;
	padding: 10px;
	position: relative;
	margin-bottom: 10px;
}

#nodebb-plugin-recent-cards .recent-cards .recent-card .bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-position: 50% 50%;
	background-size: cover;
}

#nodebb-plugin-recent-cards .recent-cards .recent-card .bg:hover {
	filter: brightness(115%);
	-webkit-filter: brightness(115%);
}

#nodebb-plugin-recent-cards .recent-cards .recent-card .topic-info {
	position: absolute;
	top: 10px;
	left: 10px;
	pointer-events: none;
	padding-right: 15px;
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

#nodebb-plugin-recent-cards .recent-cards .recent-card .topic-info .description {
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-size: 11px;
}

#nodebb-plugin-recent-cards .recent-cards .recent-card .post-count {
	position: absolute;
	bottom: 5px;
	right: 10px;
	pointer-events: none;
}

#nodebb-plugin-recent-cards .recent-cards .recent-card .icon {
	position: absolute;
	bottom: 5px;
	left: 10px;
	pointer-events: none;
	width: 80%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: visible;
	font-size: 20px;
}

#nodebb-plugin-recent-cards .recent-cards.carousel-mode {
	max-height: 110px;
	overflow: hidden;
}


/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Written by: Steven Wanderski, 2014
 * http://stevenwanderski.com
 * (while drinking Belgian ales and listening to jazz)
 *
 * CEO and founder of bxCreative, LTD
 * http://bxcreative.com
 */


/** RESET AND LAYOUT
===================================*/

#nodebb-plugin-recent-cards .bx-wrapper {
	position: relative;
	margin: 0 auto 60px;
	padding: 0;
	*zoom: 1;
}

#nodebb-plugin-recent-cards .bx-wrapper img {
	max-width: 100%;
	display: block;
}

/** THEME
===================================*/

#nodebb-plugin-recent-cards .bx-wrapper .bx-viewport {
	border:  5px solid transparent;
	left: -5px;
	background: none;
	
	/*fix other elements on the page moving (on Chrome)*/
	-webkit-transform: translatez(0);
	-moz-transform: translatez(0);
    	-ms-transform: translatez(0);
    	-o-transform: translatez(0);
    	transform: translatez(0);
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-pager,
#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-auto {
	position: absolute;
	bottom: -15px;
	width: 100%;
}

/* LOADER */

#nodebb-plugin-recent-cards .bx-wrapper .bx-loading {
	min-height: 50px;
	background: url({forumURL}/plugins/nodebb-plugin-recent-cards/static/bxslider/images/bx_loader.gif) center center no-repeat #fff;
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}

/* PAGER */

#nodebb-plugin-recent-cards .bx-wrapper .bx-pager {
	text-align: center;
	font-size: .85em;
	font-family: Arial;
	font-weight: bold;
	color: #666;
	padding-top: 20px;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-pager .bx-pager-item,
#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-auto .bx-controls-auto-item {
	display: inline-block;
	*zoom: 1;
	*display: inline;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-pager.bx-default-pager a {
	background: #666;
	text-indent: -9999px;
	display: block;
	width: 10px;
	height: 10px;
	margin: 0 5px;
	outline: 0;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-pager.bx-default-pager a:hover,
#nodebb-plugin-recent-cards .bx-wrapper .bx-pager.bx-default-pager a.active {
	background: #000;
}

/* DIRECTION CONTROLS (NEXT / PREV) */

#nodebb-plugin-recent-cards .bx-wrapper .bx-prev {
	left: -12px;
	cursor: pointer;
	background: url({forumURL}/plugins/nodebb-plugin-recent-cards/static/bxslider/images/controls.png) no-repeat 0 -32px;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-next {
	right: -10px;
	cursor: pointer;
	background: url({forumURL}/plugins/nodebb-plugin-recent-cards/static/bxslider/images/controls.png) no-repeat -43px -32px;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-prev:hover {
	background-position: 0 0;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-next:hover {
	background-position: -43px 0;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-direction a {
	position: absolute;
	top: 50%;
	margin-top: -16px;
	outline: 0;
	width: 32px;
	height: 32px;
	text-indent: -9999px;
	z-index: 2;
	opacity: 0.5;
	-webkit-transition: opacity 0.25s ease-out;
	-moz-transition: opacity 0.25s ease-out;
	-ms-transition: opacity 0.25s ease-out;
	-o-transition: opacity 0.25s ease-out;
	transition: opacity 0.25s ease-out;
}

#nodebb-plugin-recent-cards .bx-wrapper:hover .bx-controls-direction a {
	opacity: 1;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-direction a.disabled {
	display: none;
}

/* AUTO CONTROLS (START / STOP) */

#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-auto {
	text-align: center;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-auto .bx-start {
	display: block;
	text-indent: -9999px;
	width: 10px;
	height: 11px;
	outline: 0;
	background: url({forumURL}/plugins/nodebb-plugin-recent-cards/static/bxslider/images/controls.png) -86px -11px no-repeat;
	margin: 0 3px;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-auto .bx-start:hover,
#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-auto .bx-start.active {
	background-position: -86px 0;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-auto .bx-stop {
	display: block;
	text-indent: -9999px;
	width: 9px;
	height: 11px;
	outline: 0;
	background: url({forumURL}/plugins/nodebb-plugin-recent-cards/static/bxslider/images/controls.png) -86px -44px no-repeat;
	margin: 0 3px;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-auto .bx-stop:hover,
#nodebb-plugin-recent-cards .bx-wrapper .bx-controls-auto .bx-stop.active {
	background-position: -86px -33px;
}

/* PAGER WITH AUTO-CONTROLS HYBRID LAYOUT */

#nodebb-plugin-recent-cards .bx-wrapper .bx-controls.bx-has-controls-auto.bx-has-pager .bx-pager {
	text-align: left;
	width: 80%;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-controls.bx-has-controls-auto.bx-has-pager .bx-controls-auto {
	right: 0;
	width: 35px;
}

/* IMAGE CAPTIONS */

#nodebb-plugin-recent-cards .bx-wrapper .bx-caption {
	position: absolute;
	bottom: 0;
	left: 0;
	background: #666\9;
	background: rgba(80, 80, 80, 0.75);
	width: 100%;
}

#nodebb-plugin-recent-cards .bx-wrapper .bx-caption span {
	color: #fff;
	font-family: Arial;
	display: block;
	font-size: .85em;
	padding: 10px;
}
