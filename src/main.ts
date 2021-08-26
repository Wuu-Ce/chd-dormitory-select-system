import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index'
import 'element-plus/dist/index.css'

const Vue = createApp(App)
Vue.use(store)
Vue.use(router)
Vue.use(ElementPlus)
Vue.mount('#app')
