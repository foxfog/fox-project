import { createStore } from "vuex";
import settings from "../../game/settings.json"

export default createStore({
	state: {
		isMusicPlaying: true,
		soundSettings: {
			commonVolume: settings.audio.commonVolume,
			musicVolume: settings.audio.musicVolume,
			soundVolume: settings.audio.soundVolume,
			voiceVolume: settings.audio.voiceVolume,
		},
	},
	mutations: {
		toggleMusic(state) {
			state.isMusicPlaying = !state.isMusicPlaying;
		},
		updateVolumeByName(state, { name, newValue }) {
			state.soundSettings[name] = newValue;
		},
	},
});