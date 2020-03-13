<template>
  <div class="dingdan">
   <tabGroup :title="title" ></tabGroup>
   <div class="pintuantips" v-if="isPintuanGoods">
    <span class="el-icon-bell"></span>
     <span>开团24小时内拼团成功，商家发货;若人数不足，系统自动退款关单</span>
   </div>
   <div class="fashion">
     <p>选择收货方式</p>
     <div class="fashion-content">
       <img :src="selecetFashion" class="selecetFashion_l" v-show="fashionLeft">
       <div :class="['fashion-left',fashionLeft?'active':'']" @click="seleceted(1)">
        <i class="el-icon-truck"></i>
         <span>快递邮寄</span>
       </div>

       <img :src="selecetFashion" class="selecetFashion_r" v-show="!fashionLeft">
       <div :class="['fashion-right',!fashionLeft?'active':'']" @click="seleceted(2)" >
        <i class="el-icon-s-shop"></i>
         <span>到店自提</span>
       </div>

     </div>
   </div>


   <div class="address" v-if="!this.detailAddress">
     <span>您还没设置收货地址，<span style="color:#1987FF" @click="toset()">去设置</span></span>
   </div>
   <div class="address1" v-else @click="toset()">
       <div>
        {{this.detailAddress.addressee}}&nbsp;&nbsp;{{this.detailAddress.addresseePhone}}
       </div>
       <div style="display: block;word-break: break-all">
         <span class="moren" v-if="this.detailAddress.isDefault">默认</span>
         <span style="color:#666666; font-size:0.8rem;">{{this.detailAddress.address}}</span>
       </div>
   </div>

 <dingdan-detial class="margin-top:0.85rem;"
                    :productIdList="productIdList"
                    :numberList="numberList"
                    :specificationsList="specificationsList"
                    :isCart="isCart"
                     :isPintuanGoods="isPintuanGoods"
                    :isExclusive="isExclusive"
                    :isDirectPurchase="isDirectPurchase"
                     v-if="isCart">
                      </dingdan-detial>
   <!-- 从直接购买或拼团商品来到的订单 -->
   <div v-else>
      <dingdan-detial class="margin-top:0.85rem;"
                    :productIdList=" directPurchase.productId"
                    :numberList=" directPurchase.number"
                    :specificationsList=" directPurchase.specification"
                    :isPintuanGoods="isPintuanGoods"
                    :isExclusive="isExclusive"
                    :isCart="isCart"
                    :isDirectPurchase="isDirectPurchase"
                    :exclusiveId="exclusiveId"
                    :isJoinPintuan="isJoinPintuan"
                    :joinId="joinId"
                    :groupId="groupId"
                    >
                      </dingdan-detial>
   </div>
   <!-- 如果是从购物车来到的订单 -->
   
   <div class="coupon">
      <span>优惠券</span>
      <i class="el-icon-arrow-right"></i>
    </div>

    <div class="floot">
    <span>
      合计
    </span>
    <span>
      ¥{{totalPrice}}
    </span>
  <an-niu :title="queren" style="float:right;margin-top: 0.5rem;
    margin-right: 1.5rem;" @click.native="payfor()"></an-niu>
  </div>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import tabGroup from '@/components/group/tab'
import dingdanDetial from './dingdandetial'
import { Swiper, XButton ,Toast } from 'vux'
import anNiu from '@/components/group/anniu'
import {getDefaultAddress } from '@/api/address'
import {generateOrder } from '@/api/order'

