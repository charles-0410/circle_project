import axios from 'axios'

/**
 * 获取帖子
 */
export const fetchPosts = (page?: number) => {
  if (page) {
    return axios.get(`/api/posts?page=${page}`)
  } else {
    return axios.get('/api/posts')
  }
}

/**
 * 获取热门帖子
 */
export const fetchHotPosts = () => {
  return axios.get('/api/posts/hot')
}

/**
 * 创建帖子
 * @param postInfo 帖子内容
 */
export const createPost = (postInfo: Object) => {
  return axios.post('/api/posts', postInfo)
}
