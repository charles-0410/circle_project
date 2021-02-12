import { createStore } from 'vuex'

export interface UserProps {
  isLogin: Boolean
}
export interface GlobalDataProps {
  user: UserProps
  token: String
  sid: String
  isShowComment: Boolean
  postList: Object[]
  postCurrentPage: number
  isLoading: Boolean
}

export default createStore<GlobalDataProps>({
  state: {
    user: {
      isLogin: false,
    },
    sid: '',
    token: '',
    isShowComment: false,
    postList: [],
    postCurrentPage: 1,
    isLoading: false,
  },
  mutations: {
    changeCommentFlag(state, flag) {
      state.isShowComment = flag
    },
    setSid(state, value) {
      state.sid = value
    },
    login(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.user.isLogin = true
      state.user = { ...state.user, ...userInfo }
    },
    addPosts(state, list) {
      list.forEach((item: Object) => {
        state.postList.push(item)
      })
      console.log(state.postList)
    },
    addPost(state, post) {
      state.postList.unshift(post)
    },
    setLoading(state, status) {
      state.isLoading = status
    },
    changePostCurrentPage(state, num) {
      state.postCurrentPage = num
    },
  },
})
