import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/user/users.vue'
import Rights from '@/components/rights/rights.vue'
import Roles from '@/components/rights/roles.vue'
//import { component } from 'vue/types/umd'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: '',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        name: 'users',
        path: 'users',
        component: Users
      }, {
        name: 'rights',
        path: '/rights',
        component: Rights

      },
      {
        name: 'roles',
        path: '/roles',
        component: Roles

      }]
    },
  ]
})
