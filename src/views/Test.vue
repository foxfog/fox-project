<template>
	<div class="mainpage">
		<div class="mainpage-content">
			<div v-if="fileNames.length > 0" style="display: flex;">
				<ul>
					<li><h2>Весь список:</h2></li>
					<li v-for="file in fileNames" :key="file.name">
						{{ file.name }} ({{ file.count }})
					</li>
				</ul>
				<div>
					<h2>Рандомный:</h2>
					<p>{{ randomTandemFile }}</p>
					<button @click="generateRandomTandemFile">Генерируй</button>
					<ui-player-audio :audio-path="randomTandemFile" :audioType="'common'" :audioLook="2" @audio-ended="handleAudioEnded" />
				</div>
			</div>
			<div v-else>
				Ничего нет
			</div>
		</div>
		<MainMenu />
	</div>
</template>
  
<script>
	import MainMenu from '@/components/MainMenu.vue'
	import { invoke } from '@tauri-apps/api/tauri'
	
	export default {
		components: {
			MainMenu,
		},
		data() {
			return {
				folderPath: '../game/audio/test/voice',
				fileNames: [],
				randomTandemFile: '',
			}
		},
		mounted() {
			this.fetchFileNames()
			.then(() => {
				this.generateRandomTandemFile();
			})
			.catch((error) => {
				console.error('Ошибка:', error);
			});
		},
		methods: {
			async fetchFileNames() {
				const result = await invoke('list_files', { args: { folder_path: this.folderPath } });
				this.fileNames = result.map((fileName) => ({ name: fileName.replace(/\\/g, '/'), count: 0 }));
			},
			generateRandomTandemFile() {
				if (this.fileNames.length > 0) {
				const randomIndex = Math.floor(Math.random() * this.fileNames.length);
				this.randomTandemFile = this.fileNames[randomIndex].name;
		
				this.fileNames[randomIndex].count += 1;
				} else {
					this.randomTandemFile = 'Ничего нет.';
				}
			},
			handleAudioEnded() {
				this.generateRandomTandemFile();
			},
		},
	};
</script>
  