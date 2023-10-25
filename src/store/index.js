import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced:true,
  state: {
    sBaseUrl:"http://116.204.65.79:8080",
    bottomHeight:0,
    userInfoH:0,
  },
  getters: {
    getBotH:state => state.bottomHeight,
    getUinfoH:state => state.userInfoH,
  },
  mutations: {
    setBotHeight(state,bheight){
      state.bottomHeight=bheight;
      // console.log(bheight);
    },
    setInfoH(state,uheight){
      state.userInfoH=uheight;
      // console.log(uheight);
    }
  },
  actions: {
  },
  modules: {
  }
})
