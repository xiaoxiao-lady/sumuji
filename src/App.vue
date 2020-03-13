<template>
  <div id="app">

    <!--<keep-alive>-->
      <!--<router-view v-if="this.$route.meta.keepAlive"></router-view>-->
      <!--这里是会被缓存的组件-->
    <!--</keep-alive>-->
    <!--<router-view v-if="!this.$route.meta.keepAlive"></router-view>-->
    <!--这里是不会被缓存的组件-->

    <!--<keep-alive include="dingDan">-->
      <router-view v-if="isRouterAlive"></router-view>
    <!--</keep-alive>-->

  </div>
</template>

<script>
export default {
  name: 'app',
  provide(){//使用依赖来父孙之间传值
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive=true;
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
  overflow-x: hidden;
}
</style>
