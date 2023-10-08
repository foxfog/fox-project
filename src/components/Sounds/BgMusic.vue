<template>
	<audio ref="audioPlayer" id="bgmusic" autoplay loop>
	  <source :src="backgroundMusic" type="audio/ogg">
	</audio>
	{{ $store.getters.musicVolume }}
  </template>
  
  <script>
  import { mapState, mapMutations, mapGetters } from "vuex";
  import backgroundMusic from "../../../game/audio/music/Called_Upon.ogg";
  
  export default {
	data() {
	  return {
		backgroundMusic: backgroundMusic,
		volumeInterval: null,
	  };
	},
	computed: {
	  ...mapState(["isMusicPlaying"]),
	  ...mapGetters(["musicVolume"]),
	},
	watch: {
	  isMusicPlaying(newValue) {
		if (newValue) {
		  this.playMusicWithFadeIn();
		} else {
		  this.pauseMusicWithFadeOut();
		}
	  },
	  musicVolume(newmusicVolume) {
		this.$refs.audioPlayer.volume = newmusicVolume;
	  },
	},
	mounted() {
	  this.$refs.audioPlayer.volume = this.musicVolume;
	  this.$refs.audioPlayer.addEventListener("ended", () => {
		if (this.isMusicPlaying) {
		  this.playMusicWithFadeIn();
		}
	  });
	},
	methods: {
	  ...mapMutations(["toggleMusic"]),
	  playMusicWithFadeIn() {
		clearInterval(this.volumeInterval);
		this.$refs.audioPlayer.volume = 0;
		this.$refs.audioPlayer.play();
  
		this.volumeInterval = setInterval(() => {
		  if (this.$refs.audioPlayer.volume < this.musicVolume) {
			this.$refs.audioPlayer.volume += 0.01;
		  } else {
			clearInterval(this.volumeInterval);
		  }
		}, 25);
	  },
	  pauseMusicWithFadeOut() {
		clearInterval(this.volumeInterval);
  
		this.volumeInterval = setInterval(() => {
		  if (this.$refs.audioPlayer.volume > 0.01) {
			this.$refs.audioPlayer.volume -= 0.01;
		  } else {
			clearInterval(this.volumeInterval);
			this.$refs.audioPlayer.pause();
		  }
		}, 25);
	  },
	},
  };
  </script>
  