export default {
  components: {
    tabGroup: tabGroup,
    Swiper,
    dingdanDetial: dingdanDetial,
    XButton,
    Toast,
    anNiu: anNiu
  },
  computed: {
    ...mapState({
      productIdList: state => state.shoppingCar.selectProductIdList,
      numberList: state => state.shoppingCar.selectNumberList,
      specificationsList: state => state.shoppingCar.selectSpecificationsList,
      totalPrice: state => state.shoppingCar.totalPrice,
      address: state => state.address.selectedAddress,
      fashionLeft:state=>state.userInfo.fashionLeft
    }),
    ...mapGetters('shoppingCar', {
      selectNumberLIst: 'selectNumberLIst'
    }),
    ...mapGetters('address', {
      selectedAddress: 'selectedAddress'
    }),
    directPurchase(){
    return this.$store.getters.GetDirectPurchase;
  }
  },
  name: 'dingDan',
  data () {
    return {
      title: '确认订单',
      queren: '确认',
      detailAddress: '',
      selecetFashion:require('../../../assets/selectFashion.png'),
      pintuanGoods:false,
      a:'',
      isDirectPurchase:false,
      isPintuanGoods:false,
      isCart:false,
      groupId:'',
      isJoinPintuan:false,
      joinId:'',
      isExclusive:false,
      exclusiveId:''
    }
  },
  methods: {
    toset () {
      this.$router.push('./addressList')
    },
    seleceted(a){
      this.a=a;
      if(a===1){
         this.$store.commit('setdistributionMode',true);//邮递方式为邮寄
      }else{
        this.$router.push('./chooseStore');
       
      }

    },
    // 确认订单
    payfor () {
      console.log('dindan');
      
      if(this.isCart){//是购物车购买
        generateOrder({
        userId:this.$store.getters.userInfo.userId,
        addressId: this.detailAddress.addressId,
        productIds: this.productIdList,
        productNums: this.numberList,
        specifications: this.specificationsList,
        distributionMode:this.a,
        sourceType:1
      }).then(res => {
        if(res.code==200){
           this.$router.push({path: '/payfor', query: {orderIds: res.data.orderId}})
         }
      })
      }else if(this.isPintuanGoods){
        //拼团商品 3开团人 sourceType=3+grouponId哪个商品  4参团人+joinID
        let data={
           userId:this.$store.getters.userInfo.userId,
           addressId: this.detailAddress.addressId,
           productIds:this.$store.getters.GetDirectPurchase.productId,
           productNums:this.$store.getters.GetDirectPurchase.number,
           distributionMode:this.a, //1是邮递 2是自取
           specifications:this.$store.getters.GetDirectPurchase.specification,
          // sourceType 1购物车 2直接购买 3拼团的开团人 4参团的用joinId来区分哪个团
        }
        if(this.isJoinPintuan){//参团人
           data.sourceType=4;
           data.sourceId=this.joinId;
             generateOrder(data).then(res=>{
            if(res.code==200){
             this.$router.push({path: '/payfor', query: {orderIds: res.data.orderId}})
            }
         })
        }else{//开团人
          data.sourceType=3;
          data.sourceId=this.groupId;
            generateOrder(data).then(res=>{
            if(res.code==200){
             this.$router.push({path: '/payfor', query: {orderIds: res.data.orderId}})
            }
         })
        }
      
      }else if(this.isExclusive){//是会员商品
          let data={
           userId:this.$store.getters.userInfo.userId,
           addressId: this.detailAddress.addressId,
           productIds:this.$store.getters.GetDirectPurchase.productId,
           productNums:this.$store.getters.GetDirectPurchase.number,
           distributionMode:this.a, //1是邮递 2是自取
           specifications:this.$store.getters.GetDirectPurchase.specification,
           sourceType:5,
           sourceId:this.exclusiveId
        }
           generateOrder(data).then(res=>{
            if(res.code==200){
             this.$router.push({path: '/payfor', query: {orderIds: res.data.orderId}})
            }
         })

      }else{//从商品详情或拼团商品的单独购买过来
        let data={
           userId:this.$store.getters.userInfo.userId,
           addressId: this.detailAddress.addressId,
           productIds:this.$store.getters.GetDirectPurchase.productId,
           productNums:this.$store.getters.GetDirectPurchase.number,
           distributionMode:this.a, //1是邮递 2是自取
           specifications:this.$store.getters.GetDirectPurchase.specification,
           sourceType:2
          //1购物车 2直接购买 
        }
        generateOrder(data).then(res=>{
            if(res.code==200){
             this.$router.push({path: '/payfor', query: {orderIds: res.data.orderId}})
            }
         })
      }
    },
    getaddress () {
      getDefaultAddress({userId: this.$store.getters.userInfo.userId})
        .then(response => {
          this.detailAddress = response.data
          this.$store.commit('setSelectedAddress', this.detailAddress)
        })
    }
  },
  mounted () {
     // this.$store.commit('setdistributionMode',true);//生命周期里不可以做对state的操作么 这个不会执行
    if (!this.address.hasOwnProperty('addressId')) {
      this.getaddress()
    } else {
      this.detailAddress = this.address;
    };
    if(this.fashionLeft){
      this.a=1
    }else{
      this.a=2
    }
  },
  created(){

     if(this.$route.query.sourceType==3||this.$route.query.sourceType==4){ 
    
        this.isPintuanGoods=true;
       }else if(this.$route.query.sourceType==1){
       this.isCart=true;
       }else if(this.$route.query.sourceType==5){
         //alert('sourceType')
        this.isExclusive=true;
       }else{
        this.isDirectPurchase=true;
       }

   if(this.$route.query.hasOwnProperty('groupId')){
      this.groupId=this.$route.query.groupId;
    }else if(this.$route.query.hasOwnProperty('joinId')){
      this.joinId=this.$route.query.joinId;
        this.isJoinPintuan=true;
    }else if(this.$route.query.hasOwnProperty('exclusiveId')){
    this.exclusiveId=this.$route.query.exclusiveId;
    }


  },
//   beforeRouteEnter (to, from, next) {
//   next(vm => {
//     console.log(from.path);
//     if(from.path.indexOf("sourceType=3")!=-1){
//     vm.isPintuanGoods=true;
//    }
//   })
// }

}
</script>

