<template>
  <div class="lottery">
    <div class="toast" @click="closePop"  >
      <div class="star">
        <div :class="'star_'+index" v-for="index in starsArr">
          <img :src="star1">
        </div>
       <!--  <div class="star_1"></div> -->
      </div>
       <div class="light"></div>
      
       <div class="popPrizeimg">
         <div class="popHead">中奖啦</div>
         <img :src="prize.imageUrl">
         <div class="popText">恭喜你<br/>获得{{prize.awardContent}}</div>
          <div class="popBtn" @click="ReceiveAward"></div>
       </div>
      
     </div>
    <div class="head">
    <!--  <img :src="bg" class="bgImg"> -->
     <img :src="myPrize" class="prizeImg" @click="goMyprize">
     <img :src="logoImg" class="logoImg">
     <img :src="headInvite" class="headImg">
     </div>
     <div class="section">
       <div class="tip">
         <img :src="leftRrrow" />
          还有{{surplusDrawCount}}次抽奖机会
         <img :src="rightRrrow" />
       </div>
       <div class="lotterySection">
         <div class="lotteryBg" :style="rotateStyle">
          <div class="prizeList">
            <div class="prizeItem" v-for="(item,index) in prizeList" :key="index" :style="item.style">
                <img :src="item.imageUrl" class="prizeItemImg">  
                <div class="prizeText">{{item.awardName}}</div>
            </div>
          </div>
         </div>
          <img :src="pointer" class="pointer">
          <img :src="btn" class="btn" @click="beginRotate">
       </div>

       <div class="winList">
        <div class="nameBox">
          <div class="winName" v-for="item in drawList">
            <p>{{item.nickName}}</p>
            <p>抽中</p>
            <p>{{item.awardContent}}</p>
          </div>
        </div>
       </div>
       <div class="inviteRecord">
         <div class="inviteBox">
           <span class="inviteNum">{{recommendCount}}</span>
           <span>邀请成功</span>
         </div>
         <!-- <div class="inviteBox">
           <span  class="inviteNum">0</span>
           <span>邀请在路上</span>
         </div> -->
         <div class="inviteBox">
           <span  class="inviteNum">{{winningCount}}</span>
           <span>获得奖励</span>
         </div>
       </div>
       <div class="step"></div>
       <div class="rule"></div>
     </div>
  </div>
</template>

<script>
  import {drawAward,getDrawDetail,getAwardList} from '@/api/lottery'
  import {mapGetters} from 'vuex'
  const config={
    duration:4000,
    circle:8,
    mode:'ease-in-out'
  }
