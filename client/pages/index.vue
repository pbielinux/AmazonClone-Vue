<template>
	<main class="listingPage">
		<div class="container-fluid">
			<div class="row">
					<!-- Sidebar -->
				<div class="col-xl-2 col-lg-3 md-4 col-sm-4">

				</div>

					<!-- Main Content -->
				<div class="col-xl-10 col-lg-9 md-8 col-sm-8">
					<FeaturedProduct />

					<div class="mainResults">
						<ul class="s-result-list">
							<li
								v-for="product in products" :key="product._id"
								class="s-result-item celwidget">
								<nuxt-link :to="`/products/${product._id}`" style="text-decoration: none;">
								<div class="s-item-container">
									<!-- Best Seller -->
									<div class="a-spacing-micro">
										<div class="bestSeller">
											<a href="#">Best Seller</a>
										</div>
									</div>

									<div>
										<div class="row">
											<!-- Image -->
											<div class="col-sm-3 text-center">
												<a href="#">
													<img
														:src="product.photo"
														alt="product.title photo"
														class="img-fluid"
														style="width: 170px">
												</a>
											</div>

											<div class="col-sm-9">
												<div class="a-row a-spacing-small">
													<!-- Title and Date -->
													<a href="#" class="a-link-normal">
														<h2 class="a-size-medium">
															{{ product.title }}
															<span class="a-letter-space"></span>
															<span class="a-letter-space"></span>
															<span class="a-size-small a-color-secondary">Sep 3, 2021</span>
														</h2>
													</a>
												</div>

												<!-- Author's Name -->
												<div class="a-row a-spacing-small">
													<span class="a-size-small a-color-secondary">by</span>
													<span class="a-size-small a-color-secondary">
														<a href="#" clas="a-link-normal a-text-normal">{{ product.owner.name }}</a>
													</span>
												</div>

												<!-- Shipment -->
												<div class="a-row">
													<span class="a-size-small">Ships to USA</span>
												</div>

												<div class="row">
													<div class="col-sm-7">
														<!-- Category -->
														<div class="a-row a-spacing-none">
															<a href="#" class="a-link-normal a-text-normal">{{ product.category.type }}</a>
														</div>

														<!-- Price -->
														<div class="a-row a-spacing-none">
															<a href="#" class="a-link-normal a-text-normal">
																<span class="a-offscreen">${{ product.price }}</span>
																<span class="a-color-base sx-zero-spacing">
																	<span class="sx-price sx-price-large">
																		<sup class="sx-price-currency">$</sup>
																		<span class="sx-price-whole">{{ product.price }}</span>
																		<sup class="sx-price-fractional">00</sup>
																	</span>
																</span>
															</a>
															<span class="a-letter-space"></span>
															<span class="a-size-base-plus a-color-secondary a-text-strike">$28.00</span>
														</div>

														<!-- Audible Trial -->
														<div class="a-row a-spacing-none">
															<span class="a-size-small a-color-secondary">Free with Audible trial</span>
														</div>
														<hr />

														<!-- Other Formats -->
														<span class="a-size-small a-color-secondary">
															Other Formats:
															<span class="a-letter-space"></span>
															<a href="#" class="a-size-small a-link-normal a-text-normal">Audio CD</a>
														</span>
													</div>

													<!-- Ratings -->
													<div class="col-sm-5">
														<div class="a-row a-spacing-mini">
															<!-- Star Ratings -->
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								</nuxt-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div>
		<div v-if="!isHidden" class="banner">
			<i @click="isHidden = true" class="icon fas fa-times"></i>
			<div class="container">
				<h4>Atention</h4>
				<p>This is a portfolio project made for skills demonstration purposes. It isn't reated to Amazon.com by any forms.</p>
			</div>
		</div>
	</div>
	</main>
</template>

<script>
import FeaturedProduct from "~/components/FeaturedProduct";

export default {
	components: {
		FeaturedProduct
	},

	data () {
		return {
			isHidden: false,
		}
	},

	async asyncData({ $axios }) {
		try {
			let response = await $axios.$get("/api/products");

			return {
				products: response.products
			};
		} catch (err) {
			console.error(err);
		}
	},
}
</script>
