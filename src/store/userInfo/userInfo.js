const state = {
  // userid: 4,
  userInfo:{},
  // merchantName:'',
 logisticsMsgBadge:false,
 orderMsgBadge:false,
  systemMsgBadge:false,
  indexMsgBadge:true,
 
  fashionLeft:true
};

const getters = {
userInfo(state){
  console.log('进去getters')
	 if(localStorage.hasOwnProperty("smjuserInfo")){
    console.log('local存在')
    state.userInfo=JSON.parse(localStorage.getItem('smjuserInfo'))
   }else{
    console.log('local不存在')
    state.userInfo={};
   }
   //将local与state关联起来 state从local里取值
   return state.userInfo
},
GetlogisticsMsgBadge(state){
  return state.logisticsMsgBadge;
},
GetorderMsgBadge(state){
  return state.orderMsgBadge;
},
GetsystemMsgBadge(state){
  return state.systemMsgBadge;
},
GetindexMsgBadge(state){
  return state.indexMsgBadge;
},

};
const mutations = {
setUserInfo(state,userInfo){
	//mutations类型名难道不能有下划线吗
state.userInfo=userInfo;
  localStorage.setItem('smjuserInfo',JSON.stringify(userInfo));
//如果直接存入对象 在localstorage中 只能看到object类型 将其赋值给data 无法正常读取
//所以要先转化为json字符串 并在赋值给data时 将其转换为jsonObject类型
},
setlogisticsMsgBadge(state,val){
  state.logisticsMsgBadge=val;
},
setorderMsgBadge(state,val){
  state.orderMsgBadge=val;
},
setsystemMsgBadge(state,val){
  state.systemMsgBadge=val;
},
setindexMsgBadge(state,val){
  state.indexMsgBadge=val;
},
setdistributionMode(state,val){
  state.fashionLeft=val
}
};

const actions = {
  ActionSetUserInfo(state,val){
      state.commit('setUserInfo',val)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
