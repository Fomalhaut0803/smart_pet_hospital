import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',

    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      name: '登录页面'
    },
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/booking',
    name: 'booking',
    meta: {
      name: '左边导航栏'
    },
    component: () => import('../views/userSide/BookingDoctor.vue')
  },
  {
    path: '/userIndex',
    name: 'userIndex',
    meta: {
      name: '用户页面'
    },
    component: () => import('../views/userSide/UserLayoutView.vue'),
    redirect: '/userIndex/bookingDoctor',
    children: [
      {
        path: '/userIndex/bookingDoctor',
        name: 'bookingDoctor',
        component: () => import('../views/userSide/BookingDoctor.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
