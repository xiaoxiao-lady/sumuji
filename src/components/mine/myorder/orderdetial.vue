<template>
  <div>
    <tabGroup :title="title" ></tabGroup>
    <div class="red">
       <div class="order_status">
        <div class="order_status_text" v-if="orderDatails.status === 1">等待买家付款</div>
        <div class="order_status_text"  v-if="orderDatails.status === 2">买家已付款</div>
        <div class="order_status_text" v-if="orderDatails.status === 3">卖家已发货</div>
        <div class="order_status_text" v-if="orderDatails.status === 4||orderDatails.status ===5">交易成功</div>
      </div>
    </div>
     
      <div class="first_wihte">
        <div class="wuliuInfo" v-if="wuliu">
          <img src="./物流.png" />
          <div class="wuliu_content">
            <p>已签收，收货人凭取件码签收，感谢使用{{orderDatails.expressCompany}}，期待再次为您服务</p>
          </div>
        </div>
        <div class="userInfo">
          <img src="./地址.png" />
          <div class="user_content">
            <div class="user_content_top">
            <span class="user_name">{{orderDatails.addressee}}</span>
            <span class="user_phone">{{orderDatails.addresseePhone}}</span>
            </div>
            <span class="user_address">{{orderDatails.address}}</span>
          </div>
        </div>
      </div>

      <div class="second_white">

      <div class="product_message" v-for="(item,index) in orderDatails.orderProductList">
        <div class="product_img">
          <img :src="item.productIcon"/>
        </div>
        <div class="product_info">
        <div class="product_text">
          <span class="product_name">{{item.productName}}</span>
          <span class="product_specification">{{item.specification}}</span>
         </div>
         <div class="product_num">
           <span class="product_price">￥{{item.activityPrice}}</span>
          <span class="product_number">x{{item.number}}</span>
        </div>
      </div>
       
      </div>
      <div class="product_summary">合计：<span>￥{{orderDatails.orderAmount}}</span></div>
      
        <div class="order_info">
          <div class="order_info_title">
            <label style="color:#999999; font-size:0.0625rem">订单信息</label>
          </div>
          <div v-if="orderDatails.orderType!=null">
            <label>支付类型：</label>
            <span>{{orderDatails.orderType}}</span>
          </div>
          <div>
            <label>订单编号：</label>
            <span>{{orderDatails.orderSn}}</span>
          </div>
          <div v-if="orderDatails.createdDate!=null">
            <label>创建时间：</label>
            <span>{{orderDatails.createdDate}}</span>
          </div>
        </div>
      

      <div class="second_white_bottom">
        <div class="contact_client">
          <img src="./联系.png" />
          <span>联系客服</span>
        </div>
        <div  class="contact_phone">
          <img src="./电话.png"/>
          <span>联系电话</span>
        </div>
      </div>

      </div>
    

    <div class="floot">
        <!-- <button class="blackb">去付款</button>
        <button class="redb" @click="toassess()">去评价</button> -->
         <div class="bottom_tab">
        <span  v-show="orderDatails.status === 1" @click="cancelOrder">取消订单</span>
        <span  v-show="orderDatails.status === 1" @click="toPayfor()">付款</span>
        <span v-show="orderDatails.status === 2" >提醒发货</span>
        <span @click.native="tologistics()" v-show="orderDatails.status === 3||orderDatails.status === 4||orderDatails.status === 5" 
        style="color:#999; border:1px solid #999;">查看物流</span>
        <span  @click.native="toevaluate()" v-show="orderDatails.status === 4||orderDatails.status === 5">去评价</span>
      
      </div>

     
    </div>

  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { XHeader, Tab, TabItem, FormPreview, Grid, GridItem, XButton } from 'vux'
