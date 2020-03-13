<template>
  <div class="orderhome">

    <div class="div1">
      <div class="userInfo_top" >

       <div v-if="userInfo.nickName" class="userInfo">
        <img :src="userInfo.userIcon"  />
        <span @click="topersonalData(a)">
          {{userInfo.nickName}}
          </span>
       </div>
       <div class="unLogin"  v-else>
       <img :src="unLogin">
          <div @click="tologin()" >
           登录/注册
          </div>
          </div>
       <div class="set">
        <img src="./设置.png" @click="toset()" class="setting" />
        <!-- <img src="./消息.png" @click="tomassage()" class="message" /> -->
       </div>
      </div>

        <div  class="userInfo-bottom">
        <div v-for="(item,key) in list" :key="key" @click="serve(item.router)"
        class="userInfo-single">
          <p>{{item.shu}}</p>
          <div>{{item.zi}}</div>
        </div>
         </div>
      </div>
    
    <div class="div2" v-if="userInfo.level>0">
      <img :src="huiicon()" style="position: relative;
    top: 0.2rem;" />
      商城会员
    </div>

    <div class="div2" v-else>
      <img :src="huiicon()" style="position: relative;
    top: 0.2rem;" />
      会员暂未开通
      <x-button mini type="warn" @click.native="addhui()">开通享折扣</x-button>
    </div>

    <div class="div3">
      <div class="item-head">
        <span >我的订单</span>
        <p style="float:right" @click="getlist()">查看全部</p>
      </div>
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item
          :label="item.label"
          v-for="(item ,key) in list1"
          :key="key"
          @click.native="getlist(item.index)"
        >
          <img slot="icon" :src="geticon(item.icon)" />
        </grid-item>
      </grid>
    </div>

    <div class="div4">
      <div class="item-head">
        <span>我的服务</span>
      </div>
       <!--  如果是商家 -->
      <!-- <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="4" v-if="userInfo.merchant!=null ">
        <grid-item
          :label="item.label"
          v-for="(item,key) in list3"
          :key="key"
          @click.native="serve(item.router)"
        >
          <img slot="icon" :src="geticon(item.icon)" />
        </grid-item>
      </grid> -->
     <!-- 不是的话 -->
        <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="4">
        <grid-item
          :label="item.label"
          v-for="(item,key) in list2"
          :key="key"
          @click.native="serve(item.router)"
        >
          <img slot="icon" :src="geticon(item.icon)" />
        </grid-item>
      </grid>
    </div>
  </div>
</template>

<script>
import { XButton, Grid, GridItem, GroupTitle,Toast } from 'vux'
import {mapGetters} from 'vuex'
import {getMyCollectList} from '@/api/collect'
import {getMineDetail} from '@/api/home'
export default {
  components: {
    XButton,
    Grid,
    GridItem,
    GroupTitle,
    Toast
  },
  data () {
    return {
      list: [
        { shu: 0, zi: '收藏', router: 'myCollect' },
        { shu: 0, zi: '余额', router: 'myAccounts' },
        { shu: 0, zi: '积分', router: 'myScore' },
        { shu: 0, zi: '优惠券', router: 'myCoupons' }
      ],
      list1: [
        { label: '待付款', icon: 'waitPay', index: 1 },
        { label: '待发货', icon: 'waitShip', index: 2 },
        { label: '待收货', icon: 'logistics', index: 3 },
        { label: '评价', icon: 'Evaluation', index: 4 },
        { label: '退换', icon: 'return', index: 0 }
      ],
      list2: [
        { label: '邀请好友', icon: 'share', router: 'invite' },
        { label: '免费抽奖', icon: 'lottery', router: 'lottery' },
        { label: '我的团队', icon: 'myteam', router: 'myteam' },
        {label:  '我的收益', icon:'myIncome',router:'myIncome'},
        { label: '地址管理', icon: 'adress', router: 'addressList' },
        { label: '拼团商城', icon: 'teamShop', router: 'groupon' },
        { label: '领券中心', icon: 'coupon', router: 'coupon' },
        { label:'积分商城',icon:'score',router:' '},
        { label: '合伙人招募', icon: 'partner', router:'recruitment_agent' },
        { label: '学习中心', icon: 'study', router: 'faq' },
        { label: '联系客服', icon: 'contact', router: '' },
        {label:'商家入驻',icon:'business',router:''}
       
      ],
      merchantId:null,
      bc_img:require('./../../assets/invite/invite_background.png'),
      unLogin:require('./../../assets/nologin.png'),
      myCollectListLength:null 
    }
  },
  props: {},
 created(){
// this.getUserInfo();
//this. getCollectList();

 },
  mounted(){

 this.getMineDetail();
     // if(JSON.stringify(this.$store.getters.userInfo)!='{}'){
     //  //用户刷新后 如果state里没有数据 就去localstorage里取
     //  console.log('用户刷新后 如果state里没有数据 就去localstorage里取');
     //  this.userInfo=this.$store.getters.userInfo;
     // }else{
     //   //window.alert(JSON.parse(localStorage.getItem('userInfo')));
     //  this.userInfo= JSON.parse(localStorage.getItem('userInfo'));
     //  console.log('userInfo')
     // }
  },
  watch:{
    userInfo:function (value) {
 
      this.userInfo=value;//userInfo在其他地方被改动后这里跟着响应
    }
  },
  computed:{
  ...mapGetters([
    'userInfo'
    ])//从getters里初始化userInfo
  },
  methods: {
    // chakan () {
    //   this.$router.push({path: '/order', query: {from: this.$route.query.index}})
    // },
    getMineDetail(){
      getMineDetail(this.userInfo.userId).then(res=>{
         this.list[0].shu=res.data.collectCount
          this.list[1].shu=res.data.balance
           this.list[2].shu=res.data.scoreAmount
            this.list[3].shu=res.data.couponCount
      })
    },
    geticon (icon) {
      return require('./img/' + icon + '.png')
    },
    huiicon () {
      return require('./会员.png')
    },
    serve (a) {
      if(a=='becomemar'){
        this.$vux.toast.text('敬请期待')
        return
      }
      if(a=='myteam'){
        if(this.userInfo.level==0)
        {
              this.$router.push({path: './addhui'})
            return
        }
      }
      this.$router.push({
        path: '/' + a,
        // query: { from: this.$route.query.index ,userId:this.userInfo.userId}
      })

    },
    getlist (a) {
      this.$router.push({
        path: '/myOrder',
        query: { from: this.$route.query.index, key: a }
      })
    },
    topersonalData (a) {
      this.$router.push({
        path: './personalData'
      })
    },
    // tomassage () {
    //   this.$router.push('./dealMassage')
    // },
    addhui () {
      this.$router.push('./addhui')
    },
    toset () {
      this.$router.push('./set')
    },
    tologin () {
      this.$router.push({
        path: './wxlogin',
        query: { from: this.$route.query.index }
      })
    },
    getUserInfo(){
        // this.$store.commit("setUserInfo",this.test);//把它放在末尾 没有被执行 setUserInfo空
       let userInfo={"userId":2,"invitedCode":"UWW2","userName":null,"nickName":"☆梦寻江南☆","userType":null,"hxUsername":null,"hxPassword":null,"userIcon":" http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo2ADCeRPFNl3UUJ1t5SLFWTOvuiaWbR1exl7A0jrWQj0cBx7LQdVVTGKqE4Tp1zpiceofbA9tbBCTw/132","realName":null,"level":1,"hobby":null,"score":0,"accumulatedScore":0,"signature":null,"gender":null,"birthday":null,"mobile":null,"email":null,"address":null,"latitude":null,"longitude":null,"cityCode":null,"profession":null,"company":null,"sourceId":null,"recommandId":null,"activated":null,"deleted":null,"updatedDate":null,"createdDate":1571117235000,"merchant":{"userId":null,"merchantName":"玫瑰丽人","merchantType":null,"merchantIcon":null}};
        //this.$router.replace({path:'./home',query:{id:userInfo}})
        this.$store.commit('setUserInfo',userInfo);
    },
    //拿收藏
    //    getCollectList () {
    //     if(JSON.stringify(this.$store.getters.userInfo)!='{}'){
    //            let data={
    //               userId:this.$store.getters.userInfo.userId,
    //               pageNum:1,
    //               pageSize:10
    //             };
          
    //       getMyCollectList(data).then(response => {
    //         console.log(response)
    //         this.list[0].shu = response.data.length;
    //       }).catch(err=>{
    //         this.list[0].shu=0;
    //       });
    //     }else {
    //       return
    //     }
     
    // },
    //拿优惠券列表

  }
}
</script>

