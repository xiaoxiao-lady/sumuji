<template>
  	<div class="container">
       <img :src="returnImg" class="returnImg" @click="goBack()">
      <img :src="img_background"  class="img_background" />
  		<div class="application_form">
  			<div class="app_title">
  				<span>申请流程</span>
          <img :src="img_title" class="img_title">
  			</div>
  			<div class="app_process">
  				<span>
  					<img :src="img_application"/>
  					<p>填写信息<br>提交申请信息</p>
  				</span>
  				<span>
  					<img :src="img_wait"/>
  					<p>等待平台<br>审核并电话联系</p>
  				</span>
  				<span>
  					<img :src="img_become">
  					<p>申请通过<br>正式成为合伙人</p>
  				</span>
  			</div>
  			<div class="app_immediately">
  				<span>立即申请</span>
          <img :src="img_title" class="img_title">
  			</div>

  			<div class="app_form">
  				<div class="name">
  				<span>姓名</span>
  				<input type="text" v-model="agent.realName"  >
  				</div>

  				<div class="phonenumber">
  				<span>手机号</span>
  				<input type="number" placeholder="请输入你的手机号" v-model="agent.mobile">
  				</div>
          
  				<div class="companyName">
  				<span>公司名称</span>
  				<input type="text" placeholder="请输入公司名称" v-model="agent.company">
  				</div>

  				<div class="agent">
  				<span>意向代理城市</span>
                <group>
               	 <x-address  :title="title" :list="addressData" 
                    placeholder="请输入地址" @on-hide="getAddress" v-model="address_three"></x-address>
               </group>
           </div>
        
  			</div>	
           <div class="submit">
          <button :disabled="isClick" @click="submit"><span>提交申请</span></button>
          </div>
            
  		</div>
  	</div>
</template>

<script>
	import { XAddress,Group } from 'vux'
	import { getCityList } from '@/api/address'
  import { addApply } from '@/api/agent'
  import citylist from '../adress/city.json'
	export default{
		data(){
			return{
			img_application:require('./recruitment_img/application.png'),
			img_become:require('./recruitment_img/become.png'),
			img_wait:require('./recruitment_img/wait.png'),
      img_background:require('./recruitment_img/recruitment_background.png'),
      img_title:require('./recruitment_img/recruitment_title.png'),
			addressData: [],
      returnImg:require('../../../assets/return.png'),
      title:' ',
      agent:{
        realName:'',
        mobile:'',
        company:'',
        provinceCode:'',
        cityCode:'',
        districtCode:''
      },
      address_three:[],
      error:'',
      

			}
		},
    computed:{
    isClick(){
      if(this.agent.realName && this.agent.mobile && this.agent.company &&this.agent.provinceCode && this.agent.cityCode && this.agent.districtCode)
        return false;
      else return true;
    }
    },
		methods:{
			getcitylist () {
               getCityList().then(response => {
			          console.log(response)
			          this.citylist = response.data
			          this.citylist.forEach(item => {
			            item.value = item.code
			            item.parent = item.parentCode
			          })
			          this.addressData = this.citylist
                  })
            },
      getAddress(){
     //  this.address_three= x-address.getAddressName ();
       console.log(this.address_three);
       this.agent.provinceCode=this.address_three[0];
       this.agent.cityCode=this.address_three[1];
       this.agent.districtCode=this.address_three[2];
      },
      submit(){
        if(this.validatePhone()){
            addApply(this.agent).then(res=>{
              if(res.code==200){
                 this.$message({
                   message:'申请已发送'
                    })
              }
            })
          
        }
      },
      validatePhone(){
         if (!this.agent.mobile) {
      
        this.$message({
                   message:'手机号码不能为空'
                    });
        return false;
      } else if (!/^1[23456789]\d{9}$/.test(this.agent.mobile)) {
         this.$message({
                   message:'请填写正确的手机号'
                    });
        return false;
      } else {
        this.error = '';
        return true;
      }
      },
      goBack(){
        this.$router.go(-1);
      }

		},
		components:{
			XAddress,
			 Group
		},
		mounted () {
      this.addressData=citylist
		    //this.getcitylist();
          }
	}
</script>

<style>
	.container{
		width: 100vw;
		height:135vh;
    display: flex;
    justify-content: center;
    position: relative;
	/*	background:url('./recruitment_img/recruitment_background.png') no-repeat;*/
		background-size: 100vw  900px;
		position: relative;
		font-family:PingFang SC;
	}
  .returnImg{
    position: absolute;
    z-index: 2;
    top:10px;
    left: 10px;
  }
  .img_background{
    position: absolute;
    width: 100vw;
    height: 135vh;
  }
	.application_form{
		position: absolute;
		width:329px;
   top:250px;
		background:rgba(255,255,255,1);
		border-radius:16px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
    .app_title,.app_immediately{
        width:221px;
        height:41px;  
        margin-top: 25px;
       position: relative;
        background-size: 221px 41px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .img_title{
      position: absolute;
      width:221px;
      height:41px;
    }
    .app_title span,.app_immediately span{
      z-index: 1;
    	padding-right: 20px;
    	font-size: 16px;
    	font-weight:bold;
		color:rgba(255,255,255,1);
		line-height:36px;
    }
    .app_process{
	   	width:330px;
	   	height: 140px;
	   	display: flex;
	   	justify-content:space-around;
	   	align-items: center;    }
   .app_process span{
	   	display: flex;
	   	flex-direction: column;
	   	justify-content: center;
	   	align-items: center;

   }
   .app_process img{
	   	width:46px;
	   	height: 46px; 
   }
   .app_process p{
		font-size:11px;
		font-weight:400;
		color:rgba(153,153,153,1);
		text-align: center;
    margin-top: 8px;
   }
   .app_immediately{
   	margin-top:0;
   }
   .app_form span{
     display:block;
    font-size:10px;
    font-weight:400;
    color:rgba(21,70,228,1);
    margin-left:13px;
    margin-bottom: 6px;
   }
   .app_form input{
    width:254px;
height:26px;
border:1px solid rgba(101,145,252,1);
border-radius:3px;
text-align:left;
padding-left: 10px;
   }
  /* .app_form input::placeholder{
    font-size:8px;
    padding-left: 12px;
    color: #C5C5C5;
   }*/
   
   .name,.phonenumber,.companyName,.agent{
    margin-bottom: 18px;
   }
   button{
    border: none;
   }
   .submit button{
    width:264px;
height:30px;
background:rgba(23,75,232,1);
border-radius:15px;
margin-bottom: 41px;
display: flex;
justify-content: center;
align-items: center;
   }
   .submit>span{
font-size:12px;
font-weight:400;
color:rgba(255,255,255,1);
   }
   .submit button[disabled]{
    background-color: #eee;
   }
	/*.agent /deep/ .weui-cell{ 
		height:53px;
		border:1px solid rgba(101,145,252,1);
		border-radius:6px;
		padding: 0 0;
	}*/
</style>