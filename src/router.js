import VueRouter from "vue-router"
import Vue from "vue"
import LoginPage from "@/views/LoginPage.vue"
import HomePage from "@/views/HomePage.vue"
import RegisterPage from "@/views/RegisterPage.vue"
import UserPage from "@/views/UserPage.vue"
import NoteForm from "@/components/NoteForm.vue"
import ListNotePage from "@/views/ListNotePage.vue"

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
  { path: "/", name: "home", component: HomePage },
  {
    path: "/user/me",
    name: "me",
    component: UserPage
  },
  {
    path: "/note/create",
    name: "create",
    component: NoteForm
  },
  {
    path: "/note/list",
    name: "list",
    component: ListNotePage
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
