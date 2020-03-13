<template>
  <div class="sortSearch">
      <tabGroup :title="nav_title[currentIndex]"></tabGroup>

    <div class="product_show" ref="product_show">
      <two-line-list
        v-for="(item,key) in productList"
        :key="key"
        :imgurl="item.productIcon"
        :title="item.productName"
        :isMember="isMember"
        :stockList="item.stockList"
        @add="addto()"
         @click.native="productDetail (item.productId)"
      ></two-line-list>
    </div>

  </div>
</template>
<script>
import twoLineList from '@/components/group/two-line-list'
import tabGroup from '@/components/group/tab'
import {getExclusiveList,getGrouponList,getTopList,getRecommendList} from '@/api/home'

export default {
  data () {
    return {
      productList: [],
      show: '',
      currentIndex:'',
      nav_title:['推荐商品','人气TOP榜','会员专区'],
      isExclusive:false,
      isMember:false
    }
  },
  props:{
     
  },
  components: {
   twoLineList: twoLineList,
   tabGroup: tabGroup,
  },
  mounted (index) {
    this.getmore(this.$route.params.index);
    this.currentIndex=this.$route.params.index;
    console.log(this.$route.params.index)
  },
  created(){
  if(this.$route.params.index==2){
    this.isExclusive=true;
  }
   if(localStorage.hasOwnProperty("smjuserInfo")){
      if(JSON.parse(localStorage.getItem('smjuserInfo')).level>0){
        this.isMember=true;
      }
    }
  },
  methods: {
    tosearch () {
      this.$router.push('./searchfor')
    },
    showborder (key) {
      this.show = key
    },
    back () {
      history.go(-1)
    },
    productDetail (id) {
      if(this.isExclusive){
       this.$router.push({path:`/exclusiveDetial/${id}`})
      }else{
        this.$router.push({path:`/productDetail/${id}`})
      }
      
    },
    exclusiveDetail(id){
     
    },
    getmore (index) {
      let params={
       pageNum:1,
       pageSize:50
      }
      if(index==0){//推荐
       getRecommendList(params).then(res=>{
         this.title=this.nav_title[0];
         this.productList=res.data;
         // if(res.total%2!=0){

         // }
       })
      }else if(index==1){//top
        getTopList(params).then(res=>{
           this.productList=res.data;
           this.title=this.nav_title[1];
        })
         
      }else {//会员
        getExclusiveList(params).then(res=>{
             this.productList=res.data;
         this.title=this.nav_title[2];
        })
     
      }

    
     
    }

  }
}
</script>
<style>

.product_show{
   width: 100vw;
   
  padding-right: 10px;
  display: flex;
  flex-wrap: wrap;
  
  justify-content: space-around;
}
.single:nth-child(even){
}
.single:nth-child(odd){

}
</style>