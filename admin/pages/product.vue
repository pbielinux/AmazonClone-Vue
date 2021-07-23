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
								<select
									v-model="categoryID"
									name="category"
									id="categorySelector"
									class="a-select-option">
									<option value="0">Select the product category</option>
									<option
										v-for="category in categories"
										:value="category._id"
										:key="category._id"
									>{{ category.type }}
									</option>
								</select>
							</div>

							<!-- Owner Dropdown -->
							<div class="a-spacing-top-medium">
								<label>Owner</label>
								<select
									v-model="ownerID"
									name="owner"
									id="ownerSelector"
									class="a-select-option">
									<option value="0">Select the product owner</option>
									<option
										v-for="owner in owners"
										:value="owner._id"
										:key="owner._id"
									>{{ owner.name }}
									</option>
								</select>
							</div>

							<!-- Title input -->
							<div class="a-spacing-top-medium">
								<label style="margin-bottom: 0px;">Title</label>
								<input
									v-model="title"
									type="text"
									class="a-input-text"
									style="width: 100%">
							</div>

							<!-- Price input -->
							<div class="a-spacing-top-medium">
								<label style="margin-bottom: 0px;">Price</label>
								<input
									v-model="price"
									type="text"
									class="a-input-text"
									style="width: 100%">
							</div>

							<!-- StockQuantity input -->
							<div class="a-spacing-top-medium">
								<label style="margin-bottom: 0px;">Stock Quantity</label>
								<input
									v-model="stockQuantity"
									type="text"
									class="a-input-text"
									style="width: 100%">
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
										<input
											@change="onFileSelected"
											type="file"
											name="photo"
											id="photoInput">
									</label>
									</div>
									<p>{{ fileName }}</p>
								</div>
							</div>

							<!-- Button -->
							<hr/>
							<div class="a-spacing-top-large">
								<span class="a-button-register">
									<span class="a-button-inner">
										<span
											@click="onAddProduct"
											class="a-button-text">
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
	// asyncData is processed on server-side - Use for API Calls
	async asyncData({ $axios }) {
		try {
			let categories = $axios.$get("http://localhost:3333/api/categories");
			let owners = $axios.$get("http://localhost:3333/api/owners");

			// Promise.all runs both APIs at the same time
			const [ categoriesResponse, ownersResponse ] = await Promise.all([
				categories,
				owners
			]);

			return {
				categories: categoriesResponse.categories,
				owners: ownersResponse.owners
			};
		} catch (err) {
			console.error(err);
		}
	},

	// Data is processed on client-side
	data() {
		return {
			// Create the model - To map the model to the right input field
			categoryID: null,
			ownerID: null,
			title: "",
			price: 0,
			description: "",
			stockQuantity: 1,
			selectedFile: null,
			fileName: ""
		}
	},

	methods: {
		//	Select the chosen file and set to this.selectedFile
		onFileSelected(event) {
			this.selectedFile = event.target.files[0];
			this.fileName = event.target.files[0].name;
		},

		async onAddProduct() {
			let data = new FormData();
			data.append('title', this.title);
			data.append('price', this.price);
			data.append('description', this.description);
			data.append('stockQuantity', this.stockQuantity);
			data.append('ownerID', this.ownerID);
			data.append('categoryID', this.categoryID);
			data.append('photo', this.selectedFile, this.selectedFile.name);

			let result = await this.$axios.$post(
				"http://localhost:3333/api/products",
				data
			);

			this.$router.push("/");
		}
	}
}
</script>
