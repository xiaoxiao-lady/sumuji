<template>
  <div class="pintuangoods">
  <!--   <tabGroup :title="title" :icon="src"></tabGroup> -->
   <div class="return" >
    <img :src="retrunIcon" class="retrunIcon_class" @click="retrurn_fn"/>
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
      <div class="div1">
        <span>拼团价 ¥{{product.grouponList[0].currentPrice}}</span>
        <span style="color:#FFCDD6">单买价 ¥{{product.grouponList[0].originalPrice}}</span>
       <!--  <span style="float:right">已拼450件</span> -->
      </div>
      <div class="div2">
        <p>{{product.productName}}</p>
          <span style="font-size:12px;"  >{{product.productProfile}}</span>
        <!-- <div class="fr">
          <img src="./分享.png" />
          <p class="word">分享</p>
        </div> -->
         <div class="productIntro">
          <div class="exclusivePrice">
          <span style="color:#DA0217">拼团价¥{{product.grouponList[0].currentPrice}}</span>
          <span class="word" style="text-decoration:line-through">¥{{product.grouponList[0].originalPrice}}</span>
          </div>

           <span style="font-size: 14px;color: #ccc;">月销 {{product.saleCount}}</span>
        </div>
      </div>

      <div class="div3">
        <div class="item-head">
          <span>拼团玩法</span>
          <p class="fr word">
            详情规则
            <img :src="moreicon" />
          </p>
        </div>
        <step background-color="white">
          <step-item title="开团/参团"></step-item>
          <step-item title="邀请好友"></step-item>
          <step-item title="满员发货，不满退款"></step-item>
        </step>
        <div style="text-align:center;">
          <span style="margin-right:1rem;">
            <img src="./打勾.png" alt />
            <span class="word">假一赔十</span>
          </span>
          <span style="margin-right:1rem;">
            <img src="./打勾.png" alt />
            <span class="word">无忧退货</span>
          </span>
          <span style="margin-right:1rem;">
            <img src="./打勾.png" alt />
            <span class="word">包邮包税</span>
          </span>
        </div>
      </div>

      <div class="div4">
        <div class="item-head">
          <span style="color:#FF1B46">【新人团】</span>
          <span class="word">以下小伙伴正在发起拼团</span>
          <!-- <p class="fr word">南通市***拼团成功</p> -->
        </div>

        <div class="div4a" v-for="(item,index) in product.joinList">
          <div>
          <img :src="item.userIcon" style="width:3rem; height:3rem; float:left" />
          <div style="float:left;margin-left:0.5rem;">
            <div>{{item.nickName}}</div>
            <div class="word">
              还差
              <span style="#ff486b">{{item.numberLimitation-item.userIds.length}}</span>人
            </div>
          </div>
          </div>
          <button class="button" @click="joinPintuan(item.joinId)">去参团</button>
        </div>
      </div>

      <div class="div5" v-if="evaluationList.length!=0">
        <div class="item-head">
          <span>宝贝评价（{{product.evaluationList.length}}）</span>
          <p class="fr word" @click="topingjia()">
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

      <div class="evaluationList" v-else>
       <div class="eva-head">
         <span>暂无评价</span>
       </div>  
      </div>

      <div class="div6">
        <div class="item-head">
          <span>图文介绍</span>
        </div>
        <div style="float:right" class="word" v-if="product.brand">
          <p>品牌： {{product.brand.brandName}}</p>
        </div>
        <div class="description" >
          <p v-html="product.description" class="des_content"></p>
        </div>
      </div>
      <div class="div7">
        <div class="fl word" @click="addMyCollect">
          <img src="./形状.png" ><br/>
        <span>
         收藏
        </span>
          </div>
        <div class="fl" style="font-size:0.75rem;" @click="singleShopping">
          ¥{{product.grouponList[0].originalPrice}}<br/>单独购买</div>
        <div class="fl" style="background:#FF224B; color:#FFFFFF; font-size:0.75rem;" @click="beginPintuan">¥{{product.grouponList[0].currentPrice}}<br/>2人团</div>
      </div>
      <!-- 弹窗 -->
      <div class="show-popup" v-show="hide_shop_popup" >
         <div class="popup-mask" @click.self="closePopup"></div>
            <div class="pop-contents">
   <!-- 弹窗第一层 -->
              <div class="pop-goods-info">
                 <div class="pop-img-box">
                   <img :src="product.productIcon" class="mini-goods">
                 </div>
                 <div class="pop-goods-des">
                   <div class="pop-goods-price">
                   <span class="pop-goods-price-text">￥</span>
                   <span class="pop-goods-price-num">{{product.salePrice}}</span>
                   </div>
                 </div>
                 <div class="pop-goods-close"  @click="closePopup" >
                   <img src="./返回.png">
                 </div>
             </div>
   <!-- 弹窗之规格 -->
      <div class="size-label-box" v-if="allSpecification!=null" v-for="(item,index) in allSpecification"  >
            <div class="size-title">{{item.specificatonName}}</div>
             <div v-for="(val,suo) in item.specificationValues"
             class="size-type" 
              :class="colorIndex[index]===val?'size-selected':'size-type'"
              @click="chooseColorClass(val,index)"  >
                 <div class="type-btn">
                    {{val}}
                  </div>
             </div>
           </div>

             <div class="popup-btn-box">
              <div class="popup-shopping-btn" @click="whenSpeExist('a')" v-if="faqipintuanBtn">
                <span>发起拼团</span>
              </div>
              <div class="popup-shopping-btn" @click="whenSpeExist('b')" v-else>
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
import { Swiper, Step, StepItem,Toast} from 'vux'
import {getProductDetail } from '@/api/product'
import {addToShoppingCart } from '@/api/shoppingCart'
import { addMyCollect} from '@/api/collect'
import {getJsApiProperty } from '@/api/order'
import wx from 'weixin-js-sdk'
const list = [
  {
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
  },
  {
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
  },
  {
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
  },
  {
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
  }
]
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
     hide_shop_popup:false,
      urlList:[],
      product:{},
      demo02_list: list,
      moreicon: require('./返回.png'),
      retrunIcon:require('./../../../assets/return.png'),
      cartIcon:require('./../../../assets/tabbar_icon/cart.png'),
      specificationExist:true,
      allSpecification:null,
      selected_specification:null,
      colorIndex:[],
      faqipintuanBtn:false,
      groupId:'',
      isJoinPintuan:false,
      url:'',
      canUseupdateAppMessageShareData:'',
      canUseupdateTimelineShareData:'',
      evaluationList:''
    }
  },
  props: {},
  computed: {
  },
  mounted () {
    window.scroll(0, 0);
     this.productDetail(this.$route.params.id);
    let that=this;
     // wx.ready(function(){
     //   // console.log("微信接口初始化完成");
     //   that.checkJsApi();
     //    });   
  },
  created(){
     this.url='http://sumuji.techwells.com/#'+this.$route.path;
  // this.getJsApiProperty();
  
  },
  methods: {
    closePopup(){
      this.hide_shop_popup=false;
      console.log(this.hide_shop_popup);
    },
    topingjia () {
      this.$router.push('./pingjia')
    },
    //微信接口检测 是否可用最新接口
    checkJsApi(){
      let that=this;
      wx.checkJsApi({
            jsApiList: [
            'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareTimeline',
          'onMenuShareAppMessage'],
            success: function(res) {
              console.log(res.checkResult.updateAppMessageShareData);
             that.canUseupdateAppMessageShareData =res.checkResult.updateAppMessageShareData;
             that.canUseupdateTimelineShareData =res.checkResult.updateTimelineShareData;
            }
          });
           },
    share(){
    console.log('分享');
    console.log(this.$route.path)
   //  let url='http://sumuji.techwells.com/#'+this.$route.path

   this.shareMoments();
    },
    //分享到朋友圈
    shareMoments(){
      console.log(this.canUseupdateTimelineShareData);

      if(this.canUseupdateTimelineShareData){ //分享到朋友圈
              wx.updateTimelineShareData({
                debug: true,
                title: '[素木集]'+this.product.productName, // 分享标题
                link:this.url, // 分享链接
                imgUrl:this.product.productIcon, // 分享图标
                success: function () { 
                    // 用户确认分享后执行的回调函数
                    alert("请点击右上角分享");
                }
            });
            }else{
              wx.onMenuShareTimeline({
                title:'[素木集]'+this.product.productName, // 分享标题
                link:this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl:this.product.productIcon, // 分享图标
                success: function () {
                // 用户点击了分享后执行的回调函数
                alert('请点击右上角分享')
                },
                cancal:function(){
                    //  alert('onMenuShareTimeline cancal')
                }
               })
            }

      if(this.canUseupdateAppMessageShareData){//分享给朋友
          wx.updateAppMessageShareData({
        title:  '[素木集]'+this.product.productName, // 分享标题
        desc: '你的朋友向你分享了一个新宝贝快来看看吧', // 分享描述
        link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:this.product.productIcon, // 分享图标
        success: function () {
          alert('请点击右上角分享')
        }
      })
          }else{
            wx.onMenuShareAppMessage({
                title:'[素木集]'+this.product.productName, // 分享标题
                desc: '你的朋友向你分享了一个新宝贝快来看看吧', // 分享描述
                link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl:this.product.productIcon, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户点击了分享后执行的回调函数
                  alert('请点击右上角分享')
                }
              });
          }
      

    },
   getJsApiProperty () {
      getJsApiProperty({url: this.url})
        .then(res => {
          //window.alert(JSON.stringify(res))
          const Data = res.data;
          wx.config({
            debug: true,
            appId: Data.appId,
            timestamp: Data.timestamp,
            nonceStr: Data.nonceStr,
            signature: Data.signature,
            jsApiList: [
              'updateAppMessageShareData',//自定义“分享给朋友”及“分享到QQ”按钮的分享内容
              'updateTimelineShareData',//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享
              'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
              'onMenuShareAppMessage'//获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）

            ]
          });
        }).catch(e => {
          window.alert(JSON.stringify(e))
        })
    },
    joinPintuan(a){
      console.log(a);
      this.joinId=a;
      this.isJoinPintuan=true;
      this.beginPintuan();
           //this.$router.push('/pindetial')
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
    productDetail (id) {
        getProductDetail(id).then(res=>{
          this.product = res.data;
          this.evaluationList=res.data.evaluationList;
          this.groupId=this.product.grouponList[0].grouponId;
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
              url: item.jumpUrl,
              img: item.imageUrl,
              fallbackImg: item.fallbackImg
              }))
        });
    },
     addMyCollect(){
      let data={
        relationId:this.product.productId,
        userId:this.$store.getters.userInfo.userId,
        collectType:1//1是商品2商铺
      }
    addMyCollect(data).then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
    },
    singleShopping(){
    //拼团里的单独购买 b单独购买 a拼团购买
    if(!this.specificationExist){
      this.whenSpeNotExist('b')
    }else{
      this.showPopup('b');
    }
    },
    beginPintuan(){
      //b 单独购买 a 拼团购买
      if(!this.specificationExist){
        this.whenSpeNotExist('a');
      }else{//有规格时就弹出弹窗
       this.showPopup('a');
      }
  },
  whenSpeNotExist(a){
      //判断是a 还是b 是a 就拼团购买 支付拼团价格 b就普通价格
     let data={
      productId:this.product.productId,
      number:'1',
      specification:'标准'
      };
      if(a=='a'){//前端显示拼团价格
      data.pintuanprice=this.product.grouponList[0].currentPrice;
      this.$store.commit('setDirectPurchase',data);
      if(this.isJoinPintuan){//参团人
         this.$router.push({ path:'/dingdan',query:{sourceType:4,joinId:this.joinId} })
      }else{//开团人
         this.$router.push({ path:'/dingdan',query:{sourceType:3,groupId:this.groupId} })
      }
      }else{//单独购买
      this.$store.commit('setDirectPurchase',data);
      this.$router.push({ path:'/dingdan'})
      }
     
      
  },
  showPopup(a){
    if(a=='a'){//显示团购的按钮
      this.faqipintuanBtn=true;
    }else{
      this.faqipintuanBtn=false
    }

     this.hide_shop_popup=true;
  },
  whenSpeExist(a){
    this.testspecification();
      let data={
      productId:this.product.productId,
      number:1,
      specification:this.selected_specification
      };
      console.log(data)
  if(this.testspecification()){
   if(a=='a'){
    //有规格的发起拼团
    //区分参团和开团
      data.pintuanprice=this.product.grouponList[0].currentPrice;
     
    this.$store.commit('setDirectPurchase',data);
    if(this.isJoinPintuan){//参团人
         this.$router.push({ path:'/dingdan',query:{sourceType:4,joinId:this.joinId} })
      }else{//开团人
         this.$router.push({ path:'/dingdan',query:{sourceType:3,groupId:this.groupId} })
      }
   }else{
    //有规格的单独购买
    this.$store.commit('setDirectPurchase',data);
    this.$router.push({path:'/dingdan'})
   }
      
      }else{
        this.$vux.toast.show({
        text:'请选择完整规格',
        type:'warn'
      })
    }
  },
   retrurn_fn(){
     this.$router.go(-1);
    },
    turn_cart(){
       this.$router.push(`/cartdetial`)
    },
  }
}
</script>

