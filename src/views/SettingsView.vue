<template>
	<div class="mainpage">
		<div class="mainpage-content">
			<div class="pagetitle">{{ $t('mainmenu.settings') }}</div>
			<div class="ui-tabs">
				<div class="ui-tabs-header">
					<div :class="{ 'ui-tabs-label': true, '__active': activeTabIndex === 0 }" @click="activeTabIndex = 0">{{ $t('settings.generals') }}</div>
					<div :class="{ 'ui-tabs-label': true, '__active': activeTabIndex === 1 }" @click="activeTabIndex = 1">{{ $t('settings.video') }}</div>
					<div :class="{ 'ui-tabs-label': true, '__active': activeTabIndex === 2 }" @click="activeTabIndex = 2">{{ $t('settings.audio') }}</div>
				</div>
				<div class="ui-tabs-content">
					<div class="ui-tab" :class="{ '__active': activeTabIndex === 0 }">
						<GeneralSettings />
					</div>
					<div class="ui-tab" :class="{ '__active': activeTabIndex === 1 }">
						<VideoSettings v-on:set-fullscreen-data="updateSettings" />
					</div>
					<div class="ui-tab" :class="{ '__active': activeTabIndex === 2 }">
						<AudioSettings />
					</div>
				</div>
			</div>
			<div class="mainpage-bottombar">
				<div class="mainpage-bottombar_btn" @click="saveToFile">{{ $t('settings.save') }}</div>
				<div class="mainpage-bottombar_btn" @click="resetToDefoult">{{ $t('settings.resetToDefoult') }}</div>
			</div>
		</div>
		<MainMenu />
	</div>
</template>

<script>
	import MainMenu from '@/components/MainMenu.vue'
	import GeneralSettings from '@/settings/GeneralSettings.vue'
	import VideoSettings from '@/settings/VideoSettings.vue'
	import AudioSettings from '@/settings/AudioSettings.vue'
	import { invoke } from '@tauri-apps/api/tauri'
	import settings from "../../game/settings.json"
	import { mixinBgMusic } from "@/mixins/mixinBgMusic"

	export default {
		components: {
			MainMenu,
			GeneralSettings,
			VideoSettings,
			AudioSettings
		},
		data() {
			return {
				fullscreen: settings.video.fullscreen,
				activeTabIndex: 0,
			};
		},
		mixins: [mixinBgMusic],
		props: {
			enableMusic: {
				type: Boolean,
				default: true,
			},
		},
		methods: {
			updateSettings(NewSettings) {
				this.fullscreen = NewSettings
			},
			switchLanguage(event) {
				const newLocale = event.target.value;
				Tr.switchLanguage(newLocale);
			},
			async saveToFile() {
				try {
					const data = {
						general: {
							language: this.$i18n.locale,
						},
						video: {
							fullscreen: this.fullscreen,
						},
						audio: {
							commonVolume: this.$store.state.soundSettings.commonVolume,
							musicVolume: this.$store.state.soundSettings.musicVolume,
							soundVolume: this.$store.state.soundSettings.soundVolume,
							voiceVolume: this.$store.state.soundSettings.voiceVolume,
						},
						controls: {
							keyboardLayout: "qwerty",
						},
					};
					const response = await invoke("save_to_file", { data });
					if (response) {
						console.log("Файл успешно сохранен");
					} else {
						console.error("Не удалось сохранить файл");
					}
				} catch (error) {
					console.error("Ошибка при сохранении файла:", error);
				}
			},
			async resetToDefoult() {
				try {
					const data = {
						general: {
							language: "ru",
						},
						video: {
							fullscreen: false,
						},
						audio: {
							commonVolume: 100,
							musicVolume: 100,
							soundVolume: 100,
							voiceVolume: 100,
						},
						controls: {
							keyboardLayout: "qwerty",
						},
					};
					const response = await invoke("save_to_file", { data });
					if (response) {
						console.log("Файл успешно сохранен");
					} else {
						console.error("Не удалось сохранить файл");
					}
				} catch (error) {
					console.error("Ошибка при сохранении файла:", error);
				}
			},
		}
	}
</script>

<style lang="scss">
	.settings-item {
		display: flex;
		&:not(:first-child) {
			padding-top: 1em;
		}
		&:not(:last-child) {
			padding-bottom: 1em;
			border-bottom: 1px solid var(--colorBorder);
		}
	}
	.settings-item__label {
		flex: 1;
		min-width: 150px;
	}
	.settings-item__option {
		flex: 1;
		display: flex;
		align-items: center;
		column-gap: 1em;
		.ui-range {
			width: 100%;
		}
	}
	.settings-item__value {
		flex: none;
		&.__audio {
			width: 1em;
		}
	}
</style>
