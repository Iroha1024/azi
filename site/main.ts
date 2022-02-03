import { createApp } from 'vue'

import '@icon-park/vue-next/styles/index.css'
import 'azi/css/index.css'

import router from './router'

import App from './App.vue'

createApp(App).use(router).mount('#app')
