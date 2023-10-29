<template>
	<div class="settings-item">
		<div class="settings-item__label">Размер экрана:</div>
		<div class="settings-item__option">
			<ui-select :options="screenSizeOptions" :selectedValue="fullscreen ? 'fullscreen' : 'windowed'" @option-selected="toggleFullscreen">
				<template v-slot:option="{ selectOption, isSelected, options }">
					<div
						v-for="(option, index) in options"
						:key="index"
						@click="selectOption(option)"
						:class="{ 'ui-select-option': true, '__selected': isSelected(option) }"
					>
						{{ option.label }}
					</div>
				</template>
			</ui-select>
		</div>
	</div>
</template>
  
<script setup>
	const emits = defineEmits(["set-fullscreen-data"]);
</script>

<script>
	import { appWindow } from '@tauri-apps/api/window'
	import settings from "../../game/settings.json"

	export default {
		components: {
		},
		data() {
			return {
				fullscreen: settings.video.fullscreen,
				screenSizeOptions: [
					{ value: 'fullscreen', label: 'Полноэкранный' },
					{ value: 'windowed', label: 'Оконный' }
				]
			}
		},
		methods: {
			toggleFullscreen(newMode) {
				if (newMode === 'fullscreen') {
					appWindow.setFullscreen(true);
					this.fullscreen = true;
					this.$emit('set-fullscreen-data', this.fullscreen);
				} else {
					appWindow.setFullscreen(false);
					this.fullscreen = false;
					this.$emit('set-fullscreen-data', this.fullscreen);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
  