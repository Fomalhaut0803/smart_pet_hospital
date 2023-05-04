import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      name: '首页'
    },
    component: () => import('../views/home/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Home',
    meta: {
      name: '首页'
    },
    component: () => import('@/views/login/LoginView.vue')
  },
  // 用户端
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
        path: '/userIndex/Recommend',
        name: 'Recommend',
        meta: {
          name: '推荐'
        },
        component: () => import('../views/userSide/Recommend.vue')
      },
      {
        path: '/userIndex/bookingDoctor',
        name: 'bookingDoctor',
        meta: {
          name: '预约看病'
        },
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
        meta: {
          name: '宠物病历'
        },
        component: () => import('../views/userSide/UserCases.vue')
      },
      {
        path: '/userIndex/userAdopt',
        name: 'userAdopt',
        meta: {
          name: '领养宠物'
        },
        component: () => import('../views/userSide/UserAdopt.vue')
      },
      {
        path: '/userIndex/userAdoptRecord',
        name: 'userAdoptRecord',
        meta: {
          name: '领养宠物'
        },
        component: () => import('../views/userSide/UserAdoptRecord.vue')
      },
      {
        path: '/userIndex/userSupplies',
        name: 'userSupplies',
        meta: {
          name: '购买宠物用品'
        },
        component: () => import('../views/userSide/UserSupplies.vue')
      },
      {
        path: '/userIndex/userOrders',
        name: 'userOrders',
        meta: {
          name: '购买记录'
        },
        component: () => import('../views/userSide/UserOrders.vue')
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
  // 医生端
  {
    path: '/doctorIndex',
    name: 'doctorIndex',
    meta: {
      name: '就诊页面'
    },
    component: () => import('../views/doctor/DoctorLayout.vue'),
    redirect: '/doctorIndex/patientList',
    children: [
      {
        path: '/doctorIndex/visit',
        name: 'Visit',
        meta: {
          name: '预约列表'
        },
        component: () => import('../views/doctor/VisitView.vue')
      },
      {
        path: '/doctorIndex/patientList',
        name: 'patientList',
        meta: {
          name: '病例详情'
        },
        component: () => import('../views/doctor/PatientList.vue')
      },
      {
        path: '/doctorIndex/Appointments',
        name: 'Appointments',
        meta: {
          name: '手术预约'
        },
        component: () => import('../views/doctor/Appointments.vue')
      },
      {
        path: '/doctorIndex/Surgery',
        name: 'Surgery',
        meta: {
          name: '预约记录'
        },
        component: () => import('../views/doctor/Surgery.vue')
      }
    ]
  },
  // 管理员端
  {
    path: '/manageIndex',
    name: 'manageIndex',
    meta: {
      name: '管理页面'
    },
    component: () => import('../views/manageSide/ManageLayout.vue'),
    redirect: '/manageIndex/ManageHome',
    children: [
      {
        path: '/manageIndex/ManageHome',
        name: 'ManageHome',
        meta: {
          name: '首页'
        },
        component: () => import('../views/manageSide/ManageHome.vue')
      },
      {
        path: '/manageIndex/adopt',
        name: 'adopt',
        meta: {
          name: '领养'
        },
        component: () => import('../views/manageSide/AdoptView.vue')
      },
      {
        path: '/manageIndex/adRecord',
        name: 'adRecord',
        meta: {
          name: '领养记录'
        },
        component: () => import('../views/manageSide/AdoptRecord.vue')
      },
      {
        path: '/manageIndex/SuppliesView',
        name: 'SuppliesView',
        meta: {
          name: '商品表'
        },
        component: () => import('../views/manageSide/SuppliesView.vue')
      },
      {
        path: '/manageIndex/orders',
        name: 'orders',
        meta: {
          name: '购买表'
        },
        component: () => import('../views/manageSide/OrdersView.vue')
      },
      {
        path: '/manageIndex/PurchaseView',
        name: 'PurchaseView',
        meta: {
          name: '进货表'
        },
        component: () => import('../views/manageSide/PurchaseView.vue')
      },
      {
        path: '/manageIndex/MedicineView',
        name: 'MedicineView',
        meta: {
          name: '药品表'
        },
        component: () => import('../views/manageSide/MedicineView.vue')
      },
      {
        path: '/manageIndex/VendorView',
        name: 'VendorView',
        meta: {
          name: '进货商'
        },
        component: () => import('../views/manageSide/VendorView.vue')
      },
      {
        path: '/manageIndex/UserManage',
        name: 'UserManage',
        meta: {
          name: '用户管理'
        },
        component: () => import('../views/manageSide/UserManage.vue')
      },
      {
        path: '/manageIndex/DoctorManage',
        name: 'DoctorManage',
        meta: {
          name: '医生管理'
        },
        component: () => import('../views/manageSide/DoctorManage.vue')
      },
      {
        path: '/manageIndex/cases',
        name: 'cases',
        meta: {
          name: '病历'
        },
        component: () => import('../views/manageSide/CasesView.vue')
      },
      {
        path: '/manageIndex/operating',
        name: 'operating',
        meta: {
          name: '手术室'
        },
        component: () => import('../views/manageSide/OperatingView.vue')
      },
      {
        path: '/manageIndex/surgery',
        name: 'surgery',
        meta: {
          name: '手术记录'
        },
        component: () => import('../views/manageSide/SurgeryView.vue')
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
