import { localStorage } from 'common/storage'

let defaultUser = undefined
try{
  defaultUser = localStorage.get('ticket_user')
} catch(e) {
  console.error(e)
}

const state = {
  user: defaultUser
}

// getters
const getters = {
  getUser: state => {
    return state.user
  }
}

// actions
const actions = {
  setUser ({state, commit}, user) {
    commit('setUser', user)
  }
}

// mutations
const mutations = {
  setUser(state, user) {
    state.user = user || undefined
    try {
      if (!Object.keys(user).length) {
        localStorage.remove('ticket_user')
      } else {
        localStorage.set('ticket_user', user)
      }
    }catch(e) {
      console.error(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
