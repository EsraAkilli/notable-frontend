import axios from "axios"

axios.defaults.baseURL = "http://notable.test/api/"

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken")

  console.log("accessToken", accessToken)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
