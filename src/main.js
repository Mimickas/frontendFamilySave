import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'flag-icons/css/flag-icons.min.css'
import '@lottiefiles/dotlottie-wc'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faUser, faHouse, faWallet,faMoneyCheck, faMoon, faSun, faArrowDown, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faHouse, faWallet, faMoneyCheck, faMoon, faSun, faArrowDown, faArrowLeft);

const app = createApp(App)

app.use(router) 

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')