<style lang="scss" >
.dingdan{
  .pintuantips{
    width: 100%;
    height:auto;
    color:  rgb(255, 34, 75);
    text-align: left;
    padding: 10px 0 10px 0;
    border-bottom: 1px solid #eee;
  }
  .fashion{
    width: 100%;
    height: 133px;
    display: flex;
    flex-wrap: wrap;

    flex-direction: column;
    background: white;
    p{
      width: 100%;
      margin: 0;
      padding: 0;
      font-size:12px;
     border-bottom: 1px solid #eee;
     padding: 14px 0 10px 15px;
    }
    .fashion-content{
     display: flex;
     justify-content: space-around;
 font-size:16px;
 align-items: center;
 height: 89px;
 position: relative;
 .selecetFashion_l{
  position: absolute;
  top:6px;
  left:5px;
 }
  .selecetFashion_r{
  position: absolute;
  top:6px;
  right:170px;
 }

      .fashion-left,.fashion-right{
         width: 40%;
         height:56px;
         display: flex;
         justify-content: center;
         align-items: center; 
         background:rgba(247,247,247,1);
border-radius:6px;
      }
      .active{
       border:1px solid rgba(255,46,87,1);
      }

    }
  }
  .address{
    background: #FFFFFF;
    text-align: center;
    height: 3.2rem;
    line-height: 3.2rem;
    border-top:0.0625rem solid #F1F1F1;
    border-bottom: 0.0625rem solid #F1F1F1;
  }
  .address1{
    background: #FFFFFF;
    padding:0.85rem 3.5rem 0 0.85rem;
    .moren{
      width:2rem;
      height:1.25rem;
      background:rgba(255,46,87,1);
      border-radius:0.125rem;
      color: #FFFFFF;
      line-height: 1.25rem;
      padding: 0.25rem;
      font-size: 0.75rem;
    }
  }
  .coupon{
    width: 100%;
     display: flex;
     box-sizing: border-box;
     justify-content: space-between;
     background: white;
     align-items: center;
     padding: 10px 10px 10px 10px; 
  }
  .floot{
    position: fixed;
    bottom:0;
    width: 100vw;
    height: 3rem;
    line-height: 3rem;
    background: #FFFFFF;
    padding-left:1rem;
  }


}





</style>
