<template>
	<main>
		<div class="container-fluid c-section">
			<div class="row">
				<div class="col-sm-3"></div>
				<div class="col-sm-6">
					<div class="a-spacing-top-medium">
						<h2 style="text-align: center">Add a new owner</h2>
						<form>
							<div class="a-spacing-top-medium">
								<!-- Name Input -->
								<label>Owner Name</label>
								<input
									v-model="name"
									type="text"
									name="category"
									id="categoryInput"
									class="a-input-text"
									style="width: 100%"
								>

								<!-- About textarea -->
								<div class="a-spacing-top-medium">
									<label style="margin-bottom: 0px;">About owner</label>
									<textarea
										v-model="about"
										class="sbx-amazon__input"
										name="aboutOwner"
										id="aboutOwnerInput"
										cols="30"
										rows="6"
										placeholder="Provide a description about the owner."
										>
									</textarea>
								</div>

								<!-- Photo file -->
								<div class="a-spacing-top-medium">
									<label style="margin-bottom: 0px;">Owner Photo</label>
									<div class="row a-spacing-top-medium">
										<div>
										<label class="choosefile-button">
											<i class="fal fa-plus"></i>
											<input
												@change="onFileSelected"
												type="file"
												name="ownerPhoto"
												id="ownerPhotoInput">
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
												@click="onAddOwner"
												class="a-button-text">
												Add owner
											</span>
										</span>
									</span>
								</div>
							</div>
						</form>
						<br>
						<ul class="list-group">
							<li
								v-for="owner in owners"
								:key="owner._id"
								class="list-group-item"
							>{{ owner.name }}
							</li>
						</ul>
					</div>
				</div>
				<div class="col-sm-3"></div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	async asyncData({ $axios }) {
		try {
			let response = await $axios.$get("http://localhost:3333/api/owners")

			return {
				owners: response.owners
			};
		} catch (err) {
			console.error(err);
		}
	},

	data() {
		return {
			name: "",
			about: "",
			selectedFile: null,
			fileName: ""
		}
	},

	methods: {
		onFileSelected(event) {
			this.selectedFile = event.target.files[0];
			this.fileName = event.target.files[0].name;
		},

		async onAddOwner() {
			try {
				let data = new FormData();
				data.append('name', this.name);
				data.append('about', this.about);
				data.append('photo', this.selectedFile, this.selectedFile.name);

				let response = await this.$axios.$post(
					"http://localhost:3333/api/owners",
					data
				);

				this.owners.push({ name: this.name });

				this.name = "";
				this.about = "";
				this.selectedFile = null;
				this.fileName = "";
			} catch (err) {
				console.error(err);
			}
		},
	},
};
</script>
