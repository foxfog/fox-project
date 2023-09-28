<template>
	<audio ref="audioPlayer" id="bgmusic" autoplay loop volume="0.3">
	  <source :src="backgroundMusic" type="audio/ogg">
	</audio>
  </template>
  
  <script>
  import { mapState, mapMutations } from "vuex";
  import backgroundMusic from "../../game/audio/music/Called_Upon.ogg";
  
  export default {
	data() {
	  return {
		backgroundMusic: backgroundMusic,
		volumeInterval: null,
	  };
	},
	computed: {
	  ...mapState(["isMusicPlaying"]),
	},
	watch: {
	  isMusicPlaying(newValue) {
		if (newValue) {
		  this.playMusicWithFadeIn();
		} else {
		  this.pauseMusicWithFadeOut();
		}
	  },
	},
	mounted() {
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
		  if (this.$refs.audioPlayer.volume < 0.3) {
			this.$refs.audioPlayer.volume += 0.01;
		  } else {
			clearInterval(this.volumeInterval);
		  }
		}, 50);
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
		}, 50);
	  },
	},
  };
  </script>