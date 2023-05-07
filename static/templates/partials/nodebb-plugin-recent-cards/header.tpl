{{{ if topics.length }}}
<div class="recent-cards-plugin preventSlideout">
	{{{ if title }}}
	<h5>{title}</h5>
	{{{ end }}}

	<div class="{{{ if !carouselMode }}}row{{{ else }}}d-flex gap-3{{{ end }}} recent-cards carousel-mode overflow-hidden" itemscope itemtype="http://www.schema.org/ItemList" {{{ if carouselMode }}}style=""{{{ end }}}>
		{{{ each topics }}}
		<div class="{{{ if !carouselMode }}}col-lg-3 col-sm-6 col-12 overflow-hidden{{{ end }}} recent-card-container" data-cid="{topics.category.cid}">
			<div class="recent-card card card-header border rounded mb-2 p-2 position-relative d-inline-flex {{{ if !carouselMode }}}w-100{{{ end }}}" {{{ if carouselMode }}}style="width: 312px;"{{{ end }}}>
				<div class="recent-card-body h-100 overflow-hidden">
					<div>
						<h6 class="topic-title mt-0 text-truncate"><a href="{config.relative_path}/topic/{topics.slug}{{{ if topics.bookmark }}}/{topics.bookmark}{{{ end }}}">{topics.title}</a></h6>
					</div>
					<div class="d-flex">
						<div class="me-2">
							<a class="text-decoration-none" href="{config.relative_path}/user/{topics.teaser.user.userslug}">{buildAvatar(topics.teaser.user, "24px", true, "avatar-tooltip")}</a>
						</div>
						<div class="topic-info text-sm text-break">
							{topics.teaser.content}
						</div>
					</div>
				</div>
				<div class="d-flex mt-3 justify-content-between align-items-center gap-2">
					<span class="category-item text-xs text-truncate">
						{{{ if topics.category.icon }}}
						{buildCategoryIcon(./category, "24px", "rounded-circle")}
						{{{ end }}}
						<a class="text-muted" title="{./category.name}" href="{config.relative_path}/category/{./category.slug}">{./category.name}</a>
					</span>

					{{{ if sorts.create}}}
					<span class="text-muted text-xs text-truncate"><span class="sort-info timeago" title="{{{ if topics.timestampISO }}}{topics.timestampISO}{{{ end }}}"></span></span>
					{{{ end}}}
					{{{ if sorts.recent }}}
					<span class="text-muted text-xs text-truncate"><span class="sort-info timeago" title="{{{ if topics.lastposttimeISO }}}{topics.lastposttimeISO}{{{ end }}}"></span></span>
					{{{ end }}}
					{{{ if sorts.posts }}}
					<span class="text-muted text-xs text-truncate"><span class="sort-info">[[global:x-posts, {topics.postcount}]]</span></span>
					{{{ end }}}
					{{{ if sorts.votes }}}
					<span class="text-muted text-xs text-truncate"><span class="sort-info">[[global:x-votes, {topics.votes}]]</span></span>
					{{{ end }}}
				</div>
			</div>
		</div>
		{{{end}}}
	</div>
</div>
{{{end}}}
