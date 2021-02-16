import axios from 'axios'

export const fetchCommentsByPostid = (postId: string) => {
  return axios.get(`/api/comments/${postId}`)
}

export const createComment = (data: object) => {
  return axios.post('/api/comments', data)
}
