import { createStore } from 'vuex'

export interface UserRecord {
  fansCount: number
  followingCount: number
  releaseCount: number
}
export interface UserInfo {
  avatar_url?: string
  createdAt?: string
  nickName?: string
  updatedAt?: string
  userId?: string
  _id?: string
  isFollow?: boolean
  userRecord?: UserRecord
}
export interface PostProps {
  _id: string
  content: string
  createdAt: string
  updatedAt: string
  images: string[]
  topic: object
  user: UserInfo
  isFollow: boolean
  isLiking: boolean
  CommentCount: number
  likingCount: number
}
export interface UserProps {
  isLogin: Boolean
}
export interface CommentProps {
  content: string
  createdAt: string
  isReply: string
  postId: string
  reply: object[]
  updatedAt: string
  userId: UserInfo
  _id: string
}
export interface GlobalDataProps {
  user: UserProps & UserInfo
  token: String
  sid: String
  isShowComment: Boolean
  comment: {
    list: CommentProps[]
    currentPostId: string
  }
  postList: PostProps[]
  postCurrentPage: number
  postCount: number
  isLoading: Boolean
  scalePic: {
    currentIndex: number
    picList: string[]
    isShow: boolean
  }
}

export default createStore<GlobalDataProps>({
  state: {
    user: {
      isLogin: false,
    },
    sid: '',
    token: '',
    isShowComment: false,
    comment: {
      list: [],
      currentPostId: '',
    },
    postList: [],
    postCurrentPage: 1,
    postCount: 0,
    isLoading: false,
    scalePic: {
      currentIndex: 0,
      picList: [],
      isShow: false,
    },
  },
  mutations: {
    changeLikingStatus(state, payload) {
      const postId = payload.postId
      const isLiking = payload.isLiking
      state.postList.forEach((post: PostProps) => {
        if (post._id === postId) {
          post.isLiking = isLiking
          // 修改点赞数量
          if (isLiking === true) {
            post.likingCount++
          } else if (isLiking === false) {
            post.likingCount--
          }
        }
      })
    },
    changeFollowStatus(state, payload) {
      const userId = payload.userId
      const isFollow = payload.isFollow
      state.postList.forEach((post: PostProps) => {
        if (post.user._id === userId) {
          post.isFollow = isFollow
        }
      })
    },
    changeCurrentPostId(state, postId) {
      state.comment.currentPostId = postId
    },
    addComments(state, list) {
      list.forEach((item: CommentProps) => {
        state.comment.list.push(item)
      })
    },
    addComment(state, comment) {
      state.comment.list.push(comment)
    },
    addReply(state, reply) {
      const commentId = reply.replyCommentid
      state.comment.list.forEach((comment) => {
        if (comment._id === commentId) {
          comment.reply.push(reply)
        }
      })
      console.log(state.comment.list)
    },
    clearComments(state) {
      state.comment.list = []
    },
    setScalePic(state, data) {
      if (data.isShow === true) {
        state.scalePic.currentIndex = data.index
        state.scalePic.picList = data.list
        state.scalePic.isShow = true
      } else {
        state.scalePic.currentIndex = 0
        state.scalePic.picList = []
        state.scalePic.isShow = false
      }
    },
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
    addPosts(state, payload) {
      payload.list.forEach((item: PostProps) => {
        state.postList.push(item)
      })
      state.postCount = payload.count
      console.log(state.postList)
      console.log(state.postCount)
    },
    addPost(state, post) {
      state.postList.unshift(post)
    },
    clearPosts(state) {
      state.postList = []
    },
    setLoading(state, status) {
      state.isLoading = status
    },
    changePostCurrentPage(state, num) {
      state.postCurrentPage = num
    },
  },
})
