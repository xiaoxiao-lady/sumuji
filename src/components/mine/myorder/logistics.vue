<template>
  <div class="logistics">
    <tabGroup :title="title" ></tabGroup>
    <div class="timeline-demo">
      <div v-if="wuliu">
      <div class="name">
        <p>{{companyName[0].label}}</p>
        <p class="expressCodeClass">{{expressCode}}</p>
        <input type="number" ref="waitcopy" v-model='expressCode' class="waitcopy">
        
        <span class="fr" @click="copyNum">复制</span>
      </div>
      <timeline>
        <timeline-item v-for="(i,index) in expressRecode" :key="index">
          
          <h4>{{i.AcceptStation}}</h4>
          <h6>{{i.AcceptTime}}</h6>
        </timeline-item>

        
       
      </timeline>
    </div>
    <div class="wu" v-else>
<img src="./编组.png" >
<div>
  暂时没有物流信息
</div>

    </div>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Timeline, TimelineItem,Toast } from 'vux'
import {getLogisticsList} from '@/api/logistics'
export default {
  components: {
    tabGroup: tabGroup,
    Timeline,
    TimelineItem
  },
  data () {
    return {
      title: '查看物流',
      wuliu:true,
      orderNum:2569463353535353,
      expressCompany:'',
      expressCode:'',
      expressRecode:'',
      companyName:'',
      defaultLogisticsCompanies:[
            {
              label: '顺丰速运',
              value: 'SF'
            },
            {
              label: '百世快递',
              value: 'HTKY'
            },
            {
              label: '中通快递',
              value: 'ZTO'
            },
            {
              label: '申通快递',
              value: 'STO'
            },
            {
              label: '圆通速递',
              value: 'YTO'
            },
            {
              label: '韵达速递',
              value: 'YD'
            },
            {
              label: '邮政快递包裹',
              value: 'YZPY'
            },
            {
              label: 'EMS',
              value: 'EMS'
            },
            {
              label: '天天快递',
              value: 'HHTT'
            },
            {
              label: '京东快递',
              value: 'JD'
            },
            {
              label: '优速快递',
              value: 'YC'
            },
            {
              label: '申通快递',
              value: 'STO'
            },
            {
              label: '申通快递',
              value: 'STO'
            }
  ]
    }
  },
  props: {},
  created(){
  this.expressCode=this.$route.query.expressCode;
  this.expressCompany=this.$route.query.expressCompany;
  this.companyName=this.defaultLogisticsCompanies.filter(item=>{
    return this.expressCompany==item.value
  })
  },
  mounted(){
  this.getLogisticsList();
  },
  methods: {
    copyNum(){
        let orderNum=this.$refs.waitcopy;
        console.log(orderNum);
        orderNum.select();
        document.execCommand("Copy");
        this.$vux.toast.text('复制成功')
    },
    getLogisticsList(){
      getLogisticsList({expressCode:this.expressCode,expressCompanry:this.expressCompany,pageNum:1,pageSize:1})
      .then(res=>{
        console.log(res.data[0].logisticsTrace);

        this.expressRecode=JSON.parse(res.data[0].logisticsTrace);
         //this.expressRecode=JSON.parse(res.data.logisticsTrace);
      })
    }
  }
}
</script>

<style lang="scss" >
  p{
    margin: 0;
    padding: 0;
  }
.logistics {
  .name {
    padding: 0 2rem;
    padding-top: 1.1rem;
    padding-bottom: 2.2rem;
    border-bottom: 0.0625rem solid #f5f5f5;
  background-color: #FFFFFF;
  display: flex;
  flex-wrap: wrap;
  justify-content:flex-start;
   .waitcopy{
    opacity: 0;
    border:none;
    position: absolute;

   }
    p{
        border:none;
      line-height: 1.25rem;
      color: #000000;
      font-size: 0.875rem;
      width: 80%;
    }
    .fr {
      float: right;
      color: #1987ff;
    }
    .expressCodeClass{
      display: flex;
      padding-top: 5px;
      align-items: center;
    }
  }
  .vux-timeline {
    padding-left: 4.625rem;
    padding-top: 1.625rem;
    background-color: #FFFFFF;
  }
  .vux-timeline-item-color {
    background-color: #d8d8d8;
  }
  .vux-timeline-item-tail {
    background-color: #d8d8d8;
  }
  .logistics .vux-timeline-item-color {
    background-color: #ff214c;
  }
  .weui-icon-success-no-circle:before {
    content: "发";
  }
  .fl {
    float: left;
        margin-left: -4rem;
 color: #999999;
    font-size: 0.8rem;
  }
  p {
    color: #999999;
    font-size: 0.8rem;
  }
  h4 {
    color: #999999;
    font-size: 0.81rem;
  }
  .recent {
    color: #000000;
  }
  .wu{
  text-align: center;
    color: #D2D2D2;
    font-size: 1.125rem;
    padding-top:4rem;
    background-color: #FFFFFF;
    height: 19rem;
  }
}
</style>