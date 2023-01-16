<div class="mb-3">
	<label class="form-label">Category</label>
	<input type="text" class="form-control" name="cid" placeholder="0" />
	<p class="form-text">Set the category IDs you want to display this widget on (separated by commas)</p>
</div>

<div class="mb-3">
	<label class="form-label">Topics from Category</label>
	<input type="text" class="form-control" name="topicsFromCid" placeholder="0" />
	<p class="form-text">Set the category IDs you want to pull topics from (separated by commas)</p>
</div>

<div class="mb-3">
	<label class="form-label">Topic IDs</label>
	<input type="text" class="form-control" name="topicsTids" placeholder="0" />
	<p class="form-text">Set the topic IDs you want to display in the widget (separated by commas). This overrides category IDs setting.</p>
</div>

<div class="mb-3">
	<label class="form-label">Select Groups to show topics from</label>
	<select name="fromGroups" class="form-select" multiple size="10">
		{{{ each groups }}}
		<option value="{groups.name}">{groups.name}</option>
		{{{ end }}}
	</select>
</div>

<div class="mb-3">
	<label class="form-label" for="teaserPost">Teaser Post</label>
	<select class="form-select" id="teaserPost" name="teaserPost">
		<option value="first">First Post</option>
		<option value="last-post">Last Post</option>
	</select>
</div>

<div class="mb-3">
	<label class="form-label" for="sortBy">Sort Topics</label>
	<select class="form-select" id="sortBy" name="sort">
		<option value="recent">Recently Replied</option>
		<option value="posts">Most Posts</option>
		<option value="votes">Most Votes</option>
	</select>
</div>
