
//验证用户数据
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)
const state = {
  urlIp : '120.77.253.35:8098/',
  pInfo:{},
  pComment1:{},
  pComList : {}
}

export default new Vuex.Store({
  modules: {
    user,
  },
  state,
  mutations : {
    setProductInfo (state,productInfo){
      state.pInfo = productInfo.pInfo
      state.pComment1 = productInfo.pComment1
      state.pComList= productInfo.pComList
    },
    removeProductInfo(state){
      state.pInfo = {}
      state.pComment1 = {}
      state.pComList= {}
    },
    setComment (state,pComment1){
      state.pComment1 = pComment1.pComment1
    }
  }
})
