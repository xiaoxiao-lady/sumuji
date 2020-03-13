<template>
  <div class="login">
    <tabGroup></tabGroup>
    <h2>密码登录</h2>
    <group>
      <x-input placeholder="请输入手机号码" v-model="userInfo.nickname">
        <img slot="right-full-height" src="./删除.png" @click="clear()" />
      </x-input>
      <x-input class="weui-vcode" placeholder="输入密码" v-model="password" type="password">
        <img slot="right-full-height" src="./删除.png" @click="clear1()" />
      </x-input>
    </group>
    <span class="fr" @click="changepassword()">忘记密码？</span>
    <big-anniu :title="anniu" @click.native="orderhome()"></big-anniu>
    <div class="center">
      <span @click="login()">{{userInfo.nickname}}</span>
      丨
      <span @click="register()">{{code}}</span>
    </div>
    <div style="position:fixed; bottom:0rem; left:0rem; width:100vw;">
      <div class="border">
        <span>请选择授权登录方式</span>
      </div>
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item label="微信">
          <img slot="icon" src="./img/微信.png" @click="weiChatlogin()" />
        </grid-item>
        <grid-item label="QQ">
          <img slot="icon" src="./img/qq.png" />
        </grid-item>
        <grid-item label="微博">
          <img slot="icon" src="./img/微博.png" />
        </grid-item>
        <grid-item label="短信登录">
          <img slot="icon" src="./img/短信.png" />
        </grid-item>
      </grid>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import bigAnniu from '@/components/group/biganniu'
import { XInput, Group, Grid, GridItem } from 'vux'
import { login } from '@/api/user'
import axios from 'axios'

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
      anniu: '登录',
      line: '请选择授权登录方式',
      phone: '',
      password: '',
      code: '',
      userInfo: {username: ''}
    }
  },
  props: {},
  computed: {},
  methods: {
    login () {
      this.$router.push('/acLogin')
    },
    register () {
      this.$router.push('/register')
    },
    orderhome () {
      let params = new URLSearchParams()
      params.append('userName', this.phone)
      params.append('password', this.password)

      login(params).then(response => {
        this.user = response.data

        this.$router.push({
          path: '/',
          query: { from: this.$route.query.index }
        })

        // this.$message({
        //   type: 'success',
        //   message: '登录成功!'
        // })
      })
    },

    clear () {
      this.phone = ''
    },
    clear1 () {
      this.password = ''
    },
    changepassword () {
      this.$router.push('/changepassword')
    },
    weiChatlogin () {
      const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
        'appid=wx67b189682f0cdbc0&redirect_uri=' + encodeURIComponent('http://sumuji.techwells.com/#/weixinlogin') +
        '&response_type=code&scope=snsapi_userinfo&state=1324123#wechat_redirect';
      window.location.replace(url);
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" >
.login {
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
  .fr {
    float: right;
    margin-right: 1.5rem;
    margin-top: 0.82rem;
    color: #1987ff;
    font-size: 0.82rem;
  }
  .center {
    text-align: center;
    font-size: 0.82rem;
    color: #1987ff;
  }
  .border {
    border-top: 0.0625rem dashed #999999;
    text-align: center;

    span {
      font-size: 0.82rem;
      color: #999999;
      position: relative;
      top: -1rem;
      background-color: #ffffff;
    }
  }
  .weui-grid__icon {
    height: 2.93rem;
    width: 2.93rem;
  }
  .weui-grids:before {
    border: none;
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
