<template>
  <div class="dingdandetial">
    <div class="border-bottom">
      <div class="hearder">官方旗舰店</div>
      <div class="border">

      </div>
      <div class="ma"  v-for="(item,index) in shoppingList">
        <img :src="item.productIcon" style="width:5rem;height:5rem;float:left; margin-right:0.82rem" />
        <div>
          <div class="content">
            <div style="width:90%;max-height: 50px;">{{item.productName}}</div>
           <span v-if="isPintuanGoods" class="salePrice">￥{{$store.getters.GetDirectPurchase.pintuanprice}}</span>
        <span v-else-if="isExclusive" class="salePrice">￥{{$store.getters.GetDirectPurchase.exclusivePrice}}</span>
            <span class="salePrice" v-else>￥{{item.currentPrice}}</span>
          </div>
          <div style="color:#999999; font-size:0.69rem">
            <span>{{item.specification}}</span>
            <span class="fr">×{{item.number}}</span>
          </div>
          <div class="baoyou">
            包邮
          </div>
        </div>
        <div>
          <div style="clear:both"></div>
          <div class="ma">
            购买数量
<!--<inline-x-number :min="1" v-model="item.number"></inline-x-number>-->
              <el-input-number size="mini" :min="1"
                               v-model="item.number"
                               ref="countInput"
                               style="width: 7rem;"
                               class="fr"
                               :disabled="isExclusive||isJoinPintuan||isPintuanGoods"
                               @change="handleChange( item )">
                                   </el-input-number>
          </div>
          

        </div>
      </div>
    </div>
  
    <div class="ma total_shopping">
      共{{totalCount}}件商品 合计：¥{{totalPrice}}
    </div>
  </div>
</template>
<script>
import { InlineXNumber } from 'vux'
import {getConfirmProductList} from '@/api/product'
export default {
  components: {
    InlineXNumber
  },
  data () {
    return {
      shoppingList: [],
      totalCount: 0,
      totalPrice: 0,
    }
  },
  name: 'dingDanDetail',
  props: {
    productIdList:null,
    numberList:null,
    specificationsList:null,
    isPintuanGoods:Boolean,
    isExclusive:Boolean,
    isCart:Boolean,
    isDirectPurchase:Boolean,
    isJoinPintuan:Boolean,
    exclusiveId:null,
    joinId:null,
    groupId:null
  },
  computed: {},
  methods: {
    getcartlist () {
      let data={
        productIds: this.productIdList,
        specifications: this.specificationsList,
        numbers: this.numberList,
        userId:this.$store.getters.userInfo.userId,
      }
      if(this.isCart){
       data.sourceType=1
        getConfirmProductList(data).then(response => {
        console.log(response)
        this.shoppingList = response.data
        this.computePriceAndNum(this.shoppingList)
      })
      }else if (this.isDirectPurchase) {
      data.sourceType=2
       getConfirmProductList(data).then(response => {
        console.log(response)
        this.shoppingList = response.data
        this.computePriceAndNum(this.shoppingList)
      })
      }else if(this.isExclusive){
        data.sourceType=5;
        data.sourceId=this.exclusiveId;
        getConfirmProductList(data).then(response => {
        console.log(response)
        this.shoppingList = response.data
        this.computePriceAndNum(this.shoppingList)
      })
      }else if(this.isPintuanGoods){
         if(this.isJoinPintuan){
             data.sourceType=4;
             data.sourceId=this.joinId;
         }else{
          data.sourceType=3
          data.sourceId=this.groupId; 
         }
           getConfirmProductList(data).then(response => {
        console.log(response)
        this.shoppingList = response.data
        this.computePriceAndNum(this.shoppingList)
      })
      }
     
    },
    handleChange (itemInfo) {
      console.log(itemInfo)
      this.computePriceAndNum(this.shoppingList)
     // const index = this.productIdList.findIndex(item => item === itemInfo.productId)
     // this.numberList.splice(index, 1, itemInfo.number)
    },
    computePriceAndNum (data) {
      if(this.isPintuanGoods){
        this.totalCount=this.$store.getters.GetDirectPurchase.number;
        this.totalPrice=this.$store.getters.GetDirectPurchase.pintuanprice*this.$store.getters.GetDirectPurchase.number;
           this.$store.commit('setTotalPrice', this.totalPrice.toFixed(2));
          this.$store.commit('setSelectNumList', this.totalCount)
      }else if(this.isExclusive){
        this.totalCount=this.$store.getters.GetDirectPurchase.number;
        this.totalPrice=this.$store.getters.GetDirectPurchase.exclusivePrice*this.$store.getters.GetDirectPurchase.number;
           this.$store.commit('setTotalPrice', this.totalPrice.toFixed(2));
          this.$store.commit('setSelectNumList', this.totalCount)

      }else{
        this.totalCount = 0;
      this.totalPrice = 0;
      data.forEach(item => {
         console.log(item)
        this.totalCount += item.number;
        this.totalPrice += item.number * item.currentPrice
      })
      this.$store.commit('setSelectNumList', this.numberList)
      this.$store.commit('setTotalPrice', this.totalPrice.toFixed(2))
      }
      
    }
  },
  mounted () {
    this.getcartlist();

  },
  created(){

  }
}
</script>

<style lang="scss" >
.dingdandetial {
  padding: 0.94rem;
  background: #ffffff;
  margin-bottom: 2rem;
  .hearder {
    margin-bottom: 0.93rem;
  }
  .content{
    position: relative;
  }
  .fr {
    float: right;
  }
  .salePrice{
    position: absolute;
    top: 10px;
    right: 0;
  }
  .baoyou{
    margin-top: 1rem;
    margin-left:6rem;
    width: 1.7rem;
    height: 0.9rem;
    font-size:0.56rem;
    color:rgba(255,33,76,1);
    line-height:0.82rem;
    border: 0.0625rem solid #FF5B7A;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vux-inline-x-number{
    float: right;
  }
  .total_shopping {
    text-align: right;
    padding-right: 20px;
  }
  .ma{
    margin: 0.8rem 0;
  }
  .border{
    border:0.02rem  solid #F1F1F1;
  }
  .border-bottom{
    border-bottom: 1px  solid #F1F1F1;
  }
  .el-input-number__decrease, .el-input-number__increase{
    background-color: #fff;
  }
  .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled), .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled){
    border-color: #DCDFE6
  }
  .el-input-number__decrease:hover, .el-input-number__increase:hover{
    color: #606266;
  }

}
</style>
