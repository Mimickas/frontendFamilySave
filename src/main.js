import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faUser, faHouse, faWallet,faMoneyCheck, faMoon, faSun, faArrowDown } from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faHouse, faWallet, faMoneyCheck, faMoon, faSun, faArrowDown);

const app = createApp(App)

app.use(router) 

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')