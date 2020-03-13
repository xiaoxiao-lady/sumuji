<template>
	<div class="Income">
		<TabGroup :title="title" />
		<div class="section">
			<div class="sectionContent">
				<div class="single" v-for="(item,index) in incomeList">
				<div class="userImg"> 
					<img :src="item.userIcon" class="userIcon" />
				     <span class="userName">{{item.realName}}</span>
				   </div>
					<div class="singalText">
                        <div class="userGrade">
						<span>购买会员间推收益 <span style="color:#FF385F; ">{{item.money}}</span></span>
						<span style="font-size: 11px;">{{item.updatedDate|momment}}</span>
                        </div>
					</div>
          
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import TabGroup from '../group/tab'
	import {getMyProfitList} from '@/api/deal'
	export default{
		data(){
			return{
               title:"我的收益",
               params:{
               	 pageNum:1,
               	 pageSize:10,
               	 userId:this.$store.getters.userInfo.userId
               },
               incomeList:null

			}
		},
		mounted(){
           this.getMyProfitList();
		},
	    filters:{
         momment(a){
          let b="";
      b=new Date(a).getFullYear()+'-'+(new Date(a).getMonth()+1)+'-'+new Date(a).getDate()+' '+new Date(a).getHours()+':'+new Date(a).getMinutes()+':'+new Date(a).getSeconds();
      return b;
         }
		},
		components:{
         TabGroup
		},
		methods:{
			getMyProfitList(){
				getMyProfitList(this.params).then(res=>{
					console.log(res);
					this.incomeList=res.data;
				})
			}

		}
	}
	
</script>
<style lang="scss">
.Income{
	 width: 100%;
      height: 100vh;
      .section{
      	padding: 0 15px;
      	.sectionContent{
      		width: 100%;
          font-size:14px;
          color: #535353;
          .single{
          	box-sizing: border-box;
          	width: 100%;
      	   	padding: 5px 0;
      	   	min-height: 69px;
          	display: flex;
          	justify-content: space-between;
          	align-items: center;
          	flex-wrap: wrap;
           border-bottom: 1px solid #eee;
          	.userImg{

          		img{
          			width: 40px;
          			height: 40px;

          		}
          	}
          	.singalText{
          		display: flex;
          		flex-wrap: wrap;
          		justify-content: flex-end;
          		span{
          			width: 100%;
          			text-align: right;
          		}
          		.userGrade{
          			display: flex;
          			flex-wrap: wrap;
          		}
          	}
          }
      	}
      }
}	
</style>