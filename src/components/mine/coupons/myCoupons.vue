<template>
  <div class="mycoupons">
    <tabGroup :title="title"></tabGroup>
    <div v-if="a">
      <coupons-group
        v-for="(item,key) in myCouponList"
        :key="key"
        :amount="item.amount"
        :minPoint="item.minPoint"
        :couponType="item.couponType"
        :platform="item.platform"
        :enableTime="item.useTime"
        :b="b"
        :status="item.useStatus"
      ></coupons-group>
    </div>
    <div class="b" v-else>
      <img src="./优惠券.png" />
      <p>暂时没有优惠券…</p>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import couponsGroup from './coupongroup'
import { getReceiveList } from '@/api/coupon'

export default {
  components: {
    tabGroup: tabGroup,
    couponsGroup: couponsGroup
  },
  data () {
    return {
      title: '我的优惠券',
      myCouponList: [],
      a: true,
      b: false
    }
  },
  props: {},
  mounted () {
    this.getReceiveList()
  },
  methods: {
    getback () {
      history.go(-1)
    },
    getReceiveList () {
 let data={
      userId:this.$store.getters.userInfo.userId,
       pageNum: 1,
       pageSize: 10
     }
     
        getReceiveList(data).then(response=>{
        console.log(response.data)
          this.myCouponList = response.data;
          });

    }
  }
}
</script>

<style lang="scss" >
.b {
  text-align: center;
  color: #d2d2d2;
  padding-top: 4rem;
  background: #ffffff;
  height: 32rem;
}
</style>
