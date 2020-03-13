<template>
  <div class="weixinlogin">
    <tabGroup :title="title"></tabGroup>
   
    <div class="container">
       <div class="logo"><img :src="logo_img" /></div>
        <big-anniu :title="wx_anniu" :icon='wx_img' class="wx_btn" @click.native="wechatLogin()"></big-anniu>
       <!--  <big-anniu :title="phone_anniu" class="phone_btn" :icon="phone_img"></big-anniu> -->
       <div class="bottmBox">
        <div class="bottom_rule">登录即表示同意<p class="rule">《素木集服务条款》</p></div>
        </div>
     </div>
     
  </div>

</template>

<script>
import tabGroup from '@/components/group/tab'
import bigAnniu from '@/components/group/biganniu'
import {wxLogin} from '@/api/user'
export default {
  components: {
    tabGroup: tabGroup,
    bigAnniu: bigAnniu
  },
  data () {
    return {
      title: '登录',
      wx_anniu: '微信授权登录',
      phone_anniu:'验证码登录',
      wx_img: require('../img/微信.png'),
     phone_img:require('./img/phoneNumber.png'),
     logo_img:require('./img/logo.jpg'),
    }
  },
  props: {},
  computed: {},
  methods: {
      wechatLogin () {
      const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
        'appid=wx67b189682f0cdbc0&redirect_uri=' + encodeURIComponent('http://sumuji.techwells.com/#/weixinlogin') +
        '&response_type=code&scope=snsapi_userinfo&state=1324123#wechat_redirect';
         window.location.replace(url);
         
   
      
    
    }
     //  wxLogin().then(res=>{
     //     let that=this;
     //    setTimeout(function(){
     //      that.$router.push("/orderhome")
     //    },3000)
     // localStorage.setItem('userInfo',res.data);
     //   this.$store.commit("set_UserInfo",res.data);
      
     //  })
        
   

  }
}
</script>

<style lang="scss" >
.weixinlogin{
  background: #FFFFFF;
  height: 100vh;
 .container{
  margin-top: 59px;
  height: 300px;
    display: flex;
    flex-direction:column;
    align-content:center;
    align-items:center;
    justify-content:space-around;
    .bottmBox{
      width:100%;
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
   .logo>img{
    width: 72px;
    height: 72px;
    }
    .wx_btn,.phone_btn{
width:320px;
height:48px;
background:linear-gradient(180deg,rgba(145,242,74,1) 0%,rgba(4,89,18,1) 100%);

border-radius:35px;
font-size: 14px;
font-weight: lighter;
display: flex;
justify-content:center;
align-items: center;
line-height:20px;
    }
   .phone_btn{
     background:linear-gradient(225deg,rgba(255,33,76,1) 0%,rgba(255,79,113,1) 100%);
     box-shadow:0px 4px 8px 0px rgba(255,175,189,1);
    }
    .bottom_rule{
      width:auto;
      height: 18px;
      font-size:13px;
font-weight:400;
color:rgba(25,25,25,1);
line-height:18px;
.rule{
   font-size:13px;
font-weight:400;
display: inline;
color: #FF2851;
}
    }
  }
}
</style>