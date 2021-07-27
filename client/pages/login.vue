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
								<h1 class="a-spacing-small">Sign In</h1>
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
									<br>
								</div>
								<!-- Button -->
								<div class="a-row a-spacing-extra-large mb-4">
									<span @click="onLogin" class="a-button-primary">
										<span class="a-button-inner">
											<span class="a-button-text">Continue</span>
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
										Don't have an account?
										<nuxt-link to="/signup" class="a-link-enphasis">Signup</nuxt-link>
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
	// If the user is logged in, /login and /signup redirects to homepage
	middleware: "auth",
	auth: "guest",
	layout: "none",

	data() {
		return {
			email: "",
			password: ""
		}
	},

	methods: {
		async onLogin() {
			try {
				this.$auth.loginWith("local", {
					data: {
						email: this.email,
						password: this.password
					}
				});
				this.$router.push("/");
			} catch (err) {
				console.error(err);
			}
		},
	},
}
</script>
