<template>
  <div class="color">
<tabGroup :title="title"  @rightTitle="submitAssess"
              :rightTitle="ab" ></tabGroup>
    <div class="fen">
      <span>描述相符</span>
      <rater :star="'★'"  v-model="productScore" active-color="#FF9900" ></rater>
    </div>
    <div class="fen">
      <span>物流服务</span>
      <rater :star="'★'"  v-model="expressScore" active-color="#FF9900"></rater>
    </div>
    <div class="fen">
      <span>服务态度</span>
      <rater :star="'★'"  v-model="serviceScore" active-color="#FF9900" ></rater>
    </div>
     <group>
      <x-textarea :max="200" :placeholder="placeholder" v-model="content" ></x-textarea>
    </group>

  </div>
</template>

<script>
import { XHeader, Tab, TabItem, XProgress, Rater, Alert, XTextarea, Group,Toast } from 'vux'
import tabGroup from '@/components/group/tab'
import {addEvaluation} from '@/api/evaluation'
export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    XProgress,
    Rater,
    Alert,
    XTextarea,
    Group,
    tabGroup: tabGroup
  },
  data () {
    return {
      a: '<embed src="' + require('./star.svg') + '">',
      title: '发表评价',
      describle: '退出后编辑过的内容将不保存',
      show: false,
      placeholder: '输入评价内容',
      title1: '发表评价',
      ab: '提交',
      content:null,
      expressScore:null,
      productScore:null,
      serviceScore:null,
      orderId:''
    }
  },
  props: {},
  created(){
  this.orderId=this.$route.query.orderId;
  },
  methods: {
    getback () {
      this.show = true
    },
    onhide () {
      this.$router.push('/myOrder')
    },
    submitAssess(){
      let params={
       content:this.content,
       orderId:this.orderId,
       userId:this.$store.getters.userInfo.userId,
       productScore:this.productScore,
       expressScore:this.expressScore,
       serviceScore:this.serviceScore
      }
      if(this.productScore!=null&&this.expressScore!=null&&this.serviceScore!=null&&this.content!=null){
           addEvaluation(params).then(res=>{
        if(res.code==200){
          this.$vux.toast.show({
            text:'评价成功'
          })
          this.$router.go(-1);
        }
      })
         }else{
          this.$vux.toast.text('请评分完毕后再提交吧')
         }
   
      //调用提交接口
      //提交成功后跳转到评价成功页面
    }
  }
}
</script>

<style lang="scss" >
.color {
  background-color: #ffffff;
  height: 100vh;
.tab .img2{
  color:#FF214C;
}
  .left-arrow {
    position: absolute;
    width: 30px;
    height: 30px;
    top: -5px;
    left: -5px;
  }
  .fen {
    padding: 0 0.8rem;
    height: 3.125rem;
    font-size: 0.875rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 3.125rem;
    border-bottom: 0.0625rem solid #e5e5e5;
    span{
      margin-right: 10px;
    }
  }
 
  .weui-textarea{
   font-size: 14px;
     height: 8.375rem;
     line-height: 20px;
  }

}
</style>