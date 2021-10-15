<template>
	<div>
		<div v-if="!isHidden" class="banner">
			<i @click="onClick" class="icon fas fa-times"></i>
			<div class="container">
				<h4>Atention</h4>
				<p>This is a portfolio project made for skills demonstration purposes. It isn't reated to Amazon.com by any forms.</p>
			</div>
		</div>
		<div>.</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			isHiden: false,
		}
	},

	methods: {
		onClick() {
			isHidden = true;
		}
	}
}
</script>
