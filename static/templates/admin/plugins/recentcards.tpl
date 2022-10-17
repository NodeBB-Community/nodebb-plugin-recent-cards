<div class="row">
	<div class="col-lg-9">
		<div class="card">
			<div class="card-header">Recent Cards</div>
			<div class="card-body">
				<form role="form" id="recentcards">
					<div class="">
						<div class="form-check mb-3">
							<input class="form-check-input" type="checkbox" data-key="enableCarousel" id="enableCarousel" name="enableCarousel" />
							<label class="form-check-label" for="enableCarousel">
								Enable Carousel Mode
							</label>
						</div>

						<div class="form-check mb-3">
							<input class="form-check-input" type="checkbox" data-key="enableCarouselPagination" id="enableCarouselPagination" name="enableCarouselPagination" />
							<label class="form-check-label" for="enableCarouselPagination">
								Turn on paginator for carousel
							</label>
						</div>

						<div class="mb-3">
							<label for="maxSlides">Max slides to show for carousel</label>
							<input id="maxSlides" type="text" class="form-control" placeholder="4" name="maxSlides" data-key="maxSlides">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="col-lg-3">
		<div class="card">
			<div class="card-header">Control Panel</div>
			<div class="card-body">
				<button class="btn btn-primary" id="save">Save Settings</button>
			</div>
		</div>
	</div>
</div>
