import { createI18n } from "vue-i18n"
import pluralRules from "./rules/pluralization"
import datetimeFormats from "./rules/datetime"
import settings from "../../game/settings.json";
import en from "../../game/translations/locales/en.json"
import ru from "../../game/translations/locales/ru.json"

const initialLocale = settings.general.language;

export default createI18n({
	legacy: false,
	locale: initialLocale,
	fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
	globalInjection: true,
	messages: {en, ru},
	pluralRules,
	datetimeFormats
})