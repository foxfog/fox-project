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
	getters: {
		commonVolume(state) {
			return state.soundSettings.commonVolume / 100;
		},
		getVolume(state) {
			return (name) => {
				const commonVolume = state.soundSettings.commonVolume / 100;
				const volume = state.soundSettings[name] / 100;
				return (commonVolume * volume).toFixed(2);
			};
		},
		musicVolume: (state, getters) => getters.getVolume('musicVolume'),
		soundVolume: (state, getters) => getters.getVolume('soundVolume'),
		voiceVolume: (state, getters) => getters.getVolume('voiceVolume'),
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