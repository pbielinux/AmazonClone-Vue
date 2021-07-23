<template>
	<main>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-3"></div>
				<div class="col-sm-6">
					<section class="a-section">
						<div class="a-spacing-top-medium"></div>
						<h2 style="text-align: center">Update - {{ product.title }}</h2>
						<form>
							<!-- Category Dropdown -->
							<div class="a-spacing-top-medium">
								<label>Category</label>
								<select
									v-model="categoryID"
									name="category"
									id="categorySelector"
									class="a-select-option">
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
									:placeholder="product.title"
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
									:placeholder="product.stockQuantity"
									type="text"
									class="a-input-text"
									style="width: 100%">
							</div>

							<!-- Description textarea -->
							<div class="a-spacing-top-medium">
								<label style="margin-bottom: 0px;">Description</label>
								<textarea
									v-model="description"
									:placeholder="product.description"
									class="sbx-amazon__input"
									name="description"
									id="descriptionInput"
									cols="30"
									rows="6"
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
											@click="onUpdateProduct"
											class="a-button-text">
											Update product
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
	async asyncData({ $axios, params }) {
		try {
			let categories = $axios.$get("http://localhost:3333/api/categories");
			let owners = $axios.$get("http://localhost:3333/api/owners");
			let product = $axios.$get(`http://localhost:3333/api/products/${ params.id }`);

			// Promise.all runs both APIs at the same time
			const [ categoriesResponse, ownersResponse, productResponse ] = await Promise.all([
				categories,
				owners,
				product
			]);

			console.log(productResponse);

			return {
				categories: categoriesResponse.categories,
				owners: ownersResponse.owners,
				product: productResponse.product,

				price: productResponse.product.price,
				description: productResponse.product.description,
				title: productResponse.product.title,
				stockQuantity: productResponse.product.stockQuantity,
				ownerID: productResponse.product.owner,
				categoryID: productResponse.product.category,

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
			description: "",
			stockQuantity: "",
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

		async onUpdateProduct() {
			let data = new FormData();
			data.append('title', this.title);
			data.append('price', this.price);
			data.append('description', this.description);
			data.append('stockQuantity', this.stockQuantity);
			data.append('ownerID', this.ownerID);
			data.append('categoryID', this.categoryID);
			data.append('photo', this.selectedFile, this.selectedFile.name);

			let response = await this.$axios.$put(
				`http://localhost:3333/api/products/${this.$route.params.id}`,
				data
			);

			this.$router.push("/");
		}
	}
}
</script>
