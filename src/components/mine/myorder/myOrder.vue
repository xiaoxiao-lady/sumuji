<template>
  <div class="myOrder">
    <tabGroup :title="title" ></tabGroup>
    <tab :scroll-threshold="5" active-color="red">
      <tab-item v-for="(item,key) in list" :key="key" @click.native="selectItemClick(key)"
                :selected="selectStatus===key">{{item}}</tab-item>
    </tab>
    <order-parts v-if="myOrderList.length > 0" :orderInfoList="myOrderList" :buy="buy" :myShoporder="myShoporder"></order-parts>
      <div v-else class="b">
       <img src="./订单.png" >
       <p>
        您暂时没有任何订单哦～～
       </p>
     </div>
  </div>
</template>

<script>
import { XHeader, Tab, TabItem } from 'vux'
import orderParts from './orderparts'
import tabGroup from '@/components/group/tab'
import {getMyOrderList} from '@/api/order'
export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    orderParts: orderParts,
    tabGroup: tabGroup
  },
  data () {
    return {
      list: ['全部', '待付款', '待发货', '待收货', '待评价'],
      selectStatus: this.$route.query.key || 0,
      title: '我的订单',
      a: true,
      title1: '官方旗舰店',
      title2: '卖家已发货',
      buy: true,
      myOrderList: [],
      myShoporder:false
    }
  },
  props: {},
  mounted () {
    this.getMyOrderList()
  },
  methods: {
    getback () {
      this.$router.push({path: '/', query: {index: this.$route.query.from}})
    },
    getMyOrderList (status) {
      // 1表示待付款，2表示待发货，3表示待收货，4待评价，5表示交易完成
      getMyOrderList({pageNum: 1, pageSize: 100, userId: this.$store.getters.userInfo.userId, status: status}).then(response => {
        console.log(response)
        this.myOrderList = response.data
       
      })
    },
    selectItemClick (key) {
      console.log(key)
      if (key===0){key=''}
      this.myOrderList = [];
      this.getMyOrderList(key)
    }
  }

}
</script>

<style lang="scss" scoped>
.myOrder{
  .left-arrow {
  position: absolute;
  width: 30px;
  height: 30px;
  top: -5px;
  left: -5px;
}
 .b{
    text-align: center;
    color: #D2D2D2;
    padding-top:4rem;
    background-color: #ffffff;
  }
  /*.vux-tab-wrap {
    padding-top: 1.81rem;
}*/

}

</style>
