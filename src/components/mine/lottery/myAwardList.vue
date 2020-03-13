<template>
	<div class="myAwardList">
		 
			 <tab :title="title"></tab>
		 
		<div class="awardList">
			<div class="awardItem" v-for="item in myAwardList">
				<div class="itemTop">
				<div class="nickName">{{item.nickName}}</div>
				<div class="date">{{item.createdDate|momment}}</div>
				</div>
				<div class="itemBtm">
			    <div class="itemText">{{item.awardContent}}</div>
			    <div class="status">
			    	<div v-show="item.status==1" class="notChange">
			    		未兑换
			    	</div>
			    	<div v-show="item.status!=1" class="changed">
			    		已兑换
			    	</div>
			    </div>
			    </div>
			</div>
			
		</div>
	</div>
</template>
<script>
import { getMyDrawList} from '@/api/lottery'
import tab from './../../group/tab'
export default{
  data(){
  	return{
       returnImg:require('../../../assets/return.png'),
       params:{
       	pageNum:1,
       	pageSize:20,
       	userId:null
       },
       myAwardList:'',
       title:'我的奖品'
  	}
  },
  created(){
    this.params.userId=this.$store.getters.userInfo.userId;
    this.getMyDrawList();
  },
  filters:{
         momment(a){
          let b="";
      b=new Date(a).getFullYear()+'-'+(new Date(a).getMonth()+1)+'-'+new Date(a).getDate()+' '+new Date(a).getHours()+':'+new Date(a).getMinutes()+':'+new Date(a).getSeconds();
      return b;
         }
		},
  components:{
  	  tab
  },
  methods:{
  	getMyDrawList(){
  		getMyDrawList(this.params).then(res=>{
         this.myAwardList=res.data;
  	  })
  	}
  	
  }

}
</script>
<style scoped lang="less">
	.myAwardList{
			font-weight:400;
			color:rgba(34,34,34,1);
			 
		.awardList{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.awardItem{
				height: 83px;
				width: 89.33%;
				border-bottom: 1px solid #ccc;

				.itemTop{
					display: flex;
					height: 50%;
					align-items: flex-end;
					justify-content: space-between;
					.nickName{
							font-size:13px;
							line-height:17px;
						}
						.date{
							font-size:11px;
							color:rgba(136,136,136,1);
							line-height:15px;
						}
				}
				.itemBtm{
					display: flex;
					justify-content: space-between;
					height: 50%;
					align-items: center;
					.itemText{
					font-size:15px; 
					line-height:19px;
					}
					.status{
						.notChange{
                          font-size:13px;
						color:rgba(255,48,48,1);
						line-height:17px;
						}
						.changed{
						 .notChange;
						color:rgba(34,34,34,1);
						}
					}
				}
			}
			

		}
	}
</style>