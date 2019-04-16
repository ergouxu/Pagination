import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/views/dashboard'
import Graph from '@/views/Graph/graph'
import weatherMain from '@/views/weather/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/',
      name: 'weather',
      component: weatherMain,
    },
    {
      path: '/graph',
      name: 'article',
      component: Graph,
    },
    // {
    //   path: '/',
    //   name: 'Container',
    //   component: Container,
    //   children: [
    //     {path: 'dashboard', name: '首页', component: Dashboard, },
    //     {path: 'article', name: '文章', component: Article, },
    //   ]
    // },
  ]
})
