import axios from 'axios'

const request = axios.create({
  // 超时
  timeout: 5000,
})

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default request