<style lang="scss" >
.pintuangoods {
  .return{
    position: relative;
    .retrunIcon_class{
  position: fixed;
  z-index: 1;
  left: 10px;
  top: 10px;
 }
  }
   .cart{
    position: relative;
    .cartIcon{
     position: absolute;
     z-index: 1;
     right: 5%;
     top:10px;
  }
 
  }
  

  .div {
    .word {
      color: #a1a1a1;
      font-size: 0.75rem;
    }
    .fr {
      float: right;
    }
    .item-head {
      height: 3rem;
      line-height: 3rem;
      padding: 0 0.8rem;
      margin-top: 0.5rem;
    }
    .div1 {
      height: 2.125rem;
      line-height: 2.125rem;
      background: #ff486b;
      padding: 0 1rem;
      color: #ffffff;
    }
    .div2 {
      padding: 0.69rem 1.4rem 0.75rem 0.94rem;
      background-color: #ffffff;
     .productIntro{
        display: flex;
        justify-content: space-between;
        .exclusivePrice{
        color: rgba(255,33,76,1);
      }
      .sale{
        font-size: 14px;
        color: #ccc;
      }
      }
    }
    .div3 {
      background-color: #ffffff;
      .vux-step-item-icon {
        width: 16px;
        height: 16px;
      }
      .vux-step {
        padding: 1rem 0.5rem;
        background-color: #ffffff;
        .vux-step-item-head .vux-step-item-head-inner {
          width: 1rem;
          height: 1rem;
          border-radius: 1rem;
          background: black;
          color: #ffffff;
          line-height: 1rem;
        }
      }
    }
    .div4 {
      background-color: #ffffff;
      height: 191px;
      overflow-y: auto;
      .div4a {
        padding: 0.69rem 0 1rem 0.69rem;

        border-bottom: 1px solid #f4f4f4;
         display: flex;
         justify-content: space-between;
        .button {
          margin: 0.8rem 0rem 0rem 3.5rem;
          height: 1.8rem;
          width: 4.25rem;
          border: 1px solid #ff224b;
          color: #ff224b;
          border-radius: 1.125rem;
          background: #ffff;
          margin-right: 2%;
        }
      }
    }
    .div5 {
      background-color: #ffffff;
      padding: 0 0.8rem 0.8rem 0.8rem;
      .border {
        border-bottom: 1px solid #f4f4f4;
        width: calc(100%-1.6rem);
        margin: 0.5rem 0;
      }
    }
        .evaluationList{
            width: 100%;
      height:40px;
background:rgba(255,255,255,1);
margin-top: 10px;
display: flex;
justify-content: center;
align-items: center;
.eva-head{
  width: 95%;
  text-align: left;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
}

    }

    .div6 {
      background-color: #ffffff;
      padding: 0 0.8rem 0.8rem 0.8rem;
      margin-bottom: 0.5rem;
      p {
        line-height: 1.4rem;

      }
      .des_content>p>img{
        width: 100%;
        height: 100%;
      }
    }
    .div7 {
      height: 3.125rem;
      width: 100vw;
      background: #ffffff;
      position: fixed;
      bottom: 0;
      text-align: center;


      .fl {
        float: left;
        width: calc(100% / 3);
        padding:0.5rem 0rem;
        height: 3.125rem;

      }
    }

  }
}
.show-popup{
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  z-index: 1;

}
.popup-mask{
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index:2;
}
.pop-contents{
  position: fixed;
    height: 75vh;
  left: 0;
  bottom: 0;
  width:100%;
  background-color: #fff;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-content: center;
}
/*商品信息*/
.pop-goods-info{
 display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 96.2666%;
    height:20%;

  position: relative;
  margin-left: 15px;
   color: #DA0217;
 
}
 .pop-goods-price-text{
    font-size: 12px;
   
  }
  .pop-goods-price-num{
    font-size: 17px;
  }
