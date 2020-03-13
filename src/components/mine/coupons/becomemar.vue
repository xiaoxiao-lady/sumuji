<template>
  <div class="becomemar" >
    <tabGroup :title="title"></tabGroup>
    <form >
    <span>我是代表个人:<input type="radio" value="single" class="select" v-model="selected"></span>
     <span>我是代表公司:<input type="radio" value="company" class="select" v-model="selected"></span>
   </form>
    <div class="text">
      <span >店铺名称</span>
<input type="text" placeholder="请输入店铺名称" v-model="merchantName">
    </div>
    <div class="text"  v-show="company">
      <span v-show="company">公司名称</span>
      <input type="text" placeholder="请输入公司名称" v-model="faren_CompanyName" >
    </div>
       <div class="text">
    <span v-show="company">法人名称</span>
      <span v-show="single">个人姓名</span>
<input type="text" placeholder="请输入法人名称" v-show="company" v-model="faren_name" >
<input type="text" placeholder="请输入个人姓名" v-show="single" v-model="single_name">
    </div>
     <div class="text">
    <span v-show="company">法人手机号</span>
      <span v-show="single">个人手机号</span>
<input type="number" placeholder="请输入法人手机号" v-show="company" v-model="faren_phone" >
<input type="number" placeholder="请输入个人手机号" v-show="single" v-model="single_phone" >
    </div>
       <div class="text">
      <span v-show="company">法人身份证</span>
      <span v-show="single">个人身份证</span>
<input type="number" placeholder="请输入法人身份证" v-show="company" v-model="faren_id" >
<input type="number" placeholder="请输入个人身份证" v-show="single" v-model="single_id">
    </div>

    <div class="blFile"> 
      <p>营业执照副本照片</p>

     <div class="sf_blFile" >
    <img src="./营业执照副本照片.png" >
    <span>示范照片</span>
     </div>

      <div class="submit_blFile">
         <img :src="add_img"  v-if="!blFile"/>
         <img :src="blFile" v-else class="submit-img">
        <form enctype="multipart/form-data">
      <label for="blFile_input">
        
        <div style=" color:#999999" v-if="!blFile">
        上传照片
        </div>
          </label>
      <input v-show='false'
          type="file"
          id="blFile_input"
          @change="tirggerIconFile($event)"
          multiple
          ng-submit
          accept="image/*"
        />
        </form>
        
      
     </div>

   
    </div>

  <toast v-model='show_toast' type="cancel">{{error}}</toast>

      <div class="faren"> 

      <p v-show="company">法人身份证正反面照片</p>
      <p v-show="single">个人身份证正反面照片</p>
     <div class="faren_left">
       
      <label for="ifFile_input" >
         <img :src="add_img"  v-if="!ifFile"/>
         <img :src="ifFile" v-else class="submit-img">
           <div style=" color:#999999" v-if="!ifFile">
        上传正面图片
        </div>
          </label>
      <input v-show='false'
          type="file"
          id="ifFile_input"
          @change="tirggerIconFile($event)"
          multiple
          ng-submit
          accept="image/*"
        />
       
      
     </div>

      <div class="faren_right">
       <img :src="add_img" v-if="!ibFile"/>
          <img :src="ibFile" v-else class="submit-img"/>
      
      <label for="ibFile_input" >
        
           <div style=" color:#999999" v-if="!ibFile">
        上传反面图片
        </div>
          </label>
      <input v-show='false'
          type="file"
          id="ibFile_input"
          @change="tirggerIconFile($event)"
          multiple
          ng-submit
          accept="image/*"
          :ref="2"
        />
      
     </div>

    </div>
    
      <div class="submit">
          <button :disabled="isClick" @click="submit"><span>提交申请</span></button>
          </div> 
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Group, CheckIcon ,Toast } from 'vux'
import {addMerchant} from '@/api/merchant'

