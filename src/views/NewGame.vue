<template>
	<div class="mainpage">
		<div class="mainpage-content creategame">
			<div class="character-card">
				<div class="character__portret">
					<div class="character__portret-size">
						<img class="character__portret-body" src="../../game/images/characters/avatar/body/default-empty.webp"/>
					</div>
				</div>
				<div class="character-card__stats scroll-y">
					<div class="ui-input-row">
						<div class="ui-input-box">
							<label class="ui-input-label">Имя</label>
							<input class="ui-input-text" type="text" required v-model="playerData.firstName"/>
						</div>
						<div class="ui-input-box">
							<label class="ui-input-label">Фамилия</label>
							<input class="ui-input-text" type="text" required v-model="playerData.lastName"/>
						</div>
					</div>
					<div class="ui-input-row">
						<div class="ui-input-box">
							<label class="ui-input-label">Аватар</label>
							<ui-select :options="avatarOptions" :selectedValue="playerData.avatar" @option-selected="avatarSelect">
								<template v-slot:option="{ selectOption, isSelected, options }">
									<div
										v-for="(option, index) in options"
										:key="index"
										@click="selectOption(option)"
										:class="{ 'ui-select-option': true, '__selected': isSelected(option) }"
									>
										{{ option.label }}
									</div>
								</template>
							</ui-select>
						</div>
						<div class="ui-input-box">
							<label class="ui-input-label">Раса</label>
							<ui-select :options="raceOptions" :selectedValue="playerData.race" @option-selected="raceSelect">
								<template v-slot:option="{ selectOption, isSelected, options }">
									<div
										v-for="(option, index) in options"
										:key="index"
										@click="selectOption(option)"
										:class="{ 'ui-select-option': true, '__selected': isSelected(option) }"
									>
										{{ option.label }}
									</div>
								</template>
							</ui-select>
						</div>
						<div class="ui-input-box">
							<label class="ui-input-label">Пол</label>
							<ui-select :options="genderOptions" :selectedValue="playerData.gender" @option-selected="genderSelect">
								<template v-slot:option="{ selectOption, isSelected, options }">
									<div
										v-for="(option, index) in options"
										:key="index"
										@click="selectOption(option)"
										:class="{ 'ui-select-option': true, '__selected': isSelected(option) }"
									>
										{{ option.label }}
									</div>
								</template>
							</ui-select>
						</div>
					</div>
					<div class="ui-input-row">
						<div class="ui-input-box">
							<label class="ui-input-label">Возраст</label>
							<ui-input-number v-model="playerData.age" :min="1" :max="50" />
						</div>
					</div>
					<div class="ui-input-row">
						<div class="ui-input-box">
							<label class="ui-input-label">Рост</label>
							<ui-input-number v-model="playerData.height" :min="120" :max="230" />
							<ui-range v-model="playerData.height" :min="120" :max="230" />
						</div>
						<div class="ui-input-box">
							<label class="ui-input-label">Вес</label>
							<ui-input-number v-model="playerData.weight" :min="35" :max="150" />
							<ui-range v-model="playerData.weight" :min="35" :max="150" />
						</div>
					</div>
					<div class="ui-input-row">
						Свободных очков: {{ playerData.freeStats }}
					</div>
					<div class="ui-input-row">
						<div class="ui-input-box">
							<label class="ui-input-label">Сила</label>
							<ui-input-number v-model="playerData.stats.strength" :min="1" :max="100" :increaseDis="isFreeStatsZero" />
						</div>
					</div>
					<div class="ui-input-row">
						<div class="ui-input-box">
							<label class="ui-input-label">Ловкость</label>
							<ui-input-number v-model="playerData.stats.agility" :min="1" :max="100" :increaseDis="isFreeStatsZero" />
						</div>
					</div>
					<div class="ui-input-row">
						<div class="ui-input-box">
							<label class="ui-input-label">Интелект</label>
							<ui-input-number v-model="playerData.stats.intelligence" :min="1" :max="100" :increaseDis="isFreeStatsZero" />
						</div>
					</div>
					<div class="ui-input-row">
						<div class="ui-input-box">
							<label class="ui-input-label">Выностливость</label>
							<ui-input-number v-model="playerData.stats.endurance" :min="1" :max="100" :increaseDis="isFreeStatsZero" />
						</div>
					</div>
					<div class="ui-input-row">
						<div class="ui-input-box">
							<label class="ui-input-label">Харизма</label>
							<ui-input-number v-model="playerData.stats.charisma" :min="1" :max="100" :increaseDis="isFreeStatsZero" />
						</div>
					</div>
				</div>
			</div>
			<div class="mainpage-bottombar">
				<a class="mainpage-bottombar_btn" href="/">Назад в главное меню</a>
				<button class="mainpage-bottombar_btn ml-a" :disabled="startButtonDisabled" @click="startGame">Старт</button>
			</div>
		</div>
	</div>
