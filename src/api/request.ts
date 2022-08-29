import axios from 'axios'
import { ElMessage } from 'element-plus'

const axiosRequest = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  baseURL: '/api',
  timeout: 30000,
})
axiosRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        'Authorization': token,
        'Content-Type': 'application/json; charset=utf-8',
      }
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject()
  },
)

axiosRequest.interceptors.response.use(
  (response) => {
    if (!response.data.success && (
      response.data.errorcode === '-10004'
        || response.data.errorcode === '-10003'
        || response.data.message === '没登录'
        || response.data.data === 'TOKEN_INVALID'
    )) {
      location.href = '/#/login'
      localStorage.removeItem('Authorization')
      ElMessage.error('登录超时，请重新登录！')
      Promise.reject()
    }
    else if (!response.data.success) {
      ElMessage.error(response.data.data || response.data.message)
      Promise.reject()
    }
    return response.data
  },
  (error) => {
    console.log(error)
    return Promise.reject()
  },
)

export default axiosRequest
