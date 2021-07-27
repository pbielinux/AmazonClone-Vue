<template>
	<main>
		<div class="container-fluid c-section">
			<div class="row">
				<div class="col-sm-3"></div>
				<div class="col-sm-6">
					<div class="a-spacing-top-medium">
						<h2 style="text-align: center">Profile Page</h2>
						<a href="#" @click="onLogout">Logout</a>
						<form>
							<!-- Name -->
							<div class="a-spacing-top-medium">
								<label>Name</label>
								<input
									v-model="name"
									type="text"
									name="name"
									id="nameInput"
									class="a-input-text"
									style="width: 100%"
									:placeholder="$auth.$state.user.name"
								>
							</div>
							<!-- Email -->
							<div class="a-spacing-top-medium">
								<label>Email</label>
								<input
									v-model="email"
									type="email"
									name="email"
									id="emailInput"
									class="a-input-text"
									style="width: 100%"
									:placeholder="$auth.$state.user.email"
								>
							</div>
							<!-- Password -->
							<div class="a-spacing-top-medium">
								<label>Password</label>
								<input
									v-model="password"
									type="password"
									name="password"
									id="passwordInput"
									class="a-input-text"
									style="width: 100%"
								>
							</div>

							<!-- Button -->
							<hr/>
							<div class="a-spacing-top-large">
								<span class="a-button-register">
									<span class="a-button-inner">
										<span
											@click="onUpdateProfile"
											class="a-button-text">
											Update Profile
										</span>
									</span>
								</span>
							</div>
						</form>
						<br>
					</div>
				</div>
				<div class="col-sm-3"></div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	data() {
		return {
			name: "",
			email: "",
			password: ""
		}
	},

	methods: {
		async onUpdateProfile() {
			let data = {
				name: this.name,
				email: this.email,
				password: this.password
			};
			try {
				// By default axios have the token attachd to it
				let response = await this.$axios.$put("/api/auth/user", data);

				if (response.success) {
					this.name = "";
					this.email = "";
					this.password = "";

					await this.$auth.fetchUser();
				}
			} catch (err) {
				console.error(err);
			}
		},

		async onLogout() {
			await this.$auth.logout();
		}
	},
};
</script>
