import Vue from 'vue'
import App from './App'
import router from './router'
// import demoBlock from './preview/demo-block.vue';


// Vue.component('demo-block', demoBlock);
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
