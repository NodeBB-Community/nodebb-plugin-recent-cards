<label>
	Custom Category:<br />
	<small>Category ID to show topics from</small>
</label>
<input type="text" class="form-control" name="cid" placeholder="0" />

<label>Select Groups to show topics from</label>
<select name="fromGroups" class="form-control" multiple>
	<!-- BEGIN groups -->
	<option value="{groups.name}">{groups.name}</option>
	<!-- END groups -->
</select>