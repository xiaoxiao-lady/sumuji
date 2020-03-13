<template>
  <div class="payfor">
    <tabGroup :title="title"></tabGroup>
    <div class="part1"><!-- 前端显示拼团价格 -->
      <h1 >￥{{$store.getters.totalPrice}}</h1>
      <p>订单费用</p>
    </div>
    <group title="选择付款方式">
      <radio :options="radio003" v-model='payWay'></radio>
    </group>
     <big-anniu :title="title1" @click.native="pay()" style="margin-left: 6.5%;"></big-anniu>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import bigAnniu from '@/components/group/biganniu'
import {getJsApiProperty, getPrepayId } from '@/api/order'
import {getAccessToken } from '@/api/user'
import { Radio, Group, Checklist } from 'vux'
import wx from 'weixin-js-sdk'
export default {
  components: {
    tabGroup: tabGroup,
    Radio,
    Group,
    Checklist,
    bigAnniu: bigAnniu
  },
  data () {
    return {
      title: '支付',
      radio003: [
        // {
        //   icon: require('@/components/cart/dingdan/余额.png'),
        //   key: '001',
        //   value: '余额支付'
        // },
        {
          icon: require('@/components/cart/dingdan/微信支付.png'),
          key: '002',
          value: '微信支付'
        },
        //  {
        //   icon: require('@/components/cart/dingdan/支付宝.png'),
        //   key: '003',
        //   value: '支付宝支付'
        // }
      ],
      title1: '支付',
      payWay: '',
      //  TODO 判断有没有微信授权 赋值用户信息里面的openID
      orderId:'',
      code: '',
    }
  },
  props: {},
  created () {
    console.log(this.$route.query.orderIds);
    this.orderId=this.$route.query.orderIds;
    //this.getJsApiProperty()
  },
  computed: {
  },
  methods: {
    pay () {
      if (this.payWay === '001') {

      } else if (this.payWay === '002') {
      //   微信支付
//window.alert(this.openId)
          getPrepayId({
            userId:this.$store.getters.userInfo.userId,
            orderIds:this.orderId
          })
          // .then(res => {
          //   const msg = res.data;
          //   wx.chooseWXPay({
          //     'timestamp': msg['timestamp'], // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          //     'nonceStr': msg['nonceStr'], // 支付签名随机串，不长于 32 位
          //     'package': msg['package'], // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          //     'signType': msg['signType'], // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          //     'paySign': msg['paySign'], // 支付签名
          //     success: function (res) {
          //       // 支付成功 跳转页面
          //       window.alert(JSON.stringify(res))
          //     },
          //     cancel: function () {
          //     }
          //   });
          // })
          .then(res=>{
            if(res.code!=200){
                this.weiChatlogin();
            }
            var jsonResult =res.data;

                WeixinJSBridge.invoke('getBrandWCPayRequest',{
                   "appId" : jsonResult.appId, //公众号名称，由商户传入
                   "timeStamp" : jsonResult.timeStamp, //时间戳
                   "nonceStr" : jsonResult.nonceStr, //随机串
                   "package" : jsonResult.package,//扩展包
                   "signType" : jsonResult.signType, //微信签名方式:默认使用sha1，使用新版支付需传入MD5
                   "paySign" : jsonResult.paySign //微信签名
                },
                function(res){
                  if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    window.location.href = "http://sumuji.techwells.com/";
                    
                  }else{
                    alert("取消支付");
                  }
                });
          
          })
          .catch(e => {
            
          })
       
        
        
      } else {

      }
    },
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
          window.alert(JSON.stringify(e))
        })
    },
    weiChatlogin () {
      const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
        'appid=wx67b189682f0cdbc0&redirect_uri=' + encodeURIComponent(window.location.href) +
        '&response_type=code&scope=snsapi_userinfo&state=1324123#wechat_redirect';
      window.location.replace(url);
    },
    GetQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    getAccessToken () {
      getAccessToken({code: this.code
      }).then(res => {
       // window.alert(JSON.stringify(res))
        this.openId = res.data.openid
      }).catch(res => {
       window.alert(JSON.stringify(res))
      })
    }
  },
  mounted () {
    this.code = this.GetQueryString('code')
    //传了一个啥 构建了一个含有code目标的正则表达式对象
    if (this.code) {
      this.getAccessToken()
    }
  },
  watch: {
    payWay (val) {
      this.payWay = val;
    }
  }
}
</script>

<style lang="scss" >
.payfor {
  .part1{
background: #FFFFFF;
text-align: center;
padding-top:2.5rem;
padding-bottom:1.5rem;
p{
  color: #9A9A9A;
  margin-top: 0.8rem;
  font-size: 0.75rem;
}
  }
    .weui-icon-checked{
    display: inline-block;
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 1.2rem;
    border: 1px solid #CCCCCC;
  }
  .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
      color: #FFFFFF;
      background-color: #FF2E57;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 1.4rem;
      position: relative;
      right: 0.3rem;
      top:-0.1rem
  }
  .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
      display: block;
      content: '\EA08';
      font-size: 20px;
  }

}
</style>
