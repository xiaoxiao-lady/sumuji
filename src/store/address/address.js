const state = {
  selectedAddress: {}
}
// getters
const getters = {
  selectedAddress (state) {
    return state.selectedAddress
  }
}
// actions
const actions = {
}
// mutations
const mutations = {
  setSelectedAddress (state, data) {
    state.selectedAddress = data;
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
