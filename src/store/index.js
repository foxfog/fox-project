import { createStore } from "vuex";

export default createStore({
	state: {
	  isMusicPlaying: true, // Флаг для управления музыкой
	},
	mutations: {
	  toggleMusic(state) {
		state.isMusicPlaying = !state.isMusicPlaying;
	  },
	},
  });