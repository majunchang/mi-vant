import Vue from 'vue'
import Router from 'vue-router'
import App from '@/preview/App';
import quickStart from '../../docs/quickStart.md'
import customTheme from '../../docs/customTheme.md'
import testMd from '../../docs/test.md'
import demo from '../../docs/demo.md'
import Modal from '../../docs/modal.md'
import Button from '../../docs/button.md'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/quickStart',
      name: 'quickStart',
      component: quickStart
    },
    {
      path: '/demo',
      name: 'demo',
      component: r => require.ensure([], () => r(require('../../docs/demo.md')))
    },
    {
      path: '/',
      name: 'quickStart',
      component: quickStart,
      // component: r => require.ensure([], () => r(require('../../docs/demo.md')))
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
      path: '/customTheme',
      name: 'customTheme',
      component: customTheme
    }
  ]
})
