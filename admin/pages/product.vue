<template>
	<main>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-3"></div>
				<div class="col-sm-6">
					<section class="a-section">
						<div class="a-spacing-top-medium"></div>
						<h2 style="text-align: center">Add a new product</h2>
						<form>
							<!-- Category Dropdown -->
							<div class="a-spacing-top-medium">
								<label>Category</label>
								<select name="category" id="categorySelector" class="a-select-option">
									<option value="1">1</option>
									<option value="2">2</option>
								</select>
							</div>

							<!-- Owner Dropdown -->
							<div class="a-spacing-top-medium">
								<label>Owner</label>
								<select name="owner" id="ownerSelector" class="a-select-option">
									<option value="1">1</option>
									<option value="2">2</option>
								</select>
							</div>

							<!-- Title input -->
							<div class="a-spacing-top-medium">
								<label style="margin-bottom: 0px;">Title</label>
								<input type="text" class="a-input-text" style="width: 100%">
							</div>

							<!-- Price input -->
							<div class="a-spacing-top-medium">
								<label style="margin-bottom: 0px;">Price</label>
								<input type="text" class="a-input-text" style="width: 100%">
							</div>

							<!-- Description textarea -->
							<div class="a-spacing-top-medium">
								<label style="margin-bottom: 0px;">Description</label>
								<textarea
									class="sbx-amazon__input"
									name="description"
									id="descriptionInput"
									cols="30"
									rows="6"
									placeholder="Provide details such as a product description."
									>
								</textarea>
							</div>

							<!-- Photo file -->
							<div class="a-spacing-top-medium">
								<label style="margin-bottom: 0px;">Photo Upload</label>
								<div class="row a-spacing-top-medium">
									<div>
									<label class="choosefile-button">
										<i class="fal fa-plus"></i>
										<input type="file" name="photo" id="photoInput">
									</label>
									</div>
									<p>Name of the photo</p>
								</div>
							</div>

							<!-- Button -->
							<hr/>
							<div class="a-spacing-top-large">
								<span class="a-button-register">
									<span class="a-button-inner">
										<span class="a-button-text">
											Add product
										</span>
									</span>
								</span>
							</div>


						</form>
					</section>
				</div>
				<div class="col-sm-3"></div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	setup() {

	},
}
</script>
