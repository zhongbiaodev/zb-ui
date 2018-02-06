import Vue from 'vue'
import App from './App.vue'

import lib from './lib'
Vue.use(lib)
new Vue({
  el: '#app',
  render: h => h(App)
})
