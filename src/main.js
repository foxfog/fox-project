import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './translations'
import uiCompontents from './components/UI'

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// Add SVG Cor
import { library } from "@fortawesome/fontawesome-svg-core";
// Free Icons Styles
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far, fab);

import '../game/UI/fonts/fonts.css'

const app = createApp(App)

uiCompontents.forEach(uiComponent => {
	app.component(uiComponent.name, uiComponent)
})

app.use(i18n)
app.use(router)
.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')