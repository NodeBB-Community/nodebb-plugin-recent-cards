<div class="row">
	<div class="col-lg-9">
		<div class="panel panel-default">
			<div class="panel-heading">Recent Cards</div>
			<div class="panel-body">
				<form role="form" id="recentcards">
					<div class="form-group">
						<label for="opacity">Background Opacity</label>
						<input type="text" id="opacity" data-key="opacity" title="opacity" class="form-control" placeholder="1.0">
					</div>
					<div class="form-group">
						<label for="shadow">Text Shadow</label>
						<input type="text" id="shadow" data-key="shadow" title="shadow" class="form-control" placeholder="none">
					</div>

					<div class="form-group">
						<div class="checkbox">
							<label for="enableCarousel">
								<input type="checkbox" data-key="enableCarousel" id="enableCarousel" name="enableCarousel" />
								Enable Carousel Mode
							</label>
						</div>

						<div class="checkbox">
							<label for="enableCarouselPagination">
								<input type="checkbox" data-key="enableCarouselPagination" id="enableCarouselPagination" name="enableCarouselPagination" />
								Turn on paginator for carousel
							</label>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="col-lg-3">
		<div class="panel panel-default">
			<div class="panel-heading">Control Panel</div>
			<div class="panel-body">
				<button class="btn btn-primary" id="save">Save Settings</button>
			</div>
		</div>
	</div>
</div>

<script>
require(['settings'], function(settings) {

	settings.sync('recentcards', $('#recentcards'));

	$('#save').click( function (event) {
		settings.persist('recentcards', $('#recentcards'), function(){
			socket.emit('admin.settings.syncRecentCards');
		});
	});
});
</script>