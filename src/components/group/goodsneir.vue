<template>
  <div class="goodsneir">
    <tabGroup :title="title" :icon="src"></tabGroup>
    <swiper
      :list="demo02_list"
      style="width:85%;margin:0 auto;"
      :aspect-ratio="800/800"
      dots-position="center"
    ></swiper>
    <div class="div">
      <div class="div1" v-show="$route.path==='/pintuangoodsneir'?true:false">
        <span style="color:#FFCDD6"> ¥540.00</span>
        <span style="float:right">距结束 12 : 43 : 45</span>
      </div>
      <div class="div2">
        <p>妃立宝洗衣包青春版50g</p>
        <div class="fr">
          <img src="./分享.png" />
          <p class="word">分享</p>
        </div>

        <div class="word">
          去污新改革 纳米洗衣宝 孕婴可用，去污新改革
          <br />纳米洗衣宝 孕婴可用
        </div>
        <div>
          <span style="color:#DA0217">会员价 ¥ 50</span>

          <span class="word" style="text-decoration:line-through">¥67</span>
        </div>
      </div>
      <div class="div3">
        <div class="item-head">
          <span>优惠</span>
          <p class="fr word">
            使用优惠券可减去50元
            <img :src="moreicon" />
          </p>
        </div>
        <div class="item-head">
          <span>促销</span>
          <p class="fr word">
            <span style="color:#FF4569; background:#FFEBEB;">
满减
            </span>
            
            满300减30
            <img :src="moreicon" />
          </p>
        </div>
        
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
          <span>商品规格</span>
          <p class="fr word">
            选择尺码、颜色
            <img :src="moreicon" />
          </p>
        </div>

       
      </div>
      <div class="div5">
        <div class="item-head">
          <span>宝贝评价（456）</span>
          <p class="fr word"  @click="topingjia()">
            查看全部
            <img :src="moreicon" alt />
          </p>
        </div>
        <div>
          <div>
            <img src style="width:2.25rem;height:2.25rem;" />
            <span class="word">小瓶子**渐入</span>
          </div>
          <div>大家赶紧没然后了那个女人刚发给你那两个人呢</div>
        </div>
        <div class="border"></div>
        <div>
          <div>
            <img src style="width:2.25rem;height:2.25rem;" />
            <span class="word">小瓶子**渐入</span>
          </div>
          <div>大家赶紧没然后了那个女人刚发给你那两个人呢大家赶紧没然后了那个女人刚发给你那两个人呢</div>
        </div>
      </div>
      <div class="div6">
        <div class="item-head">
          <span>图文介绍</span>
        </div>
        <div style="float:right" class="word">
          <p>品牌： 圣罗兰</p>
          <p>功效：滋润、美伦</p>
        </div>
        <div class="word">
          <p>净含量: 2.2g</p>
          <p>产地：广东</p>
        </div>
        <img src="
        " style="height:29.7rem;" />
      </div>
      <div class="div7">
        <div class="word" style="float:left;width:20%;position: relative;
    top: 0.4rem;">
          <span >
          <img src="./形状.png" ><br/>  
            收藏
          </span>
          </div>
           <div class="word" style="float:left;width:20%; position: relative;
    top: 0.4rem;">
          <span >
          <img src="./首页.png" ><br/>  
            首页
          </span>
          </div>
        <div class="fl" style="font-size:0.75rem;background:#FF8721; color:#FFFFFF; ">¥380<br/>加入购物车</div>
        <div class="fl" style="background:#FF224B; color:#FFFFFF; font-size:0.75rem;" @click="dingdan()">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Swiper, Step, StepItem } from 'vux'
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
    StepItem
  },
  data () {
    return {
      title: '妃立宝洗衣宝青春宝',
      demo02_list: list,
      moreicon: require('./返回2.png')
    }
  },
  props: {},
  computed: {
    src () {
      return require('./分享1.png')
    }
  },

  mounted () {
    window.scroll(0, 0)
  },
  methods: {
    topingjia () {
      this.$router.push('./pingjia')
    },
    dingdan () {
      this.$router.push('./dingdan')
    }
  }
}
</script>

<style lang="scss" >
.goodsneir {
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
    .div6 {
      background-color: #ffffff;
      padding: 0 0.8rem 0.8rem 0.8rem;
      margin-bottom: 0.5rem;
      p {
        line-height: 1.4rem;
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
        width: 30%;
       line-height: 3.125rem;
       
      }
    }
  }
}
</style>