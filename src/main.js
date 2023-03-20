import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './base.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { post, fetch, patch, put, jsonPost } from './api/http'
import API from './api/API'
const api = new API()
Vue.prototype.$api = api
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$jsonPost = jsonPost
Vue.prototype.$get = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
