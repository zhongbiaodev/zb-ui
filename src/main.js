import Vue from 'vue'
import App from './App.vue'
import router from './route'

import lib from './lib'
Vue.use(lib)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
