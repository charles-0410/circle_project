import axios from 'axios'

/**
 * 获取话题列表
 */
export const fetchTopics = () => {
  return axios.get('/api/topics')
}
