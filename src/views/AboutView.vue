<template>
	<div class="mainpage">
		<div class="mainpage-content">
			<div class="pagetitle">{{ $t('mainmenu.about') }}</div>
			<h1>{{ $t('about', {user: "Fox"}) }}</h1>
			<h2>{{ $t('num_age', {user: "Fox", n: 10}) }}</h2>
			<h3>Сейчас {{ $d(new Date(), "longFormat") }}</h3>
		</div>
		<MainMenu />
	</div>
</template>

<script>
	import MainMenu from '../components/MainMenu.vue'
	import { mixinBgMusic } from "../mixins/mixinBgMusic";
	
	export default {
		components: {
			MainMenu,
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