<template>
	<RouterView />
	<BgMusic />
</template>

<script setup>
	import { RouterView } from 'vue-router'
	import { appWindow } from '@tauri-apps/api/window'
	import settings from "../game/settings.json";

	const fullscreen = settings.video.fullscreen;
	appWindow.setFullscreen(fullscreen);
</script>
<script>
	import BgMusic from "./components/Sounds/BgMusic.vue";

	export default {
		components: {
			BgMusic,
		},
	};
</script>

<style lang="scss">
	:root {
		--colorWhite: #ffffff;
		--colorBlack: #000000;

		--colorBaseOne: var(--colorWhite);
		--colorBaseTwo: #0c0c0c;

		--colorBorder: color-mix(in srgb, var(--colorBaseOne), transparent 70%);

		--colorPrimary: #cf8b06;
		--colorPrimaryDark: #7f5707;
		--colorSecondary: #222247;
		--colorAlter: #0061BA;

		--fontPrimary: 'Advent Pro', sans-serif;
		--fontDefoult: 'Inter', sans-serif;

		--fontSizeDefault: 16px;

		--borderRadiusDefault: 2px;
		--borderRadiusBig: 5px;
		--WindowMarginDefault: 60px;
	}
	* {
		box-sizing: border-box;
		user-select: none;
		cursor: default;
	}
	::selection {
		background: transparent;
	}
	html {
		font-family: var(--fontPrimary);
		font-size: var(--fontSizeDefault);
		overflow: hidden;
	}
	body {
		margin: 0;
		width: 100dvw;
		height: 100dvh;
	}
	#app {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>