import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/preview/helloworld';
import testMd from '../../docs/test.md'
import demo from '../../docs/demo.md'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
