<template>
  <div class="login">
    <tabGroup></tabGroup>
    <h2>登录</h2>
    <group>
      <x-input placeholder="请输入手机号码" v-model="phone">
        <img slot="right-full-height" src="./删除.png" @click="clear()"/>
      </x-input>
      <x-input class="weui-vcode" placeholder="输入短信验证码" :show-clear="false" v-model="verCod">
        <button slot="right" class="button">获取动态码</button>
      </x-input>
    </group>
    <span class="fr" @click="changepassword()">忘记密码？</span>
    <big-anniu :title="anniu" @click.native="success()"></big-anniu>
    <div class="center">
      <span @click="mimalogin()">账号密码登录</span>
      丨
      <span @click="register()">新用户注册</span>
    </div>
    <div style="position:fixed; bottom:0rem; left:0rem; width:100vw;">
      <div class="border">
        <span>请选择授权登录方式</span>
      </div>
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item
          v-for="(item,key) in list"
          :key="key"
          :label="item.label"
          @click.native="empower(item.router)"
        >
          <img slot="icon" :src="geticon(item.src)" />
        </grid-item>
      </grid>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import bigAnniu from '@/components/group/biganniu'
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
      anniu: '登录',
      list: [
        { label: '微信', src: '微信', router: 'weixinlogin' },
        { label: 'QQ', src: 'qq', router: '' },
        { label: '微博', src: '微博', router: '' },
        { label: '短信登录', src: '短信', router: '' }
      ],
      phone: '',
      verCod: ''
    }
  },
  props: {},
  computed: {},
  methods: {
    geticon (a) {
      return require('./img/' + a + '.png')
    },
    empower (a) {
      this.$router.push('/' + a)
    },
    login () {
      this.$router.push('/login')
    },
    register () {
      this.$router.push('/register')
    },
    changepassword () {
      this.$router.push('/changepassword')
    },
    success () {
      this.$http
        .post('sumuji-server/user/acLogin', {
          userName: this.phone,
          verCod: this.verCod
        })
        .then(res => {
          if (res.data.data === true) {
            this.phone = ''
            this.verCod = ''
            this.$router.push({
              path: '/',
              query: { from: this.$route.query.index }
            })
          }
        })
    },
    clear () {
      this.phone = ''
    }
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