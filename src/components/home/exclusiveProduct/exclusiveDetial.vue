<template>
  <div class="exclusiveDetial">
  <div class="return"  @click="retrurn_fn">
    <img :src="retrunIcon" class="retrunIcon_class"/>
  </div>
  <div class="cart">
    <img :src="cartIcon" class="cartIcon" @click="turn_cart">

  </div>
    <swiper
      :list="urlList"
      height="351px"
      dots-position="center"
    ></swiper>

    <div class="div">
      <!-- <div class="div1" v-show="$route.path==='/pintuangoodsneir'?true:false">
        <span style="color:#FFCDD6"> ¥540.00</span>
        <span style="float:right">距结束 12 : 43 : 45</span>
      </div> -->

      <div class="div2">
        <p>{{product.productName}}</p>
       <!--  <div class="fr">
          <img src="./分享.png" />
          <p class="word">分享</p>
        </div> -->

        <div class="productIntro">
          <div class="exclusivePrice">
            <span style="color:#DA0217"> ¥ {{exclusiveList.originalPrice}}</span>
            </div>
             <span style="font-size: 14px;color: #ccc;">月销 {{product.saleCount}}</span>
        </div>
      </div>

      <div class="div3">
        <!-- <div class="item-head">
          <span>优惠</span>
          <p class="fr word">
            使用优惠券可减去50元
            <img :src="moreicon" />
          </p>
        </div>
        -->
        <div class="div3_content">
          <span style="margin-right:1rem;">
            <img src="./../../../assets/打勾.png" alt />
            <span class="word">假一赔十</span>
          </span>
          <span style="margin-right:1rem;">
            <img src="./../../../assets/打勾.png" alt />
            <span class="word">无忧退货</span>
          </span>
          <span style="margin-right:1rem;">
            <img src="./../../../assets/打勾.png" alt />
            <span class="word">包邮包税</span>
          </span>
        </div>
      </div>

      

      <div class="div5">
        <div class="item-head">
          <span>宝贝评价（{{product.evaluationList.length}}）</span>
          <p class="fr word"  @click="topingjia(product.productId)">
            查看全部
            <img :src="moreicon" alt />
          </p>
        </div>
        <div v-for="(evaluation, index) in product.evaluationList">
          <div >
            <img v-bind:src="evaluation.userIcon" style="width:2.25rem;height:2.25rem;" />
            <span class="word">{{evaluation.nickName}}</span>
          </div>
          <div>{{evaluation.content}}</div>
          <div class="border" v-if="index < product.evaluationList.length - 1"></div>
        </div>
      </div>

     <!--  <div class="evaluationList" v-else>
       <div class="eva-head">
         <span>暂无评价</span>
       </div>  
      </div> -->

      <div class="div6">
        <div class="item-head">
          <span>图文介绍</span>
        </div>
        <div style="float:right" class="word" v-if="product.brand">
          <p>品牌： {{product.brand.brandName}}</p>
        </div>

        <div class="description" >
          <p v-html="description" class="des-content"></p>
        </div>
      </div>



      <div class="div7">
        <div class="word" style="float:left;width:20%;position: relative;
    top: 0.4rem;" @click="addMyCollect">
          <span >
          <img src="./../../../assets/形状.png" ><br/>  
            收藏
          </span>
          </div>
           <div class="word" style="float:left;width:20%; position: relative;
    top: 0.4rem;" @click="turnHome" >
          <span >
          <img src="./../../../assets/首页.png" ><br/>  
            首页
          </span>
          </div>
        <div class="fl" style="font-size:0.75rem;background:#FF8721; color:#FFFFFF; " @click="()=>this.showPopup(0)">普通购买￥{{exclusiveList.originalPrice}}</div>
        <div class="fl" style="background:#FF224B; color:#FFFFFF; font-size:0.75rem;" @click="()=>this.showPopup(1)" >会员专享￥{{exclusiveList.currentPrice}}</div>
      </div>
       
