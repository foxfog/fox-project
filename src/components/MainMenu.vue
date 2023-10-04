<template>
	<div class="mainmenu">
		<nav class="nav">
			<router-link
				v-for="route in filteredRouters"
				:to="route.path"
				:key="route.name"
				class="mainmenu-link"
			>
				{{ translateRouteName(`mainmenu.${route.name}`) }}
			</router-link>
			<a class="mainmenu-link" @click="handleButtonClick">{{ $t('mainmenu.close') }}</a>
		</nav>
	</div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import router from '../router/index';
import { appWindow } from '@tauri-apps/api/window';

export default {
	components: {
		RouterLink,
	},
	methods: {
		handleButtonClick: async function() {
			try {
				await appWindow.close();
			} catch (error) {
				console.error('Failed to close the window:', error);
			}
		},
	},
	computed: {
		filteredRouters() {
		// Фильтруем маршруты, исключая "home" при текущем пути "/"
		return this.routers.filter(route => !(route.name === 'home' && this.$route.path === '/'));
		}
	},
	setup() {
		const routeNames = ['home', 'newgame', 'load', 'settings', 'about' , 'test'];

		const { t } = useI18n();

		const routers = routeNames.map(name => {
			const route = router.options.routes.find(route => route.name === name);
			return route;
		});

		const translateRouteName = (name, data = {}) => {
			return t(name, data);
		};

		return {
			routers,
			translateRouteName,
		};
	},
};
</script>

<style lang="scss" scoped>
.mainmenu {
	margin-top: auto;
	margin-left: auto;
	text-align: right;
	font-size: 1.6rem;
	width: 20%;
    min-width: fit-content;
	max-width: 300px;
	position: relative;
	z-index: 1;
	.nav {
		display: flex;
		flex-direction: column;
		row-gap: 0.2rem;
		align-items: end;
		.mainmenu-link {
			width: 100%;
			text-decoration: none;
			color: var(--colorBaseOne);
			text-align: right;
			padding-top: 0.15em;
			padding-bottom: 0.2em;
			padding-left: 0.3em;
			padding-right: 0.3em;
			border-radius: var(--borderRadiusDefault);
			&:hover {
				&:not(.router-link-active) {
					color: var(--colorPrimary);
				}
			}
			&.router-link-active {
				background: var(--colorBaseOne);
				color: var(--colorBaseTwo);
			}
		}
	}
}
</style>
  