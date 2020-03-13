<template>
<div class="search1">
  <!--  传一个布朗值过去控制img显示与否 -->
  <div class="search-tab">
   <!-- <search :placeholder="placeholder" 
     v-model="keywords" @keyup.enter.native="to_submit(keywords)"  :show_search_img="show_search_img" >
 </search> -->
   <el-input
    placeholder="请输入内容"
    v-model="keywords" @keyup.enter.native="to_submit(keywords)">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>

 <div class="cancel" @click="toback()">取消</div>
</div>

<div class="border"></div>
    
    <div class="tis">
<div class="recentlySearch">
      <p>最近搜索
 <img src="./删除.png" class="img" @click="delete_recent">
      </p>
     
   <!--  用户本地搜索的历史 -->
      <x-button mini class="jilu" v-if="search_history"
       v-for="(item,index) in search_history" :key="item"
       @click.native="to_submit(item)">{{item}}</x-button>
      </div>
      <div class="hotSearch">
        <p>热门搜索</p>
      <x-button mini
      v-for="(item,index) in hot_search" :key="index"
       @click.native="to_submit(item)" >{{item}}</x-button>
     </div>
      </div>

     
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux'
import search from './search'
import { getHotSreachList,getSearchList} from '@/api/home'
export default {
  components: {
    search: search,
    XButton
  },
  data () {
    return {
     placeholder: '搜索商品名称',
      keywords:null,
      show_search_img:true,
      recently_search:[],
      hot_search:[],
      search_img:require('@/assets/qita/search.png'),
      searchImg:true,
      arg:{
      pageNum:1,
      pageSize:10
      }
    }
  },
 created(){
    this.getHotSreachList();
    this.getSearchList();
  
  },
  computed:{
   search_history(){
    return this.$store.getters.getRecentlySearch;
   }
  },
  methods: {
    to_submit(keywords){
      this.keywords=keywords;
       if(this.keywords==null) {
        alert("请输入商品名")
       }else
       { 
        this.$store.commit('setRecentlySearch',this.keywords);
         this.$router.push({path:'/productList',
          query:{
          keywords:keywords
        }})
       }  
    },
   unique (arr) {
  return Array.from(new Set(arr))
  },
    toback () {
      this.$router.go(-1)
    },
     getSearchList(){
      getSearchList(this.arg).then(res=>{
       res.data.forEach(item=>{
        this.recently_search.push(item);
       }) 
    });
      //this.$store.commit('setRecentlySearch',...this.recently_search);
       
    },
     getHotSreachList(){
      getHotSreachList(this.arg).then(res=>{
        res.data.forEach(item=>{
       this.hot_search.push(item.keyword);
      })
      })
    },
    delete_recent(){
       this.$store.commit('setRecentlySearch','delete');
    },
    change_searchImg(){
      this.searchImg=!this.searchImg;
    }
  }
}
</script>

<style lang="scss" scoped>
.search1 {
  background-color: white;
  width: 100vw;
  height: 100vh;
  input{
    border:none;
  }
 .search /deep/ .search-input{
   background:rgba(224,224,224,1);
border-radius:14px;
opacity:0.2896;
 }
.search-tab{
  display: inline-flex;
  width: 100%;
  padding: 10px 0 10px 0;
  justify-content: center;
}
.search-tab /deep/  .el-input{
  width: 85%;
  margin-left: 10px;
    position: relative;
}
.search-tab /deep/ .el-input__inner{
  width:90%;
height:28px;
border-radius: 20px;
text-align: left;
}
.search-tab /deep/ .el-input__prefix{
  position: absolute;
left: 4%;
top: -5px;

}
.cancel{
width: 13%;
}

 .search_img{
  position: absolute;
  left: 28px;
 }
 input{
  border: none;
 width:299px;
height:31px;
background:rgba(245,245,245,1);
border-radius:50px;
 }
 input:focus{
  border: none;
    border-color: #9ecaed;
    box-shadow: 0 0 5px #9ecaed;
}
input[placeholder]{
  font-size: 24rpx;
  color: #000;
  text-align: left;
  padding-left: 70rpx;
    padding-top:10rpx;
}

  .border{
    clear: both;
    border-bottom: 0.125rem solid #f1f1f1;
  }
  .tis{
  background-color: white;
  padding: 0.875rem;
  p{
    font-size: 0.75rem;
    color: #000;
  }
 .weui-btn:after{
   border: none;
 }
 .weui-btn_default{
   color: #999999
 }
 button.weui-btn, input.weui-btn{
   margin-right: 0.5rem;
    margin-top: 0.5rem;
 }
 .recentlySearch{
   margin-bottom: 4rem;
   .img{
     float: right;
   }
 }
  }
}
</style>