export default {
  name: 'lottery',
  data(){
    return{
       headInvite:require("../../../assets/lottery/headInvite.png"),
       myPrize:require("../../../assets/lottery/myPrize.png"),
       logoImg:require("../../../assets/lottery/logo.png"),
       leftRrrow:require("../../../assets/lottery/leftRrrow.png"),
       rightRrrow:require("../../../assets/lottery/rightRrrow.png"),
       pointer:require("../../../assets/lottery/pointer.png"),
       winList:require("../../../assets/lottery/winList.png"),
       btn:require("../../../assets/lottery/button.png"),
       star1:require("../../../assets/lottery/star_1.png"),
       starsArr:[0,1,2,3,4,5],
       winningCount:0,//已抽奖次数
       recommendCount:0,// 推荐好友次数
       surplusDrawCount:0,//剩余抽奖次数
       drawList:'',//中奖列表
       rotateAngle:0,//旋转角度,
       prizeList:[],
       index:0,
       prize:'',
       isRotating:false,
    }
  },
  created(){
    this.angleList=[];
    this.config=config;

  },
  mounted(){
   this.getAwardList();
  },
  computed:{
    rotateStyle(){
       return `
        -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
        transition: transform ${this.config.duration}ms ${this.config.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`
    },
    ...mapGetters([
    'userInfo'
    ])
  },
  methods:{
       getAwardList(){
         getAwardList({pageNum:1,pageSize:20}).then(res=>{
             this.prizeList=this.formatPrizeList(res.data);
         })
       if(localStorage.hasOwnProperty("smjuserInfo")){
           getDrawDetail(this.userInfo.userId).then(res=>{
         this.drawList=res.data.drawList;
         this.surplusDrawCount=res.data.surplusDrawCount;
         this.recommendCount=res.data.recommendCount;
         this.winningCount=res.data.winningCount;
          })
        }else{
            getDrawDetail(0).then(res=>{
         this.drawList=res.data.drawList;
         this.surplusDrawCount=res.data.surplusDrawCount;
         this.recommendCount=res.data.recommendCount;
         this.winningCount=res.data.winningCount;
          })
        }
 
     },
     formatPrizeList(list){
      const angleList=[];
      const l=list.length;
      const average= 360/l;
      const half=average/2;
      list.forEach((item,i)=>{
        const angle=-((i*average));
        item.style=`-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`;
        angleList.push((i*average))
      })
      this.angleList=angleList;
      return list
     },
       beginRotate(){ //判断是否登陆
        let that=this;
       if(localStorage.hasOwnProperty("smjuserInfo")){
            drawAward({userId:that.userInfo.userId}).then(res=>{
               that.index=--res.data;
              that.rotating();
             })
          }else{
                   Vue.$vux.confirm.show({
                      content:'请先登录',
                      confirmText:'去登录',
                      cancelText:'取消',
                      onConfirm () {
                        that.$router.push('/wxlogin')
                       },
                       onCancel () {
                          return
                         } 
               })
          }
   
     },
     rotating(){
        if(this.isRotating)return
          this.isRotating=true;
        //计算大圈背景转多少角度
        const angle=this.rotateAngle+this.config.circle*360-(this.rotateAngle%360)+
         this.angleList[this.index];
        this.rotateAngle=angle;
         // 旋转结束后，允许再次触发
        setTimeout(() => {
          this.rotateOver()
        }, this.config.duration + 1000)
     },
     rotateOver(){
      this.isRotating=false;
      this.prize=this.prizeList[this.index];
      console.log(this.prize)
     },
     ReceiveAward(){

     },
     goMyprize(){
      this.$router.push('myAwardList');
     },
     closePop(){
      this.prize='';
     }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @windowWidth:375;
   
  .imgSize{
    width: 100%;
    height: 100%;
  }
  .displaySet{
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
  }
.mixin(@n) when(@n > 0) {
    box-shadow+ : ~`Math.round(Math.random() *  @{windowWidth}) + 'px' + ' ' +Math.round(Math.random() *  @{windowWidth}) + 'px #00F5FF'  `;
    .mixin((@n - 1));
  } 
/*.stars(@z) when (@z>0){
  @q:`Math.round(Math.random()*10+10)+'px'`
  background-image: url('../../../assets/lottery/star_0.png');
  background-size: 100%;
  width:@q;
  height:@q;
  .stars((@z - 1));
}*/
@keyframes starFlick {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
@keyframes scaleAnima{
  from{
      
     opacity: 0;
  }
  to{
    opacity: 1;
   /* width: 40px;*/
    
  }
}
  .lottery{
    .toast{
      .displaySet;
      align-content:flex-start;
      width: 100%;
      height: 225%;
      position: absolute;
      z-index: 100;
      background: rgba(0,0,0,0.5);
      .light{
         width:285px;
        height: 187px;
        position: absolute;
        background-image: url("../../../assets/lottery/light.png") ;
        background-repeat:no-repeat;
        top:170px;
        background-size: 100%;
       /* background: radial-gradient(circle at 200px 250px,white 0%,#FFFBE6 20% , black 80%);
        opacity:0.5;*/
        z-index: -1;

      }
      .star{
          position: absolute;
        width: 100%;
        height: 800px;
        animation: starFlick 1s ease-out infinite;

       /* background:radial-gradient(#FFFBE6);
      /*  .star_1{
        .mixin(40);
        width:2px;
        height:2px;
         margin-top:10%;
        }*/
        .star_0 img{
         width: 20px;
         height: 20px;
         position: absolute;
         top:180px;
         left: 120px;
        }
        .star_1 img{
           width: 20px;
         height: 20px;
         position: absolute;
         top:300px;
         left: 150px;
        }
        .star_2 img{
           width: 20px;
         height: 20px;
         position: absolute;
         top:250px;
         left: 300px;

        }
        .star_3 img{
           width: 15px;
         height: 15px;
         position: absolute;
         top:200px;
         left: 260px;

        }
        .star_4 img{
           width: 15px;
         height: 15px;
         position: absolute;
         top:300px;
         left: 280px;
        }
        .star_5 img{
           width: 20px;
         height: 20px;
         position: absolute;
         top:250px;
         left: 100px;
        }
      
      }
      .pages{

      }
      .popPrizeimg{
        width: 100%;
        margin-top: 40%;
         animation: scaleAnima 1s ease-out  ;
          /*animation-delay:0.5s;*/
        .displaySet;
        img{
           
        /*  opacity: 1;*/
       
        }
         .popHead{
          text-align: center;
          width: 100%;
          font-size:30px;
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:42px;
          margin-bottom: 32px;
          text-shadow:0px 0px 6px rgba(0,0,0,0.5);
         }
         .popText{
          text-align: center;
          width: 100%;
          margin-top: 21px;
          font-size:18px;
          color:rgba(255,255,255,1);
          line-height:25px;
          text-shadow:0px 0px 6px rgba(0,0,0,0.5);
         }
          .popBtn{
          background:url("../../../assets/lottery/receive.png");
          width: 181px;
          height: 44px;
          background-size: 100%;
          margin-top: 32px;
         }
      }
 
    }
   .imgSize;
   background-size: 100% 100%;
   background-image: url("../../../assets/lottery/bg.png") ;
   .head{
      .displaySet;
       position: relative;
       height: 246px;
     /* .bgImg{
       .imgSize;
        object-fit: cover;
       }*/
       .headImg{
         width: 100%;
        }
       .prizeImg{
        position: absolute;
        top:18px;
        left: 290px;
        z-index: 10;
        width: 65px;
        height: 25px;
       }
       .logoImg{
        width: 171px;
        height: 14px;
        top:46px;
        position: absolute;
        z-index: 10;
       }

   }
  .section{
    .displaySet;
    .tip{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width:190px; 
      margin-top: 17px;
      font-size:16px;
      font-weight:700;
      color:rgba(255,48,48,1);
      line-height:22px;
      color: #FF3030;
      img{
        width: 23px;
        height: 12px;
      }
    }
    .lotterySection{
      width: 306px;
      height: 316.85px;
      position: relative;
      .lotteryBg{
      width: 306px;
      height: 316.85px;
      position: absolute;
      background:url("../../../assets/lottery/circleBg.png");
      background-size: 306px 316.85px;
       .prizeList{
        position: relative;
        width: 100%;
        height: 100%;
        .prizeItem{
           position: absolute;
           width: 104px;
           height: 151px;
            left:100px;
            top:10px;
           text-align: center;
           box-sizing: border-box;
           padding-top:25px;
           font-size:10px;
        
           color: #666666;
           transform-origin:50% 100%;
           .prizeItemImg{
             width: 35px;
             height: 35px;
            /* position: absolute;
             top:-40px;*/
           }
        }
       }
      }
      .pointer{
        width: 30px;
        height: 40px;
        position: absolute;
        left: 140px;
        top:0;
      }
      .btn{
        width: 123px;
        height: 124px;
        position: absolute;
        top:100px;
        left: 90px;
        /*top:104px;
        left:90px;*/
      }
    }
    .winList{
        background-image: url("../../../assets/lottery/winList.png");
        width: 341px;
        height: 104px;
        background-size: 100% 100%;
        margin-top: 21px;
        box-sizing: border-box;
        padding: 25px 0 16px 0; 
        .nameBox{
             overflow-y: scroll;
             width: 341px;
             height: 75px;
          .winName{
            width: 100%;
            height: 40px;
           display: flex;
           justify-content: space-around;
           align-items: center;
           color: #E23C3C;
           font-size:12px;
           line-height:17px;
          }
        }

      }
    .inviteRecord{
      width: 337px;
      height: 124px;
      background-image: url("../../../assets/lottery/invitationRecord.png");
      margin-top: 38px;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-around;
      .inviteBox{
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        color: #FF6464;
        font-size:14px;
       .inviteNum{
        margin-top: 10px;
        text-align: center;
        font-size:21px;
        width: 100%;
        margin-bottom: 10px;
       }
      }
    }
    .step{
       background-size: 100% 100%;
      margin-top: 38px;
      width: 337px;
      height: 164px; 
      background-image: url("../../../assets/lottery/step.png");
    }
    .rule{
       background-size: 100% 100%;
      margin-top: 38px;
      background-image: url("../../../assets/lottery/rule.png");
      width:337px;
      height: 325px;
      margin-bottom: 47px;
    }
  }
 }

</style>
