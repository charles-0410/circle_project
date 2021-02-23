import axios from 'axios'

/**
 * 获取关系用户列表
 * @param {String} userId 用户id
 */
export const fetchUserRelations = (userId: string) => {
  return axios.get(`/api/relations/user/${userId}`)
}

/**
 * 创建用户关系
 * @param {String} data 用户id
 */
export const createUserRelation = (userId: string) => {
  return axios.post('/api/relations', { user: userId })
}

/**
 * 创建消息
 * @param {Object} data 消息详情
 */
export const createMessage = (data: object) => {
  return axios.post('/api/records', data)
}

/**
 * 根据关系id查询聊天记录
 * @param {String} relationId 关系id
 */
export const fetchMessages = (relationId: string) => {
  return axios.post(`/api/records/${relationId}`)
}
