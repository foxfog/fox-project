<template>
	<RouterView />
</template>

<script setup>
	import { RouterView } from 'vue-router'
	import { appWindow } from '@tauri-apps/api/window'
	import settings from "../game/settings.json";

	const fullscreen = settings.video.fullscreen;
	appWindow.setFullscreen(fullscreen);
</script>

<style lang="scss">
	:root {
		--colorWhite: #ffffff;
		--colorBlack: #000000;

		--colorBaseOne: var(--colorWhite);
		--colorBaseTwo: var(--colorBlack);

		--colorBorder: color-mix(in srgb, var(--colorBaseOne), transparent 70%);

		--colorPrimary: #CF8B06;
		--colorSecondary: #11111F;
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
	.pagetitle {
		font-size: 3rem;
		margin-bottom: 1em;
	}
	.fw {
		width: 100%;
		height: 100%;
	}
	#app {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.mainpage {
		background: var(--colorBaseTwo);
		width: 100%;
		height: 100%;
		color: var(--colorWhite);
		display: flex;
		padding: var(--WindowMarginDefault);
		column-gap: var(--WindowMarginDefault);
	}
	.mainpage-back {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
	}
	.mainpage-logo {
		margin: auto;
		width: 100%;
		max-width: 540px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.logo-image {
			width: 60%;
			display: flex;
			justify-content: center;
			align-items: center;
			svg {
				width: 100%;
				height: 100%;
				max-height: 70dvh;
				object-fit: contain;
			}
		}
		.logo-name {
			width: 100%;
			font-size: 6rem;
			font-weight: 600;
			text-align: center;
			text-transform: uppercase;
			white-space: nowrap;
			letter-spacing: 0.1em;
			display: flex;
			justify-content: center;
			color: var(--colorBaseOne);
			.logo-alttext {
				color: var(--colorPrimary);
			}
		}
	}
	.mainpage-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		position: relative;
		z-index: 1;
	}
	.mainpage-bottombar {
		margin-top: auto;
		display: flex;
		column-gap: 2rem;
		align-items: center;
		font-size: 1.4rem;
		.mainpage-bottombar_btn {
			text-decoration: none;
			color: var(--colorPrimary);
			position: relative;
			&::before {
				content: '';
				width: 0;
				height: 2px;
				border-radius: 2px;
				background: var(--colorPrimary);
				position: absolute;
				top: calc(100% + 0.2em);
				transition: .1s;
			}
			&:hover {
				&::before {
					width: 100%;
				}
			}
		}
	}
	.ui-tabs {
		.ui-tabs-header {
			display: flex;
			align-items: end;
			font-size: 1.6rem;
			width: 100%;
			&::after {
				content: '';
				width: 100%;
				height: 1px;
				background: var(--colorBorder);
			}
			.ui-tabs-label {
				text-transform: uppercase;
				color: color-mix(in srgb, var(--colorBaseOne), transparent 80%);
				position: relative;
				border-width: 1px;
				border-color: transparent;
				border-style: solid;
				padding-left: 1em;
				padding-right: 1em;
				padding-bottom: 0.3em;
				padding-top: 0.5em;
				border-top-right-radius: 0.4em;
				border-top-left-radius: 0.4em;
				&:not(.__active) {
					&::after {
						content: '';
						width: calc(100% + 2px);
						height: 1px;
						background: var(--colorBorder);
						position: absolute;
						top: 100%;
						left: -1px;
					}
					&:hover {
						color: var(--colorPrimary);
					}
				}
				&.__active {
					color: var(--colorBaseOne);
					border-left-color: var(--colorBorder);
					border-right-color: var(--colorBorder);
					border-top-color: var(--colorBorder);
				}
			}
		}
		.ui-tabs-content {
			padding: 2rem;
			.ui-tab {
				&:not(.__active) {
					display: none;
				}
			}
		}
	}
</style>