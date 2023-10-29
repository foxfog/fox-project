<template>
	<div class="ui-audioplayer">
		<div class="ui-audioplayer-body">
			<button class="ui-audioplayer-playbtn" @click="togglePlay">
				<template v-if="isPlaying">
					<font-awesome-icon :icon="['fas', 'pause']" />
				</template>
				<template v-else>
					<font-awesome-icon :icon="['fas', 'play']" />
				</template>
			</button>
			<div v-if="audioLook == 1" class="ui-audioplayer-left">
				<div class="ui-audioplayer-top">
					<div class="ui-audioplayer-timeline">
						<input type="range" class="ui-range" :max="audioDuration" v-model="currentTime" @input="seekToTime" />
					</div>
				</div>
				<div class="ui-audioplayer-bot">
					<div class="ui-audioplayer-time">
						<div>{{ formattedTime }}</div>/<div>{{ formattedEndTime }}</div>
					</div>
					<div class="ui-audioplayer-volume">
						<input type="range" class="ui-range" :max="1" step="0.01" v-model="volume" @input="changeVolume" />
					</div>
				</div>
			</div>
		</div>
		<audio ref="audioPlayer" :src="audioPath" :autoplay="autoplay" :audioType="audioType" @ended="handleAudioEnded" @timeupdate="handleTimeUpdate" @volumechange="handleVolumeChange"></audio>
	</div>
</template>
  
<script>
	import { mapGetters } from "vuex";

	export default {
		name: 'ui-player-audio',
		props: {
			audioPath: {
				type: String,
				default: ''
			},
			audioType: {
				type: String,
				default: 'common',
			},
			autoplay: {
				type: Boolean,
				default: false,
			},
			audioLook: {
				type: Number,
				default: 1,
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
			...mapGetters(["commonVolume", "musicVolume", "soundVolume", "voiceVolume"]),
			audioVolume() {
				if (this.audioLook === 1) {
					return this.volume;
				} else {
					return this.getVolumeByType(this.audioType);
				}
			},
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
					this.$emit("audio-paused");
				} else {
					audioPlayer.play();
					this.$emit("audio-plays");
				}
				this.isPlaying = !this.isPlaying;
			},
			handleAudioEnded() {
				this.isPlaying = false;
				this.$emit("audio-ended");
			},
			handleTimeUpdate() {
				this.currentTime = this.$refs.audioPlayer.currentTime;
			},
			seekToTime() {
				this.$refs.audioPlayer.currentTime = this.currentTime;
			},
			getVolumeByType(type) {
				switch (type) {
					case "common": return this.commonVolume;
					case "music": return this.musicVolume;
					case "sound": return this.soundVolume;
					case "voice": return this.voiceVolume;
					default: return 1;
				}
			},
			setInitialVolume() {
				const audioPlayer = this.$refs.audioPlayer;
				audioPlayer.volume = this.audioVolume;
			},

			handleVolumeChange() {
				const audioPlayer = this.$refs.audioPlayer;
				audioPlayer.volume = this.audioVolume;
			},
		},
		mounted() {
			this.$refs.audioPlayer.addEventListener('durationchange', () => {
				if (!this.durationObtained) {
					this.audioDuration = this.$refs.audioPlayer.duration;
					this.durationObtained = true;
				}
			});
			this.setInitialVolume(); 
			this.$watch(() => this.audioVolume, () => { 
				this.handleVolumeChange();
			});
		},
	};
</script>