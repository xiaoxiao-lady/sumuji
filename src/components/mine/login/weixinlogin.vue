<template>
  <div class="weixinlogin">
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
      code: '',

    }
  },
  methods: {
    GetQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    goLogin (code) {
      let data={
        code:this.code
      }
      if(localStorage.hasOwnProperty("tuijianren")){
        data.invitedCode=localStorage.getItem('tuijianren')
      }
      wxLogin(data).then(res => {
     // window.alert(JSON.stringify(res.data));
     let userName=res.data.userName;
         //存进去转为字符串 取出来转成对象
        if(userName!=null){
          this.$store.commit("setUserInfo",res.data);
          this.$router.go(-3);
        }else{
          this.$router.replace({name:'bindPhone',params:{id:JSON.stringify(res.data)}})
        }
       
     
      }).catch(res => {
      let that=this;
        setTimeout(function(){
          that.$router.push("/orderhome")
        },1000)
      })
    }
  },
  mounted () {
    this.code = this.GetQueryString('code');
   // window.alert(this.code)
    this.goLogin(this.code)
  }
}
</script>

<style lang="scss" >
.weixinlogin{
  background: #FFFFFF;
  height: 100vh;
}
</style>
