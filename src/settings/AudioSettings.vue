<template>
	<div v-for="(volumeItem, index) in volumeItems" :key="index" class="settings-item">
		<div class="settings-item__label">{{ volumeItem.label }}:</div>
		<div class="settings-item__option">
			<ui-range :dot="volumeItem.dot" v-model="volumeItem.value" />
			<div class="settings-item__value __audio">{{ volumeItem.value }}</div>
			<div class="settings-item__sound">
				<ui-player-audio
				:audio-path="volumeItem.randomTandemFile"
				:audioType="volumeItem.type"
				:audioLook="2"
				@audio-ended="handleAudioEnded(volumeItem)"
				@audio-paused="handleAudioEnded(volumeItem)"
				@audio-plays="handleAudioPlays"
				/>
			</div>
		</div>
	</div>
</template>
  
<script>
	import { mapState, mapMutations } from 'vuex'
	import { invoke } from '@tauri-apps/api/tauri'
	
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
			async fetchFileNames(path) {
				const result = await invoke('list_files', { args: { folder_path: path } });
				return result.map((fileName) => ({ name: fileName.replace(/\\/g, '/'), count: 0 }));
			},
			async generateRandomTandemFile(volumeItem) {
				const folderPath = volumeItem.path;
				const fileNames = await this.fetchFileNames(folderPath);
				if (fileNames.length > 0) {
					const randomIndex = Math.floor(Math.random() * fileNames.length);
					volumeItem.randomTandemFile = fileNames[randomIndex].name;
			
					fileNames[randomIndex].count += 1;
				} else {
					volumeItem.randomTandemFile = 'Ничего нет.';
				}
			},
			handleAudioEnded(volumeItem) {
					this.generateRandomTandemFile(volumeItem);
					this.$store.commit('toggleMusic');
			},
			handleAudioPlays() {
				this.$store.commit('toggleMusic');
			},
		},
		
		data() {
			return {
				volumeItems: [
					{
						name: 'commonVolume',
						type: 'common',
						label: 'Общая громкость',
						path: '../game/audio/test',
						randomTandemFile: '',
					},
					{
						name: 'musicVolume',
						type: 'music',
						label: 'Музыка',
						path: '../game/audio/test/music',
						dot: false,
						randomTandemFile: '',
					},
					{
						name: 'soundVolume',
						type: 'sound',
						label: 'Звуки',
						path: '../game/audio/test/sound',
						randomTandemFile: '',
					},
					{
						name: 'voiceVolume',
						type: 'voice',
						label: 'Голоса',
						path: '../game/audio/test/voice',
						randomTandemFile: '',
					},
				],
			};
		},
		async mounted() {
			for (const volumeItem of this.volumeItems) {
				await this.generateRandomTandemFile(volumeItem);
				this.$watch(
					() => volumeItem.value,
					(newValue, oldValue) => {
						this.$store.commit('updateVolumeByName', { name: volumeItem.name, newValue });
					}
				);
				}
		},
		created() {
			this.volumeItems.forEach((item) => {
				item.value = this.soundSettings[item.name];
			});
		},
	};
</script>
  