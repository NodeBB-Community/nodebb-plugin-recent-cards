{{{ if topics.length }}}
<div class="recent-cards-plugin preventSlideout">
	{{{ if title }}}
	<h5>{title}</h5>
	{{{ end }}}

	<ul class="{{{ if !carouselMode }}}row{{{ end }}} recent-cards carousel-mode list-unstyled p-0 overflow-hidden" itemscope itemtype="http://www.schema.org/ItemList" {{{ if carouselMode }}}style="max-height:210px;"{{{ end }}}>
		{{{ each topics }}}
		<li class="{{{ if !carouselMode }}}col-md-3 col-sm-6 col-12{{{ end }}} recent-card-container" data-cid="{topics.category.cid}">
			<div class="recent-card card card-header border rounded mb-2 p-2 position-relative" style="height: 210px;">
				<div class="recent-card-body h-100 overflow-hidden">
					<div>
						<h5 class="mt-0"><a href="{config.relative_path}/topic/{topics.slug}{{{ if topics.bookmark }}}/{topics.bookmark}{{{ end }}}">{topics.title}</a></h5>
					</div>
					<div class="d-flex">
						<div class="me-2">
							<a href="{config.relative_path}/user/{topics.teaser.user.userslug}">{buildAvatar(topics.teaser.user, "24px", true)}</a>
						</div>
						<div class="topic-info">
							{topics.teaser.content}
						</div>
					</div>
				</div>
				<div class="d-flex mt-3 justify-content-between align-items-center">
					<span class="category-item text-truncate">
						{{{ if topics.category.icon }}}
						{buildCategoryIcon(./category, "24px", "rounded-circle")}
						{{{ end }}}
						<a class="text-muted small" title="{./category.name}" href="{config.relative_path}/category/{./category.slug}">{./category.name}</a>
					</span>

					{{{ if sorts.create}}}
					<span class="text-muted small text-truncate"><span class="sort-info timeago" title="{{{ if topics.timestampISO }}}{topics.timestampISO}{{{ end }}}"></span></span>
					{{{ end}}}
					{{{ if sorts.recent }}}
					<span class="text-muted small text-truncate"><span class="sort-info timeago" title="{{{ if topics.lastposttimeISO }}}{topics.lastposttimeISO}{{{ end }}}"></span></span>
					{{{ end }}}
					{{{ if sorts.posts }}}
					<span class="text-muted small text-truncate"><span class="sort-info">[[global:x-posts, {topics.postcount}]]</span></span>
					{{{ end }}}
					{{{ if sorts.votes }}}
					<span class="text-muted small text-truncate"><span class="sort-info">[[global:x-votes, {topics.votes}]]</span></span>
					{{{ end }}}
				</div>
			</div>
		</li>
		{{{end}}}
	</ul>
</div>
{{{end}}}
