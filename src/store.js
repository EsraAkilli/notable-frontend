import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    /* User */
    userEmail: null,
    userId: null,
    userFullName: null
  },
  // mutations
  mutations: {
    setUser(state, payload) {
      console.log("payload", payload)
      state.userEmail = payload.email
      state.userId = payload.id
      state.userFullName = payload.name
    }
  },
  actions: {
    async userMe({ commit }) {
      try {
        const { data } = await axios.get("/user/me")
        commit("setUser", data)
      } catch (e) {
        console.log(e)

        if (e.message && e.message.indexOf("401") > 0) {
          console.log("Burada tokeni revoke etmen gerek")
        }

        throw "User did not come"
      }
    }
  },
  getters: {
    isLoggedIn: (state) => state.userId !== null
  }
})
