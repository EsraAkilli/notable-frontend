import Vue from "vue"
import App from "./App.vue"
import store from "@/store"
import router from "@/router"
import "buefy/dist/buefy.css"
import Buefy from "buefy"
import axios from "axios"

import "@/helpers/intercepters"
import { defineComponent } from "vue"
import UpdatePassword from "@/components/ChangePassword.vue"

export default defineComponent({
  components: { UpdatePassword }
})

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(Buefy)
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next("/login")
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
