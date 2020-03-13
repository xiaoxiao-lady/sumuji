<template>
  <div class="systemMassage">
    <tabGroup :title="title"></tabGroup>
    <div v-for="(item,index) in systemMsg">
      <div>{{item.content}}</div>
      
    </div>
    
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Group, Cell } from 'vux'
export default {
  components: {
    tabGroup: tabGroup, Group, Cell
  },
  data () {
    return {
      title: '系统消息',
      systemMsg:[]
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
        messageType:1
      }
      getMessageList(data).then(res=>{
        if(res.code==200){
          res.data.forEach(item=>{
            item.updateDate=this.formDate(item.updateDate);
            console.log(item.updateDate);
             this.systemMsg.push(item)

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
}
</script>

<style lang="scss" >
.systemMassage {
  .time {
    text-align: center;
    height: 1.1rem;
    line-height: 1.1rem;
    margin:0.75rem 0;
    color: #999999;
    font-size:0.75rem;
  }
  .div1{
    height: 11.25rem;
    background: #FFFFFF;
    margin: 0.75rem;
    padding: 0.75rem;

    .area{
      margin-top: 0.69rem;
      height: 7.1rem;
      background: #EFEFEF;
    }
  }
  .div2{
    background: #FFFFFF;
    margin: 0.75rem;
    padding: 0.75rem;
    .weui-cell__ft{
      color:#1987FF
    }
  }
}
</style>