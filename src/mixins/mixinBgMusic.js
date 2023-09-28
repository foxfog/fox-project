import { mapMutations, mapState } from "vuex";

export const mixinBgMusic = {
  props: {
    enableMusic: {
      type: Boolean,
      default: true, // По умолчанию включаем музыку
    },
  },
  computed: {
    ...mapState(["isMusicPlaying"]),
  },
  created() {
    this.toggleBackgroundMusic();
  },
  methods: {
    ...mapMutations(["toggleMusic"]),
    toggleBackgroundMusic() {
      if (this.enableMusic) {
        if (!this.isMusicPlaying) {
          this.toggleMusic();
        }
      } else {
        if (this.isMusicPlaying) {
          this.toggleMusic();
        }
      }
    },
  },
};