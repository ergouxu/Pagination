import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import 'font-awesome/scss/font-awesome.scss'
import axios from 'axios'
import global from './components/common/Global.vue'
import apiLoader from './components/common/APILoader.vue'
import locale from 'element-ui/lib/locale/lang/ja'

Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.config.productionTip = false

/* AXIOS共通定義 */
axios.defaults.withCredentials = false
Vue.prototype.$axios = axios

/* 共通変数定義 */
Vue.prototype.Global = global
Vue.prototype.APILoader = apiLoader


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// router.beforeEach((to, from, next) => {
//   if(to.path === '/login'){
//     sessionStorage.removeItem('user');
//   }
//   var user = sessionStorage.getItem('user');
//   if(!user && to.path !== '/login'){
//     next({
//       path: '/login'
//     })
//   }else{
//     next();
//   }
// })