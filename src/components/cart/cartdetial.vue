<template>
  <div class="cart">
    <div class="header">
      购物车
      <p style="float:right" @click="bianji()">{{bian}}</p>
    </div>
    <div v-if="shoppingCartList||''.length > 0">
      <div class="start">
        限时优惠
        <img src="./header.png" style="float:right; margin-top: 0.6rem;" />
      </div>
      <div class="cartdetial">
        <detial-list
          v-for="(item,key) in $store.getters.allList"
          :key="key"
          :title="item.productName"
          :imgurl="item.productIcon"
          :salePrice="item.salePrice"
          :memberPrice="item.memberPrice"
          :count="item.number"
          :isExclusive="isExclusive"
          :specification="item.specification"
          :check="item.activated"
          :attribute="item.deleted"
          @countChange="e=>{countChange(item,e)}"
          @checkChange="e=>{checkChange(item,e)}"
        ></detial-list>

        <div class="div3" v-if="change">
          <check-icon
            :value.sync="allcheck"
            class="icon"
            @click.native="quanxuan"
            @icon-success-color="color"
          ></check-icon>
          <span>全选</span>
          <div class="jiesuan">
            合计：<span style="color: #DA0217; font-weight: bold;margin-right: 10px;">¥{{totalMoney}}</span>
            <x-button mini type="warn" @click.native="todingdan()">去结算({{totalNum}})</x-button>
          </div>
        </div>
        <div class="div3" v-else>
          <check-icon :value.sync="allcheck" class="icon" @click.native="quanxuan"></check-icon>
          <span>全选</span>
          <div class="jiesuan">
            <x-button mini type="warn" @click.native="deleteShoppingCartBatch()">删除({{totalNum}})</x-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="b">
      <img src="./车2.png" />
      <p>购物车空空如也…</p>
    </div>
  </div>
</template>

