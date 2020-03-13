<template>
  <div class="search">
  <div class="search-tab">
    <search :neir="neir"  @click.native="tosearch()"></search>
   </div>
    <div class="div">
      <div class="fl">
        <div
          v-for="(item,index) in allProductTypeList"
          :key="index"
          class="fldh"
          @click="hdindex(index)"
          :class="item===shuz?'active':''"
        >
        {{item.typeName}}
      </div>
      </div>

      <div class="fl1">

        <div class="fl12">
          <img :src="imageUrl" />
        </div>
        <div class="children" v-if="shuz.typeId!=0">
          <span>分类推荐</span>
        <flexbox :gutter="0" wrap="wrap">
          <!-- 使用vux组件 -->
          <flexbox-item :span="1/3" v-for="(item,index) in shuz.children" :key="index" @click.native="goProductList(item.typeId)" >
            <div class="flex-demo" >
                <img  :src="item.imageUrl" class="img" />
                <span class="typename">
              {{item.typeName}}

              </span>
            </div>
          </flexbox-item>
      

        </flexbox>
         </div>

        <div class="brandList" v-if="shuz.typeId===0">
          <span>热门品牌</span>
        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item :span="1/3" v-for="(item,key) in shuz.children" :key="key"  @click.native="goBrandProductList(item.brandId)">
            <div class="flex-demo">
              <img style="width:100%;height:100%;" :src="item.brandIcon" />
              <span class="typename">
                {{item.brandName}}
              </span>
            </div>
          </flexbox-item>
        </flexbox>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider } from 'vux'
import search from '@/components/home/demo1/search'
import {getSortDetail} from '@/api/home'
import {getAllProductTypeList,getBrandList} from '@/api/productType'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    search: search
  },
  data () {
    return {
      neir: '家用洗衣包',
      shuz: {},
      allProductTypeList: [],
      BrandList:[],
      a:['0','1','2'],
      imageUrl:''

    }
  },
  created(){
  //this.getBrandList();
  },
  mounted () {
    this.getSortDetail();
   // this.hdindex();
  },
  computed:{

  },
  watch:{
//    BrandList(val){
//  console.log(val);
// let data={
//             typeName: "品牌馆",
//             typeId:3,
//             typeList:val
//           }
// this.allProductTypeList.push(data)
//              }
  },
  methods: {
    hdindex (index) {  
  
 this.imageUrl=this.allProductTypeList[index].imageUrl
        this.shuz=this.allProductTypeList[index]   
        
      
    },
    getzhu () {
      console.log(this.allProductTypeList)
      return require('@/assets/search/主图.png')
    },
   
    getSortDetail(){
        getSortDetail().then(res=>{
          this.allProductTypeList=res.data.productTypeList;
         let data={
            typeName: "品牌馆",
            typeId:0,
            imageUrl:"http://su.techwells.com/productType/brand.png",
            children:res.data.brandList
          }

this.allProductTypeList.push(data);
this.hdindex(0)
console.log(this.allProductTypeList)
         
        })
    },
    // getBrandList(){
    //   let data={
    //     pageNum:1,
    //     pageSize:100,
    //     isRecommend:1
    //   }
    //   getBrandList(data).then(res=>{
    //    this.BrandList=res.data;
    //   })

    // },
    tosearch () {
      this.$router.push('./searchfor')
    },
    goProductList(typeId) {
  console.log(typeId)
  this.$router.push({path:'/productList',
          query:{
         productType:typeId
        }})
    },
    goBrandProductList(brandId){
      this.$router.push({path:'/productList',
          query:{
         brandId:brandId
        }})
    }

  }
}
</script>

<style lang="scss" scoped>
.search{
  .search-tab{
    width: 100vw;
    height: 40px;
    display:flex;
    align-items: center;
/deep/ .search-input{
      width:351px;
height:28px;
background:#999;
border-radius:14px;
    }
  }
.div {
  margin-top: 0.2rem;
  padding-right: 0.75rem;
  border-top: 0.0625rem solid #F7F5F5;
  .fl {
    width: 7.12rem;
    height:100vh;
    background-color: #F7F5F5;
    text-align: center;
    float: left;
    div {
      height: 3rem;
      line-height: 3rem;
    }
  }
  .fl1 {
    // width: calc(100% - 9rem);

    margin-left: 7.69rem;

    .fl12 img {
      height: 7rem;
      width: 100%;
      padding-top: 0.5rem;
    }
  }
  .active {
    background-color: white;
    color: #FF214C;
    border-left: 0.3rem solid #FF214C;
  }
  .flex-demo{
    width: 4.75rem;
  display: flex;
  align-items: center;
  align-content: space-around;
  flex-direction: column;
  margin-bottom: 5px;
  }
  .img{
      height: 4.5rem;
      width: 4.75rem;
    }
    .typename{
      font-size: 0.75rem;
      color: #666666;

    }
}
}

</style>
