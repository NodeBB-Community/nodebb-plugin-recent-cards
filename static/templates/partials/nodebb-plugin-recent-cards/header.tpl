<!-- Recent Cards plugin -->
<ul class="categories">
	<p>Recent Topics</p>
</ul>

<div class="row recent-cards" itemscope itemtype="http://www.schema.org/ItemList">
	<!-- BEGIN topics -->
	<div component="categories/category" class="<!-- IF topics.category.class -->{topics.category.class}<!-- ELSE -->col-md-3 col-sm-6 col-xs-12<!-- ENDIF topics.category.class --> category-item" data-cid="{topics.category.cid}" data-numRecentReplies="{topics.category.numRecentReplies}" style="text-shadow:{recentCards.textShadow};">
		<meta itemprop="name" content="{topics.category.name}">

		<div class="category-icon">
			<div class="bg" style="opacity:{recentCards.opacity};<!-- IF topics.category.backgroundImage -->background-image: url({topics.category.backgroundImage});<!-- ELSE --><!-- IF topics.category.bgColor -->background-color: {topics.category.bgColor};<!-- ENDIF topics.category.bgColor --><!-- ENDIF topics.category.backgroundImage -->"></div>
			<a style="color: {topics.category.color};" href="{config.relative_path}/topic/{topics.slug}" itemprop="url">
				<div
					id="category-{topics.category.cid}" class="category-header category-header-image-{topics.category.imageClass}"
					style="color: {topics.category.color};"
				>
					<!-- IF topics.category.icon -->
					<div><i class="fa {topics.category.icon} fa-4x hidden-xs"></i></div>
					<!-- ENDIF topics.category.icon -->
				</div>
			</a>

			<div class="category-box">
				<div class="category-info" style="color: {topics.category.color};">
					<a href="{config.relative_path}/topic/{topics.slug}" itemprop="url" style="color: {topics.category.color};">
						<h4><!-- IF topics.category.icon --><i class="fa {topics.category.icon} visible-xs-inline"></i> <!-- ENDIF topics.category.icon -->{topics.title}</h4>
						<div class="description" itemprop="description"><strong>{topics.category.name}</strong> <span class="timeago" title="{topics.teaser.timestampISO}"></span></div>
					</a>
				</div>
			</div>

			<span class="post-count" style="color: {topics.category.color};">{topics.postcount}</span>
		</div>
	</div>
	<!-- END topics -->
</div>
<br />
