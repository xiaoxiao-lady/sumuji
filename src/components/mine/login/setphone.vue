<template>
  <div class="setphone">
    <tabGroup :title="title"></tabGroup>

    <group>
      <x-input placeholder="请输入手机号码" v-model="userInfo.nickname">
        <img
          slot="right-full-height"
          src="https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg"
        />
      </x-input>
      <x-input class="weui-vcode" placeholder="填写验证码">
        <button slot="right" class="button">获取动态码</button>
      </x-input>
    </group>
    <big-anniu :title="anniu"></big-anniu>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import bigAnniu from '@/components/group/biganniu'
import { XInput, Group } from 'vux'
export default {
  components: {
    tabGroup: tabGroup,
    bigAnniu: bigAnniu,
    XInput,
    Group
  },
  data () {
    return {
      title: '绑定手机号码',
      anniu: '完成',
      userInfo: {}
    }
  },
  methods: {
    GetQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    getToken () {
      this.$http.get('https://api.weixin.qq.com/sns/oauth2/access_token?' +
        'appid=wx67b189682f0cdbc0' +
        '&secret=ad876e8626075b0bc52e0adccbd07fcb' +
        '&code=' + this.code +
        '&grant_type=authorization_code').then(res => {
          console.log(res.access_token)
        // https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
          if (res.access_token) {
            this.$http.get('https://api.weixin.qq.com/sns/userinfo?' +
              'access_token=' + res.access_token +
              '&openid=' + res.openid +
              '&lang=zh_CN').then(res => {
                this.userInfo.nickname = res.nickname
              })
          }
        })
    }
  },
  mounted () {
    this.code = this.GetQueryString('code')
    if (this.code) {
      this.getToken()
    }
  }
}
</script>

<style lang="scss" >
.setphone {
  background: #ffffff;
  height: 100vh;
  .button{
    width:5.63rem;
height:1.875rem;
border-radius:0.9375rem;
border:0.0625rem solid rgba(255,47,87,1);
color: #FF2A53;
background: #ffffff;
  }
.weui-vcode.weui-cell{
    border-bottom:0.0625rem solid #D9D9D9;

  }
}
</style>
