<template>
  <div class="tab">
    <img src="./返回.png" class="img1" @click="getback()" />
    <span class="span1">{{title}}</span>
  <!--   <img :src="icon" class="img2" /> -->
    <span class="rightTitle" @click="$emit('rightTitle')">{{rightTitle}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
   
    }
  },
  props: {
    index:String,
    icon: {
      type: String,
      required: false,
      default: ''
    },
    title:String,
    rightTitle: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    getback () {
      history.go(-1)
    },
    too () {
      this.$emit('toother')
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  height:3.625rem;
  width: 100vw;
  align-items: center; 
  border-bottom: 1px solid #eee;
  position: relative;
  .img1 {
     position: absolute;
   /* float: left;*/
   width: 0.625rem;
   height: 1.125rem;
   left: 4.26%;
  }
  .span1{
    width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  }
  .rightTitle{
position: absolute;
font-size:15px;
font-weight:400;
color:rgba(0,0,0,1);
line-height:21px;
left: 88.26%;
  }
}
</style>
