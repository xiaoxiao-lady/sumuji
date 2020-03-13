<template>
  <div class="index">
    <router-view></router-view>
    <TabBar :data="tabbarData"  />
  </div>
</template>

<script>
import TabBar from "./TabBar";
export default {
  name: "index",
  data() {
    return {
      tabbarData: [
        { title: "首页", icon:require("./../assets/tabbar_icon/home.png"),selected:require("./../assets/tabbar_icon/selected_home.png"), path: "/home",iconText:'s-home' },
        { title: "分类", icon:require("./../assets/tabbar_icon/classify.png"),selected:require("./../assets/tabbar_icon/selected_classify.png"), path: "/search",iconText:'s-grid' },
        { title: "购物车", icon:require("./../assets/tabbar_icon/cart.png"),selected:require("./../assets/tabbar_icon/selected_cart.png"), path: "/cartdetial",iconText:'shopping-cart-2' },
        { title: "我的", icon:require("./../assets/tabbar_icon/my.png"),selected:require("./../assets/tabbar_icon/selected_my.png"), path: "/orderHome",iconText:'user-solid' }
      ],
      change:false
    }
  },
  components: {
    TabBar
  },
  methods:{
    changeval(){
      this.change=!this.change;
      console.log(this.change)
    }
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: calc(100% - 45px);
}
</style>
