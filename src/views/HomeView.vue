<template>
	<div class="mainpage">
		<div class="mainpage-back">
			<div class="mainpage-logo logo">
				<svg-image svgPath="../../game/UI/logo/logo.svg" class="logo-image"></svg-image>
				<div class="logo-name"><span class="logo-alttext">Fox</span> Project</div>
			</div>
		</div>
		<div class="mainpage-content">
			
		</div>
		<MainMenu />
	</div>
</template>
<script>
	import MainMenu from '../components/MainMenu.vue'
	import SvgImage from '../components/SvgImage.vue'
	import { mixinBgMusic } from "../mixins/mixinBgMusic";
	
	export default {
		components: {
			MainMenu,
			SvgImage,
		},
		mixins: [mixinBgMusic],
		props: {
			enableMusic: {
				type: Boolean,
				default: true,
			},
		},
	};
</script>

<style lang="scss">
	
</style>