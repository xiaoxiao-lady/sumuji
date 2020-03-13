<template>
  <div class="addhui">
    <img :src="background_img" class="background_img" />
  <div class="tab1">
    <div class="return">
      <img :src="return_img"  @click="getback()" /></div>
    <span class="span1">{{title}}</span>
  </div>
   <div class="card">
   <img :src="glod_img" class="card_img" />
      <div class="card-title">
        商城会员卡
      </div>
      <div class="card-des">
        预计开卡可省2000元
      </div>
      <button>
        <span @click="becomeAss">开通终生会员 {{price}}元</span>
      </button>
    </div>
    <div class="present">
      <span class="present_title">开业大礼包</span>
      <p class="present_content">{{presentContent}}</p>
    </div>
    <div class="qy">
      <span class="qy-title">
        开通会员 专享6大权益
      </span>
        <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="3">
        <grid-item
          :label="item.label"
          v-for="(item,key) in list2"
          :key="key"
        >
          <img slot="icon" :src="geticon(item.icon)" />
        </grid-item>
      </grid>

    </div>
    
  </div>
</template>

<script>
import { Grid, GridItem, GroupTitle } from 'vux'
import wx from 'weixin-js-sdk'
import {getGiftList,addMembership,getMembershipPrePayId} from '@/api/gift'
import {getJsApiProperty} from '@/api/order'
export default {
  components: {
    Grid, GridItem, GroupTitle
  },
  data () {
    return {
      title: '加入会员',
      list2: [
        { label: '会员折扣价', icon: '3' },
        { label: '7天无理由', icon: '7' },
        { label: '全场包邮', icon: '9' },
        { label: '大额折扣劵', icon: '11' },
        { label: '专属客服', icon: '13' },
        { label: '超值礼包', icon: '15' }
      ],
      return_img:require('./返回.png'),
      background_img:require('./矩形.png'),
      glod_img:require('./jinse.png'),
      presentContent:'',
      giftId:'',
      price:''
    }
  },
  props: {},
  created(){
     this.getGiftList();
    //  this.getJsApiProperty();
     
  },
  computed: {},
  methods: {
  getJsApiProperty () {
      getJsApiProperty({url: window.location.href})
        .then(res => {
          //window.alert(JSON.stringify(res))
          const Data = res.data;
          wx.config({
            debug: false,
            appId: Data.appId,
            timestamp: Data.timestamp,
            nonceStr: Data.nonceStr,
            signature: Data.signature,
            jsApiList: [
              'checkJsApi',
              'chooseWXPay'
            ]
          });
        }).catch(e => {
         // window.alert(JSON.stringify(e))
        })
    },
    geticon (icon) {
      return require('./' + icon + '.png')
    },
    becomeAss(){//调用生成订单接口 在其成功回调中调用会员支付接口 使用chooseWXPay wx接口
     // this.$router.push({path:'/payfor'})
     addMembership({giftId:this.giftId,userId:this.$store.getters.userInfo.userId}).then(res=>{
      if(res.code==200){
        getMembershipPrePayId({membershipId:res.data.membershipId,userId:this.$store.getters.userInfo.userId}).then(response=>{
         // alert(response.data)
        if(response.code==200){
           let jsonResult =response.data;
                WeixinJSBridge.invoke('getBrandWCPayRequest',{
                   "appId" : jsonResult.appId, //公众号名称，由商户传入
                   "timeStamp" : jsonResult.timeStamp, //时间戳
                   "nonceStr" : jsonResult.nonceStr, //随机串
                   "package" : jsonResult.package,//扩展包
                   "signType" : jsonResult.signType, //微信签名方式:默认使用sha1，使用新版支付需传入MD5
                   "paySign" : jsonResult.paySign //微信签名
                },
                    function(response){
                  if(response.err_msg == "get_brand_wcpay_request:ok" ) {
                    window.location.href = "http://sumuji.techwells.com/#/blank";
                
                  }else{
                    alert("取消支付");
                  }
                })
          } else{
            alert('超时')
          }
        })  
      }

     })
    },
    getback () {
      history.go(-1)
    },
    getGiftList(){
      let data={
        pageSize:10,
        pageNum:1,
        level:1
      }
      getGiftList(data).then(res=>{
        console.log(res.data);
        this.presentContent=res.data[0].description;
        this.giftId=res.data[0].giftId;
        this.price=res.data[0].price;
      })
    }
  }
}
</script>

<style lang="scss" >
  .present{
  width:92.533%;
  background: white;
  border-radius: 12px;
    margin-top: 11px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
 .present_title{
    display: flex;
  height: 66px;
  justify-content: center;
  align-items: center;
  font-weight:600;
  font-size: 16px;
  line-height: 22px;
 }
 .present_content{
  border-top:1px solid #eee;
  font-weight:400;
line-height:25px;
  font-size: 16px;
 }
}
.addhui {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
.background_img{
 position: absolute;
 z-index: -1;
 top: 0;
}
 .tab1{
 color: #FFFFFF;
display: flex;
 height: 66px;
 width: 100%;
justify-content: center;
align-items: center;
 .return{
  width: 10px;
  height: 18px;
  position: relative;
  right: 130px;
  .return>img{
      width: 10px;
  height: 18px;
  }
 }
 }
.card{
 width:355px;
height:180px;
display: flex;
justify-content: flex-start;
align-content:center;
flex-wrap: wrap;
position: relative;
.card_img{
  position: absolute;
  z-index: -1;
}
.card-title{
  font-weight:500;
color:rgba(171,103,9,1);
line-height:28px;
  font-size: 20px;
  width: 80%;
  height: 28px;
  margin-left: 27px;
  margin-bottom: 5px;

}

.card-des{
font-weight:400;
color:rgba(171,103,9,1);
line-height:20px;
  font-size: 14px;
  width: 80%;
  margin-left: 27px;
  margin-bottom: 23px;
}
    button{
     width:136px;
height:31px;
background:rgba(73,72,68,1);
border-radius:17px;
color: #FFFFFF;
border:none;
margin-left: 27px;
    }
 }
 .qy{
  width:92.533%;
height:300px;
background:rgba(255,255,255,1);
border-radius:12px;
margin-top: 11px;
.qy-title{
  display: flex;
  height: 66px;
  justify-content: center;
  align-items: center;
  font-weight:600;
  font-size: 16px;
  line-height: 22px;
}
   .weui-grid__icon{
     width: 3rem;
     height: 3rem;
   }
   .weui-grid:after{
    
     border-bottom: none;
   }
 }
}
</style>