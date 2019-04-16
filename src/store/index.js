/**
 * Created by zzmhot on 2017/3/23.
 *
 * 状态管理器
 *
 * @author: xfFelix
 * @github: ''
 * @email: 894838158@qq.com
 * @Date: 2018/11/11 1:17
 * @Copyright(©) 2017 by jwj.
 *
 */

import Vue from 'vue'
import Vuex from 'vuex'

// 引入模块
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './states'
import ticket from './modules/ticket';
import scrollTo from './modules/scrollTo';
import createLogger from 'vuex/dist/logger' // 每次修改会去控制台打一个状态

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    ticket,
    scrollTo
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
