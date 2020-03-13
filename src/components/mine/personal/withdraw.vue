<template>
  <div class="withdraw">
    <tabGroup :title="title"></tabGroup>
    <div class="part1">
      <h1>¥ <input class="input" v-model="money" type="number"></h1>
      <p>
<span>提现金额</span>
<span class="fr">请在周一至周四提现</span>
      </p>

    </div>
    <group title="提现到支付宝">
          <x-input title="账号" v-model="account"></x-input>
              <x-input title="姓名" v-model="realName"></x-input>
    </group>
    <div class="anniubox">
     <big-anniu :title="title1" @click.native="withdraw()"></big-anniu>
     </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import bigAnniu from '@/components/group/biganniu'
import { Radio, Group, XInput } from 'vux'
import {applyWithdraw,addTransfer} from '@/api/deal'

const frompath='';
export default {
  components: {
    tabGroup: tabGroup,
    Radio,
    Group,
    XInput,
    bigAnniu: bigAnniu
  },
  data () {
    return {
      title: '提现',
      title1: '提交',
      realName:null,
      money:null,
      account:null,
    }
  },
  props: {},
  computed: {},
 beforeRouteEnter (to, from, next) {
    next(vm => {          //  这里的vm指的就是vue实例，可以用来当做this使用
    if(from.path=='/addhui'){
      vm.money=29
      console.log(vm.money)
     }
    })
  },
  methods: {
    withdraw () {
        if(this.realName!=null&&this.money!=null&&this.account!=null){//支付宝type1 微信2
            addTransfer({userId:this.$store.getters.userInfo.userId, payeeAccount: this.account, realName: this.realName, amount: this.money,payeeType:1}).then(response=>{
          this.$message({
              type: 'success',
              message: response.message
          });

        });
          }else{
            this.$message({
              message:'请确保信息完整'
            })
          }
      

    }



  }
}
</script>

<style lang="scss" >
.withdraw {

.anniubox{
     display: flex;
    justify-content: center;
    
}
  .part1{
background: #FFFFFF;
padding:1rem 2.1rem;
.input{
  border:none;
  color:#3B3A3A;
  font-size: 2.125rem;
  width: 90%;
  height:35px; 
  text-align: left;
}
h1{
  border-bottom:0.012rem solid #E6E6E6;
}
p{
  color: #9A9A9A;
  margin-top: 0.8rem;
  font-size: 0.75rem;
}
.fr{
  float: right;
}
  }


}
</style>
