<template>
  <div class="dealMassage">
    <tabGroup :title="title"></tabGroup>
    <div>
      <div class="time">
        <span>2017-08-13 23:14</span>
      </div>
     <div class="div1" v-for="(item,index) in orderMsg">
       
       <p style="float:right; color: #999999;
    font-size: 0.75rem;"></p>
       <div>
         <div>
         {{item.content}}
         </div>
         <div style="color:#999999; font-size:0.69rem;">
         
         </div>
       </div>

     </div>

    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import {getMessageList} from '@/api/home'
export default { 
  components: {
    tabGroup: tabGroup
  },
  data () {
    return {
      title: '消息',
      orderMsg:[],
     
    }
  },
  props: {},
  computed: {
  },
  methods: {
    getMessageList(){
      let data={
        pageNum:1,
        pageSize:20,
        toUserId:this.$store.getters.userInfo.userId,
        messageType:2
      }
      getMessageList(data).then(res=>{
        if(res.code==200){
          res.data.forEach(item=>{
            item.updateDate=this.formDate(item.updateDate);
            console.log(item.updateDate);
             this.orderMsg.push(item)

          })

        }
      })
    },
    formDate(a){
      let b="";
      b=new Date(a).getFullYear()+'-'+new Date(a).getMonth()+'-'+new Date(a).getDate()+' '+new Date(a).getHours()+':'+new Date(a).getMinutes()+':'+new Date(a).getSeconds();
      return b;
    }
  },
  created(){
       this.getMessageList();
  }
}
</script>

<style lang="scss" >
.dealMassage {
  .time {
    text-align: center;
    height: 1.1rem;
    line-height: 1.1rem;
    margin: 0.75rem 0;
    color: #999999;
    font-size: 0.75rem;
  }
  .div1{
    background: #FFFFFF;
    margin: 0.75rem;
    padding: 0.75rem;
    .img{
      margin: 0.75rem;
    }
  }
}
</style>