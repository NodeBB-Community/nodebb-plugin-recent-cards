<!-- IF topics.length -->
<div class="recent-cards-plugin preventSlideout">
	<ul class="categories">
		<p>{recentCards.title}</p>
	</ul>

	<ul class="row recent-cards carousel-mode" itemscope itemtype="http://www.schema.org/ItemList">
		<!-- BEGIN topics -->
		<li class="<!-- IF topics.category.class -->{topics.category.class}<!-- ELSE -->col-md-3 col-sm-6 col-xs-12<!-- ENDIF topics.category.class --> category-item" data-cid="{topics.category.cid}" data-numRecentReplies="{topics.category.numRecentReplies}" style="text-shadow:{recentCards.textShadow};">
			<meta itemprop="name" content="{topics.category.name}">

			<a style="color: {topics.category.color};" href="{config.relative_path}/topic/{topics.slug}<!-- IF topics.bookmark -->/{topics.bookmark}<!-- ENDIF topics.bookmark -->" itemprop="url">
				<div class="recent-card">
					<div class="bg" style="opacity:{recentCards.opacity};<!-- IF topics.category.backgroundImage -->background-image: url({topics.category.backgroundImage});<!-- ELSE --><!-- IF topics.category.bgColor -->background-color: {topics.category.bgColor};<!-- ENDIF topics.category.bgColor --><!-- ENDIF topics.category.backgroundImage -->"></div>
					<div class="topic-info" style="color: {topics.category.color};">
						<span class="h4" itemprop="description">{topics.title}</span>
						<br>
						<span class="description"><strong>{topics.category.name}</strong> <span class="timeago" title="<!-- IF topics.teaser.timestampISO -->{topics.teaser.timestampISO}<!-- ELSE -->{topics.timestampISO}<!-- ENDIF topics.teaser.timestampISO -->"></span></span>
					</div>

					<div class="post-count" style="color: {topics.category.color};">
						<span>{topics.postcount}</span>
					</div>

					<!-- IF topics.category.icon -->
					<div class="icon">
						<i class="fa {topics.category.icon}"></i>
					</div>
					<!-- ENDIF topics.category.icon -->
				</div>
			</a>
		</li>
		<!-- END topics -->
	</ul>
	<br />
</div>
<!-- ENDIF topics.length -->
