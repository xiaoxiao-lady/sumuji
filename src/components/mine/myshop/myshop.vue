<template>
  <div class="myshop">
    <tabGroup :title="title"></tabGroup>

    <div class="shop-info">
      <div class="shop-tab">
      <img :src="img_url?img_url:original_img"  class="owner-img"   />
      <div class="owner-info">
        <div  class="shop-name" >{{title?newTitle:original_name}}</div>
        <div class="fensi">粉丝 878</div>
      </div>
      </div>
      <!-- <x-icon type="ios-search" size="25"></x-icon>
      <input type="search" placeholder="搜索" /> -->
      <!-- <tab>
        <tab-item v-for="(item,key) in tabList" :key="key" @click.native="handler(key)">{{item}}</tab-item>
      </tab> -->
      
        
      <div class="nav-btn">
      <div class="nav-btn-single" v-for="(item,key) in tabList" :key="key" @click="handler(key)" >
         {{item}}        
         <div :class="showindex===key?'border_seleceted':'border_normal'"></div>
      </div>

      </div>
    </div>

    <div v-show="showindex===0" class="product_show">
      <two-line-list v-if="goodsList"
        v-for="(item,key) in goodsList"
        :key="key"
        :imgurl="item.productIcon"
        :title="item.productName"
        :cost="item.salePrice"
        :border="false"
        :c="true"
        style="float:left"
         
      ></two-line-list>

      <div v-else class="b">
        <img src="./myshop-img/空铺.png" />
        <p>您的店铺空空如也…</p>
        <button class="button">去进货</button>
      </div>

    </div>

    <div v-show="showindex===2">
      <shop-message></shop-message>
    </div>

    <div v-show="showindex===1" >
      <shop-order></shop-order>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import {
  Tab,
  TabItem,
  Confirm,
  TransferDomDirective as TransferDom
} from 'vux'
// import paiLie from '@/components/group/goods'
import twoLineList from '@/components/group/two-line-list'
import  {getOrderList} from '@/api/order'

import shopMessage from './shopMessage'
import shopOrder from './shopOrder'
import { mapGetters } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    tabGroup: tabGroup,
    Tab,
    TabItem,
    // paiLie: paiLie,
     twoLineList: twoLineList,
    Confirm,
    shopMessage: shopMessage,
    shopOrder: shopOrder
  },
  data () {
    return {
      title: '我的商铺',
      icon: require('./myshop-img/分享.png'),
      tabList: ['商品', '订单', '信息'],
      list: [
        { name: '1', img: '', cost: '1', count: 1 },
        { name: '1', img: '', cost: '2', count: 2 },
        { name: '2', img: '', cost: '3', count: 3 }
      ],
      src: require('@/components/group/9.png'),
      goodsList:[],
      b: true,
      a: false,
      show3: false,
      show: true,
      showindex: 0,
      shop: true,
      original_img:'',
      original_name:''
    }
  },
  props: {},
  watch:{
   merchantName:function (value) {
     this.title=value;
   },
   merchantIcon:function (value) {
     this.img_url=value;
   }
  },
  computed:{
  newTitle(){
    return this.$store.getters.userInfo.merchant.merchantName;
  },
  img_url(){
    return this.$store.getters.userInfo.merchant.merchantIcon;
  }
  },
  created(){
    this.getOrderList();
    this.initialization();
  },
  methods: {
    addto () {
      this.show3 = true
    },
    onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
      console.log('on confirm')
    },
    handler (key) {
      this.showindex = key
    }, 
    getOrderList(){
      let data={
        pageNum:1,
        pageSize:10,
        userId:this.getters.userInfo.userId
      }
       getOrderList(data).then(res=>{
       res.data.forEach(item=>{
        item.orderProductList.forEach(item=>{
          this.goodsList.push(item);
          console.log(this.goodsList);
        })

       })

       })
    },

    initialization(){
    this.original_img= this.$store.getters.userInfo.merchant.merchantIcon;
    this.original_name=this.$store.getters.userInfo.merchant.merchantName;
      
    }
  }
}
</script>

<style lang="scss" >
.myshop {
  .shop-info {
   width:100%;
height:132px;
background:linear-gradient(149deg,rgba(248,119,139,1) 0%,rgba(255,77,94,1) 100%);
display: flex;
align-items: center;
flex-direction: column;
justify-content: flex-end;
   .shop-tab{
    height: 50px;
    width: 300px;
    display: flex;
    margin-top: 25px;
    justify-content:flex-start;
  margin-left: -24px;
    .owner-img{
      width: 50px;
      height: 50px;
      border: 25px;
    }
    .owner-info{
      display: flex;
      flex-direction: wrap;
      justify-content: flex-start;
      align-content: center;
      margin-left: 9px;
      flex-direction:column;
      font-size: 15px;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:21px;
      color: #fff;
      .fensi{
       font-size:12px;
       font-weight:400;
        color:rgba(255,209,214,1);
        line-height:17px;
      }
  
    } 
   }
    
   .nav-btn{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between; 
    width: 200px;
    .nav-btn-single{
      padding: 6px 9px;
      font-size:14px;
      font-weight:400;
      color:#FFD9DD;
      line-height:20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
    }
    .border_seleceted, .border_normal{
      display: inline-block;
      width: 46px;
      height: 4px;
      margin-top: 4px;
      background: #fff;
    }
   .border_normal {
      background: none;
    }

   }
  }
  .product_show{ 
    width:100vw; 
  }
  .fl {
    float: left;
    margin-right: 0.5rem;
  }
  .fr {
    float: right;
  }
  .pai {
    width: calc(50% - 0.75rem);
    height: 13rem;
    margin: 0.5rem 0 0 0.5rem;
  }
  .b {
    background: #ffffff;
    height: 80vh;
    text-align: center;
    color: #d2d2d2;
    padding-top: 4rem;
    .button {
      margin-top: 1rem;
      width: 12rem;
      height: 3rem;
      background: linear-gradient(
        225deg,
        rgba(255, 33, 76, 1) 0%,
        rgba(255, 79, 113, 1) 100%
      );
      box-shadow: 0px 0.25rem 0.5rem 0px rgba(255, 175, 189, 1);
      border-radius: 2.2rem;
      color: #ffffff;
      font-size: 1rem;
      border: none;
    }
  }
}
</style>