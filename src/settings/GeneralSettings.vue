<template>
	<div class="settings-item">
		<div class="settings-item__label">Язык:</div>
		<div class="settings-item__option">
			<ui-select :options="languageOptions" :selectedValue="locale" @option-selected="selectLocale">
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
</template>
  
<script setup>
	import { useI18n } from 'vue-i18n'
	import Tr from "../translations/translation"
	import languageNames from "../translations/languageNames"
	
	const { locale } = useI18n();
	const supportedLocales = Tr.supportedLocales;
	
	const selectLocale = (newLocale) => {
		Tr.switchLanguage(newLocale);
	};
	
	const languageOptions = supportedLocales.map(sLocale => ({
		value: sLocale,
		label: languageNames[sLocale],
	}));
</script>


<style lang="scss" scoped>
	
</style>
  