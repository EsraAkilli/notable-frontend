import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import { ToastProgrammatic as Toast } from "buefy"
import router from "@/router"

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    /* User */
    userEmail: null,
    userId: null,
    userFullName: null
  },
  mutations: {
    setUser(state, payload) {
      console.log("payload", payload)

      state.userEmail = payload.email
      state.userId = payload.id
      state.userFullName = payload.name
    },

    logout(state, payload) {
      state.userEmail = null
      state.userId = null
      state.userFullName = null

      if (payload.toLogin) {
        if (payload.withMessage !== false) {
          Toast.open({
            message: "Session Terminated.",
            type: "is-warning"
          })
        }

        if (router.currentRoute?.name !== "login") {
          router.push({ name: "login" })
        }
      }
    }
  },
  actions: {
    async userMe({ commit }) {
      try {
        const { data } = await axios.get("/user/me")
        commit("setUser", data)
      } catch (e) {
        if (e.message && e.message.indexOf("401") > 0) {
          this.dispatch("revokeToken")
        }

        throw "User did not come"
      }
    },

    async logout({ commit }) {
      try {
        await axios.get("/user/logout")
        commit("logout")
      } catch (e) {
        if (e.message && e.message.indexOf("401") > 0) {
          this.dispatch("revokeToken")
        }
      }
    },
    revokeToken() {
      localStorage.removeItem("accessToken")
    }
  },
  getters: {
    isLoggedIn: (state) => state.userId !== null
  }
})
