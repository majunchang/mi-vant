import Vue from 'vue'
import Router from 'vue-router'
import App from '@/preview/App';
import testMd from '../../docs/test.md'
import demo from '../../docs/demo.md'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      component: r => require.ensure([], () => r(require('../../docs/demo.md')))
    },
    {
      path: '/test',
      name: 'testMd',
      component: testMd
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})