<!-- 弹窗 -->
       <div class="show-popup" v-show="hide_shop_popup" >
         <div class="popup-mask" @click.self="closePopup"></div>
         <div class="pop-contents">

           <div class="pop-goods-info">
             <div class="pop-img-box">
               <img :src="product.productIcon" class="mini-goods">
             </div>
             <div class="pop-goods-des">
               <div class="pop-goods-price">
               <span class="pop-goods-price-text"></span>
               <span class="pop-goods-price-num" v-if="isNormalShopping">￥{{exclusiveList.originalPrice}}</span>
                <div class="exclusivePrice" v-else>
                  ￥{{exclusiveList.currentPrice}}
                  <span class="normalPrice_line">￥{{exclusiveList.originalPrice}}</span>
                </div>
               </div>
             </div>
             <div class="pop-goods-close"  @click="closePopup" >
               <img src="./../../../assets/close.png">
             </div>
           </div>
         <!--  颜色 -->
           <div class="size-label-box" v-if="allSpecification!=null" v-for="(item,index) in allSpecification"  >
            <div class="size-title">{{item.specificatonName}}</div>
             <div v-for="(val,suo) in item.specificationValues"
             class="size-type" 
              :class="colorIndex[index]===val?'size-selected':'size-type'"
              @click="chooseColorClass(val,index)"  >
                 <div class="type-btn" >
                    {{val}}
                  </div>
             </div>
           </div>
  
            
            <div class="buy-num-box" @click="testspecification">
              <div class="num-label"  v-if="isNormalShopping">购买数量</div>
               <div class="num-label" v-else>购买数量<span class="xiangou">(限购{{exclusiveList.quantityRestrictions}}件)</span> </div>
              <div class="num-box">
                <div class="num-reduce" @click="num_reduce_tap">-</div>
                <div class="num-input">
                  <input type="number" :value="buyNumber" disabled />
                </div>
                <div class="num-add" @click="num_add_tap">+</div>
              </div>
            </div>

             <div class="popup-btn-box">
              <div class="popup-join-btn"  @click="dingdan(0)" v-if="isNormalShopping">
                <span>立即购买</span>
              </div>
              <div class="popup-shopping-btn" @click="dingdan(1)"  v-else>
                <span>立即购买</span>
              </div>
              </div>


         </div>
       </div>

    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Swiper, Step, StepItem ,Toast} from 'vux'
import {getProductDetail } from '@/api/product'
import {addToShoppingCart } from '@/api/shoppingCart'
import { addMyCollect} from '@/api/collect'

