<template>
	<div class="productList" >
 <div class="show_filter" v-show="show_filter">
    <div class="filter-right" @click="hidden_filter" >
    </div>
   
      <div class="right-content">
        <!-- <div class="select-brand">
        <p>品牌</p>
        <div class="brand-show">
          <p  class="single-brand" v-for="(item,key) in brandList" :key="item" @click="select_brand(key)">{{item}}</p>
        </div>
        </div> -->
        <div class="price_range">
        <p>价格范围</p>
        <div class="input-price">
        <input type="number" class="input-min" v-model="data.startPrice" placeholder="最低价" />
         <span>-</span>
        <input type="number" class="input-max" v-model="data.endPrice" placeholder="最高价" />
         </div>
         </div>
         <div class="bottom-box">
        <div class="buttom-nav">
          <button class="resetting" @click="resetting()">重置</button>
          <button class="confirm" @click="confirm()">确定</button>
        </div>
        </div>
      </div>
</div>


	<div class="productList-search-tab">
	<div class="return">
	  <img :src="return_img" class="img1" @click="back()" />
	</div>
    <!-- <search :placeholder="placeholder" 
     v-model="keywords" @keyup.enter.native="getProductList(keywords)"  :show_search_img="show_search_img" /> -->
     <el-input
    placeholder="请输入内容"
    v-model="data.keyword" @keyup.enter.native="getProductList(keyword)">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    </div>
 
   <div class="header-tab">

   <div class="part1 fl" v-for="(item,key) in headerList" :key="key" @click="showborder(key)">
    <span>{{item.title}}</span>
    <i :class="direction?'el-icon-arrow-down':'el-icon-arrow-up'" v-show="key==0"></i>
    <img :src="item.icon" v-show="key==2">
    <div class="border" v-show="show===key"></div>
     </div>
    </div>
     
  

     <div class="all" v-show="all">
        <div class="quan">

          <p @click="getProductList()">
            综合
            <img src="@/assets/search/打勾.png" style="float:right" v-show="a===0" />
          </p>

          <div class="word" @click="getProductList (desc)">
            价格升序
            <img src="@/assets/search/打勾.png" style="float:right" v-show="a===1" />
          </div>

          <div class="word" @click="getProductList (asc)">
            价格降序
        <img src="@/assets/search/打勾.png" style="float:right" v-show="a===2" />
          </div>

       </div>
      </div>

<div class="scrollerWrap" >
   <scroller  height="100%" :on-refresh="refresh" :on-infinite="infinite" ref="scrollerBottom">
    <div class="content">
      <div class="single" v-for="(item,index) in search_porductList" @click="productDetail(item.productId)">   
          <div class="img_box">
            <img :src="item.productIcon" class="product_img" />
          </div>
           <div class="ms" >
            <span class="product_title">{{item.productName}}</span>
              <div class="product_price" v-if="isMember">
               <span style="font-size: 16px;"> ￥{{item.memberPrice}}</span>
                <span style="text-decoration:line-through;font-size: 12px;color: #ccc; "> ￥{{item.salePrice}}</span>
              </div>
              <div class="product_price" v-else>
                 <span  style="font-size: 16px;"> ￥{{item.salePrice}}</span>
                  <span st style="font-size: 12px;color:#DAA520;"> ￥{{item.memberPrice}}</span>
              </div>
           </div>
      </div>

    </div>
  </scroller>
</div>

 
   </div>

</template>

<script type="text/javascript">
	import search from '../home/demo1/search'
	import {getProductList,getProductDetail} from '@/api/product'
	import twoLineList from '@/components/group/two-line-list'
  //import { Scroller } from 'vux'
	export default{
     components:{
     	search:search,
     	twoLineList:twoLineList,
         // Scroller
     },
     data(){
     	return {
     		
        brandId:this.$route.query.brandId,
        productType:this.$route.query.productType,
        placeholder:'请输入商品名称',
     		pageNums:1,
     		pageSizes:19,
     		search_porductList:[],
     		 headerList: [
			        { title: '综合', icon:'' },
			        { title: '销量', icon: '' },
			        { title: '筛选', icon: require('@/assets/search/筛选.png') }
			      ],
	      show: '',
        direction:true,
	      show_filter:false,
	      all:false,
	      searchImg:true,
	      a:'',
			  brandList:[],
			  selected_brandId:[],
        desc:'desc',
        asc:'asc',
			  return_img:require('@/components/group/返回.png'),
			  search_img:require('@/assets/qita/search.png'),
        show_search_img:true,
        priceRange:'',
        data:{
            keyword:"",
            pageNum:0,
            pageSize:6,
            brandId:this.$route.query.brandId,
            productType:this.$route.query.productType,
            sortType:1,
            startPrice:null,
            endPrice:null
        },
        tips:true,
        isMember:false

     	}

     },
     created(){
       this.data.keyword=this.$route.query.keywords;
       if(this.$store.getters.userInfo.level>0){
        this.isMember=true;
       }
     },
      methods:{
        changepriceRange(a){
         
        },
        changeTips(){
        this.tips=!this.tips;
        console.log(this.tips)
        },
        refresh(){
         console.log('下拉刷新');
         // let a= this.$refs.scrollerBottom.getPosition();
         // console.log(a)
         if(this.data.pageNum>1){
           this.data.pageNum--
         }else{this.data.pageNum=1}
        
       getProductList(this.data).then(res=>{
        if(res.code==200){
          this.search_porductList=res.data;
          this.$refs.scrollerBottom.finishPullToRefresh();
        }
       })
        
        },
        infinite(done){
        //alert(JSON.stringify(this.data))
        console.log('infinite')
         this.data.pageNum++;
         this.getProductList();
     },
      	  showborder (key) {
			      this.show = key;
			     if(key==0){
			     	this.all=!this.all
            this.direction=!this.direction;
			     }else if(key==2){
			     	this.all=false;
			     	this.show_filter=true;
			     }else{
			     	this.all=false
           this.getProductList('sale');
			     }
             },
              change_searchImg(){
			      this.searchImg=!this.searchImg;
			    },
			    back () {
			      history.go(-1)
			    },
			    resetting () {
			      this.data.startPrice=null;
            this.data.endPrice=null;
			    },
          confirm(){
           // this.infinite();
          this.getProductList();
          this.show_filter=false;
          },
			      productDetail (id) {
			      this.$router.push({path:`./productDetail/${id}`})
			    },
      	getProductList(arg){
          if(arg=='asc'){
            this.a=2;
            this.data.sortType=3;//从低到高
          }else if(arg=='desc'){
            this.a=1;
            this.data.sortType=2;//从高到低
          }else if(arg=="sale"){
            this.data.sortType=4;//综合
          }else {
             this.a=0;
            this.data.sortType=1;//综合
          }
      		getProductList(this.data).then(res=>{
           if(res.total>0){
              console.log('total>0')
               res.data.forEach(item=>{
              this.search_porductList=res.data;
                      })
           
              this.$refs.scrollerBottom.finishInfinite(true)
           
        }else{
         
           this.$refs.scrollerBottom.finishInfinite(true);
        }
         
      		})
      	},
      	unique(arr){
             return Array.from(new Set(arr))
      	},
      
         hidden_filter(){
         	this.show_filter=false;
         },
         select_brand(key){
         	console.log(key);
         }
      }
	}
	
</script>

<style  scoped >
  @import './productList.css'
</style>