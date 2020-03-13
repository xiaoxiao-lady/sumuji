<template>
  <div class="recharge">
    <tabGroup :title="title"></tabGroup>
    <div class="part1">
      <h1>￥<input type="number" v-model="value"></h1>
      <p>充值金额</p>
    </div>
    <group title="选择付款方式">
      <radio  :options="radio003" ></radio>
    </group>
    <div class="anniubox">
     <big-anniu :title="title1"></big-anniu>
     </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import bigAnniu from '@/components/group/biganniu'
import { Radio, Group, Checklist } from 'vux'
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
      title: '充值',
      radio003: [{
        icon: require('@/components/cart/dingdan/微信支付.png'),
        key: '001',
        value: '微信支付'
      }, {
        icon: require('@/components/cart/dingdan/支付宝.png'),
        key: '002',
        value: '支付宝支付'
      }
      ],
      title1: '支付',
      value:null
    }
  },
  props: {},
  computed: {},
  methods: {

  }
}
</script>

<style lang="scss" >
  input{
    border:none;
  }
  input:focus{
    border:none;
  }
.recharge {

.anniubox{
     display: flex;
    justify-content: center;
    
}

  .part1{
background: #FFFFFF;
padding:1rem 2.1rem;
input{
  width: 80%;
  height: 50px;
   border-bottom:0.012rem solid #E6E6E6;
   text-align: left;
   font-size: 24px;
   font-weight: 600;
}
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
  
}
</style>