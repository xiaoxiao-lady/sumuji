<template>
  <div class="massage">
    <tabGroup :title="title"></tabGroup>
    <div class="div1"  @click="go_systemMsg">
       <el-badge :value="systemBadgeNum" class="badge-item" :hidden="systemMsgBadge">  </el-badge>
      <img :src="systemImg" style="float:left;"/>
    
      <div class="content-info">
        <p>系统消息</p>
         <p style="color:#999999;font-size:0.75rem">有新的动态去看看吧</p>
      </div>

      <img :src="To"  class="fr"/>
    </div>

     <div class="div1" style="margin-top:0.085rem;" @click="go_orderMsg" >
      <el-badge :value="orderBadgeNum" class="badge-item" :hidden="orderMsgBadge">
      <img :src="orderImg" style="float:left;"/>
      </el-badge>
      <div class="content-info">
        <p>交易信息</p>
         <p style="color:#999999;font-size:0.75rem">有新的动态去看看吧</p>
      </div>

      <img :src="To"  class="fr"/>
    </div>
    

     <div class="div1" style="margin-top:0.085rem;" @click="go_logistics">
      <el-badge :value="logisticBadgeNum" class="badge-item" :hidden="logisticsMsgBadge">
      <img :src="logisticsImg" style="float:left;"/>
      </el-badge>
     <div class="content-info">
        <p>物流信息</p>
        <p style="color:#999999;font-size:0.75rem" v-show="!logisticsMsgBadge">有新的动态去看看吧</p>
      </div>


      <img :src="To"  class="fr"/>
    </div>
    
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Group, Cell, Badge } from 'vux'
import {getMessageList} from '@/api/home'
import { mapGetters } from "vuex"
export default {
  components: {
    tabGroup: tabGroup,
    Group,
    Cell,
    Badge
  },
  data () {
    return {
      title: '消息',
      orderImg:require('../../../assets/msg/orderMsg.png'),
      systemImg:require('../../../assets/msg/systemMsg.png'),
      logisticsImg:require('../../../assets/msg/logisticsMsg.png'),
      To:require('../../../assets/msg/to.png'),
      orderMsg:[],
      systemMsg:[],
      logisticsMsg:[],
       orderBadgeNum:'',
  systemBadgeNum:'',
  logisticBadgeNum:''
    }
  },
  props: {},
  computed: {
    ...mapGetters({'logisticsMsgBadge':"GetlogisticsMsgBadge",
      "orderMsgBadge":"GetorderMsgBadge","systemMsgBadge":"GetsystemMsgBadge"})
  },
  created(){
  
   this.orderBadgeNum=this.$route.query.orderBadgeNum;
    this.systemBadgeNum=this.$route.query.systemBadgeNum;
   this.logisticBadgeNum=this.$route.query.logisticBadgeNum;

  },
  methods: {
    go_logistics(){
           this.$store.commit('setlogisticsMsgBadge',true);
      this.$router.push('./logisticsMsg');
    },
    go_orderMsg(){
      this.$store.commit('setorderMsgBadge',true);
      this.$router.push('./orderMsg');
    },
    go_systemMsg(){
     this.$store.commit('setsystemMsgBadge',true);
      this.$router.push('./systemMsg');
    }
  }
}
</script>

<style lang="scss" >
.massage {
  .div1 {
    padding: 0.875rem 1.56rem;
background:rgba(255,255,255,1);
border-radius:0.25rem;
margin-top: 0.625rem;
.fr{
  float: right;
  margin-top: -1.8rem;
}
  }
.badge-item{
  display: inline;
}
.content-info{
  margin-left:20%;
  height: 40px;
}
}
</style>