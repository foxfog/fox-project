<template>
	<div class="ui-audioplayer">
		<div class="ui-audioplayer-body">
			<button @click="togglePlay">{{ isPlaying ? '||' : '>' }}</button>
			<div class="ui-audioplayer-time">
				<div>{{ formattedTime }}</div>/<div>{{ formattedEndTime }}</div>
			</div>
			<div class="ui-audioplayer-timeline">
				<input type="range" :max="audioDuration" v-model="currentTime" @input="seekToTime" />
			</div>
			<div class="ui-audioplayer-volume">
				<input type="range" :max="1" step="0.01" v-model="volume" @input="changeVolume" />
			</div>
		</div>
		<audio ref="audioPlayer" :src="audioPath" :autoplay="autoplay" :audioType="audioType" @ended="handleAudioEnded" @timeupdate="handleTimeUpdate"></audio>
	</div>
</template>
  
<script>
	export default {
		name: 'ui-player-audio',
		props: {
			audioPath: {
				type: String,
				default: ''
			},
			audioType: {
				type: String,
				default: 'sound',
			},
			autoplay: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				isPlaying: false,
				currentTime: 0,
				audioDuration: 0,
				durationObtained: false,
				volume: 1,
			};
		},
		computed: {
			formattedTime() {
				const minutes = Math.floor(this.currentTime / 60);
				const seconds = Math.floor(this.currentTime % 60);
				return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
			},
			formattedEndTime() {
				const endMinutes = Math.floor(this.audioDuration / 60);
				const endSeconds = Math.floor(this.audioDuration % 60);
				return `${endMinutes}:${endSeconds < 10 ? '0' : ''}${endSeconds}`;
			},
		},
		methods: {
			togglePlay() {
			const audioPlayer = this.$refs.audioPlayer;
			if (this.isPlaying) {
				audioPlayer.pause();
			} else {
				audioPlayer.play();
			}
				this.isPlaying = !this.isPlaying;
			},
			handleAudioEnded() {
				this.isPlaying = false;
			},
			handleTimeUpdate() {
				this.currentTime = this.$refs.audioPlayer.currentTime;
			},
			seekToTime() {
				this.$refs.audioPlayer.currentTime = this.currentTime;
			},
			changeVolume() {
				this.$refs.audioPlayer.volume = this.volume;
			},
		},
		mounted() {
			this.$refs.audioPlayer.addEventListener('durationchange', () => {
				if (!this.durationObtained) {
					this.audioDuration = this.$refs.audioPlayer.duration;
					this.durationObtained = true;
				}
			});
		},
	};
</script>
<style lang="scss" scoped>
.ui-audioplayer-body {
	display: flex;
}
.ui-audioplayer-time {
	display: flex;
	column-gap: 0.5em;
}
.ui-audioplayer-timeline {
	width: 300px;
	input {
		width: 100%;
	}
}
.ui-audioplayer-volume {
	width: 70px;
	input {
		width: 100%;
	}
}
</style>