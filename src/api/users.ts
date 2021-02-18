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

/**
 * 关注用户
 * @param {String} userId 用户id
 */
export const followUser = (userId: string) => {
  return axios.put(`/api/users/following/${userId}`)
}

/**
 * 取消关注用户
 * @param {String} userId 用户id
 */
export const unFollowUser = (userId: string) => {
  return axios.delete(`/api/users/following/${userId}`)
}

/**
 * 获取用户关注列表
 * @param {String} userId 用户id
 */
export const fetchFollowing = (userId: string) => {
  return axios.get(`/api/${userId}/following`)
}

/**
 * 获取用户粉丝列表
 * @param {String} userId 用户id
 */
export const fetchFollowers = (userId: string) => {
  return axios.get(`/api/${userId}/followers`)
}

/**
 * 点赞帖子
 * @param {String} postId 帖子id
 */
export const likingPost = (postId: string) => {
  return axios.put(`/api/users/likingPosts/${postId}`)
}

/**
 * 取消点赞帖子
 * @param {String} postId 帖子id
 */
export const unLikingPost = (postId: string) => {
  return axios.delete(`/api/users/likingPosts/${postId}`)
}

/**
 * 获取点赞帖子列表
 * @param {String} userId 用户id
 */
export const fetchLinkingPosts = (userId: string) => {
  return axios.get(`/api/users/${userId}/likingPosts`)
}
