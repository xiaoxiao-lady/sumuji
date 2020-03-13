<template>
	<div>
		<div class="return" >
		<img :src="retrunIcon" class="retrunIcon_class" @click="retrurn_fn"/>
		</div>
	    <div class="invite" ref="inviteDiv" v-if="allImgUrl==null">
	<div class="first">
			<img :src="bc_img" class="bc_img">
				<div class="inviteText">
					<span class="realName">{{$store.getters.userInfo.nickName}}</span>
					<span>No.{{$store.getters.userInfo.userId}}</span>
					
				</div>
				<!--  <div class="QRcode" ref="QRcode">
					<div class="QR_img"  ref="qrCodeDiv"></div>
					<button class="QR_text">长按二维码保存图片</button>
				</div> -->
				<div class="QRcode">
					<vue-qr :logoSrc="imageUrl" :text="qrCodeText" :size="300"></vue-qr>
				</div>
		</div>

</div>
<div else>
	<div class="return" >
	    <img :src="retrunIcon" class="retrunIcon_class" @click="retrurn_fn"/>
	</div>
	<img :src="allImgUrl" class="allImgUrl">
</div>

 </div>
</template>
<script>
	//import QRCode from 'qrcodejs2'
	import vueQr from 'vue-qr'
	import html2canvas from 'html2canvas'
// var cliwidth = document.documentElement.clientWidth; 
//  var cliheight = document.documentElement.clientHeight;
	export default{
		computed:{
          inviteNum(){
          	return this.$store.getters.userInfo.invitedCode;
          }
		},
		components:{
           vueQr
		},
		data(){
			return{
				 mask_img:require('./../../assets/invite/invite_mask.png'),
				 invite_title:require('./../../assets/invite/invite_title.png'),
				bc_img:require('./../../assets/invite/background.png'),
			    imageUrl:'',
				qrCodeText:'http://sumuji.techwells.com/#/?',
				r:'r=',
				m:'m=',
				   retrunIcon:require('./../../assets/return.png'),
				userId:null,
				merchantId:null,
				Popup:false,
				allImgUrl:null
			}
		},
		watch:{
            allImgUrl(){
            	
            }
		},
		mounted(){
			this.invitedCode=this.$store.getters.userInfo.invitedCode;
			this.merchantId=this.$route.query.merchantId;
		    this.qrCodeText=this.qrCodeText+this.r+this.invitedCode
				let a=this.$store.getters.userInfo.userIcon;
				this.imageUrl=a;
				this.createPic();
			// this.$nextTick(function () {
			// });
			this.setInlocalstorage();
             // this.$refs.QRcode.style.height=cliheight/2+'px';
             // this.$refs.mask.style.height=cliheight/2+'px';
            // alert( this.$refs.QRcode.style.height)
		},
		methods:{
			showPopup(){
             this.Popup=true;
			},
			close(){
           this.Popup=false;
			},
			bindQRCode:function(){
				console.log(this.qrCodeText+this.r+this.userId);
				new QRCode(this.$refs.qrCodeDiv,{
					text:this.qrCodeText+this.r+this.invitedCode,
					width:212,
					height:212,
					colorDark:'#333',
					colorLight:'#fff',
					correctLevel:QRCode.CorrectLevel.L
				})
			},
			createPic(){
				const that=this;
				setTimeout(()=>{
			     const _canvas = that.$refs.inviteDiv;
			   //  console.log(_canvas)
      //            const width = _canvas.offsetWidth;
      //            const height = _canvas.offsetHeight;
      //             // 获取像素比
               
      //            const scaleBy =2;
      //          // 创建自定义 canvas 元素
      //           const canvas2 = document.createElement('canvas');
      //           // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
      //           canvas2.width = width * scaleBy;
      //           canvas2.height = height * scaleBy;
			   // canvas2.style.width= `${width}px`;
			   // canvas2.style.height= `${height}px`;
			   //  // 获取画笔
			   //  const context1 = canvas2.getContext('2d');
			   //  // 将所有绘制内容放大像素比倍
			   //  context1.scale(scaleBy, scaleBy);
             
			   //  // 将自定义 canvas 作为配置项传入，开始绘制
			    html2canvas(_canvas).then((canvas)=>{
			    	const context=canvas.getContext('2d');
			    	// if(context) {
                   // context.scale(2,2);
                      
                    //}
	                that.allImgUrl=canvas.toDataURL();
			    })
				},500)
          
			},
			setInlocalstorage(){
			if(this.userId){
				localStorage.setItem('r',this.userId);
			}else{
				localStorage.setItem('m',this.merchantId);
			}
			},
			retrurn_fn(){
				this.$router.go(-1);
			}
		}


	}
</script>
<style scoped>
		.invite{
		width: 100vw;
		height: 100vh;
		overflow-y: auto;
	}
button{
	border:none;
}
    .retrunIcon_class{
  position: absolute;
  min-height: 10px;
  width: 10px;
  left: 10px;
  top: 10px;
  z-index:3;
 }
.inviteText{
	position: absolute;
	top: 25%;
	height: 80px;
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-around;
}
.realName{
	font-size: 24px;
}
	.bc_img{
		
		
		position: absolute;
		width: 100vw;
		height: 108.5vh;
		top:-8.5%;
		z-index: -1;
	}
	.allImgUrl{
		width: 100%;
		height: 100%;
	}
	.QRcode{
		position: absolute;
		width: 100%;
		height:50%; 
		top:35%;
		 display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

	}
	.QR_img{
		width: 54vw;
		height:54vw;
 display: flex;
        justify-content: center;
        align-items: center;
		border-radius:5px;

	}
	.QR_text{
		display: flex;
		justify-content: center;
		align-items: center;
		font-size:15px;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:9px;
			width: 59.2%;
			height: 39px;
			background:rgba(255,86,132,1);
border-radius:20px;
	}
	.mask{
		position: relative;
		width: 100%;
	}
	.mask_img{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.mask_content{
		position: absolute;
		top:45%;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.mask_content p{
font-size:12px;
font-weight:400;
color:rgba(255,163,180,1);
line-height:9px;
	}
	.invitation_code{
		display: flex;
		align-items: center;
	}
	.code_num {
font-size:16px;
font-weight:400;
color:rgba(255,229,69,1);
line-height:40px;
	}
	.code_copy{
width:40px;
height:21px;
background:rgba(255,229,69,1);
display: flex;
margin-left: 2px;
border-radius:1px;
justify-content: center;
align-items:baseline;
margin-top: 3px;
	}
	.code_copy span{
font-size:12px;
font-weight:bold;
color:rgba(211,3,41,1);
	}
	.mask_text{
font-size:14px;
font-weight:400;
color:rgba(255,255,255,1);
	}
	.invite_title{
		margin-top:21px; 
		width: 262px;
		height: 44px;
	}
.detail_rule{
font-size:12px;
font-weight:400;
color:rgba(255,163,180,1);
line-height:9px;
}
.popup{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5);
    position: absolute;
    z-index: 2;
}

</style>