<template>
	<div v-for="(volumeItem, index) in volumeItems" :key="index" class="settings-item">
		<div class="settings-item__label">{{ volumeItem.label }}:</div>
		<div class="settings-item__option">
			<ui-range :dot="volumeItem.dot" :value="volumeItem.value" @input="handleVolumeChange(volumeItem.name, $event)" />
			<div class="settings-item__value __audio">{{ volumeItem.value }}</div>
			<div class="settings-item__sound">
				<ui-player-audio :audio-path="volumeItem.path" :audioType="volumeItem.type" :audioLook="2" />
			</div>
		</div>
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
						type: 'common',
						label: 'Общая громкость',
						path: '../../game/audio/music/Called_Upon.ogg',
					},
					{
						name: 'musicVolume',
						type: 'music',
						label: 'Музыка',
						path: '../../game/audio/music/Called_Upon.ogg',
						dot: false,
					},
					{
						name: 'soundVolume',
						type: 'sound',
						label: 'Звуки',
						path: '../../game/audio/music/Called_Upon.ogg',
					},
					{
						name: 'voiceVolume',
						type: 'voice',
						label: 'Голоса',
						path: '../../game/audio/music/Called_Upon.ogg',
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
  