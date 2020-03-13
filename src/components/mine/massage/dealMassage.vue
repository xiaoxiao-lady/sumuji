<template>
  <div class="dealMassage">
    <tabGroup :title="title"></tabGroup>
    <div>
      <div class="time">
        <span>2017-08-13 23:14</span>
      </div>
     <div class="div1">
       <span>您的订单已发货</span>
       <p style="float:right; color: #999999;
    font-size: 0.75rem;">2017-08-13 23:14</p>
       <div>
         <img src="" class="img" >
         <div>
         妃立宝洗衣包青春版50g
         </div>
         <div style="color:#999999; font-size:0.69rem;">
          粉红色
         </div>
       </div>

     </div>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
export default {
  components: {
    tabGroup: tabGroup
  },
  data () {
    return {
      title: '妃立宝洗衣宝青春宝'
    }
  },
  props: {},
  computed: {
    src () {}
  },
  methods: {}
}
</script>

<style lang="scss" >
.dealMassage {
  .time {
    text-align: center;
    height: 1.1rem;
    line-height: 1.1rem;
    margin: 0.75rem 0;
    color: #999999;
    font-size: 0.75rem;
  }
  .div1{
    background: #FFFFFF;
    margin: 0.75rem;
    padding: 0.75rem;
    .img{
      margin: 0.75rem;
    }
  }
}
</style>