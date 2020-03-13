 
import Vue from 'vue'
import App from './App'
import {Tabbar, TabbarItem, ConfirmPlugin,ToastPlugin} from 'vux' 
// import '@/style/index.scss'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
//import wx from 'weixin-js-sdk' 
import {Icon, InputNumber,Input,Badge,Menu,MenuItem,Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import VueScroller from 'vue-scroller'
//import 'lib-flexible'

Vue.use(VueScroller)
router.beforeEach((to, from, next) => {
  window.scroll(0, 0)
  next()
})

Vue.use(VueRouter)
Vue.use(InputNumber)
Vue.use(Icon)
Vue.use(Input)
//Vue.use(wx)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabbarItem.name, TabbarItem)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(Badge)
Vue.use(Menu)
Vue.use(MenuItem)
/* const router = new VueRouter({
  routes
}) */

// FastClick.attach(document.body)
Vue.prototype.$message = Message;
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  filters: {
    formatDate: function (val) {
      var value = new Date(val)
      var year = value.getFullYear()
      var month = padDate(value.getMonth() + 1)
      var day = padDate(value.getDate())
      var hour = padDate(value.getHours())
      var minutes = padDate(value.getMinutes())
      var seconds = padDate(value.getSeconds())
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    }
  },
  render: h => h(App)
}).$mount('#app-box')
