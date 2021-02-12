import axios from 'axios'

/**
 * 获取验证码接口
 * @param {String} sid 唯一标识
 */
export const getCaptcha = (sid: string) => {
  return axios.get('/api/public/getCaptcha', {
    params: {
      sid,
    },
  })
}

/**
 * 登录接口
 * @param {Object} loginInfo 用户登录信息
 */
export const login = (loginInfo: Object) => {
  return axios.post('/api/users/login', {
    ...loginInfo,
  })
}

/**
 * 根据token查找用户信息
 * @param {String} token token
 */
export const findUserInfoByToken = (token: string) => {
  return axios.post('/api/users/findByToken', {
    token,
  })
}

/**
 * 根据userid查询用户信息
 * @param { String } userId 用户id
 */
export const findUserInfoByUserid = (userId: string) => {
  return axios.get(`/api/users/${userId}`)
}
