<template>
	<main class="registerPage">
		<div class="container">
			<div class="row">
				<div class="col-sm-4"></div>
				<div class="col-sm-4">
					<div class="text-center">
						<nuxt-link to="/">
							<img src="/img/logo-black.png" alt="Amazon Logo">
						</nuxt-link>
					</div>

					<form class="mt-4">
						<div class="a-box a-spacing-extra-large">
							<div class="a-box-inner">
								<h1 class="a-spacing-small">Create account</h1>
								<!-- Your Name -->
								<div class="a-row a-spacing-base">
									<label for="ap_customer_name" class="a-form-label">Your name</label>
									<input
										v-model="name"
										type="text"
										name="customer_name"
										id="ap_customer_name"
										class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
								</div>
								<!-- Email -->
								<div class="a-row a-spacing-base">
									<label for="ap_customer_email" class="a-form-label">Email</label>
									<input
										v-model="email"
										type="email"
										name="customer_email"
										id="ap_email"
										class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
								</div>
								<!-- Password -->
								<div class="a-row a-spacing-base">
									<label for="ap_customer_password" class="a-form-label">Password</label>
									<input
										v-model="password"
										type="password"
										name="customer_password"
										id="ap_password"
										class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
									>
									<div class="a-alert-container">
										<div class="a-alert-content">Password must be at least 6 characters</div>
									</div>
								</div>
								<!-- Button -->
								<div class="a-row a-spacing-extra-large mb-4">
									<span @click="onSignup" class="a-button-primary">
										<span class="a-button-inner">
											<span class="a-button-text">Create your Amazon account</span>
										</span>
									</span>
									<div class="a-row a-spacing-top-medium a-size-small">
										<b>
											By creating an account, you agree to Amazon's
											<a href="#">Conditions of use</a> and
											<a href="#">Privacy Notice</a>
										</b>
									</div>
								</div>
								<hr>
								<div class="a-row">
									<b>
										Already have an account?
										<nuxt-link to="/login" class="a-link-enphasis">Sign in</nuxt-link>
									</b>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	middleware: "auth",
	auth: "guest",
	layout: "none",

	data() {
		return {
			name: "",
			email: "",
			password: ""
		}
	},

	methods: {
		async onSignup() {
			try {
				// 1. Get the data from v-models
				let data = {
					name: this.name,
					email: this.email,
					password: this.password
				};

				// 2. Pass the data to axios to signup the user
				let response = await this.$axios.$post("/api/auth/signup", data);

				console.log(response);

				if (response.success) {
					// 3. Trigger the auth library
					this.$auth.loginWith("local", {
						// 4. Then auth library trigger the login
						data: {
							email: this.email,
							password: this.password
						}
					}); // If the loggin is successful the api return a token
					// 5. The auth library store the token in the localstorage and cookies
					// 6. Hit the user API to retrieve user object and store to the localstorage and cookies to

					this.$router.push("/");
				};
			} catch (err) {
				console.error(err);
			}
		},
	},
}
</script>
