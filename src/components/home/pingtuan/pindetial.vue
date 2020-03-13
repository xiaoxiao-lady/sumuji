<template>
  <div class="pin">
    <div class="white">
      <div class="red"></div>
    </div>
    <div class="header">
      <img src="./返回1.png" @click="toback()" style=" float:left;
    padding-left: 0.85rem;" />
      <span>拼团详情</span>
    </div>
    <div class="padding">
      <goods-detial
        class="detial"
        :title="groupondata.productName"
        :describe="groupondata.description"
        :cost="groupondata.originalPrice"
        :cost1="groupondata.currentPrice"
        :icon="groupondata.productIcon"
      ></goods-detial>
      <div style=" margin-top:0.5rem; text-align:center;">
        <img src="./img.png" style="margin-top:1rem;" />
        <div>
          <clocker class="clock">
            <span>00</span>:
            <span>00</span>:
            <span>00</span>
          </clocker>
        </div>
        <p style="width:9rem; margin:auto; margin-top:1rem;">2人成团，还差1人</p>
        <div class="person">
          <div  class="fl">
            <img :src="groupondata.userIcon" class="img" />
            <div class="word">{{groupondata.nickName}}</div>
          </div>
          
          <div class="fl">
            <img  class="img" />
            <div class="word">待邀请</div>
          </div>
        </div>
        <div class="anniu">
        <big-anniu :title="a" @click.native="goPintuan"></big-anniu>
        </div>
        <div style="color:#999999; font-size:0.69rem;width:11rem; margin:auto">拼团须知 人满发货，人不满退款</div>
      </div>
    </div>
  </div>
</template>

<script>
import goodsDetial from '@/components/group/goodsdetial'
import { Clocker, XButton } from 'vux'
import bigAnniu from '@/components/group/biganniu'
import {getJoinDetail} from '@/api/groupon'

export default {
  components: {
    goodsDetial: goodsDetial,
    Clocker,
    XButton,
    bigAnniu: bigAnniu
  },
  data () {
    return {
      list: [
        { name: '1', img: '', cost: '1', count: 1 },
        { name: '1', img: '', cost: '2', count: 2 },
        { name: '2', img: '', cost: '3', count: 3 }
      ],
      a: '立即参团',
      groupondata: {}
    }
  },

  methods: {
    toback () {
      this.$router.go(-1);
    },
    getJoinDetail (e) {
      console.log(e)
      getJoinDetail(e).then(response => {
        console.log(res)
        this.groupondata = res.data
      })
    },
    goPintuan(){
      //跳转到支付页面，支付两人拼团价格-->跳转到恭喜拼团成功页面
    }
  },
  mounted () {
    this.getJoinDetail(this.$route.query.joinId);
  }
}
</script>

<style lang="scss" scoped>
.pin {
  background-color: #ffffff !important;
  .white {
    margin-top: -21rem;
    .red {
      background-image: linear-gradient(to bottom, #ff718d, #ff254f);
      height: 32rem;
      width: 32rem;
      border-radius: 32rem;
      position: absolute;
      margin-left: 50vw;
      left: -16rem;
      margin-top: 2rem;
    }
  }
  .header {
    position: relative;
    top: 24rem;
    text-align: center;
    color: #ffffff;
  }
  .padding {
    padding: 0.75rem;
    position: relative;
    top: 24rem;
    .detial {
      box-shadow: 0px 0.18rem 0.375rem 0px rgba(255, 228, 233, 1);
      border-radius: 0.31rem;
    }
    .clock {
      color: #ff2550;
      margin-left: 7.5rem;
      margin: auto;
      span {
        background-color: #ff2550;
        margin: 0.5rem;
        color: #ffffff;
      }
    }
  }
  .like {
    background-color: #ffffff;
    fill: #f70968;
  }
  .person {
    width: 9rem;
    margin: auto;
    .img {
      width: 3.25rem;
      height: 3.25rem;
    }
    .fl {
      float: left;
      margin-left: 1rem;
      margin-top: 1rem;
      .word{
        text-align:center
      }
    }
  }
  .anniu{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
}
</style>