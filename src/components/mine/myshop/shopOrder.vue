<template>
  <div class="shopOrder">  
    <order-parts  :myShoporder="myShoporder"    :orderInfoList="orderAll" :buy="buy" ></order-parts>  
  </div>
</template>

<script>
import orderParts from '@/components/mine/myorder/orderparts'
import  {getOrderList} from '@/api/order'
export default {
  components: {
    orderParts: orderParts
  },
  data () {
    return {
      buy: false,
      orderAll:[],
      myShoporder:true
    }
  },
  created(){
  this.getOrderList();
  },
  props: {},
  methods: {
    getOrderList(){
      let data={
        pageNum:1,
        pageSize:10,
        merchantId:202
      }
       getOrderList(data).then(res=>{
         this.orderAll=res.data;
       // res.data.forEach(item=>{
       //  item.orderProductList.forEach(item=>{
       //    this.goodsList.push(item);
       //    console.log(this.goodsList);
       //  })

       // })

       })
    }

  }

}
</script>

<style lang="scss">
.shopOrder /deep/ .bottom_content{
justify-content: space-between;
 .product_summary{
  width: 100px;
 }
} 

</style>