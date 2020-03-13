<template>
  <div class="login">
    <tab :title="title"></tab>
    <!-- <div class="tab">
    <img :src="cancal_img" class="img1" @click="getback()" />
    <span class="span1">绑定手机号</span>
    </div> -->
    <!-- 手机号 -->
    <InputGroup
      type="number"
      v-model="phone"
      placeholder="手机号"
      :disabled="disabled"
      :error="errors.phone"
      
    />
    <!-- 验证码 -->
    <InputGroup  :btnTitle="btnTitle" type="number" @btnClick="getVerifyCode" v-model="verifyCode" placeholder="验证码" :error="errors.code"/>

  <toast v-model='show_error' type="cancel">{{errorText}}</toast>
 <toast v-model='show_success' >{{success}}</toast>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button :disabled="isClick" @click="handleLogin">完成</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "./InputGroup";
import tab from './../../group/tab'
import {Toast } from 'vux'
import {getVerCode,wxBindMobile} from '@/api/user'
export default {
  name: "login",
  data() {
    return {
      phone: "",
      verifyCode: "",
      title:'绑定手机号',
      errors: {},
      btnTitle: "获取验证码",
      disabled: false,
      cancal_img:require('./../../../assets/search/返回.png'),
      errorText:'',
      success:'',
      show_success:false,
      show_error:false,
      userInfo:''
    };
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) return true;
      else return false;
    }
  },
  mounted(){
  
      this.userInfo = JSON.parse(this.$route.params.id);
  },
  methods: {
    handleLogin() {
      // 取消错误提醒
      this.errors = {};
      // 发送请求
      let data={
      verCode:this.verifyCode,
      mobile:this.phone,
      userId:this.userInfo.userId
      }
      
      wxBindMobile(data).then(res=>{
        if(res.code==200){
          console.log(res.code)
          this.$store.commit("setUserInfo",this.userInfo);
          this.success='绑定成功';
          this.show_success=true;
          let _this=this;
          setTimeout(function(){
          _this.$router.go(-3)
        },500)
        }else{
          this.errorText="绑定失败";
          this.show_error=true;
        }
      })
     
    },
    getVerifyCode() {
      if (this.validatePhone()) {
        this.validateBtn();
        // 发送验证码请求
        let data={
          userName:this.phone
        }
        getVerCode(data).then(res=>{
          console.log(res.data)
        })
       
      }
    },
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          // 倒计时
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    validatePhone() {
      // 验证手机号码
      if (!this.phone) {
        this.errors = {
          phone: "手机号码不能为空"
        };
        return false;
      } else if (!/^1[23456789]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "请填写正确的手机号码"
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    }
  },
  components: {
    InputGroup,
    Toast,
    tab
  }
};
</script>

<style scoped>
template{
  background: #fff;
}
.login {
  width: 100%;
  height: 100%;

  
}
.tab {
  display: flex;
  height:3.625rem;
  width: 100vw;
  justify-content:flex-start;
  align-items: center; 
  border-bottom: 1px solid #eee;

}

.span1{
  width:21.8125rem;
  height: 3.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  }
    .img1 {
   width: 0.625rem;
   height: 1.125rem;
   margin-left: 1rem;
  }



.login_btn {
  margin-top: 20px;
}

.login_btn button {
  width:85.33%;
height:48px;
background:linear-gradient(225deg,rgba(255,33,76,1) 0%,rgba(255,79,113,1) 100%);
box-shadow:0px 4px 8px 0px rgba(255,175,189,1);
border-radius:35px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
  margin-left:calc(100% - 92.66% ) ;
}
.login_btn button[disabled] {
  background:#ccc;
box-shadow:0px 4px 8px 0px #ccc;
}
</style>
