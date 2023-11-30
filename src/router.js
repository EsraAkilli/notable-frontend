import VueRouter from "vue-router"
import Vue from "vue"
import LoginPage from "@/views/LoginPage.vue"
import HomePage from "@/views/HomePage.vue"
import RegisterPage from "@/views/RegisterPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage
  },
  { path: "/", name: "home", component: HomePage }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
