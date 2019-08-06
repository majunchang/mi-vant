import Vue from 'vue'
import App from './App'
import router from './router'
import { Modal, Button } from './components'
import Vue from 'vue'
import { Button } from 'vant'


Vue.use(Modal)
Vue.config.productionTip = false

Vue.use(Modal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
