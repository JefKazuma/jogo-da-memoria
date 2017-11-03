import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Jogo from '@/components/Jogo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home/:erro',
      name: 'HomeErro',
      props: true,
      component: Home
    },
    {
      path: '/jogo',
      name: 'Jogo',
      component: Jogo
    }
  ]
})
