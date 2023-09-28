<template>
	<div v-html="svgCode"></div>
</template>
  
<script>
	export default {
		props: {
			svgPath: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				svgCode: null,
			};
		},
		mounted() {
			this.loadSVG();
		},
		methods: {
			loadSVG() {
				const xhr = new XMLHttpRequest();
				xhr.open("GET", this.svgPath, true);
				xhr.onreadystatechange = () => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.svgCode = xhr.responseText;
				}
				};
				xhr.send();
			},
		},
	};
</script>