</template>
  
<script>
	import { mixinBgMusic } from "@/mixins/mixinBgMusic";
	import playerData from "../../game/data/characters/player/characterData.json";
	import { invoke } from '@tauri-apps/api/tauri';
	
	export default {
		components: {
		},
		mixins: [mixinBgMusic],
		props: {
			enableMusic: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				folderPath: '../game/saves',
				folderNames: [],

				avatarOptions: [
					{
						value: 'noname',
						label: 'Чужак'
					},
					{
						value: 'old',
						label: 'Старичек'
					},
					{
						value: 'yang',
						label: 'Новичек'
					},
				],

				raceOptions: [
					{
						value: 'human',
						label: 'Человек'
					},
					{
						value: 'elf',
						label: 'Эльф'
					},
					{
						value: 'orc',
						label: 'Орк'
					},
				],

				genderOptions: [
					{
						value: 'man',
						label: 'мужской'
					},
					{
						value: 'woman',
						label: 'женский'
					},
				],

				playerData: {
					firstName: '',
					lastName: '',
					avatar: playerData.avatar,
					race: playerData.race,
					gender: playerData.gender,
					age: playerData.age,
					height: playerData.height,
					weight: playerData.weight,
					freeStats: playerData.freeStats,
					stats: {
						strength: playerData.stats.strength,
						agility: playerData.stats.agility,
						intelligence: playerData.stats.intelligence,
						endurance: playerData.stats.endurance,
						charisma: playerData.stats.charisma,
					}
				},
			};
		},
		methods: {
			avatarSelect(newAvatar) {
				this.playerData.avatar = newAvatar;
			},
			raceSelect(newRace) {
				this.playerData.race = newRace;
			},
			genderSelect(newGender) {
				this.playerData.gender = newGender;
			},
			watchStat(statName, newValue, oldValue) {
				const diff = newValue - oldValue;
				this.playerData.freeStats -= diff;
				console.log(`Новое значение ${statName}:`, newValue);
			},
			isInputsValid() {
				return this.playerData.firstName.trim() !== "" && this.playerData.lastName.trim() !== "";
			},
			async startGame() {
				try {
					const result = await invoke('list_folders', { args: { folder_path: this.folderPath } });
					this.folderNames = result;
					console.log("Folder Names:", this.folderNames);

					const folderNumbers = this.folderNames
						.filter(folderName => /^profile_\d+$/.test(folderName))
						.map(folderName => parseInt(folderName.replace('profile_', ''), 10));

					const maxNumber = Math.max(...folderNumbers, 0);

					const nextProfileName = `profile_${maxNumber + 1}`;
					console.log("New folder:", nextProfileName);

					await invoke('create_folder', { args: { folder_path: this.folderPath, folder_name: nextProfileName } });

					const now = new Date();
					const year = now.getFullYear();
					const month = String(now.getMonth() + 1).padStart(2, '0');
					const day = String(now.getDate()).padStart(2, '0');
					const hours = String(now.getHours()).padStart(2, '0');
					const minutes = String(now.getMinutes()).padStart(2, '0');
					const seconds = String(now.getSeconds()).padStart(2, '0');
					const timestamp = `save_0-${year}${month}${day}-${hours}${minutes}${seconds}.json`;

					const fileInfo = {
						saveTime: now.getTime(),
					}

					await invoke('create_save_file', { args: { folder_path: this.folderPath, folder_name: nextProfileName, file_name: timestamp, file_info: fileInfo, stats_data: this.playerData } });

					this.$router.push({ name: 'game' });

				} catch (error) {
					console.error("Error fetching folder names:", error);
				}
			},
		},
		created() {
			for (const statName in this.playerData.stats) {
				if (this.playerData.stats.hasOwnProperty(statName)) {
					this.$watch(
						() => this.playerData.stats[statName],
						(newValue, oldValue) => {
						this.watchStat(statName, newValue, oldValue);
						}
					);
				}
			}
		},
		computed: {
			isFreeStatsZero() {
				return this.playerData.freeStats === 0;
			},
			startButtonDisabled() {
				return this.playerData.freeStats !== 0 || !this.isInputsValid();
			}
		}
	};
</script>