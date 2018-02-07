import Vue from 'vue'
import App from './App.vue'

import lib from './lib'
Vue.use(lib)
console.log('main.js')
new Vue({
  el: '#app',
  render: h => h(App)
}).$mount('#app')
