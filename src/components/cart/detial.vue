<template>
  <div class="detial">
    <div style="float:left;">
    <check-icon :value.sync="check" class="icon" v-show="managerStatus" ></check-icon>
    </div>
    
    <div class="border">
      <div class="img">
        <img :src="imgurl" style="height:5rem" />
      </div>
      <div class="item-box">
        <span class="borderTitle">{{title}}</span>
        
        <span style="color:#999999; font-size:0.687rem;">
        属性
        </span>
        
        <span style="color:#FF214C; border:0.0625rem solid #FF5B7A; font-size:0.563rem;width: 30px;  display: flex;
      justify-content: center;
      align-items: center;">包邮</span>
        <span>¥{{cost}}</span>
      </div>
    </div>

  </div>
</template>
 
<script>
import { CheckIcon } from 'vux'
export default {
  components: {
    CheckIcon
  },
  data () {
    return {
      goodCheck:null,
      borderTitle:''
    }
  },
  props: {
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
    cost: {
      type: Number,
      default: 0
    },
    check: {
      type: Boolean,
      default: false
    },
    managerStatus:Boolean,
    allSelect:Boolean
  },
  created () {
    
    // this.goodCheck = this.check
    //console.log('this.goodCheck'+this.goodCheck)
  },
  computed:{
    // borderTitle(newval){
    //   console.log(newval)
    // }
  },
  watch: {
    check (newval) {
      this.$emit('checkChange', newval)//当子组件的选择状态改变时,也要传给父组件
      console.log('全选出发check')
      console.log(this.check)
      // if (this.goodCheck !== newval) {
      //   this.goodCheck = newval
      // }
    },
     borderTitle(old,newval){
      console.log(old)
      console.log(newval)

    },
    // goodCheck (newval) {
    //   this.$emit('checkChange', newval)
    // }
    allSelect(value){
      if(value){
        this.check=true;
      }else{
        this.check=false;
      }
    }
  },
  methods: {}
}
</script>

<style  lang="scss" >
.detial { 
  width: calc(100vw - 4rem + 0.0625rem);
  margin-left: 1rem;
  height: 6.5rem;
  background-color: white;
  padding: 1.25rem 1rem;
 position: relative;
 .icon{
  margin-top:2rem;
}
  .border {
    border-bottom: 0.1rem solid #ececec;
    width: 100%;
    img {
      width: 5rem;
      height: 5rem;
      float: left;
    }
    .item-box{
      display: flex;
      flex-wrap: wrap;
      justify-content:flex-start;
      span {
        width: 100%;
      }
    }
    .borderTitle{
      
    }
    .BorderPrice{
      

    }
  }
}
 
</style>
