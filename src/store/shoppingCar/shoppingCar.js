const state = {
  allList:[],
  selectProductIdList: [],
  selectNumberList: [],
  selectSpecificationsList: [],
  totalPrice: 0,
  directPurchase:null,
  recentlySearch:[]
}
// getters
const getters = {
  allList(state){
    return state.allList
  },
  selectNumberList (state) {
    return state.selectNumberList
  },
  selectProductIdList (state) {
    return state.selectProductIdList
  },
  selectSpecificationsList (state) {
    return state.selectSpecificationsList
  },
  totalPrice (state) {
  return state.totalPrice
  },
  GetDirectPurchase(state){
   return state.directPurchase
  },
  getRecentlySearch(state){
    return Array.from(new Set(state.recentlySearch));
  }
}
// actions
const actions = {
}
// mutations
const mutations = {
  setallList(state,data){
  state.allList=data;
  },
  setSelectNumList (state, data) {
    state.selectNumberList = data;
  },
  setSelectProductIdList (state, data) {
    state.selectProductIdList = data
  },
  setSelectSpecificationsList (state, data) {
    state.selectSpecificationsList = data
  },
  setTotalPrice (state, data) {
    state.totalPrice = data
  },
  setDirectPurchase(state,data){
    state.directPurchase=data;
  },
  setRecentlySearch(state,data){
    if(data=='delete'){
      state.recentlySearch=[];
    }else
    state.recentlySearch.push(data);
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
