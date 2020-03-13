<template>
  <div class="detiallist">
    <check-icon :value.sync="goodCheck" class="icon"></check-icon>
    <div class="border">
      <div class="img">
        <img :src="imgurl"/>
      </div>
      <div class="item-box">
        <div>{{title}}</div>
        <div style="color:#999999; font-size:0.563rem; margin: 5px 0 20px 0;">{{specification}}</div>
        <div v-if="isExclusive">
          <span>￥{{memberPrice}}</span>
        </div>
        <div v-else>¥{{salePrice}}</div>
      </div>
      <div>
        <inline-x-number :min="1" v-model="goodCount"></inline-x-number>
      </div>
    </div>
  </div>
</template>

<script>
import { InlineXNumber, CheckIcon } from 'vux'
export default 
 {

  components: {
    InlineXNumber,
    CheckIcon
  },
  data () {
    return {
      goodCount: 0,
      goodCheck:false
    }
  },
  props:{
    title: {
      type: String,
      required: false,
      default: ''
    },
    imgurl: {
      type: String,
      required: false,
      default: ''
    },
    attribute: {
      type: String,
      required: false,
      default: ''
    },
    salePrice: {
      type: Number,
      required: false,
      default: ''
    },
    specification: {
      type: String,
      required: false,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    },
    check:{
      type: Boolean,
      default: false
    },
    memberPrice:Number,
    isExclusive:Boolean
    //shoppingCartList:Array
  },
  created () {
    this.goodCount = this.count;
    this.goodCheck = this.check;
  },

  watch: {
    count (newval) {
      if (this.goodCount !== newval) {
        this.goodCount = newval
        console.log(this.goodCount)
      }
    },
    goodCount (newval) {
      this.$emit('countChange', newval)
    },
    check (newval) {
      if (this.goodCheck !== newval) {
        this.goodCheck = newval
      }
    },
    goodCheck (newval) {
      this.$emit('checkChange', newval)
    }
  }  
}
</script>

<style  lang="scss" >

.detiallist {
    width: 93.6%;
    display: flex;
    justify-content: center;
    
    height: 6.5rem;
    background-color: white;
    padding: 1rem .5rem;
    position: relative;
    .icon{
        height: 100%;
        float: left;
        display: -webkit-box ;
        display: -webkit-flex;
        display: -ms-flexbox ;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center
    }
    .border {
        border-bottom: 1px solid #ececec;
        width: calc(100% - 2.4rem);
        float: left;
        padding-bottom: 10px;
        display: -webkit-box;
        display: -webkit-flex ;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        height: 100%;
      .item-box {
          margin-left: 0.8rem;
          float: left;
      }
    .img {
      width: 5.5rem;
      height: 5.5rem;
      float: left;
      margin-left: 6px;
      img{
        width: 5.5rem;
      }
    }
    .vux-number-selector svg {
      fill: #333333;
    }
    .vux-inline-x-number {
      position: absolute;
      right: 1rem;
      bottom: 1.5rem;

    }
   .vux-number-selector{
     height: 1.375rem;
     line-height:1.375rem;
         padding: 1px 3px 1px 3px;
   }
   .vux-number-input{
        height: 1.375rem;
     line-height:1.375rem;
     font-size: 0.82rem;
         padding: 1px 3px 1px 3px;
         width: 2.5rem!important;
   }
  }
}

</style>
