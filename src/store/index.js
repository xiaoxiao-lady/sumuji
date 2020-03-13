import Vue from 'vue'
import Vuex from 'vuex'
import shoppingCar from './shoppingCar/shoppingCar'
import address from './address/address'
import userInfo from './userInfo/userInfo'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shoppingCar,
    address,
    userInfo
  }
});
