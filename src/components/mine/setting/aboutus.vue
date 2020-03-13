<template>
  <div class="aboutus">
    <tabGroup :title="title"></tabGroup>
    <div class="icon">
      <img src="./logo.jpg"/>
      <p>V 1.0.1</p>
    </div>
    <div class="text">
素木集是一个潜心为会员服务的平台，不断搜集优惠的商品入驻到平台，也不断开发自有品牌商品，降低成本，让会员买到优质又实惠的商品。拥有良好的推荐和商家机制，让为平台提供服务的会员，获得更多收益。
    </div>
  <!--   <div class="xx">
      <span>
全国客服热线1
      </span>
      <span class="fr">
400-153-8999
      </span>
    </div> -->
 <!--       <div class="xx">
      <span>
全国客服热线2
      </span>
      <span class="fr">
400-153-8888
      </span>
    </div> -->
       <div class="xx">
      <span>
客服邮箱
      </span>
      <span class="fr">
19470939@qq.com      </span>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Group } from 'vux'

export default {
  components: {
    tabGroup: tabGroup,
    Group
  },
  data () {
    return {
      title: '关于我们'
    }
  },
  props: {},
  computed: {},
  methods: {}
}
</script>

<style lang="scss" >
.aboutus {
 
  background-color:#FFFFFF;
  height: 100vh;
  .icon {
      border-top:0.0125rem solid #F1F1F1;
    text-align: center;
    padding-top: 2.8rem;
    img{
     width: 72px;
     height: 72px;
    }
  }
  .text{
    font-size:0.82rem;
    line-height: 1.31rem;
    margin: 1rem  2.5rem 5rem 2.5rem;

  }
  .xx{
     padding:0.875rem;
      border-bottom:0.0125rem solid #F1F1F1;
    .fr{
      float: right;
      color:#999999;
      font-size:0.875rem;
     
     
    }
  }
}
</style>