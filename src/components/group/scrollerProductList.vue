<template>
  <div class="scrollerWrap">
   <scroller  height="100%" :on-refresh="refresh" :on-infinite="infinite" ref="scrollerBottom">
    <div class="content">
      <div class="single" v-for="(item,index) in productList">   
          <div class="img_box">
            <img src="item.productIcon" class="product_img" />
          </div>

          <div class="ms">
            <span class="product_title">{{item.productName}}</span>
            <div class="product_price">
             <span> ¥</sapn>{{item.salePrice}}</span>
            </div>
          </div>
      </div>
    </div>
  </scroller>
  </div>
</template>

<script>
export default {
  props: {
    productList:Array,
    refresh:Function,
    infinite:Function,
   
  },
  data () {
    return {
      item: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .scrollerWrap{
    position: absolute;
    width: 100%;
    height: 90%;
    top: 80px;
    .content{
      height: 100%;
      width: 100%;
    }
  }
.single {
 width:172px;
height:248px;
background:rgba(255,255,255,1);
border-radius:4px;
border:1px solid rgba(244,244,244,1);
margin-top:8px;
.img_box{
 width:172px;
height:172px;
border-radius:4px 4px 0px 0px;
display: flex;
justify-content: center;
align-items: center;
.product_img{
width: 84px;
height: 126px;
}
}
.ms{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height:76px;
  .product_title{
  color:rgba(51,51,51,1);
text-align: center;
font-size:13px;
    font-weight:400;
    line-height:18px;
  }
  .product_price{
    font-size: 16px;
    line-height: 17px;
  color:rgba(218,2,23,1);
  width: 80%;
  display: flex;
  justify-content: flex-start;
  .product_price>span{
    font-size: 12px;
  }
  .original_price{
     font-size: 12px;
color:rgba(153,153,153,1);
  }
  }
}
}
</style>
