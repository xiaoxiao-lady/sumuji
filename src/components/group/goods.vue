<template>
  <div class="single">
      
      <div class="img_box">
        <img :src="imgurl" class="product_img" />
      </div>

      <div class="ms">
        <span class="product_title">{{title}}</span>
        <div class="product_price">
           <div v-if="isTop">
          <div v-if="isMember">
             <div v-if="isequal">
             <div class="product_price">
              ¥{{stockList[0].memberPrice}}
              <span style="text-decoration:line-through" class="original_price">¥{{stockList[0].salePrice}}</span>
            </div>
            </div>
             <div v-else>
               <div class="product_price">
              ¥{{minmemberPrice}}
              <span style="text-decoration:line-through" class="original_price">¥{{minnormalPrice}}</span>
            </div>
             </div>
          </div>
          <div v-else>
             <div v-if="isequal">
             <div class="product_price">
              ¥{{stockList[0].salePrice}}
            </div>
            </div>
             <div v-else>
               <div class="product_price">
              ¥{{minnormalPrice}}
            </div>
             </div>
          </div>
         
        </div>
          <div v-if="isTop!=true">
          ¥{{currentPrice}}
          <span style="text-decoration:line-through" class="original_price">¥{{originalPrice}}</span>
          </div>
        </div>
       
      </div>

      <!-- <button @click="addcart()" v-show="shop">
        <img :src="che" />&nbsp;去进货
      </button> -->
  
   

  </div>
</template>

<script>
export default {
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
    originalPrice:null,
    currentPrice:null,
    salePrice:null,
    ispintuan:null,
    isTop:null,
    ishuiyuan:null,
    isMember:null,
    stockList:null,
    isequal:null,
    minmemberPrice:null,
    minnormalPrice:null
  },
  data () {
    return {
      item: true
    }
  },
  methods: {
    addcart () {
      this.$emit('add')
    }
  }
}
</script>

<style lang="scss" scoped>
.single {
 width:97%;
height:100%;
margin-right:8px;
background:rgba(255,255,255,1);
border-radius:4px;

.img_box,.product_img{
 width: 100%;
height:109px;
border-radius:4px;

}
.ms{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height:69px;
  .product_title{
  color:rgba(51,51,51,1);
text-align: center;
font-size:12px;
    font-weight:400;
    line-height:17px;
  }
  .product_price{
    font-size: 16px;
    line-height: 17px;
  color:rgba(218,2,23,1);
  .original_price{
     font-size: 12px;
color:rgba(153,153,153,1);
  }
  }
}
.word1{
height: 17px;
width: 100%;
color: rgba(51,51,51,1);
text-align: center;
}
 /* .ms {
    padding: 0.375rem 0.875rem;
  }
  .word {
    color: #999999;
    font-size: 0.75rem;
  }
  .word1{
      font-size: 0.81rem;
  }
  .fr {
    float: right;
  }
  button {
    width: 5.93rem;
    height: 1.75rem;
    background: linear-gradient(
      225deg,
      rgba(255, 33, 76, 1) 0%,
      rgba(255, 79, 113, 1) 100%
    );
    border-radius: 0.9375rem;
    color: #ffffff;
    margin-left: calc(50% - 2.96rem);
    border: none;
    img {
      vertical-align: middle;
    }
  }*/
}
</style>