import axios from "axios"

axios.defaults.baseURL = `http://127.0.0.1:8000/api/`

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken")

  console.log("accessToken", accessToken)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
