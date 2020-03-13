import axios from 'axios'
import Vue from 'vue' //为了从vue里引入vux
import VueRouter from 'vue-router'
/* eslint-disable*/
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code != '200') {
      Vue.$vux.toast.show({
        text: res.message,
        type:'text'
      })
      // 401:未登录;
      if (res.code == '401' || res.code == '403') {
       Vue.$vux.confirm.show({
        content:'你已被登出，可以取消继续留在该页面，或者重新登录',
        confirmText:'重新登录',
        cancelText:'取消',
        onConfirm () {
       VueRouter.replace({
          path:'/weixinlogin'
       })
        },
         onCancel () {
          VueRouter.replace({
          path:'/home'
          })
           },
       })

      }
      return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Vue.$vux.toast.show({
      text:res.message,
      type:'warn'
    })
    return Promise.reject(error)
  }
)

export default service
