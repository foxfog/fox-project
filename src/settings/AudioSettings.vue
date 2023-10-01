<template>
	<div v-for="(volumeItem, index) in volumeItems" :key="index" class="settings-item">
		<div class="settings-item__label">{{ volumeItem.label }}:</div>
		<div class="settings-item__option">
			<ui-range :dot="volumeItem.dot" :value="volumeItem.value" @input="handleVolumeChange(volumeItem.name, $event)" />
			<div class="settings-item__value">{{ volumeItem.value }}</div>
		</div>
	</div>
	<div class="settings-item">
		<ui-player-audio :audio-path="'../../game/audio/music/Called_Upon.ogg'" :audioType="'music'"></ui-player-audio>
	</div>
</template>
  
<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		computed: {
			...mapState(['soundSettings']),
			commonVolume() {
				return this.soundSettings.commonVolume;
			},
		},
		methods: {
			...mapMutations(['toggleMusic']),
			handleVolumeChange(name, newValue) {
				this.$store.commit(`updateVolumeByName`, { name, newValue });
			},
		},
		data() {
			return {
				volumeItems: [
					{
						name: 'commonVolume',
						label: 'Общая громкость',
					},
					{
						name: 'musicVolume',
						label: 'Музыка',
						dot: false,
					},
					{
						name: 'soundVolume',
						label: 'Звуки',
					},
					{
						name: 'voiceVolume',
						label: 'Голоса',
					},
				],
			};
		},
		watch: {
			soundSettings: {
				deep: true,
				handler(newVal) {
					this.volumeItems.forEach((item) => {
						item.value = newVal[item.name];
					});
				},
			},
		},
		created() {
			this.volumeItems.forEach((item) => {
				item.value = this.soundSettings[item.name];
			});
		},
	};
</script>
  

<style lang="scss" scoped>

</style>
  