import request from './request'

// ------------------------------------- 登录 -------------------------------------
interface LoginData {
  account: string
  password: string
}
export const login = (data: LoginData) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data,
  })
}

// ------------------------------------- 管理员 -------------------------------------