.pop-img-box,.mini-goods{
  width: 90px;
  height:90px;
  overflow: hidden;
  margin-right: 13px;
  border-radius: 5px;

}
.pop-goods-des{
  height: 100%;
  width:68%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items:flex-start;
  justify-content: center;
}
.pop-goods-close,.pop-goods-close>image{
   width: 20px;
   height: 20px;

}

.pop-goods-title{
  width:242px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size:13px;
  color:#000000;
  margin-top:10px;
}
.pop-goods-price{
font-size:12px;
font-weight:lighter;
color:rgba(218,2,23,1);
line-height:17px;
margin-top: 6px;
}
.pop-goods-close{
 /* position: absolute;
  left: 327px;
  top: 7.5px;*/
  margin-top:-22%;
  margin-right:2%;
}
/*商品规格*/
.size-label-box{
  width: 94.9333%;
  min-height:78px;
 display: flex;
 flex-wrap: wrap;
 justify-content:flex-start;
align-items: center;
 padding: 5px 5px;
 margin-left: 15px;
 .size-title{
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px; 
 }
 .size-type{
  width:72px;
height:30px;
background:rgba(255,255,255,1);
border-radius:2px;
  border: 1px solid #eee;
  margin:5px 5px 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
 }

}
.size-selected{
  border:1px solid #FF2851;
  color: #FF2851;
 
}
/*商品购买数量*/
.buy-num-box{
  width: 94.9333%;
  min-height: 15%;
  margin-left: 15px;
 display: flex;
 flex-wrap: wrap;
 padding: 5px 5px;
 justify-content:flex-start;
 z-index: 4;
}
.num-label,.size-title{
  width: 295px;
font-size:12px;
font-weight:bold;
color:rgba(0,0,0,1);
line-height:16px;

}
.num-box{
  height: 30px;
  display: flex;
  justify-content:center;
  margin-top: 11px;
}
.num-add,.num-reduce{
width:22.5px;
height:25px;
background:rgba(255,255,255,1);
border-radius:1px 0px 0px 1px;
border:1px solid rgba(233,233,233,1);
text-align: center;
}
.num-input,input{
width:45px;
height:25px;
border-top:1px solid rgba(233,233,233,1);
border-bottom:1px solid rgba(233,233,233,1);
text-align: center;
}
input{
  border:none;
  background: none;
}
/*加入购物车*/
.popup-btn-box{
   display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  align-items: center;
  min-height: 20%;
}
.popup-shopping-btn{
  margin-top: 20px;
   margin-bottom:20px;
  text-align: center;
  z-index: 5;
  width:91.2%;
  height:50px;
  background: rgb(255, 135, 33);
  box-shadow:0px 4px 8px 0px rgba(255,175,189,1);
  border-radius:35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.popup-shopping-btn{
  background:linear-gradient(225deg,rgba(255,33,76,1) 0%,rgba(255,79,113,1) 100%);
}
</style>
