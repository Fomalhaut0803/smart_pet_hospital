import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    meta: {
      name: '登录页面'
    },
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      name: '首页'
    },
    component: () => import('../views/home/HomeView.vue')
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
      },
      {
        path: '/userIndex/myPet',
        name: 'MyPet',
        meta: {
          name: '我的宠物'
        },
        component: () => import('../views/pet/MyPet.vue')
      },
      {
        path: '/userIndex/userCases',
        name: 'userCases',
        component: () => import('../views/userSide/UserCases.vue')
      },
      {
        path: '/doctor',
        name: 'patientList',
        meta: {
          name: '病人列表'
        },
        component: () => import('../views/doctor/PatientList.vue')
      }
    ]
  },
  {
    path: '/petDetail',
    name: 'PetDetail',
    meta: {
      name: '宠物详情'
    },
    component: () => import('../views/pet/PetDetail.vue')
  },
  {
    path: '/visit',
    name: 'Visit',
    meta: {
      name: '就诊页面'
    },
    component: () => import('../views/doctor/VisitView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
