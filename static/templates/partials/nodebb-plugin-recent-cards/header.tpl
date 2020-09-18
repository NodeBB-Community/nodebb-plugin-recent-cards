{{{ if topics.length }}}
<div class="recent-cards-plugin preventSlideout">
	<ul class="categories">
		<p>{config.recentCards.title}</p>
	</ul>

	<ul class="row recent-cards carousel-mode" itemscope itemtype="http://www.schema.org/ItemList">
		{{{ each topics }}}
		<li class="col-md-3 col-sm-6 col-xs-12 recent-card-container" data-cid="{topics.category.cid}" style="text-shadow:{config.recentCards.textShadow};">
			<div class="recent-card">
				<div class="clearfix">
					<div class="pull-left">
						<a href="{config.relative_path}/user/{topics.user.userslug}">{buildAvatar(topics.user, "sm", true)}</a>
					</div>
					<div class="topic-info">
						<h4><a href="{config.relative}/topic/{topics.slug}">{topics.title}</a></h4>
						<p>some content here from post some content here from post\nasdasdasd</p>
					</div>
				</div>
				<div class="footer clearfix">
					<div>
						<span class="category-item pull-left">
							{{{ if topics.category.icon }}}
							<div role="presentation" class="icon pull-left" style="{{{ if topics.category.bgColor }}}background-color: {topics.category.bgColor};{{{end}}}; {{{ if topics.category.color}}}color: {topics.category.color};{{{end}}}">
								<i class="fa fa-fw {topics.category.icon}"></i>
							</div>
							{{{ end }}}
							<a href="{config.relative_path}/category/{topics.category.slug}">{topics.category.name}</a>
						</span>
						<span class="pull-right"><span class="timeago" title="{{{ if topics.timestampISO }}}{topics.timestampISO}{{{ end }}}"></span></span>
					</div>
				</div>
			</div>
		</li>
		{{{end}}}
	</ul>
</div>
{{{end}}}
