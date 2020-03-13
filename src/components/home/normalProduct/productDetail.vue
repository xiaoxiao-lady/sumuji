<template>
  <div class="productDetail">
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
          <div v-if="isequal===true"><!-- 如果没有价格区间 -->

              <div class="exclusivePrice" v-if="userInfo.level>0">
                <span>会员价</span>
              <span > ¥{{product.stockList[0].memberPrice}}</span>
              <span  class="word" style="text-decoration:line-through">
              ￥{{product.stockList[0].salePrice}}
              </span>
              </div>
              <div v-else>
               <span style="color:#DA0217" > ¥ {{product.stockList[0].salePrice}}</span>
                <span style="font-size: 12px;color:#DAA520;"> ¥{{product.stockList[0].memberPrice}}</span>
                </div>
            </div>
            <div v-else><!-- 如果有 -->
                 <div class="exclusivePrice" v-if="userInfo.level>0">
                   <span>会员价</span>
                   <span>￥{{memberMin}}-￥{{memberMax}}</span>
                   <span class="word" style="text-decoration:line-through">￥{{normalMin}}-¥{{normalMax}}</span>
                 </div>
                 <div v-else>
                  <span style="color:#DA0217"> ￥{{normalMin}}-¥ {{normalMax}}</span>
                   <span style="font-size: 12px;color:#DAA520;">￥{{memberMin}}-￥{{memberMax}}</span>
                  </div>
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

     

      <div class="div4" v-if="specificationExist">
        <div class="item-head">
          <span>商品规格</span>
          <p class="fr word" @click.self="showPopup">
            选择尺码、颜色
            <img :src="moreicon" />
          </p>
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
        <div class="fl" style="font-size:0.75rem;background:#FF8721; color:#FFFFFF; " @click="()=>this.showPopup(0)">加入购物车</div>
        <div class="fl" style="background:#FF224B; color:#FFFFFF; font-size:0.75rem;" @click="()=>this.showPopup(1)" >立即购买</div>
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
               <div class="pop-goods-price"  v-if="userInfo.level>0">
              <!--  <span class="pop-goods-price-text">￥</span> -->
               <span class="pop-goods-price-num">￥{{popupMemberPrice}}</span>
               <span  style="text-decoration:line-through;font-size: 12px;color: #ccc;">￥{{popupNormalPrice}}</span>
               </div>

               <div class="pop-goods-price" v-else>
                <!--  <span class="pop-goods-price-text">￥</span> -->
               <span class="pop-goods-price-num">￥{{popupNormalPrice}}</span>
               <span style="font-size: 12px;color:#DAA520;">￥{{popupMemberPrice}}</span>
               </div>
             </div>
             <div class="pop-goods-close"  @click="closePopup" >
               <img src="./../../../assets/close.png">
             </div>
           </div>
         <!--  规格 -->
           <div class="size-label-box" v-if="allSpecification!=null" v-for="(item,index) in allSpecification"  >
            <div class="size-title">{{item.specificatonName}}</div>
             <div v-for="(val,suo) in item.specificationValues"
             class="size-type" 
              :class="colorIndex[index]===val?'size-selected':'size-type'"
              @click="testspecification(val,index)"  >
                 <div class="type-btn" >
                    {{val}}
                  </div>
             </div>
           </div>
          <!--   数量 -->
            <div class="buy-num-box" >
              <div class="num-label">购买数量</div>

              <div class="num-box">
                <div class="num-reduce" @click="num_reduce_tap">-</div>
                <div class="num-input">
                  <input type="number" :value="buyNumber" disabled />
                </div>
                <div class="num-add" @click="num_add_tap">+</div>
              </div>
            </div>

             <div class="popup-btn-box">
              <div class="popup-join-btn" @click="addToShoppingCart" v-if="clickJoin">
                <span>加入购物车</span>
              </div>
              <div class="popup-shopping-btn" @click="dingdan" v-else>
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
      clickJoin:false,
      specificationExist:true,
      stockList:[],
      evaluationList:'',
      normalMax:'',
      normalMin:'',
      memberMax:'',
      memberMin:'',
      isequal:'',
      popupMemberPrice:'',
      popupNormalPrice:''
    }
  },
  props: {},
  computed: {
    userInfo(){
      return this.$store.getters.userInfo
    }
  },
  watch:{

  },
  created () {
    // window.scroll(0, 0)
    
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
    dingdan () {
       
      let data={
        productId:this.product.productId,
        number:this.buyNumber,
       
      }
   if(!this.specificationExist){
        data.specification='标准';
      this.$store.commit('setDirectPurchase',data);
      this.$router.push({
        path:'/dingdan'
      })
      }else if(this.testspecification()){
       data.specification=this.selected_specification;
      this.$store.commit('setDirectPurchase',data);
      this.$router.push({
        path:'/dingdan'
      })
      }else{
         this.$vux.toast.show({
      text:'请选择完整规格',
      type:'warn'
    })
      }
  
      console.log(this.$store.getters.GetDirectPurchase)
    },
    //弹出加入购物车弹窗
    showPopup(tips){
      if(!this.specificationExist){//如果没有规格
       if(tips==0){
        this.addToShoppingCart();
       }else{
        this.dingdan();
       }
      }else{
        //显示弹窗出来的是购物按钮还是立即购买按钮
         if(JSON.stringify(tips)!='1'){
      this.clickJoin=true;
      }else{
        this.clickJoin=false;
      }
      this.hide_shop_popup=true;
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
      if (this.buyNumber < this.buyNumMax) {
       this.buyNumber++;
      }
    },
    testspecification(val,index){
      console.log(index+'....index')
      console.log(val+'...val')
      let that=this;
      that.$set(that.colorIndex,index,val);//改变样式和赋值选中的值
      let result=(value)=>{
        return that.colorIndex.filter((item)=>
         item.indexOf(value) > -1   //如果colorIndex里没有初始值colorIndex_0那么意味着都选择了
      )
      }
      if(result('colorIndex_').length!=0){
       console.log('有规格没选')
       return false;
      }else{
        let mid=[];
        console.log('都选好了')
        if(that.colorIndex.length>1){
            let arr=[];
            Object.assign(arr,that.colorIndex)//拷贝一下 不然sort改变原数组
            that.stockList.map((item)=>{
              mid=item.specification.split('*');
             if(mid.sort().toString()==arr.sort().toString()){
             this.popupNormalPrice= item.salePrice;
             this.popupMemberPrice=item.memberPrice;
             }
         })
         
          }else{
            that.stockList.map((item)=>{
              if(item.specification==that.colorIndex){
                  this.popupNormalPrice= item.salePrice;
             this.popupMemberPrice=item.memberPrice;
              }
            })
          }
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
      if(res.code==200){
         this.$vux.toast.show({
           text:res.message,
       })
      }
    }).catch(err=>{
      console.log(err)
    })
    },
    addToShoppingCart () {
      this.testspecification();
     let data={
      userId:this.$store.getters.userInfo.userId,
      productId:this.product.productId,
      number:this.buyNumber,
    };
 if(this.specificationExist===false){//如果没有规格
    data.specification='标准';
    console.log(data)
     addToShoppingCart(data).then(res=>{
      if(res.code==200){
      this.$vux.toast.show({
           text:'加入购物车成功',
       })
   
      }
    }).catch(err=>{console.log(err)})
  }else if(this.testspecification()){
    data.specification=this.selected_specification;
    console.log(data);
    addToShoppingCart(data).then(res=>{
      if(res.code==200){
      this.$vux.toast.show({
           text:'加入购物车成功',
       })
   
      }
    }).catch(err=>{console.log(err)})
    this.closePopup();
  }
  else{
    this.$vux.toast.show({
      text:'请选择完整规格',
      type:'warn'
    })
  }     
    },
    compairNormal(a){
    let min = a[0]; 
    let max = a[0];
　　　　　　for(let i = 0; i < a.length; i++){
　　　　　　　　let cur = a[i];
　　　　　　　　cur < min ? min = cur : null;
          cur > max ? min = cur : null;　　　
　　　　　　}
 this.normalMax=max;
 this.normalMin=min;
     },
    compairMember(a){
    let min = a[0]; 
    let max = a[0];
　　　　　　for(let i = 0; i < a.length; i++){
　　　　　　　　let cur = a[i];
　　　　　　　　cur < min ? min = cur : null;
          cur > max ? min = cur : null;　　　
　　　　　　}
 this.memberMax=max;
 this.memberMin=min;
    },
    isequalFun(a){
      let b=a[0];
      let sum=0;
      for(let i=1;i<a.length;i++){
          if(b==a[i]){
            sum++;
            console.log(sum+'...sum')
            if(sum==a.length-1){
              this.isequal=true;
            }
          }
      }
    

    },
    productDetail (id) {
        getProductDetail(id,{userId:this.$store.getters.userInfo.userId}).then(res=>{
         let normal=[];
         let member=[];
        this.product = res.data;
        this.stockList=res.data.stockList;
        this.evaluationList=res.data.evaluationList;
        if(this.stockList.length>1){
            this.stockList.forEach(item=>{ //价格区间
          normal.push(item.salePrice)
          member.push(item.memberPrice)
        })
        this.compairNormal(normal);
        this.compairMember(member);
         //this.isequalFun(normal);
         if(this.memberMax==this.memberMin){
          this.isequal=true;
         }
        }else{
          this.isequal=true;
        }
      
        
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

<style lang="scss" >
  @import './productDetail.scss'

</style>