import axios from "axios"
import { ToastProgrammatic as Toast } from "buefy"
import { flattenDeep, uniq, values } from "lodash"
import store from "@/store"

axios.defaults.baseURL = "http://notable.test/api/"

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken")

  console.log("accessToken", accessToken)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    if (error.response) {
      console.log("axios hata => ", error)

      if (error.response.status === 401) {
        store.commit("logout", { toLogin: true, withMessage: false })

        return
      }

      if (error.response.status === 422) {
        let errors = parseError(error.response)

        Toast.open({
          message: `<b>${error.response.data.message}</b><br>${errors}`,
          type: "is-warning",
          duration: 5000
        })
      }

      console.log("test FA", error)

      return Promise.reject(error.response)
    }
  }
)

function parseError(e) {
  if (!e.data.errors) {
    return ""
  }

  if (Object.keys(e.data.errors).length > 0) {
    return uniq(flattenDeep(values(e.data.errors))).join("<br>")
  }

  return ""
}
