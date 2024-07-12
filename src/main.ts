import './assets/main.scss'

import { App, createApp } from 'vue'
import { createPinia } from 'pinia'

import AppComponent from '@/App.vue'
import router from './router'

const app : App<Element> = createApp(AppComponent)

app.use(createPinia())
app.use(router)

app.mount('#app')