export default {
  components: {
    tabGroup: tabGroup,
    Swiper,
    Step,
    StepItem,
    Toast
  },
  data () {
    return {
      title: '',
      urlList:[],
      product:{},
      description:'',
      show_toast:false,
      moreicon: require('./../../../assets/返回2.png'),
      retrunIcon:require('./../../../assets/return.png'),
      cartIcon:require('./../../../assets/tabbar_icon/cart.png'),
      hide_shop_popup:false,
      buyNumber:1,
      buyNumMin:1,
      buyNumMax:50,
      allSpecification:null,
      colorIndex:[],
      selected_specification:null,
      src:'',
      isNormalShopping:true,
      specificationExist:true,
      stockList:[],
      evaluationList:'',
      exclusiveList:null,

    }
  },
  props: {},
  computed: {
  },
  watch:{

  },
  mounted () {
    this.productDetail(this.$route.params.id);
  },
  methods: {
    retrurn_fn(){
 this.$router.go(-1);
    },
    turn_cart(){
       this.$router.push(`/cartdetial`)
    },
    turnHome(){
      this.$router.push('/home')

    },
    topingjia (id) {
      this.$router.push(`/pingjia/${id}`)
    },
    dingdan (i) {
      console.log('进入订单')
       this.testspecification();//拼一下商品规格
      let data={
        productId:this.product.productId,
        number:this.buyNumber,
      }
   if(!this.specificationExist){//没有规格时
      if(i==0){//普通购买
            data.specification='标准';
            this.$store.commit('setDirectPurchase',data);
            this.$router.push({path:'/dingdan'})
        }else{
          data.specification='标准';
          data.exclusivePrice=this.exclusiveList.currentPrice;
            this.$store.commit('setDirectPurchase',data);
            this.$router.push({path:'/dingdan',query:{sourceType:5,exclusiveId:this.exclusiveList.exclusiveId}})
        }
     }else if(this.testspecification()){ //有规格时
      if(i==0){
            data.specification=this.selected_specification;
            this.$store.commit('setDirectPurchase',data);
            this.$router.push({path:'/dingdan'})
      }else{
            data.exclusivePrice=this.exclusiveList.currentPrice;
            data.specification=this.selected_specification;
            this.$store.commit('setDirectPurchase',data);
            this.$router.push({path:'/dingdan',query:{sourceType:5,exclusiveId:this.exclusiveList.exclusiveId}})
      }
      }else{
            this.$vux.toast.show({
            text:'请选择完整规格',
            type:'warn'
          })
      }
  
      //console.log(this.$store.getters.GetDirectPurchase)
    },
    //弹出加入购物车弹窗
    showPopup(tips){//0 普通购买 1会员购买
      this.buyNumber=1;
      if(!this.specificationExist){//如果没有规格直接到提交订单
       if(tips==0){//普通购买的提交订单
        this.dingdan(0);
       }else{//会员购买的提交订单
        //判断是不是会员
         if( this.$store.getters.userInfo.level>0){
                  this.dingdan(1);
         }else{
          this.$router.push({path:'/addhui'})
         }
       }
      }else{
        //有规格 根据是否是会员显示不同价格 和不同颜色按钮
         if(tips==0){
         this.isNormalShopping=true;
         this.hide_shop_popup=true;
       }else{
        //重新赋值被普通商品购买改变了的buynum
           if( this.$store.getters.userInfo.level>0){//如果是会员就显示弹窗不是就跳转到开通会员页面
                    this.isNormalShopping=false;
                  this.hide_shop_popup=true;
                
             }else{
              this.$router.push({path:'/addhui'})
             }
      }
      }
     
    },
    closePopup(){
      this.hide_shop_popup=false;
      console.log(this.hide_shop_popup);
    },
     num_reduce_tap:function(){
         if(this.buyNumber>this.buyNumMin){
     this.buyNumber--;   
    }
      
    },
    num_add_tap:function(){
       if(!this.isNormalShopping){
          this.buyNumMax=this.exclusiveList.quantityRestrictions;
      }else{
        this.buyNumMax=50;
      }
      if (this.buyNumber <this.buyNumMax) {
       this.buyNumber++;
      }
    },
   chooseColorClass(val,index){//改变样式和赋值选中的值
      this.$set(this.colorIndex,index,val);
    },
    testspecification(){
      let that=this;
      let result=(value)=>{
        return that.colorIndex.filter((item)=>
         item.indexOf(value) > -1   //如果colorIndex里没有初始值colorIndex_0那么意味着都选择了
      )
      }
      if(result('colorIndex_').length!=0){
       console.log('有规格没选')
       return false;
      }else{
        console.log('都选好了')
         that.selected_specification=that.colorIndex.join("*");
         return true;
      }
    
    },
    addMyCollect(){
      let data={
        relationId:this.product.productId,
        userId:this.$store.getters.userInfo.userId,
        collectType:1//1是商品2商铺
      }
    addMyCollect(data).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
    },

    productDetail (id) {
        getProductDetail(id).then(res=>{
        this.product = res.data;
        this.stockList=res.data.stockList;
        this.evaluationList=res.data.evaluationList;
        this.exclusiveList=res.data.exclusiveList[0];
        this.allSpecification=JSON.parse(this.product.specification);
         let len=this.allSpecification.length;
         for(let i=0;i<len;i++){//这个数组里的值是为了在html里动态的拼接成 colorIndex[index] 
          //然后将colorIndex_0赋值成为循环取出的val
          this.colorIndex.push('colorIndex_'+i);
         }
       if(this.allSpecification[0].specificationValues=='标准'){
          this.specificationExist=false;
        }
         this.urlList = this.product.imageList.map((item, index) => ({
        img: item.imageUrl,
        fallbackImg: item.fallbackImg
        }))
        this.description=this.product.description;
        this.title=this.product.productName;
        });
    }

  }
}
</script>

<style lang="scss" scoped >
  @import './exclusiveDetial.scss'

</style>