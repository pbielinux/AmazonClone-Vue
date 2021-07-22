<template>
	<div>
		<h1>{{name}}</h1>
		<input type="text" v-model="name">
		<button @click="onClick">Click me!</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: "About Vue!"
		};
	},
	methods: {
		onClick() {
			alert(this.name);
		}
	}
};
</script>