import { getOrderById,cancelOrder} from '@/api/order'
export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    FormPreview,
    Grid,
    GridItem,
    XButton,
    tabGroup: tabGroup
  },
  data () {
    return {
      wuliu: true,
      title: '订单详情',
      orderDatails:{},
      orderCreatedDate:0,
      totalPrice:0,
      orderId:''
    }
  },
  props: {},
  created(){
   this.getOrderById(this.$route.params.id);
  this.orderId=this.$route.params.id;
  },
  methods: {
    cancelOrder(){
       cancelOrder(this.orderId,{userId:this.$store.getters.userInfo.userId}).then(res=>{
        if(res.code==200){
          this.$router.push('/myOrder')
        }
       })
    },
    toPayfor(){
     this.$router.push({path: '/payfor', query: {orderIds: this.orderDatails.orderId}})
    },
    getback () {
      // this.$router.push('/orderhome')
      history.go(-1)
      // this.$router.push({path: '/', query: {index: this.$route.query.from}})
    },
    toassess () {
      this.$router.push('/assess')
    },
    getOrderById(id){
        getOrderById(id).then(res=>{
          console.log(res.data);
          this.orderDatails=res.data;
          if(res.data.status===1||res.data.status===2){
            this.wuliu=false;
          }
         let orderProductList=res.data.orderProductList;
        this.getTime(res.data.createdDate);
         this.getTotalPrice(orderProductList);

        })
     },
     getTotalPrice(orderProductList){
    let list=orderProductList;
    let total=0;
    for(let i=0;i<list.length;i++){
      total+=parseFloat(list[i].salePrice)*list[i].number;
    }
      total=parseFloat(total.toFixed(2));
      this.totalPrice=total;
  },
  getTime(date){
    let createdTime=new Date(date);
          createdTime=createdTime.getFullYear()+
          '.'+(createdTime.getMonth()+1) 
          +'.'+createdTime.getDate()+'  '+
          createdTime.getHours()+'.'+
          createdTime.getMinutes()+'.'+createdTime.getSeconds();
          this.orderCreatedDate=createdTime;
  }


  }
}
</script>

<style lang="scss" scoped>
.red {
  height: 8.625rem;
  position:relative;
  z-index: -1;
  background:linear-gradient(323deg,rgba(255,33,76,1) 0%,rgba(255,119,145,1) 100%);
  .order_status{
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;
    color: #fff;
    margin-left: 12px;
    padding-top: 26px;
  }
}
.first_wihte{
  width:93.6%;
height:129px;
background:rgba(255,255,255,1);
border-radius:4px;
margin-left: 3.2%;
margin-top: -12.496%;
.wuliuInfo,.userInfo{
  height: 68px;
  width: 83.3361%;
  margin-left: 18px;
 display: flex;
 align-items: center;
 border-bottom: 1px solid #eee;
 .wuliu_content,.user_content{
  width:82.7%;
  height:36px;
  font-size:13px;
  font-weight:400;
  color:rgba(33,135,255,1);
  line-height:18px;
  margin-left: 13px;
  }
}
.userInfo{
  height: 61px;
  border: none;
  .user_content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size:13px;
    font-weight:400;
    height:43px; 
    color:rgba(0,0,0,1);
    line-height:18px;
    .user_phone{
      font-size: 14px;
      color: #666666;
      margin-left: 20px;
    }
  }
}
}
.product_summary{
     width: 90.666%;
    display: flex;
    justify-content: flex-end;
    margin-right: 9px;
    span{
      color: #FF2B54;
      
    }
    }
.second_white{
  width:93.6%;
background:rgba(255,255,255,1);
border-radius:4px;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
margin-top: 0.75rem;
margin-bottom:3.725rem;
.product_message {
  height: auto;
  padding: 10px 0 10px 0;
  width: 87.2%;
  display: flex;
  align-items: center;
  margin-left: 14px;
  justify-content: space-between;
  .product_img,.product_img>img {
    width:80px;
height:80px;
background:rgba(247,247,247,1);
border-radius:2px;
  }
 .product_info{
       width:65.866%;
       height: 80px;
       margin-left: 8px;
       display: flex;
       justify-content: space-between;
       align-items: flex-start;
       .product_text,.product_num{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
        color: #333;
        .product_specification{
           font-size: 11px;
           color: #999;
        }
       }
       .product_num{
        justify-content: flex-start;
        align-items: flex-end;
        .product_number{
          color:#999;
          font-size: 11px;
        }
       }
    }
}
.order_info{
  font-size: 12px;
  font-weight: 400;
  color: #444;
  height: auto;
  padding: 10px 0 10px 0;
  line-height: 22px;
  margin-left: 14px;
  border-top:1px solid #eee;
  border-bottom: 1px solid #eee;
}
.second_white_bottom{
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .contact_client,.contact_phone{
    width:43.6%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    .contact_client>img,.contact_phone>img{
      width:20px;
      height:20px;
    }
    span{
      margin-left: 7px;
    }
  }
}
}

 .bottom_tab{
    height: 48px;
   width:93.6%;
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
.floot {
  height: 3.125rem;
  width: 100vw;
  background-color: #ffffff;
  position: fixed;
  bottom: 0rem;
  .blackb {
    width: 5rem;
    height: 1.75rem;
    color: #999999;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.93rem;
    border: 0.0625rem solid rgba(206, 206, 206, 1);
  }
  .redb {
    width: 5rem;
    height: 1.75rem;
    color: #ff214c;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.93rem;
    border: 0.0625rem solid #ff214c;
  }
}

</style>