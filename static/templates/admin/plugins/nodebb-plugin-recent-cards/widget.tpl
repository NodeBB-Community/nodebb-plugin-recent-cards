<label>
	Category<br />
	<small>Set the category IDs you want to display this widget on (separated by commas)</small>
</label>
<input type="text" class="form-control" name="cid" placeholder="0" />

<label>
	Topics from Category<br />
	<small>Set the category IDs you want to pull topics from (separated by commas)</small>
</label>
<input type="text" class="form-control" name="topicsFromCid" placeholder="0" />

<label>Select Groups to show topics from</label>
<select name="fromGroups" class="form-control" multiple size="10">
	<!-- BEGIN groups -->
	<option value="{groups.name}">{groups.name}</option>
	<!-- END groups -->
</select>

<label for="teaserPost">Teaser Post</label>
<select class="form-control" id="teaserPost" name="teaserPost">
	<option value="first">First Post</option>
	<option value="last-post">Last Post</option>
</select>

<label for="sortBy">Sort Topics</label>
<select class="form-control" id="sortBy" name="sort">
	<option value="create">Recently Created</option>
	<option value="recent">Recently Replied</option>
	<option value="posts">Most Posts</option>
	<option value="votes">Most Votes</option>
</select>
