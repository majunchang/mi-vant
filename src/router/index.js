import Vue from 'vue'
import Router from 'vue-router'
import App from '@/preview/App';
import testMd from '../../docs/test.md'
import demo from '../../docs/demo.md'
import Modal from '../../docs/modal.md'
import Button from '../../docs/button.md'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      component: r => require.ensure([], () => r(require('../../docs/demo.md')))
    },
    {
      path: '/Modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/Button',
      name: 'Button',
      component: Button
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})
