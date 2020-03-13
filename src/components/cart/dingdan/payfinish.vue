<template>
  <div class="payfinish">
    <tabGroup :title="title"></tabGroup>
    <div class="body">
  <img src="./2.png" >
  <div style="margin-top:1.8rem;">
 <an-niu :title="title1"></an-niu>
  <an-niu :title="title2" class="anniu2"></an-niu>
  </div>
    </div>
  <you-like></you-like>
  
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import anNiu from '@/components/group/anniu'
//import youLike from '@/components/group/youlike'
import { Group } from 'vux'

export default {
  components: {
    tabGroup: tabGroup,
    Group,
    anNiu: anNiu,
    youLike: youLike
  },
  data () {
    return {
      title: '确认订单',
      title1: '查看订单',
      title2: '返回首页'
    }
  },
  props: {},
  computed: {},
  methods: {}
}
</script>

<style lang="scss" >
.payfinish {
  .body{
text-align: center;
padding-top: 1.75rem;
padding-bottom: 2rem;
background: #FFFFFF;
 .anniu2{
   margin-left:1rem;
   color: #FF2E57;
   background: #FFFFFF;
   border:1px solid #FF2E57
 }
  }
.cai[data-v-3d94bc74]{
  background: #F6F6F6;
  padding-top: 1.5rem;
    margin-top:0; 
}
  
}
</style>