<style lang="scss" scoped>
.orderhome {
  height: 102vh;
 overflow-y: auto;

  .weui-grid:after {
    border: none;
  }
  .weui-grids:before {
    border: none;
  }
    /deep/ .weui-grid__label{
        font-size: 12px;
    color:rgba(102,102,102,1);
     line-height:17px;
    }
  .div1 {
    height: 186px;
    width: 100vw;
    background-image: linear-gradient(to right, #ff718d, #ff254f);
    color: #ffffff;
    position: relative;
   
    .userInfo_top{
      display: flex;
      margin-left: 12px;
      width: 91.47%;
      height: 50px;
      position: absolute;
      top: 35px;
      justify-content: flex-end;
      align-items: center;
      img{
        width: 50px;
        height: 50px;
        border-radius: 25px;
      }
      .userInfo,.unLogin{
        display: flex;
        align-items: center;
        width: 80%;
        span{
          margin-left: 8px;
        }
      }
      .set{
        width: 20%;
        display: flex;
        justify-content:flex-end;
        img{
          width: 24px;
          height: 24px;
        } 
      }
    }
    .userInfo-bottom{
      position: absolute;
      top:90px;
      left:10px;
      width: 91.47%;
      height:60px;
    display: flex;
    bottom: 18px;
    justify-content: flex-end;
    align-content: center;
     .userInfo-single{
      width: calc(100% / 4);
      display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     }
    }
    
  }
  .div2 {
    height: 3.75rem;
    margin: 0.625rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.5rem;
    margin-top: -1.875rem;
    line-height: 3.75rem;
    padding: 0 1.125rem;
    position: relative;
    z-index: 2;
    .weui-btn_warn {
      background-image: linear-gradient(to right, #ff214c, #ff4f71);
      border-radius: 1.125rem;
      float: right;
      margin-top: 0.93rem;
    }
  }
   .item-head {
     width:90%;
     height:47px;
     margin-left: 14px;
     display: flex;
     justify-content: space-between;
     align-items: center;
      border-bottom:1px solid #eee;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }
  .div3 {
    height: 8.75rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 1);
    margin: 0.625rem;
    font-size: 12px;
    color:rgba(102,102,102,1);
     line-height:17px;
     .item-head span{
      font-size:14px;
font-weight:500;
color:rgba(0,0,0,1);
line-height:20px;
     }
    .border {
      border-bottom: 0.125rem solid #f1f1f1;
      width: 23rem;
      margin: auto;
    }
    /deep/ .weui-grid__icon{
      width: 22px;
      height: 22px;
    }
  
  }
  .div4 {
    height: 20.5rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 1);
    margin: 0.625rem;
    margin-bottom: 4rem;
    /deep/ .weui-grid__icon{
      width: 30px;
      height: 30px;
    }
  }
}
</style>