<script>
import detialList from './detiallist'
import { Flexbox, FlexboxItem, CheckIcon, XButton,Confirm ,InlineXNumber} from 'vux'
import {getShoppingCartList, deleteShoppingCartBatch} from '@/api/shoppingCart'
export default {
  components: {
    detialList: detialList,
    Flexbox,
    FlexboxItem,
    CheckIcon,
    XButton,
    Confirm,
    InlineXNumber,
  },
  data () {
    return {
      shoppingCartList: [],
      // allcheck: false,
      bian: '编辑',
      change: true,
      src: require('./购物车.png'),
      color: '#FF214C',
      totalNum: 0,
      totalMoney: 0,
      selectProductIdList: [],
      selectNumberList: [],
      selectSpecificationsList: [],
      isExclusive:false
    }
  },
   computed:{
   allcheck(){
  if(this.allcheck = this.shoppingCartList.filter(item => {
        return item.activated
      }).length === this.shoppingCartList.length){
      return true
  }
 },
 userInfo(){
    return this.$store.getters.userInfo
  }
  },
   watch: {
    shoppingCartList:{
      handler(value){
       return this.$store.getters.allList
      },
      immediate: true,
      deep:true,
    },

   },
  methods: {
    quanxuan(){
      if(this.allcheck===true){
    this.shoppingCartList.forEach(item=>item.activated=false);
    this.selectProductIdList=[];
      }else{
         this.shoppingCartList.forEach(item=>item.activated=true);
      }

    },
    // 编辑
    bianji () {
      if (this.change === true) {
        this.bian = '完成';
        this.change = false
      } else {
        this.bian = '编辑';
        this.change = true
      }
    },
    todingdan () {
      this.$router.push({path:'./dingdan',query:{sourceType:1}})
    },
    getcartlist () {
      
      let data={
        userId:this.$store.getters.userInfo.userId,
        pageNum:1,
        pageSize:30
      }
      getShoppingCartList(data).then(response => {
        console.log(response.data)
         this.$store.commit('setallList',response.data);
         this.shoppingCartList =this.$store.getters.allList;//一旦组件初始化 这里如果不写上初始化shopping watch那里还没赶上 所以就是空的
       //response.data.forEach(item=>item.activated=false)
       //设置为假  goodcheck也为假 让用户手动点击 改变子组件goodcheck状态 触发事件加入数组
       //设置为true goodcheck是为真 看上去是全选 但是checkChange函数不被触发也就不会把为真的item加入到数组
       //设置为真 goodcheck为假 会在初始化时触发事件将item遍历一遍 push到一个数组
       console.log(this.$store.getters.allList)
        this.SumPrice();
        this.allNum();
      })
    },
    // 总价钱
    SumPrice() {
      let sum= 0;
      for (let i = 0; i < this.shoppingCartList.length; i++) {

        if (this.shoppingCartList[i].activated) {
          if(this.isExclusive){
             sum += this.shoppingCartList[i].memberPrice * this.shoppingCartList[i].number
           }else{
             sum += this.shoppingCartList[i].salePrice * this.shoppingCartList[i].number
           }
         
        }
      }
      this.totalMoney = sum
    },
    // 数量
    allNum () {
      let sum = 0;
      for (let i = 0; i < this.shoppingCartList.length; i++) {
        if (this.shoppingCartList[i].activated) {
          sum++
        }
      }
      this.totalNum = sum
    },
    checkChange (item, a) {
      item.activated = a;//a是一个布朗值
      this.SumPrice();
      this.allNum();
       console.log(item)
       console.log(this.shoppingCartList)
      if(item.activated===true){
        this.selectProductIdList.push(item.productId);
        this.selectNumberList.push(item.number);
        this.selectSpecificationsList.push(item.specification);
      //   console.log(this.selectProductIdList)
      // console.log(this.selectNumberList)
      //   console.log(this.selectSpecificationsList)
           }else{//删除替换这个地方 idIndex如果有两个相同id的不同规格商品 会返回到两个相同id的第一个商品
         let idIndex = this.selectProductIdList.findIndex(product => product === item.productId);
        let numIndex=this.selectNumberList.findIndex(num => num === item.number);
        let speIndex=this.selectSpecificationsList.findIndex(spe => spe === item.specification);
          this.selectProductIdList.splice(idIndex, 1)
          this.selectNumberList.splice(numIndex, 1)
          this.selectSpecificationsList.splice(speIndex, 1)
 // console.log(this.selectNumberList)
 //      console.log('index');
 //      console.log(idIndex)
 //      console.log(numIndex)
 //        console.log(speIndex)
           }

      this.$store.commit('setSelectNumList', this.selectNumberList)
      this.$store.commit('setSelectProductIdList', this.selectProductIdList)
      this.$store.commit('setSelectSpecificationsList', 
        this.selectSpecificationsList)
     

     
    },
    unique (arr) {
  return Array.from(new Set(arr))
  },
    countChange (item, a) {
      item.number=a;
      item.activated=false;
      this.SumPrice();
      // if(item.activated===true){
      // //找到item在当前数组中的位置 然后换掉num
      //  let numIndex=this.selectNumberList.findIndex(num => num === item.number);
      //  console.log(numIndex)
      //   this.selectNumberList.splice(numIndex, 1,a);
      //    console.log(this.selectNumberList)
      // }else{
      //     this.$store.commit('setallList',this.shoppingCartList);
      // console.log(this.shoppingCartList)
      // }
 
      
      //为了实现 在这里改变item.number可以响应到html的number渲染一使用state
      //使用state后 没有选中的item更新后的num可以在被选中后触发的事件中取得
      
   
    },
    // 删除购物车
    deleteShoppingCartBatch () {
      let data={
         userId:this.$store.getters.userInfo.userId,
        productIds: this.selectProductIdList,
        specifications: this.selectSpecificationsList
      }
      console.log(data)
      deleteShoppingCartBatch(data).then(res => {
        console.log(res)
        if (res.code ==200) {
          this.selectSpecificationsList = [];
          this.selectProductIdList = [];
          this.selectNumberLIst = [];
          this.getcartlist()
        }else{
          console.log(res.data)
        }
      })
    }
  }, 
  mounted () {
    this.getcartlist();
    if(this.userInfo.level>0){
      this.isExclusive=true;
    }
  }
}
</script>

<style  lang="scss" >


.vux-check-icon > .weui-icon-success:before,
.vux-check-icon > .weui-icon-success-circle:before {
  color: #ff214c !important;
}
* {
  touch-action: pan-y;
}
.cart{
  .weui-btn_warn {
  background-image: linear-gradient(to right, #ff214c, #ff4f71);
  border-radius: 1.125rem;
}
.header {
  text-align: center;
  padding: 1rem;
  border-bottom: 0.05rem solid #f7f5f5;
}
.start {
  padding: 0 1rem;
  color: #ff214c;
  background-color: #ffdae1;
  height: 2rem;
  line-height: 2rem;
}
.cartdetial {
  background-color: #f7f5f5;
  padding-top: 0.75rem;
  height: 100vh;
  width: 100%;

 
  .vux-x-icon {
    fill: #f70968;
  }

  .div3 {
    line-height: 4rem;
    height: 4rem;
    position: fixed;
    bottom: 3rem;
    background-color: #f7f5f5;
    width: 100%;
    .jiesuan {
      float: right;
      margin-right: 1rem;
    }
  }
}
.b {
  text-align: center;
  color: #d2d2d2;
  padding-top: 4rem;
}

}

</style>
