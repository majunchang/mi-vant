import Vue from 'vue'
import App from './App'
import router from '../router'
import demoBlock from './demo-block.vue';
import miVant from '../components'


Vue.component('demo-block', demoBlock);
Vue.config.productionTip = false
Vue.use(miVant)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
