import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced:true,
  state: {
    sBaseUrl:"http://113.125.22.29:8081",
    bottomHeight:0,
    userInfoH:0,
    homeH:0,
    curUid:null
  },
  getters: {
    getBotH:state => state.bottomHeight,
    getUinfoH:state => state.userInfoH,
    getCurUid:state => state.curUid,
    getHomeH:state => state.homeH,
  },
  mutations: {
    setBotHeight(state,bheight){
      state.bottomHeight=bheight;
      // console.log(bheight);
    },
    setInfoH(state,uheight){
      state.userInfoH=uheight;
      // console.log(uheight);
    },
    setCurId(state,curid){
      state.curUid=curid;
    },
    setHomeH(state,homeh){
      state.homeH=homeh;
    }
  },
  actions: {
  },
  modules: {
  }
})
