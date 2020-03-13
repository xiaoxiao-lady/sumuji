<template>
  <div>
    <div class="vux-demo" v-show="showIndex===0">
    
     <index-page></index-page>
    
    </div>
    <div v-show="showIndex===1">
    <sort-page></sort-page>
    </div>
    <div v-show="showIndex===2">
      <cart-detial></cart-detial >
    </div>
     <div v-show="showIndex===3">
      <order-home></order-home>
    </div>
    <tabbar @on-index-change="showchange" style="position:fixed">
      <tabbar-item >
        <img slot="icon" :src="homeicon">
        <span slot="label">首页</span>
      </tabbar-item>
        <tabbar-item>   
        <img slot="icon" :src="sorticon">
        <span slot="label">分类</span>
         </tabbar-item>
      <tabbar-item>
        <img slot="icon" :src="cart">
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item >
        <img slot="icon" :src="mine">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Cell } from 'vux'
import sortPage from './search/search'
import cartDetial from './cart/cartdetial'
import indexPage from './home/index'
import orderHome from './mine/orderhome'
export default {
  components: {
    cartDetial: cartDetial,
    sortPage: sortPage,
    indexPage: indexPage,
    Tabbar,
    TabbarItem,
    Cell,
    orderHome: orderHome

  },
  data () {
    return {
     //  showIndex: 0

    }
  },
  computed: {
    homeicon () {
      return require('./../assets/tabbar/首页' + (this.showIndex === 0 ? '' : '未') + '选中.png')
    },
    sorticon () {
      return require('./../assets/tabbar/分类' + (this.showIndex === 1 ? '' : '未') + '选中.png')
    },
    cart () {
      return require('./../assets/tabbar/购物车' + (this.showIndex === 2 ? '' : '未') + '选中.png')
    },
    mine () {
      return require('./../assets/tabbar/我的' + (this.showIndex === 3 ? '' : '未') + '选中.png')
    },
    showIndex () {
      return Number(this.$route.query.index) || 0
    }
  },
  methods: {
    showchange (a) {
      this.$router.push({path: '/', query: {index: a}})
    }
    // tosearch () {
    //   this.$router.push('/searchfor')
    // }
  },
  mounted () {
    // this.$http.get('/ferrobag-server/productType/all').then(res => {
    //   console.log(res)
    // })
  }
}
</script>

<style  lang="scss" scoped>
  .weui-tabbar__item{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .weui-tabbar__icon>img,.weui-tabbar__icon{
    width:22px;
    height:22px;
  }
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label span{
   color: #DA0217;
 }


.logo {
  width: 100px;
  height: 100px
}
</style>
