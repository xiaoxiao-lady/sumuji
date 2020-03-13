<template>
  <div class="groupon">
    <tabGroup :title="title" ></tabGroup>
    <div class="dapai">
      <div>
        <span>大牌拼团</span>
       
      </div>
      <div class="body" v-for="(item,key) in grouponList" :key="key">

        <img :src='item.productIcon' class="fl" />
        <div class="content">

          <p>{{item.productName}}</p>
          <p style="color:#999999; font-size:0.75rem;">{{item.description}}</p>
           <span class="fr">
          距离结束
          <font color="#FF2B54">{{item.duringForm}}</font>
        </span>
          <p class="fx">
            拼团价 ¥{{item.originalPrice}}
            <span
              style="color:#999999; font-size:0.75rem; text-decoration:line-through"
            >¥{{item.currentPrice}}</span>
          </p>
           <button @click="pintuangoods(key)">去拼团</button>
        </div>
        <div class="clear"></div>
      </div>
      <div style="margin-bottom:5rem;"></div>
    </div>
  </div>
</template>
<script>
import {} from 'vux'
import tabGroup from '@/components/group/tab'
import { getGrouponList } from '@/api/groupon'
export default {
  data () {
    return {
      cost: 3,
      title: '拼团商城',
      grouponList: [],
      timer:'',
      duringForm:[]
    }
  },
  components: {
    tabGroup: tabGroup
  },
  mounted () {
    this.getGrouponList();
    
  },
  watch:{
 duringForm(val){
//监视到duringForm的变化就 将val赋值给group对象
 console.log(val);
if(val.length==this.grouponList.length){
  for(let i=0;i<val.length;i++){

 //采用set方式添加属性 
  this.$set(this.grouponList[i],'duringForm',val[i])
 
}
}

 },
 immediate: true
  },

  
beforeDestroy(){//退出页面后 就清除定时器
console.log(this.timer)
 clearInterval(this.timer)
 this.timer=null
},
  methods: {
    
    getback () {
      history.go(-1)
    },
    pintuangoods (key) {
      let id=this.grouponList[key].productId
      this.$router.push({path:`./pintuangoods/${id}`})
      console.log( this.grouponList[key].productId)
    },

    getGrouponList () {

      getGrouponList({
        pageNum: 1, pageSize: 10
      }).then(res => {
        this.grouponList = res.data

        for(let i=0;i<this.grouponList.length;i++){

            this.timer=setInterval(()=>{
         if(this.duringForm.length===this.grouponList.length){
                    this.duringForm=[]
                   }//防止一直push元素不断增加

             let currentTime=new Date().getTime();
             let during=this.grouponList[i].endTime-currentTime;
            let  duringForm=new Date(during);
             this.duringForm.push(duringForm.getHours()+'小时'+
             duringForm.getMinutes()+'分钟'+duringForm.getSeconds()+"秒");

           },1000)
        }
        
     


      })

    }
  }
}
</script>
<style lang="scss" scoped>
.groupon {
  .dapai {
    padding: 0.625rem;
    margin: 0.625rem;
    background-color: #ffffff;
    border-radius: 0.25rem;
    .fl {
     
      height: 25.33vw;
      width: 25.33vw;
      /* width:; 
       height:6.5rem;
       margin-right:0.43rem;*/
    }
    .fr {
      float: left;
    }
    .body {
      width: 100%;
      margin-top: 0.75rem;
      overflow: hidden;
      height:131px; 
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .content{
        width: 65%;
        margin-left: 7px;
      }
      .fx {
        margin-top:2.5rem;
        color: #ff4f71;
        font-size: 0.75rem;
      }
      button {
        float: right;
        width: 4.5rem;
        height: 1.875rem;
        background-image: linear-gradient(to right, #ff214c, #ff4f71);
        border-radius: 1.125rem;
        border: none;
        box-shadow: 0px 0.125rem 0.25rem 0px rgba(255, 175, 189, 1);
        color: #ffffff;
        margin-top: -2rem;
      }
    }
    .clear {
      width: 100%;
      border: 0.0625rem solid #f4f4f4;
     /* margin-top: 1rem;*/
    }
  }
}
</style>
