import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia';

// 实例化 pinia 容器
const pinia = createPinia();

createApp(App)
.use(pinia)
.mount('#app')