export default {
  components: {
    tabGroup: tabGroup,
    Group,
    CheckIcon,
    Toast
  },
  data () {
    return {
      title: '成为商家',
      add_img:require('./加.png'),
      iconFile:'',
      img_url:'',
      blFile:'',
      ifFile:'',
      ibFile:'',
      single:false,
      company:true,
      selected:'',
      faren_CompanyName:'',
      faren_phone:'',
      single_phone:'',
      faren_name:'',
      single_name:'',
      faren_id:'',
      single_id:'',
      merchantName:'',
      error:'',
      show_toast:false,

    }
  },
  props: {},
  computed: {
    isClick(){
      if((this. iconFile && this.blFile && this.ibFile &&this.faren_phone && this.faren_name && this.faren_id&&this.faren_CompanyName)||(this. iconFile && this.blFile && this.ibFile &&this.single_phone && this.single_name && this.single_id))
        return false;
      else  return true;
    }
  },
  watch:{
  selected:function(value){
      if(value=='single'){
         this.company=false;
        this.single=true;
        console.log(this.single)
      }else{
        this.single=false;
      this.company=true;
       console.log(this.company)
      }
  }
  },
  methods: {
    single(){
      this.single=!this.single;
    },
    company(){
      this.company=!this.company;
    },
   tirggerIconFile(event) {
    console.log(event.target.id);
    let value=event.target.id;
      this.iconFile = event.target.files[0];
      if (window.createObjectURL!=undefined) { // basic
           this.img_url = window.createObjectURL(this.iconFile) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
           this.img_url = window.URL.createObjectURL(this.iconFile) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            this.img_url = window.webkitURL.createObjectURL(this.iconFile) ;
        }
        this.SetMerchant(value);
    },
    validatePhone(){
      console.log(this.faren_phone)
       if(this.single==true){
        if (!/^1[345678]\d{9}$/.test(this.single_phone)) {
        this.error = "请填写正确的手机号码";
          this.show_toast=true;
        return false;
      } else {
        this.error = '';
        return true;
      }
       }else{
        if (!/^1[345678]\d{9}$/.test(this.faren_phone)) {
        this.error = "请填写正确的手机号码";
          this.show_toast=true;
        return false;
      } else {
        this.error = '';
        return true;
      }
       }
      },
      isCardNo(){
   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
   let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
   if(this.single===true){
    if(reg.test(this.single_id) === false)
       {
           this.error="身份证输入不合法";
             this.show_toast=true;
           return  false;
       }else{
        return true
       }
   }else{
    if(reg.test(this.faren_id) === false)
       {
           this.error="身份证输入不合法";
             this.show_toast=true;
           return  false;
       }else{
        return true
       }
   }
   
    },
     SetMerchant(value) {
      console.log(value+'ss');
      console.log(typeof(value));
    if(value=='blFile_input'){
      console.log('wojin')
        this.blFile=this.img_url;
        console.log(this.blFile)
    }else if(value=='ifFile_input'){
      this.ifFile=this.img_url;
    }else{
      this.ibFile=this.img_url;
    }
   },
   submit(){
    let userId=this.$store.getters.userInfo.userId;
    console.log('进来了sub')
  if(this.validatePhone()&&this.isCardNo()){
      console.log('进来了sub丽丽')
    if(this.single==true){
       let data={
        blFile:this.blFile,
        ifFile:this.ifFile,
        ibFile:this.ibFile,
        merchantName:this.merchantName,
        userId:345,
        merchantType:1,
        jurisdicalPerson:this.single_name,
        jurisdicalMobile:this.single_phone,
        identificationCard:this.single_id
      }
      console.log('single'+data);
        addMerchant(data).then(res=>{
        console.log(res.data)
      })
    }else{
       let data={
        blFile:this.blFile,
        ifFile:this.ifFile,
        ibFile:this.ibFile,
        merchantName:this.merchantName,
        userId:345,//要改 选择文件也要改
        merchantType:2,
        enterpriseName:this.faren_CompanyName,
        jurisdicalPerson:this.faren_name,
        jurisdicalMobile:this.faren_phone,
        identificationCard :this.faren_id
      }
      console.log(data);
        addMerchant(data).then(res=>{
        console.log(res.data)
      })
     
    }
    }


      }  

 
   

  },
 
}
</script>

<style lang="scss" >
.submit-img{
 width:87px;
height:144px; 
}
  form{
    width: 100vw;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    span{
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
    }
  }
  input{
    border: none;
    height: 45px;
    width: 70%;
    margin-left: 15px; 
  }
 
  .select{
    width: 40px;
    height: 40px;
  }
.becomemar {
   background: #FFFFFF;
  .text{
    width: 100vw;
    height: 48px;
  border:0.1px solid #F1F1F1;
  background: #FFFFFF;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span{
    margin-left:1rem; 
    font-size: 14px;
    color: #000;
    font-weight: 400;
  }
    
  }
  .blFile,.faren{
    width: 100vw;
    height: 219px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 18px;
    p{
width: 100vw;
font-size:14px;
font-weight:400;
color:rgba(0,0,0,1);
line-height: 48px;
    }
    .sf_blFile,.submit_blFile{
      display: flex;
      width: 44.8%;
      height:173px;
      flex-direction: column;
      align-items: center;
    }
    .submit_blFile{
      margin-left: 12px;
      height: 144px;
      background:rgba(249,249,249,1);
    }
  }
.faren p{
  height: 38px;
}
 .faren_left,.faren_right{
  width:168px;
height:144px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background:rgba(249,249,249,1);
 }
  .faren_right{
    margin-left: 12px;
  }
 
    .submit button {
    width: 21.4rem;
    height: 3.125rem;
    background: linear-gradient(
      225deg,
      rgba(255, 33, 76, 1) 0%,
      rgba(255, 79, 113, 1) 100%
    );
    box-shadow: 0px 0.25rem 0.5rem 0px rgba(255, 175, 189, 1);
    border-radius: 2.2rem;
    border: none;
    color: #ffffff;
    font-size: 1rem;
    margin:1rem;
  }
  
}
 .submit button[disabled]{
    background: #eee;
     box-shadow: 0px 0.25rem 0.5rem 0px #eee;
   }
</style>