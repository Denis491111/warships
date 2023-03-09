import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import vClickOutside from "click-outside-vue3";
import i18n from "@/i18n";

createApp(App).use(store).use(i18n).use(vClickOutside).use(router).mount('#app')
