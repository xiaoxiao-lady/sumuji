<template>
  <div  class="home">

   <!-- 导航栏与背景图 -->
    <div class="shous">
      <div class="search-tab">
      <search-for
        @click.native="tosearch()"
        :placeholder="placeholder">
      </search-for>
         
      </div>
       <el-badge :is-dot="true" class="badge-item" :hidden="indexMsgBadge">
         </el-badge>
       <img src="@/assets/home/index/形状.png" class="search-right" @click="tomassage()" />
    
    </div>
    <div class="home-index">
    <!--   焦点图 -->
      <div>
        <swiper :list="urlList" auto style="width:100%;margin:0 auto;border-radius:5px;" height="180px"  dots-position="center"></swiper>
      </div>

      <!-- 洗涤产品 -->
      <div class="div1"  v-if="home.recommendList.length!=0">
        <div class="item-head">
          <span>推荐产品</span>
          <span class="right" @click="goProductList('0')">
           <p> 查看更多</p>
            <img class="right_img" :src="moreicon" />
          </span>
        </div>

        <div class="xidi_show" >
          <div class="single" v-for="(item,key) in (home.recommendList||'').slice(0,2)"  :key="key" @click="productDetail(item.productId)"  >
            <div class="img_box">
              <img :src="item.productIcon"  class="produce_img"/>
            </div>
            <div class="single-text" v-if="isMember">
              <span class="single-title">{{item.productName}}</span>
              <div v-if="item.stockList.length==1">
              <span class="produce-price">￥{{item.stockList[0].memberPrice}}</span>
              <span style="text-decoration:line-through;font-size: 12px;color: #ccc;">￥{{item.stockList[0].salePrice}}</span>
              </div>
              <div v-else><!-- 如果是有区间的商品 -->
                <span class="produce-price">￥{{item.minmemberPrice}}</span>
                <span style="text-decoration:line-through;font-size: 12px;color: #ccc;">￥{{item.minnormalPrice}}
                </span>
              </div>
            </div>

             <div class="single-text" v-else><!-- 不是会员 -->
              <span class="single-title">{{item.productName}}</span>
              <div v-if="item.stockList.length==1"><!-- 没有区间 -->
                <span class="produce-price">￥{{item.stockList[0].salePrice}}</span>
                 <span style="font-size: 12px;color:#DAA520;">￥{{item.stockList[0].memberPrice}}</span>
              </div>
              <div v-else>
                <span class="produce-price">￥{{item.minnormalPrice}}</span>
                 <span style="font-size: 12px;color:#DAA520;"> ￥{{item.minmemberPrice}}
                 </span>
              </div>
            </div>
          </div>
        </div>

        <div style="clear:both;"></div>

      </div>

      <!-- 团团赚 -->
      <div class="div2">
        <div class="item-head">
          <span>团团赚</span>
          <span class="right" @click="topingou()">
            <p>查看更多</p>
            <img :src="moreicon"  class="right_img"  />
          </span>
        </div>
        <flexbox :gutter="gutterNum" wrap="wrap">
          <flexbox-item :span="1/3" v-for="(item,key) in home.grouponList" :key="key" v-if="item" >
            <pai-lie
          :title="item.productName"
          :imgurl="item.productIcon"
          :currentPrice="item.currentPrice"
          :originalPrice="item.originalPrice"
          :ispintuan='true'
            @click.native="pintuangoods(item.productId)"
            ></pai-lie>
            
          </flexbox-item>
        </flexbox>
      </div>

     <!--  whychoose -->
      <div class="div3">
        <span>为什么选择素木集</span>
        <flexbox :gutter="gutterNum" wrap="wrap" style="margin:1.5rem;">
          <flexbox-item :span="1/3" v-for="(imgName, key) in listicon" :key="key" v-if="imgName" >
            <img :src="icon(imgName.icon)" />
            <br />
            <span style="color:#DA0217; font-size:0.75rem;">{{imgName.title}}</span>
          </flexbox-item>
        </flexbox>
      </div>

      <!-- 人气top榜 -->
      <div class="pop" v-if="home.topList.length!=0">
        <div class="item-head">
         <span>人气TOP榜</span>
         <span class="right" @click="goProductList(1)">
            <p>查看更多</p>
            <img :src="moreicon"  class="right_img"  />
          </span>
        </div>

        <div class="res" @click="productDetail(home.topList[0].productId)">
        <img :src='home.topList[0].productIcon' style="" class="img1"/>
        <img src='./picture/第一.png' class="abs">
        </div>
    

      <div class="div4">
        <flexbox :gutter="gutterNum" wrap="wrap">
          <flexbox-item :span="1/3" v-for="(item,key) in (home.topList||'').slice(1,4)" :key="key" class="res" v-if="item" >
            <pai-lie :title="item.productName" :imgurl="item.productIcon" :stockList="item.stockList" :isTop='true' :isequal="item.isequal" :isMember="isMember"
            @click.native="productDetail(item.productId)" :minnormalPrice="item.minnormalPrice" :minmemberPrice="item.minmemberPrice">
              
            </pai-lie>
             <img :src="item.img1" class="abs">
          </flexbox-item>
        </flexbox>
      </div>
   </div>
      <!-- 会员专区 -->
      <div class="div5"  v-if="home.exclusiveList.length!=0">
        <div class="item-head">
          <span>会员专区</span>
          <span class="right" @click="goProductList(2)">
            查看全部
            <img :src="moreicon" class="right_img" />
          </span>
        </div>
       <!--  <div class="youhuiAll">
           <div class="youhui">
             <div style="float:left">
             <div class="span">
               大额优惠劵
             </div>
             <div>
               <button class="button">
               限时抢
             </button>
             </div>
            
             </div>
             <img src="../../assets/home/index/memberBlock.png" class="img">
          
           </div>
             <div class="youhui1" style="margin-bottom:0.5rem;">
             <div style="float:left">
             <div class="span">
               大额优惠劵
             </div>
             <div>
           <button class="button">
               限时抢
             </button>
             </div>
            
             </div>
             <img src="../../assets/home/index/memberBlock.png" class="img">
      
           </div>
       </div>
 -->
        <flexbox :gutter="gutterNum" wrap="wrap">
          <flexbox-item :span="1/3" v-for="(item,key) in (home.exclusiveList||'').slice(0, 3)" :key="key" v-if="item" >
            <pai-lie :title="item.productName" :imgurl="item.productIcon" :currentPrice="item.currentPrice" :originalPrice="item.originalPrice" :ishuiyuan="true"
            @click.native="exclusiveDetail(item.productId)"></pai-lie>
          </flexbox-item>
        </flexbox>
        <flexbox :gutter="gutterNum" wrap="wrap">
          <flexbox-item :span="1/3" v-for="(item,key) in (home.exclusiveList||'').slice(3, 6)" :key="key" v-if="item" >
            <pai-lie :title="item.productName" :imgurl="item.productIcon" :currentPrice="item.currentPrice" :originalPrice="item.originalPrice" :ishuiyuan="true"
            @click.native="exclusiveDetail(item.productId)"></pai-lie>
          </flexbox-item>
        </flexbox>
        <div class="btnBox">
        <button class="becomeNumber" @click="huiyuan()"  v-if="!isMember">开通会员</button>
         </div>
      </div>

    <!--   限时抢购 -->
  <!--     <div class="div6">
        <p @click="tosecKill()">限时抢购</p>
        <div
          v-for="(item,key) in list2"
          :key="key"
          class="qiang"
          @click="hdindex(item)"
          :class="item===shu?'active ':''">
          {{item.time}}
          <br />
          {{item.title}}
          <div :class="item===shu?'border':''"></div>
        </div>
      </div> -->

    <!--   <div class="div7">
        <div style="width:59rem; height:10rem">
          <img src alt />
        </div>
        <div>
          <p>妃立宝洗衣包青春版50g</p>
          <p style="color:#999999; font-size:0.75rem">去污新改革 纳米洗衣宝 孕婴可用</p>
          <p style="color:#999999; font-size:0.69rem;">
            <x-progress :percent="percent2" :show-cancel="false"></x-progress>
            {{percent2}}%
          </p>
          <div style="clear:both"></div>
          <p>
            ¥50
            <span
              style="color:#999999; font-size:0.75rem; 
             text-decoration:line-through"
            >¥67</span>
            <x-button mini type="warn" style="float:right" @click.native="pintuangoodsneir ()">马上抢</x-button>
          </p>
        </div>
      </div> -->

      <div style="margin-bottom:5rem"></div>

    </div>
  </div>
