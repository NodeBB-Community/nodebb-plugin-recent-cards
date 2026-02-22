{{{ if topics.length }}}
<div class="recent-cards-plugin preventSlideout">
	{{{ if title }}}
	<h5>{title}</h5>
	{{{ end }}}

	<div class="{{{ if !carouselMode }}}row{{{ else }}}d-flex gap-3{{{ end }}} recent-cards carousel-mode overflow-hidden invisible" itemscope itemtype="http://www.schema.org/ItemList" {{{ if carouselMode }}}style=""{{{ end }}}>
		{{{ each topics }}}
		<div class="{{{ if !carouselMode }}}col-lg-3 col-sm-6 col-12 overflow-hidden{{{ end }}} recent-card-container {{{ if (./thumbs.length && (./teaser.pid == ./mainPid ))}}}thumb-bg{{{ end }}}" data-cid="{./category.cid}">
			<div class="recent-card card card-header border-0 rounded mb-2 p-0 position-relative d-inline-flex {{{ if !carouselMode }}}w-100{{{ end }}}" style="{{{ if (./thumbs.length && (./teaser.pid == ./mainPid ))}}}background-image: url('{./thumbs.0.url}');{{{ end }}}{{{ if carouselMode }}}width: 312px;{{{ end }}}">
				<div class="glass-layer rounded p-2">
					<div class="recent-card-body h-100 overflow-hidden">
						<div>
							<h6 class="topic-title mt-0 text-truncate"><a class="text-reset" href="{config.relative_path}/topic/{./slug}{{{ if ./bookmark }}}/{./bookmark}{{{ end }}}" title="{stripTags(./title)}">{./title}</a></h6>
						</div>
						<div class="d-flex flex-column gap-1">
							<div class="d-flex gap-2 align-items-center">
								<a class="text-decoration-none" href="{config.relative_path}/user/{./teaser.user.userslug}">{buildAvatar(./teaser.user, "24px", true, "avatar-tooltip")}</a>
								<a class="flex-shrink-1 text-xs text-truncate text-reset" href="{config.relative_path}/user/{./teaser.user.userslug}">{./teaser.user.displayname}</a>
								<span class="flex-shrink-0 timeago text-muted text-xs" title="{./teaser.timestampISO}"></span>
							</div>
							<div class="topic-info text-sm text-break line-clamp-5" style="transform: rotate(0);">
								<a href="{config.relative_path}/topic/{./slug}{{{ if ./bookmark }}}/{./bookmark}{{{ end }}}" class="stretched-link"></a>
								<div>{./teaser.content}</div>
							</div>
						</div>
					</div>

					<div class="d-flex mt-3 align-items-center gap-2">
						<div class="d-flex category-item text-truncate">
							{buildCategoryLabel(./category, "a", "border")}
						</div>
						<div class="badge text-body border border-gray-300 stats text-xs">
							<span title="{formattedNumber(./postcount)}" class="fw-bold">{humanReadableNumber(./postcount)}</span>
							<span class="text-lowercase fw-normal">[[global:posts]]</span>
						</div>
						<div class="badge text-body border border-gray-300 stats text-xs">
							<span title="{formattedNumber(./votes)}" class="fw-bold">{humanReadableNumber(./votes)}</span>
							<span class="text-lowercase fw-normal">[[global:votes]]</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		{{{end}}}
	</div>
</div>
{{{end}}}
