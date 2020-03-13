<template>
  <div class="fukuan">
    <tabGroup :title="title" ></tabGroup>
    <div class="body">
      <span>
        <img src="./1.png" >
        <p>
          请在
          <span>
12小时00分09秒
          </span>
          内完成支付 
        </p>
        <p>
          需支付
          <span>
            ¥100.0
          </span>
        </p>
      </span>
    </div>
       <group title="选择付款方式">
      <radio  :options="radio003" ></radio>
    </group>
    

    
    
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Radio, Group, Checklist } from 'vux'

export default {
  components: {
    tabGroup: tabGroup,
    Radio,
    Group,
    Checklist

  },
  data () {
    return {
      title: '确认订单',
      radio003: [{
        icon: require('./微信支付.png'),
        key: '001',
        value: '微信支付'
      }, {
        icon: require('./支付宝.png'),
        key: '002',
        value: '支付宝支付'
      },
      {
        icon: require('./银联支付.png'),
        key: '003',
        value: '银联支付'
      }
      ],
      commonList: 1,
      checklist003: 2

    }
  },
  props: {},
  computed: {},
  methods: {

  }
}
</script>

<style lang="scss" >
.fukuan {
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
  .body{
    text-align: center;
    background-color: #FFFFFF;
    padding-top:1.625rem;
    padding-bottom:1.625rem;
  }
 
}
</style>