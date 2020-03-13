<template>
	<div class="myteam">
		<TabGroup :title="title" />
		<div class="section">
			<div class="head">
				<p>成员列表(总数{{total}})</p>
			</div>
			<div class="sectionContent">
				<div class="singal" v-for="(item,index) in teamList"> 
					<img :src="item.userIcon" class="userIcon" />
					<div class="singalText">
						<span class="userName">{{item.nickName}}</span>
            <div class="userGrade">
						<span>等级：{{item.levelName}}</span>
						<span>手机：{{item.userName}}</span>
            </div>
					</div>
          <div class="enterTime">进入时间：{{item.createdDate|momment}}</div>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
	import TabGroup from '../group/tab'
	import {getMyTeamList} from "@/api/user"
	export default{
		data(){
			return{
               title:"我的团队",
               params:{
               	pageNum:1,
               	pageSize:20,
               	userId:''
               },
               teamList:'',
               total:0
			}
		},
		mounted(){
      this.params.userId= this.$store.getters.userInfo.userId
      this.getMyTeamList();
       // if(this.$store.getters.userInfo.level>0){
       //   this.getMyTeamList();
       // }else{
       //  this.$router.push('./addhui')
       // }
		},
		components:{
          TabGroup
		},
		filters:{
         momment(a){
          let b="";
      b=new Date(a).getFullYear()+'-'+(new Date(a).getMonth()+1)+'-'+new Date(a).getDate()+' '+new Date(a).getHours()+':'+new Date(a).getMinutes()+':'+new Date(a).getSeconds();
      return b;
         }
		},
		methods:{
          getMyTeamList(){
          	
          	getMyTeamList(this.params).then(res=>{
          		this.teamList=res.data;
          		this.total=res.total;
              res.data.map(item=>{
                if(item.level==0){
                  item.levelName="非会员"
                }else if(item.level==1){
                  item.levelName="vip会员";
                }else if(item.level==2){
                  item.levelName="商家";
                }else if(item.level==3){
                  item.levelName="市代"
                }else if(item.level==4){
                  item.levelName="省代"
                }
              })
          	})
          }
		}
	}
</script>
<style lang="scss">
	.myteam{
      width: 100%;
      height: 100vh;
      .section{
      	padding: 0 15px;
      	.head{
      		p{
      			width: 100%;
      			padding: 10px 0;
      			border-bottom: 1px solid #eee;
      		}
      	}
      	.sectionContent{
      		width: 100%;
          font-size:11px;
          color: #535353;
          
      	   .singal{
      	   	display: flex;
      	   	width: 100%;
      	   	padding: 5px 0;
            flex-wrap: wrap;
      	   	justify-content: space-between;
      	   	align-items: center;
      	   	border-bottom: 1px solid #ccc;
            
      	   	.userIcon{
      	   		width: 20%;
      	   		height: 80%;
      	   	}
            .enterTime{
              width: 100%;
            }
      	   	.singalText{
      	   		box-sizing:border-box; 
      	   		width: 78%;
              height:100px;
      	   		display: flex;
              flex-direction: column;
      	   		justify-content:space-around;
      	   		flex-wrap: wrap;
      	   		.userName{
      	   			color: #000;
      	   			font-size: 14px;
      	   		}
              .userGrade{
                display: flex;
                flex-wrap: wrap;
                span{
                  width: 100%;
                }
              }
      	   	}
      	   }
      	}
      }
	}
</style>