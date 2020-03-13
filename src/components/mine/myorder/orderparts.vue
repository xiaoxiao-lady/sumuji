<template>
  <div class="orderparts">
    <div class="one_order" v-for="(item, index) in orderInfoList"><!-- 该用户所有订单 -->
      <div class="top_tab">
        <div v-if="buy">官方旗舰店</div>
        <div v-if="!buy">买家昵称：{{item.addressee}}</div>
        <div style="float:right; color:#FF214C;" v-if="item.status === 1">等待买家付款</div>
        <div style="float:right; color:#FF214C;" v-if="item.status === 2">买家已付款</div>
        <div style="float:right; color:#FF214C;" v-if="item.status === 3">卖家已发货</div>
        <div style="float:right; color:#FF214C;" v-if="item.status === 5||item.status===4">交易成功</div>
      </div>

      <div class="single_oreder" @click="orderdetial(item.orderId)" v-for="(info, index) in item.orderProductList">
       <!--  获取单条订单消息 -->
 <!-- 商品图片 -->
        <div class="product_img">
          <img :src="info.productIcon"/>
        </div>
<!-- 商品信息-->      
         <div class="product_info">

         <div class="product_text">
        <span class="product_name"> {{info.productName}} </span>
        <span class="product_specification">{{info.specification}}</span>
        </div>

        <div class="product_number">
         <span class="product_price">¥{{info.activityPrice}}</span>
          <span class="product_num">x{{info.number}}</span>
        </div>
        </div>
          
      </div>
      <div class="product_summary">共{{item.allnum}}件商品 合计：￥{{item.orderAmount}}</div>
      <!-- 我的订单底部 -->
      <div class="bottom_content" v-if="buy" >
     

      <div class="bottom_tab">
        <span  v-show="item.status === 1" @click="goPayPage(item)">去付款</span>
        <span v-show="item.status === 2" >提醒发货</span>
        <span @click="tologistics(item.expressCode,item.expressCompany)" v-show="item.status === 3" 
        style="color:#999; border:1px solid #999;">查看物流</span>
        <span   v-show="item.status === 3" @click="confirmReceive(item.orderId)">确认收货</span>
        <span  @click="todelete()" v-show="item.status === 4||item.status === 5"
        style="color:#999; border:1px solid #999;">删除订单</span>
        <span  @click=" toassess(item)" v-show="item.status === 4||item.status === 5">去评价</span>
      </div>
     
      </div>

   <!--  我的商铺订单底部 -->
    <div class="bottom_content"  v-if="myShoporder">
     <div class="bottom_right">
        <div class="orderSn">
        <span>订单编号</span>
        <span>{{item.orderSn}}</span>
        </div>
        <div class="createdTime">
          <span>创建时间</span>
          <span>{{item.canUnderstandingcreatedTime}}</span>
        </div>
       </div>
         <div class="product_summary">
          共{{item.allnum}}件商品 合计：￥{{item.allPrice}}
         </div>
     </div>

   </div>

  

  </div>
</div>

</template>

<script>
import { XButton } from 'vux'
import {confirmProduct} from '@/api/order'
export default {
   inject:['reload'],//注入在App.vue里定义的依赖
  components: {
    XButton
  },
  data () {
    return {
      totalPrice:0,
      orderCreatedDate:[]
    }
  },
  props: {
    orderInfoList: {
      type: Array,
      required: false,
      defalut: false
    },
    buy: {
      type: Boolean,
      required: false,
      defalut: true
    },
    myShoporder:Boolean
  },
 created(){
   this.getTotalpriceAndallnumAndtime();
  },
  computed: {
    //当创建时间或合计发生变化时 返回改变后的值
  },
  methods: {
    goPayPage(a){
        //commit一下
        console.log(a)
     //  this.$store.commit('setTotalPrice',a.allPrice)
        this.$store.commit('setTotalPrice',a.orderAmount)
       this.$router.push({path:'/payfor',query:{orderIds:a.orderId}})
    },
    confirmReceive(orderId){
     confirmProduct(orderId).then(res=>{
      if(res.code==200){
       this.reload();//刷新一下页面重新发一次请求
      }
     })
    },
    toassess (item) {
      this.$router.push({path:'/assess',query:{orderId:item.orderId}})
    },
    orderdetial (id) {
      this.$router.push({path:`/orderdetial/${id}`})
    },
    tologistics (expressCode,expressCompany) {
      this.$router.push({path:'/logistics',query:{expressCode:expressCode,expressCompany:expressCompany}})
    },
  getTotalpriceAndallnumAndtime(){
     for(let j=0;j<this.orderInfoList.length;j++){
      
         let allnum=0;
         this.orderInfoList[j].canUnderstandingcreatedTime= this.getCreatedTime(this.orderInfoList[j].createdDate);//遍历拿到一维数组的createdDate 用getCreatedTime转化为通用时间格式 创建一个属性并赋值
        for(let i=0;i<this.orderInfoList[j].orderProductList.length;i++){
          allnum+=this.orderInfoList[j].orderProductList[i].number;
        }
      this.orderInfoList[j].allnum=allnum;
      console.log(this.orderInfoList)
      
    }
  },
  getCreatedTime(date){
    console.log(date)
    let createdTime=new Date(date);
          createdTime=createdTime.getFullYear()+
          '.'+(createdTime.getMonth()+1) 
          +'.'+createdTime.getDate()+'  '+
          createdTime.getHours()+'.'+
          createdTime.getMinutes()+'.'+createdTime.getSeconds();
          // this.orderCreatedDate.push(this.orderInfoList);
          return createdTime;      
  }

  }
}
</script>

<style lang="css" scoped>
.orderparts{
  width: 100vw;
 display: flex;
 flex-direction: column;
 flex-wrap: wrap;
 
}
 .one_order{
 background: #fff;
  width: 100vw;
  font-size: 14px;
  font-weight: 400;
  margin-top:8px;
  margin-bottom: 4px; 
 }
  .top_tab{
    height: 42px;
    width:92%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
    border-bottom: 1px solid #eee;
  }
  .single_oreder{

    height: 105px;
    width: 93.067%;
    display: flex;
    margin-left: 4%;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
    .product_img,.product_img>img{
    width:80px;
height:80px;
border-radius:2px;
    }
  .product_info{
       width: 69.6%;
       height: 80px;
       margin-left: 2.13%;
       display: flex;
       justify-content: space-between;
       align-items: flex-start;
    }
.product_text,.product_number{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
       }
.product_specification{
           font-size: 11px;
           color: #999;
        }
 .product_number{
        justify-content: flex-start;
        align-items: flex-end;
       
       }
 .product_num{
          color:#999;
          font-size: 11px;
        }
  .bottom_content{
   height: 48px;
   background: #fff;
   display: flex;
   flex-wrap: wrap;
  align-items: center;
  }
.product_summary{
     width: 98%;
     display: inline;
    display:inline-flex;
    justify-content: flex-end;
    margin-right: 9px;
    }
.bottom_tab{
    height: 48px;
    width: 97%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
.bottom_tab>span{
    width:80px;
    height:28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background:rgba(255,255,255,1);
    border-radius:15px;
    border:1px solid #FF214C;
    margin-left: 5px;
    font-size: 12px;
    font-weight:400;
    line-height:17px;
    color: #FF214C;
    }

</style>
