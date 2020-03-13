<template>
  <div class="coupongroup">
    <div class="boday"  >
      <div class="left">
        <div style="margin:1.4rem 0 0 1.5rem">
          <div class="banyuan1"></div>
          <span>¥{{amount}}</span>
          <div style="font-size:0.75rem;color:#999999;">满{{minPoint}}元使用</div>
        </div>
        <div class="quan">
          <span style="font-size:0.812rem">{{couponType}}</span>
          <div v-show="b">
            <x-progress :percent="receiveCount" :show-cancel="false"></x-progress>
            <div
              style="font-size:0.75rem;color:#999999;position: absolute;top: 1rem;
    left: 8rem;"
            >{{receiveCount}}%</div>
          </div>

          <div style="font-size:0.625rem;color:#999999;">
            适用平台：{{platform}}
            <br />
            有效期至：{{enableTime}}
          </div>
        </div>
        <div class="banyuan2" :class="status===1||receiveCount!==0?'active1':''"></div>
      </div>
      <div class="right" :class="status===3||status===3?'active':''">
        <span class="black" v-if="status===3" >
        已过期
        </span>
            <span class="black" v-if="status===1" >
        未使用
        </span>
        <span class="black" v-if="status===2" >
        已使用
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { XProgress } from 'vux'

export default {
  components: {
    XProgress
  },
  data () {
    return {}
  },
  props: {
    amount: {
      type: Number,
      required: false,
      default: ''
    },
    minPoint: {
      type: Number,
      required: false,
      default: ''
    },
    couponType: {
      type: String,
      required: false,
      default: ''
    },
    receiveCount: {
      type: Number,
      required: false,
      default: ''
    },
    platform: {
      type: String,
      required: false,
      default: ''
    },
    enableTime: {
      type: String,
      required: false,
      default: ''
    },
    b: {
      type: Boolean,
      required: true,
      default: true
    },
    status: {
      type: Number,
      required: false,
      default: ''

    }
  },
  mounted () {},
  methods: {
    
  }
}
</script>

<style lang="scss" >
.coupongroup {
  padding: 0.875rem 0.875rem 0 0.875rem;
  .left {
    position: relative;
    float: left;
    border-radius: 0.25px 0rem 0rem 0.25rem;
    height: 5.875rem;
    width: 18.875rem;
    background-color: #ffffff;
    box-shadow: 0px 0.125rem 0.25rem 0px rgba(191, 191, 191, 0.5);
    .quan {
      position: absolute;
      left: 7.5rem;
      top: 0.5rem;
      .weui-progress__inner-bar {
        background-color: #ff214c;
      }
    }
    .banyuan1 {
      position: absolute;
      left: 0rem;
      top: 2.1rem;
      width: 0.7rem;
      height: 1.4rem;
      background-color: #fbf9fe;
      border-radius: 0 0.7rem 0.7rem 0;
    }
    .banyuan2 {
      width: 0.7rem;
      height: 1.4rem;
      border-radius: 0.7rem 0rem 0rem 0.7rem;
      background-color: #CECECE;
      position: absolute;
      left: 18.22rem;
      top: 2.1rem;
    }
    .active1{
   background-color: #ff214c;
    }
  }
  .right {
    text-align:center; 
    height: 5.875rem;
    background-color: #ff214c;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    .black{
      margin:0 auto;
      font-size: 0.75rem;
      height: 3.75rem;
      margin-top: 1rem;
    writing-mode:vertical-lr;
    color: #ffff;
    }
  }
  .active{
     text-align:center; 
    height: 5.875rem;
  background-color: #ffffff;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    .black{
      margin:0 auto;
      font-size: 0.75rem;
      height: 3.75rem;
      margin-top: 1rem;
    writing-mode:vertical-lr;
    color: #ffff;
    }

  }
}
</style>