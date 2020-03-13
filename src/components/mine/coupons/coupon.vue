<template>
  <div class="coupon">
    <tabGroup :title="title" :ab="ab" @toother="mycoupons"></tabGroup>
    <tab :scroll-threshold="4" class="tab" active-color="red">
      <tab-item v-for="(item,key) in list" :key="key" :selected="n===key">{{item}}</tab-item>
    </tab>
    <coupons-group
      v-for="(item,key) in CouponList"
      :key="key"
      :amount="item.amount"
      :minPoint="item.minPoint"
      :couponType="item.couponType"
      :receiveCount="item.receiveCount"
      :platform="item.platform"
      :enableTime="item.endTime"
      :b='true'
      @click.native="addReceive(item.couponId)"
    ></coupons-group>
  </div>
</template>

<script>
import { XHeader, Tab, TabItem, XProgress } from 'vux'
import tabGroup from '@/components/group/tab'
import couponsGroup from './coupongroup'
import { addReceive,getCouponList} from '@/api/coupon'
export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    XProgress,
    tabGroup: tabGroup,
    couponsGroup: couponsGroup
  },
  data () {
    return {
      list: ['全部', '素木集 ', ' 美妆坊', '品牌馆'],
      n: 0,
      title: '领券中心',
      ab: '我的优惠券',
      CouponList: []
    }
  },
  props: {},
  mounted () {
    this.getCouponList()
  },
  methods: {
    addReceive(couponId){//2主动获取 1后台赠送
      addReceive({userId:this.$store.getters.userInfo.userId,couponId:couponId,receiveType:2}).then(res=>{
          this.$message({
            message:res.message
          })
        })
    },
    getback () {
      this.$router.go(-1)
    },
    getCouponList () {

       getCouponList({
     pageNum: 1, pageSize:20
        })
        .then(res => {
          this.CouponList = res.data 
        })
    },
    mycoupons () {
      this.$router.push('./myCoupons')
    }
  }
}
</script>

<style lang="scss" >
//   .left-arrow {
//   position: absolute;
//   width: 30px;
//   height: 30px;
//   top: -5px;
//   left: -5px;
// }
// .boday {
//   padding: 0.875rem 0.875rem 0 0.875rem;
//   .left {
//     position: relative;
//     float: left;
//     border-radius: 0.25px 0rem 0rem 0.25rem;
//     height: 5.875rem;
//     width: 18.875rem;
//     background-color: #ffffff;
//     box-shadow: 0px 0.125rem 0.25rem 0px rgba(191, 191, 191, 0.5);
//     .quan {
//       position: absolute;
//       left: 7.5rem;
//       top: 0.5rem;
//       .weui-progress__inner-bar {
//         background-color: #ff214c;
//       }
//     }
//     .banyuan1 {
//       position: absolute;
//       left: 0rem;
//       top: 2.1rem;
//       width: 0.7rem;
//       height: 1.4rem;
//       background-color: #fbf9fe;
//       border-radius: 0 0.7rem 0.7rem 0;
//     }
//     .banyuan2 {
//       width: 0.7rem;
//       height: 1.4rem;
//       border-radius: 0.7rem 0rem 0rem 0.7rem;
//       background-color: #ff214c;
//       position: absolute;
//       left: 18.22rem;
//       top: 2.1rem;
//     }
//   }
//   .right {
//     height: 5.875rem;
//     background-color: #ff214c;
//     border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
//   }
// }
</style>