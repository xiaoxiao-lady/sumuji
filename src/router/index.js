import Vue from 'vue'
import Router from 'vue-router'
/* eslint-disable*/

import Firest_index from '@/components/Firest_index'
//  import searchfor from '@/components/home/demo1/searchfor'
const searchfor=resolve => require(["@/components/home/demo1/searchfor"], resolve);
//import assess from '@/components/mine/myorder/assess'
const assess=resolve=>require(["@/components/mine/myorder/assess"],resolve);
//import coupon from '@/components/mine/coupons/coupon'
const coupon=resolve=>require(["@/components/mine/coupons/coupon"],resolve);
//import myOrder from '@/components/mine/myorder/myOrder'
const myOrder=resolve=>require(["@/components/mine/myorder/myOrder"],resolve);
//import orderhome from '@/components/mine/orderhome'
const orderhome=resolve=>require(["@/components/mine/orderhome"],resolve);
//import blank from '@/components/home/blank'
const blank=resolve=>require(["@/components/home/blank"],resolve);
// import pindetial from '@/components/home/pingtuan/pindetial'
const pindetial=resolve=>require(["@/components/home/pingtuan/pindetial"],resolve);
// import orderdetial from '@/components/mine/myorder/orderdetial'
const orderdetial=resolve=>require(["@/components/mine/myorder/orderdetial"],resolve);
// import groupon from '@/components/home/pingtuan/groupon'
const groupon=resolve=>require(["@/components/home/pingtuan/groupon"],resolve);
// import seckill from '@/components/home/qiangou/seckill'
const seckill=resolve=>require(["@/components/home/qiangou/seckill"],resolve);
// import personalData from '@/components/mine/personal/personalData'
const personalData=resolve=>require(["@/components/mine/personal/personalData"],resolve);
// import pintuangoods from '@/components/home/pingtuan/pintuangoods'
const pintuangoods=resolve=>require(["@/components/home/pingtuan/pintuangoods"],resolve);
// import massage from '@/components/mine/massage/massage'
const massage=resolve=>require(["@/components/mine/massage/massage"],resolve);
// import systemMsg from '@/components/mine/massage/systemMsg'
const systemMsg=resolve=>require(["@/components/mine/massage/systemMsg"],resolve);
// import orderMsg from '@/components/mine/massage/orderMsg'
const orderMsg=resolve=>require(["@/components/mine/massage/orderMsg"],resolve);
// import logisticsMsg from '@/components/mine/massage/logisticsMsg'
const logisticsMsg=resolve=>require(["@/components/mine/massage/logisticsMsg"],resolve);
// import dingDan from '@/components/cart/dingdan/dingdan'
const dingDan=resolve=>require(["@/components/cart/dingdan/dingdan"],resolve);
// import myAdress from '@/components/mine/adress/myAdress'
const myAdress=resolve=>require(["@/components/mine/adress/myAdress"],resolve);
// import newadress from '@/components/mine/adress/newadress'
const newadress=resolve=>require(["@/components/mine/adress/newadress"],resolve);
// import addhui from '@/components/mine/huiyuan/addhui'
const addhui=resolve=>require(["@/components/mine/huiyuan/addhui"],resolve);
// import set from '@/components/mine/setting/set'
const set=resolve=>require(["@/components/mine/setting/set"],resolve);
// import aboutus from '@/components/mine/setting/aboutus'
const aboutus=resolve=>require(["@/components/mine/setting/aboutus"],resolve);
// import becomemar from '@/components/mine/coupons/becomemar'
const becomemar=resolve=>require(["@/components/mine/coupons/becomemar"],resolve);
// import fukuan from '@/components/cart/dingdan/fukuan'
const fukuan=resolve=>require(["@/components/cart/dingdan/fukuan"],resolve);
// import productDetail from '@/components/home/normalProduct/productDetail'
const productDetail=resolve=>require(["@/components/home/normalProduct/productDetail"],resolve);
// import pingjia from '@/components/group/pingjia'
const pingjia=resolve=>require(["@/components/group/pingjia"],resolve);
// import logistics from '@/components/mine/myorder/logistics'
const logistics=resolve=>require(["@/components/mine/myorder/logistics"],resolve);
// import coupongroup from '@/components/mine/coupons/coupongroup'
const coupongroup=resolve=>require(["@/components/mine/coupons/coupongroup"],resolve);
// import myshop from '@/components/mine/myshop/myshop'
const myshop=resolve=>require(["@/components/mine/myshop/myshop"],resolve);
// import weixinlogin from '@/components/mine/login/weixinlogin'
const weixinlogin=resolve=>require(["@/components/mine/login/weixinlogin"],resolve);
// import wxlogin from '@/components/mine/login/wxlogin'
const wxlogin=resolve=>require(["@/components/mine/login/wxlogin"],resolve);
// import setphone from '@/components/mine/login/setphone'
const setphone=resolve=>require(["@/components/mine/login/setphone"],resolve);
// import bindsuccess from '@/components/mine/login/bindsuccess'
const bindsuccess=resolve=>require(["@/components/mine/login/bindsuccess"],resolve);
// import acLogin from '@/components/mine/login/acLogin'
const acLogin=resolve=>require(["@/components/mine/login/acLogin"],resolve);
// import login from '@/components/mine/login/login'
const login=resolve=>require(["@/components/mine/login/login"],resolve);
// import register from '@/components/mine/login/register'
const register=resolve=>require(["@/components/mine/login/register"],resolve);
// import changepassword from '@/components/mine/login/changepassword'
const changepassword=resolve=>require(["@/components/mine/login/changepassword"],resolve);
// import setpassword from '@/components/mine/login/setpassword'
const setpassword=resolve=>require(["@/components/mine/login/setpassword"],resolve);
// import setsuccess from '@/components/mine/login/setsuccess'
const setsuccess=resolve=>require(["@/components/mine/login/setsuccess"],resolve);
// import myCoupons from '@/components/mine/coupons/myCoupons'
const myCoupons=resolve=>require(["@/components/mine/coupons/myCoupons"],resolve);
// import myCollect from '@/components/mine/personal/myCollect'
const myCollect=resolve=>require(["@/components/mine/personal/myCollect"],resolve);
// import myAccounts from '@/components/mine/personal/myAccounts'
const myAccounts=resolve=>require(["@/components/mine/personal/myAccounts"],resolve);
// import recharge from '@/components/mine/personal/recharge'
const recharge=resolve=>require(["@/components/mine/personal/recharge"],resolve);
// import withdraw from '@/components/mine/personal/withdraw'
const withdraw=resolve=>require(["@/components/mine/personal/withdraw"],resolve);
// import payfor from '@/components/cart/dingdan/payfor'
const payfor=resolve=>require(["@/components/cart/dingdan/payfor"],resolve);
// import myScore from '@/components/mine/personal/myScore'
const myScore=resolve=>require(["@/components/mine/personal/myScore"],resolve);
// import faq from '@/components/mine/coupons/faq'
const faq=resolve=>require(["@/components/mine/coupons/faq"],resolve);
// import productList from '@/components/search/productList'
const productList=resolve=>require(["@/components/search/productList"],resolve);
// import selection from '@/components/mine/myshop/selection'
const selection=resolve=>require(["@/components/mine/myshop/selection"],resolve);
// import readmore from '@/components/home/readmore'
const readmore=resolve=>require(["@/components/home/readmore"],resolve);
// import recruitment_agent from '@/components/mine/recruitment_agent/recruitment_agent'
const recruitment_agent=resolve=>require(["@/components/mine/recruitment_agent/recruitment_agent"],resolve);
// import invite from '@/components/mine/invite'
const invite=resolve=>require(["@/components/mine/invite"],resolve);
// import Feedback from '@/components/mine/setting/Feedback'
const Feedback=resolve=>require(["@/components/mine/setting/Feedback"],resolve);
// import bindPhone from '@/components/mine/bindPhone/bindPhone'
const bindPhone=resolve=>require(["@/components/mine/bindPhone/bindPhone"],resolve);
// import exclusiveDetial from '@/components/home/exclusiveProduct/exclusiveDetial'
const exclusiveDetial=resolve=>require(["@/components/home/exclusiveProduct/exclusiveDetial"],resolve);
// import chooseStore from '@/components/cart/dingdan/chooseStore'
const chooseStore=resolve=>require(["@/components/cart/dingdan/chooseStore"],resolve);
// import myteam from '@/components/mine/myteam'
const myteam=resolve=>require(["@/components/mine/myteam"],resolve);
const myIncome=resolve=>require(["@/components/mine/myIncome"],resolve);
const lottery=resolve=>require(["@/components/mine/lottery/lottery"],resolve);
const myAwardList=resolve=>require(["@/components/mine/lottery/myAwardList"],resolve);
Vue.use(Router)
const router =  new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: {
    //     keepAlive: false
    //   }
    // },
    {
      path: '/',
       name: 'Firest_index',
      component: Firest_index,
      meta: {
        keepAlive: false
      },
      children:[
       {
        path:'',
        redirect:'/home',
         meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      }
       },
       {
        path:'/home',
        name:'home',
        meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
        },
        component:()=>import('@/components/home/index')
       },
       {
        path:'/search',
        name:'search',
        meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
        },
        component:()=>import('@/components/search/search')
       },
       {
        path:'/cartdetial',
        name:'cartdetial',
        component:()=>import('@/components/cart/cartdetial')
       },
       {
        path:'/orderHome',
        name:'orderHome',
        meta: {
             keepAlive: false,
            requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
        },
        component:()=>import('@/components/mine/orderhome')
       }
      ]
    },
    {
     path: '/blank',
      name: 'blank',
      component: blank //用来跳转刷新的空白页面
    },
    {
      path: '/searchfor',
      name: 'searchfor',
      meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component:searchfor
      // component: resolve => require(["@/components/home/demo1/searchfor"], resolve)
    
    },
    {
      path: '/assess',
      name: 'assess',
      component: assess
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    },
    {
      path: '/pindetial',
      name: 'pindetial',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: pindetial
    },
    {
      path: '/orderdetial/:id',
      name: 'orderdetial',
      component: orderdetial
    },
    {
    path: '/groupon',//大牌拼团
      name: 'groupon',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: groupon
    },
    {
      path: '/seckill',
      name: 'seckill',
      component: seckill
    },
    {
      path: '/personalData',
      name: 'personalData',
      component: personalData
    },
    {
      path: '/pintuangoods/:id',
      name: 'pintuangoods',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: pintuangoods
    },
    {
      path: '/massage',
      name: 'massage',
      component: massage
    },
    {
      path: '/systemMsg',
      name: 'systemMsg',
      component:systemMsg
    },
    {
      path: '/orderMsg',
      name: 'orderMsg',
      component:orderMsg
    },
    {
      path: '/logisticsMsg',
      name: 'logisticsMsg',
      component: logisticsMsg
    },
    {
      path: '/dingDan',
      name: 'dingDan',
      component: dingDan,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
     {
      path: '/chooseStore',
      name: 'chooseStore',
      component: chooseStore,
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: myAdress
    },
    {
      path: '/newAddress',
      name: 'newAddress',
      component: newadress
    },
    {
      path: '/editAddress',
      name: 'editAddress',
      component: newadress
    },
    {
      path: '/addhui',
      name: 'addhui',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: addhui
    },
    {
      path: '/set',
      name: 'set',
      component: set
    },
    
    {
      path: '/aboutus',
      name: 'aboutus',
      component: aboutus
    },
    {
      path: '/becomemar',
      name: 'becomemar',
      component: becomemar
    },
    {
      path: '/fukuan',
      name: 'fukuan',
      component: fukuan
    },
   
    {
      path: '/productDetail/:id',
      name: 'productDetail',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: productDetail
    },
     {
      path: '/exclusiveDetial/:id',
      name: 'exclusiveDetial',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component:exclusiveDetial
    },
    {path: '/pintuangoodsneir/:id',
      name: 'pintuangoodsneir',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: productDetail

    },
    {
      path: '/pingjia/:id',
      name: 'pingjia',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: pingjia
    },
    {
      path: '/logistics',
      name: 'logistics',
      component: logistics
    },
    {
      path: '/coupongroup',
      name: 'coupongroup',
      component: coupongroup
    },
    {
      path: '/myshop',
      name: 'myshop',
      component: myshop
    },
    {
      path: '/setphone',
      name: 'setphone',
      component: setphone
    },
    {
      path: '/weixinlogin',
      name: 'weixinlogin',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: weixinlogin
    },
    {
      path: '/wxlogin',
      name: 'wxlogin',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: wxlogin
    },
    {
      path: '/bindsuccess',
      name: 'bindsuccess',
      component: bindsuccess
    },
    {
      path: '/acLogin',
      name: 'acLogin',
      meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: acLogin
    },
    {
      path: '/login',
      name: 'login',
      meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: login
    },
    {
      path: '/register',
      name: 'register',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: register
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: changepassword
    },
    {
      path: '/setpassword/:userName/:verCode',
      name: 'setpassword',
      component: setpassword
    },
    {
      path: '/setsuccess',
      name: 'setsuccess',
      component: setsuccess
    },
    {
      path: '/myCoupons',
      name: 'myCoupons',
      component: myCoupons
    },
    {
      path: '/myCollect',
      name: 'myCollect',
      component: myCollect
    },
    {
      path: '/myAccounts',
      name: 'myAccounts',
      component: myAccounts
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw
    },
    {
      path: '/payfor',
      name: 'payfor',
      component: payfor
    },
    {
      path: '/myScore',
      name: 'myScore',
      component: myScore
    },
    {
      path: '/faq',
      name: 'faq',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: faq
    },
    {
      path: '/readmore/:index',
      name: 'readmore',
      meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: readmore
    },
    {
      path: '/productList',
      name: 'productList',
       meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      component: productList
    },
    {
      path: '/selection',
      name: 'selection',
      component: selection
    },
    {
      path:'/recruitment_agent',
      name:'recruitment_agent',
      component:recruitment_agent
    },
    {
       path:'/invite',
      name:'invite',
      component:invite
    },
    {
       path:'/Feedback',
      name:'Feedback',
      component:Feedback
    },
    {
       path:'/bindPhone',
         meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      name:'bindPhone',
      component:bindPhone
    },
    {
      path:'/myteam',
      name:'myteam',
      component:myteam,
     
    },
    {
      path:'/myIncome',
      name:'myIncome',
      component:myIncome,
     
    },
     {
       path:'/lottery',
         meta: {
          requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
      },
      name:'lottery',
      component:lottery
    },
    {
       path:'/myAwardList',
       name:'myAwardList',
       component:myAwardList
    }

  ]
})

router.beforeEach((to,from,next) => {
     
  if(to.meta.requireAuth===false){
   
    next()
  }else if(localStorage.hasOwnProperty("smjuserInfo")){
   
     next()
  }else{
   
     Vue.$vux.confirm.show({
        content:'请先登录',
        confirmText:'去登录',
        cancelText:'取消',
        onConfirm () {
      next({
      path:'/wxlogin',
       query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
        },
         onCancel () {
         // next({
         //  path:'/home'
         //  })
         return
           },
       })

   
  }
})
export default router