</template>


<script>
import {
  Swiper,
  Flexbox,
  FlexboxItem,
  XButton,
  Tab,
  TabItem,
  XProgress
} from 'vux'
import paiLie from '@/components/group/goods'
import twoLineList from '@/components/group/two-line-list' 
import searchFor from './demo1/search'
import {getHomeDetail,countMessageByType} from '@/api/home'

const baseList = [
  {
    url: 'javascript:',
    img: require('@/assets/home/index/位图.png')
  },
  {
    url: 'javascript:',
    img: require('@/assets/home/index/位图.png')
  },
  {
    url: 'javascript:',
  
    img: require('@/assets/home/index/位图.png'),
    fallbackImg:
      'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg' // 它将在 img 加载失败时显示，注意的是 fallbackImg 可能会在 img 加载成功时也进行了加载，只是不会显示（取决于浏览器实现）
  }
]

export default {
  components: {
    Swiper,
    Flexbox,
    FlexboxItem,
    paiLie: paiLie,
    twoLineList:twoLineList,
    XButton,
    Tab,
    TabItem,
    searchFor: searchFor,
    XProgress
  },
  // props: {
  //   chanp: {
  //     type: String,
  //     required: false,
  //     default: ''
  //   },
  //   title: {
  //     type: String,
  //     required: false,
  //     default: ''
  //   },
  //   imgurl: {
  //     type: String,
  //     required: false,
  //     default: ''
  //   },
  //   cost: {
  //     type: Number,
  //     required: false,
  //   },
  //   cost1:{
  //      type: Number,
  //     required: false,

  //   }
  // },
  data () {
    return {
      urlList: [],
      allMsgList:'',
      showContent003: false,
      neir: '输入标题，内容搜索',
      moreicon: require('./picture/moreicon.png'),
      home: {},
      percent2: 20,
      nav_title:['推荐商品','人气TOP榜','会员专区'],
      list2: [
        {
          time: '19:00',
          title: '抢购中',
          picture: [1, 2, 3, 4]
        },
        {
          time: '21:00',
          title: '抢购中',
          picture: [1, 2, 3, 4]
        },
        {
          time: '23:00',
          title: '抢购中',
          picture: [1, 2, 3, 4]
        },
        {
          time: '07/12',
          title: '明日预告',
          picture: [1, 2, 3, 4]
        }
      ],
      gutterNum:0,
      shu: {},

        placeholder:'口红',
      baseList: [
        {
          url: 'javascript:',
          img:
            'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
        },
        {
          url: 'javascript:',
          img:
            'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg'
        },
        {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/5.jpg',
          fallbackImg:
            'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg' // 它将在 img 加载失败时显示，注意的是 fallbackImg 可能会在 img 加载成功时也进行了加载，只是不会显示（取决于浏览器实现）
        }
      ],
      list: [
        { name: '1', img: require('./picture/xidi.png'), cost: '1' },
        { name: '1', img: require('./picture/xidi.png'), cost: '2' }
      ],
      list1: [
        { name: '1', img: require('./picture/xidi.png'), cost: '1', img1: require('./picture/第二.png') },
        { name: '1', img: require('./picture/xidi.png'), cost: '2', img1: require('./picture/第三.png') },
        { name: '1', img: require('./picture/xidi.png'), cost: '3', img1: '' }
      ],
      listicon: [
        { title: '安全健康', icon: '安全' },
        { title: '品质保证', icon: '品质' },
        { title: '价格亲民', icon: '价格' }
      ],
      logisticsMessage:'',
      orderMessage:'',
      systemMessage:'',
      isMember:false,
      minRenormalPrice:'',
      minRememberPrice:'',
      minTopNormalPrice:'',
      minTopMemberPrice:'',
      isequal:false
    }
  },
  computed: {
    indexMsgBadge(){
      return this.$store.getters.GetindexMsgBadge;
    }

  },

  mounted () {
    
    this.getHomeDetail();
     if(localStorage.hasOwnProperty("smjuserInfo")){
       this.count();

     }
    let href=window.location.href;
    if(href.indexOf('r=')!=-1){
     let mid= href.slice(href.indexOf('=')+1)
     localStorage.setItem('tuijianren',mid);
    }
  },
  created(){
  if(localStorage.hasOwnProperty("smjuserInfo")){
      if(JSON.parse(localStorage.getItem('smjuserInfo')).level>0){
        this.isMember=true;
      }
    }
  },
  methods: {
    count(){

  countMessageByType(this.$store.getters.userInfo.userId).then(res=>{

    if(res.code==200){
      console.log(res.data);
      this.logisticsMessage=res.data.logisticsMessage;
      this.orderMessage=res.data.orderMessage;
      this.systemMessage=res.data.systemMessage;
      if(this.logisticsMessage+this.orderMessage+this.systemMessage!=0){
        this.$store.commit('setindexMsgBadge',false);
      }
    }
  })

    },
    clickBannerList(item){
     console.log('sss');
     //焦点图跳转
    },
    hdindex (item) {
      this.shu = item
    },
    icon (a) {
      return require('./demo1/icon/' + a + '.png')
    },
    //   this.$router.push('/pindetial')
    // pindetial () {
    // },
    topingou () {
      this.$router.push('./groupon')
    },
    pintuangoods (id) {
      this.$router.push({path:`./pintuangoods/${id}`})
    },
    tosecKill () {
      this.$router.push('./secKill')
    },
    tosearch () {
      this.$router.push('./searchfor')
    },
      duringMin(a){
          let min = a[0]; 
        
　　　　　　for(let i = 0; i < a.length; i++){
　　　　　　　　let cur = a[i];
　　　　　　　　cur < min ? min = cur : null;　　
　　　　　　}
 return min
    },
    getHomeDetail () {
      getHomeDetail().then(response => {
        this.home = response.data
        console.log(this.home)
       
   let that=this;
        response.data.recommendList.forEach(item=>{
          let renormal=[];
          let remember=[];
          if(item.stockList.length>1){
             for(let i=0;i<item.stockList.length;i++){
               renormal.push(item.stockList[i].salePrice);
               remember.push(item.stockList[i].memberPrice);
             }
           item.minnormalPrice=that.duringMin(renormal);
           item.minmemberPrice=that.duringMin(remember);
        } 
        })
        // this.minRenormalPrice=this.duringMin(renormal);
        // this.minRememberPrice=this.duringMin(remember);

        response.data.topList.forEach(item=>{
           let topnormal=[];
           let topmember=[];
             if(item.stockList.length>1){
             for(let i=0;i<item.stockList.length;i++){
               topnormal.push(item.stockList[i].salePrice);
               topmember.push(item.stockList[i].memberPrice);
             }
           item.minnormalPrice=that.duringMin(topnormal);
           item.minmemberPrice=that.duringMin(topmember);
        } else{
          item.isequal=true;
        }
        })
        that.urlList = that.home.bannerList.map((item, index) => ({
          url: item.jumpUrl,
          img: item.imageUrl,
          fallbackImg: item.fallbackImg
        }))
    
      })
    },
    productDetail (id) {
      this.$router.push({path:`./productDetail/${id}`})
    },
    exclusiveDetail(id){
     this.$router.push({path:`/exclusiveDetial/${id}`})
    },
    pintuangoodsneir (id) {
      this.$router.push({path:`./pintuangoodsneir/${id}`})
    },
    huiyuan () {
      this.$router.push('./addhui')
    },
    tomassage () {
    //挺傻逼 有时间改了
     if(this.logisticsMessage!=0&&this.orderBadgeNum!=0&&this.systemMessage!=0){
      this.$router.push({path:'./massage',query:{orderBadgeNum:this.orderMessage,systemBadgeNum:this.systemMessage,logisticBadgeNum:this.logisticsMessage}})
     }else if(this.logisticsMessage!=0&&this.orderBadgeNum!=0){
       this.$router.push({path:'./massage',query:{orderBadgeNum:this.orderMessage,logisticBadgeNum:this.logisticsMessage}})
     }else if(this.logisticsMessage!=0&&this.systemMessage!=0){
       this.$router.push({path:'./massage',query:{systemMessage:this.systemMessage,logisticBadgeNum:this.logisticsMessage}})
     }else if(this.orderBadgeNum!=0&&this.systemMessage!=0){
       this.$router.push({path:'./massage',query:{systemMessage:this.systemMessage,orderBadgeNum:this.orderBadgeNum}})
     }else{
      this.$router.push('./massage')
     }
      
    },
    goProductList (index) {
      this.$router.push({path:`./readmore/${index}`})
    }

   
  }
}
</script>

<style  lang="scss" scoped>
@import './index.scss'
</style>
