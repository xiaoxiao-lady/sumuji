<template>
  <div class="pingjia">
    <tabGroup :title="title"></tabGroup>
   <!--  <button>很好用(657)</button><button>很好用(657)</button> -->
     <div class="div5">
       <!--  <div class="item-head">
          <span>宝贝评价（{{evaluationList.length}}）</span>
        </div> -->

      <div class="eva_info" v-for="(evaluation, index) in evaluationList">
            <div class="eva_user">
            <img v-bind:src="evaluation.userIcon" style="width:2.25rem;height:2.25rem;" />
          <span class="eva_name">{{evaluation.nickName}}</span>
            </div>
      <div class="eva_content" >{{evaluation.content}}</div>
     <!--  <div class="eva_time">{{item}}</div> -->
        </div>
  </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import {getProductDetail } from '@/api/product'
export default {
  components: {
    tabGroup: tabGroup

  },
  data () {
    return {
      title: '评论',
      evaluationList:[],
      evaCreatedDate:[]
    }
  },
  created(){
   this.getProductDetail(this.$route.params.id);

  },
  props: {},
  computed: {},
  methods: {
    getProductDetail(id){
      getProductDetail(id).then(res=>{
         this.evaluationList=res.data.evaluationList;
         this.evaluationList.forEach(item=>{
          this.getTime(item.createdDate);
         })
      })
     },
    getTime(date){
    let createdTime=new Date(date);
          createdTime=createdTime.getFullYear()+
          '.'+(createdTime.getMonth()+1) 
          +'.'+createdTime.getDate()+'  '+
          createdTime.getHours()+'.'+
          createdTime.getMinutes()+'.'+createdTime.getSeconds();
          //建立一个对象，里面放创建时间的数组。把这个对象作为evaluate的一个元素push进去 遍历eva拿到对象 item.createdTime
          this.evaCreatedDate.push(createdTime);

       }
  }
}
</script>

<style lang="scss" >
.pingjia {
  background: #FFFFFF;
  button{
  width:5.625rem;
height:1.75rem;
background:rgba(255,230,235,1);
border-radius:1rem;
border: none;
font-size:0.69rem;
font-weight:400;
color:rgba(115,98,101,1);
line-height:1rem;
margin-top: 0.9375rem;
margin-left: 0.93rem;}
.div5 {
  
  margin-left:15px;
  .eva_info{
    width: 343px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 13px;
    border-bottom: 1px solid #eee;
    .eva_user{
      height: 31px;
      width: 343px;
      display: flex;
      align-items: center;
      img{
        width: 31px;
        height: 31px;
        border-radius:24px; 
      }
      span{
        margin-left: 6px;
        font-size:12px;
        font-weight:400;
        color:rgba(161,161,161,1);
        line-height:17px;
      }
    }
    .eva_content{
      width: 343px;
      font-size:13px;
      font-weight:400;
      color:rgba(0,0,0,1);
      margin-top: 6px;
    }
  }
     
    }

}





</style>