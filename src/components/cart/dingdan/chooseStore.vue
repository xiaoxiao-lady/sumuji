<template>
	<div class="chooseStore">
		 <tabGroup :title="title" :rightTitle="rightTitle" @rightTitle="finish()"></tabGroup>
		 <div class="store">
		 	<div class="singleStore">
		 		<div class="storeIcon"><i class="el-icon-s-shop"></i></div>
		 		<div class="storeContent">
		 			<div class="storeName">素木集线下品牌体验馆</div>
		 			<div class="storeAccess">上海市松江区九亭镇青年城沪松公路1519弄59.60号</div>
		 		</div>
		 		<div class="chooseBtn" @click="select">
		 			<div class="circle" v-if="!selected"></div>
		 			<i class="el-icon-success" v-else></i>
		 		</div>
		 	</div>
		 </div>
	</div>
</template>
<script>
import tabGroup from '@/components/group/tab'
import {Toast} from 'vux'
	export default{
      components: {
			    tabGroup: tabGroup,
			    Toast

			  },
	  mounted(){

	  },
	  data(){
        return {
        	title:"选择店铺",
        	rightTitle:'完成',
        	selected:false
        }
	  },
	  methods:{
        finish(){
         if(this.selected==true){
         	this.$store.commit('setdistributionMode',false)
         	this.$router.go(-1);
         }else{
         	this.$vux.toast.text('请选择一家店铺')
         }
        },
        select(){
         this.selected=!this.selected
        }

	  }

	}
</script>
<style scoped>
	.chooseStore{
	width:100%;
	height: 100vh;
	font-weight:400;
	}
	.store{
		height: 9.89%;
	}
	.singleStore{
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 100%;
	}
	.storeContent{
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: flex-start;
	}
	.storeIcon{
    font-size: 26px;
	}
	.storeName{

color:rgba(0,0,0,1);
line-height:21px;
font-size: 15px;
	}
	.storeAccess{
		font-size:11px;

color:rgba(102,102,102,1);
line-height:16px;
	}
	.chooseBtn {
		font-size: 20px;
	}
	.chooseBtn .circle{
width:18px;
		height: 18px;
border:1px solid rgba(204,204,204,1);
border-radius: 9px;
	}
	.chooseBtn .el-icon-success{

		color: #FF2E57 !important;
	}
</style>