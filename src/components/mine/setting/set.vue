<template>
  <div class="set">
    <tabGroup :title="title"></tabGroup>
    <div class="container">
    <div class="set-single" >
       <div class="single" @click="turnClear()" ><p>清除缓存</p></div>
       <div class="single" @click="turnFeedback">
        <p>问题反馈</p>
        <img :src="right_triangle" />
      </div>
    </div>
    <div class="set-single">
    <group >
       <cell title="关于我们" :link="{path:'/aboutus'}" ></cell>
       <cell title="隐私声明" :link="{path:'/demo'}" ></cell>
    </group>
    </div>
  
    <big-anniu :title="anniu" @click.native="tuichu" ></big-anniu>
    
  </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import bigAnniu from '@/components/group/biganniu'
import { Cell, Group } from 'vux'
export default {
  inject:['reload'],//注入在App.vue里定义的依赖
  components: {
    tabGroup: tabGroup,
    Cell,
    Group,
    bigAnniu: bigAnniu
  },
  data () {
    return {
      title: '设置',
      anniu: '退出当前账户',
      right_triangle:require('./../../../assets/right-triangle.png')

    }
  },
  props: {},
  computed: {},
  methods: {
    turnFeedback:function (argument) {
      this.$router.push('/Feedback')
    },
     tuichu(){
   localStorage.removeItem('smjuserInfo');
   this.$vux.toast.show({
    text:'退出成功'
   })
  //this.reload();//避免使用location.reload方法出现的一瞬间空白页 但是没法刷新vuex还是有缓存
 //this.$router.replace('/home');
  location.replace('http://sumuji.techwells.com/');

 
  }
  },
 
}
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
   align-content: flex-start;
   height: 337px;

  }
  .set-single{
    width: 100vw; 
    height: 87px;
   .single{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 50%;
    background: #fff;
    border-bottom:1px solid #eee;
    p{
      margin-left: 15px;
    }
    img{
      margin-right: 15px;
    }
   }
  }
.container /deep/ .bigbutton{
  margin-top:10%;
}
.right-triangle{
  width: 7px;
  height: 13px;
}
</style>