import Vue from 'vue'
import App from './App'
import router from './router'
import { Modal, Button } from './components'
// import miVant from './components'

Vue.config.productionTip = false

Vue.use(Modal)
Vue.use(Button)
// Vue.use(miVant)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
