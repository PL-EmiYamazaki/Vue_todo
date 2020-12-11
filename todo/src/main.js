import Vue from 'vue'
import App from './App.vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

Vue.config.productionTip = false

new Vue({
  localStorage: {
    taskKey: {
      type: Array
    }
  },
  render: h => h(App),
}).$mount('#app')
