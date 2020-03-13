<template>
  <div class="register">
    <tabGroup></tabGroup>
    <h2>注册</h2>
    <group>
      <x-input placeholder="请输入手机号码" v-model="phone">
        <img slot="right-full-height" src="./删除.png" @click="clear(1)"/>
      </x-input>
      <x-input class="weui-vcode" placeholder="输入短信验证码" :show-clear="false" v-model="verCode">
        <button slot="right" class="button" @click="getCode()" v-if="!showCountDownBtn">{{getCodeBtn}}</button>
        <button slot="right" class="button" v-if="showCountDownBtn">{{countDownBtn}}</button>
      </x-input>
      <x-input placeholder="请设置密码" v-model="password" type='password'>
        <img slot="right-full-height" src="./删除.png" @click="clear(2)"/>
      </x-input>
      <x-input placeholder="确认密码" v-model="qpassword" type='password'>
        <img slot="right-full-height" src="./删除.png" @click="clear(3)"/>
      </x-input>
    </group>
    <div class="gcs-checkbox">
      <input type="checkbox" v-model="agreeCheck" id="agree" />
      <label for="agree">
        继续注册表示同意并同意
        <span>《妃立宝服务条款》</span>
      </label>
      <big-anniu :title="anniu" @click.native="orderhome()"></big-anniu>
      <div class="center" @click="login()">账号密码登录</div>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import bigAnniu from '@/components/group/biganniu'
import {getCode, register} from '../../../api/user'
import { XInput, Group, Grid, GridItem } from 'vux'
export default {
  components: {
    tabGroup: tabGroup,
    bigAnniu: bigAnniu,
    XInput,
    Group,
    Grid,
    GridItem
  },
  data () {
    return {
      anniu: '注册',
      line: '请选择授权登录方式',
      phone: '18437931109',
      qpassword: '',
      password: '',
      verCode: '',
      time: 60,
      showCountDownBtn: false,
      countDownBtn: '60s',
      getCodeBtn: '获取动态码',
      agreeCheck: false
    }
  },
  props: {},
  computed: {},
  methods: {
    login () {
      this.$router.push('/login')
    },
    orderhome () {
      if (this.password !== this.qpassword || !this.agreeCheck) {
        return
      }
      register({
        userName: this.phone,
        verCode: this.verCode,
        password: this.password,
        confPassword: this.qpassword
      }).then(res => {
        console.log(res)
        if (res.data.data) {
          this.phone = ''
          this.verCode = ''
          this.password = ''
          this.qpassword = ''
          this.$router.push('/orderhome')
        }
      }).catch(e => {

      })
    },
    // 清空内容 1 手机号  2 密码   3 确认密码
    clear (type) {
      switch (type) {
        case 1:
          this.phone = '';
          break;
        case 2:
          this.password = '';
          break;
        case 3:
          this.qpassword = '';
          break;
        default:
          break;
      }
    },
    getCode () {
      getCode({userName: this.phone, codeType: 1}).then(res => {
        console.log(res);
        this.showCountDownBtn = true;
        let timer = setInterval(() => {
          this.time --;
          if (this.time <= 0) {
            this.time = 60;
            this.showCountDownBtn = false;
            this.getCodeBtn = '重新获取';
            clearInterval(timer)
          }
          this.countDownBtn = this.time + 's';
        }, 1000)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" >
.register {
  background: #ffffff;
  height: 100vh;
  .tab {
    border: none;
  }
  h2 {
    margin-top: 1.81rem;
    padding-left: 1.5rem;
  }
  .button {
    width: 5.63rem;
    height: 1.875rem;
    border-radius: 0.9375rem;
    border: 0.0625rem solid rgba(255, 47, 87, 1);
    color: #ff2a53;
    background: #ffffff;
  }
  .center {
    text-align: center;
    font-size: 0.82rem;
    color: #1987ff;
  }
  .gcs-checkbox {
    font-size: 0.82rem;
    margin-top: 1rem;
    margin-left: 1.5rem;
    input {
      width: 1.1rem;
      height: 1.1rem;
      border: #ff90a5;
      background-color: #fff2f4;
      float: left;
      margin-right: 1rem;
    }
  }
  span {
    color: #ff2851;
    line-height: 1.1rem;
  }
  .vux-x-input-right-full {
    line-height: 3.3rem;
    img {
      height: 1.3rem;
      margin-right: 1rem;
    }
  }
}
</style>
