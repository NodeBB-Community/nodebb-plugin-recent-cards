{{{ if topics.length }}}
<div class="recent-cards-plugin preventSlideout">
	{{{ if title }}}
	<h5>{title}</h5>
	{{{ end }}}

	<ul class="row recent-cards carousel-mode" itemscope itemtype="http://www.schema.org/ItemList">
		{{{ each topics }}}
		<li class="col-md-3 col-sm-6 col-xs-12 recent-card-container" data-cid="{topics.category.cid}">
			<div class="recent-card">
				<div class="recent-card-body">
					<div>
						<h4><a href="{config.relative_path}/topic/{topics.slug}{{{ if topics.bookmark }}}/{topics.bookmark}{{{ end }}}">{topics.title}</a></h4>
					</div>
					<div class="clearfix">
						<div class="pull-left">
							<a href="{config.relative_path}/user/{topics.teaser.user.userslug}">{buildAvatar(topics.teaser.user, "sm", true)}</a>
						</div>
						<div class="topic-info">
							{topics.teaser.content}
						</div>
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

						{{{ if sorts.create}}}
						<span class="pull-right"><span class="sort-info timeago" title="{{{ if topics.timestampISO }}}{topics.timestampISO}{{{ end }}}"></span></span>
						{{{ end}}}
						{{{ if sorts.recent }}}
						<span class="pull-right"><span class="sort-info timeago" title="{{{ if topics.lastposttimeISO }}}{topics.lastposttimeISO}{{{ end }}}"></span></span>
						{{{ end }}}
						{{{ if sorts.posts }}}
						<span class="pull-right"><span class="sort-info">[[global:x-posts, {topics.postcount}]]</span></span>
						{{{ end }}}
						{{{ if sorts.votes }}}
						<span class="pull-right"><span class="sort-info">[[global:x-votes, {topics.votes}]]</span></span>
						{{{ end }}}
					</div>
				</div>
			</div>
		</li>
		{{{end}}}
	</ul>
</div>
{{{end}}}
