<template>
	<div class="container">
	<!-- <div class="tab">
    <img :src="cancal_img" class="img1" @click="getback()" />
    <span class="span1">问题反馈</span>
    <span class="submit" @click="toFeedback">提交</span>
    </div> -->
    <tab :title="$route.path=='/Feedback'?'问题反馈':'评价'" :rightTitle="rightText" @rightTitle="toFeedback"></tab>
 <toast v-model='show_error' type="cancel">{{error}}</toast>
 <toast v-model='show_success' >{{success}}</toast>
		<div class="show-input">
			<textarea class="textarea-section" placeholder="输入你想说的吧~" v-model="text">
				
			</textarea>
		</div>
		<div class="select-img">
			<div class="arr_img" v-if="url_img">
			<span class="delete">
			<img :src="delete_img"  @click="Todelete_img" />
		    </span>
			<img :src="url_img"  class="url_img" />
			</div>
		
		  <label for="img_input" class="submit-img">
           <img :src="submit_img" />
          </label>
			<input v-show='false'
          type="file"
          id="img_input"
          @change="tirggerIconFile($event)"
          multiple
          ng-submit
          accept="image/*"
        />
       
		</div>
	</div>
</template>
<script>
	import {addFeedback} from '@/api/user'
	import {Toast } from 'vux'
  import tab from './../../group/tab'
	export default {
		data(){
			return{
          url:null,
          imgList:null,
          rightText:'提交',
          submit_img:require('../img/submit-img.png'),
          cancal_img:require('./../../../assets/search/返回.png'),
          text:null,
          error:'',
          url_img:'',
          success:'',
          delete_img:require('./../../../assets/delete.png'),
          show_error:false,
          show_success:false
			}
		},
		components:{
			Toast,
      tab
		},
		methods:{
			 tirggerIconFile(event) {
      let iconFile = event.target.files[0];
      if (window.createObjectURL!=undefined) { // basic
           this.url_img = window.createObjectURL(iconFile) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
           this.url_img = window.URL.createObjectURL(iconFile) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            this.url_img = window.webkitURL.createObjectURL(iconFile) ;
        }
  
    },
      toFeedback(){
           if(this.text){
            		let data={
            			file:this.url_img,
            			content:this.text,
            			userId:this.$store.getters.userInfo.userId
            		}
            		console.log(data)
               addFeedback(data).then(res=>{
               	 this.success="已收到";
                 this.show_success=true;
                 this.url_img='';
                 this.text='';
               })
            	}else{
                    this.error='请说点什么再提交吧';
                    this.show_error=true;
            	}
            },
        Todelete_img(){
            	this.url_img='';
            }

		}

	}
</script>
<style lang="css" scoped>
	.container{
		height: 100vh;
		background: #fff;
	}
	form{
		height: 30vh;
	}
	img,div{
		display: inline-block;
	}
.tab {
  display: flex;
  height:3.625rem;
  width: 100vw;
  justify-content:flex-start;
  align-items: center; 
  border-bottom: 1px solid #eee;

}
.submit{
	width: 60px;

}
.span1{
  width:21.8125rem;
  height: 3.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  }
    .img1 {
   /* float: left;*/
   width: 0.625rem;
   height: 1.125rem;
   margin-left: 1rem;
  }
.show-input,.textarea-section{
	height: 30vh;
	width: 100vw;
}
textarea{
border:none;
font-size: 16px;
line-height: 20px;
}
.arr_img{
	position: relative;
}
.delete{
	position: absolute;
	left: 80%;
	top:-7%;
}
.url_img{
	width: 66px;
	height:66px;
}
.select-img{
  width: 100vw;
}
.submit-img{
    margin-left: 4%;
		width: 66px;
		height: 66px;
	}

</style>