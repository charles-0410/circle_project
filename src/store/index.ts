import { createStore } from 'vuex'
import WebSocketClient from '../util/js/websocket'

export interface RelationProps {
  both: string
  createdAt: string
  creator: string
  updatedAt: string
  _id: string
  userInfo: UserInfo
  lastRecord: ChatRecord
  newRecordCount: number
}
export interface ChatRecord {
  content: string
  createdAt: string
  receiver: string
  relationId: string
  sender: string
  updatedAt: string
  _id: string
  type: number
}
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
  reply: CommentProps[]
  updatedAt: string
  userId: UserInfo
  _id: string
  isLiking: boolean
  likingCount: number
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
  isShowChat: boolean
  chat: {
    relations: RelationProps[]
    currentInfo: RelationProps | null
    currentRecord: Object[]
  }
  ws: Object | null
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
    isShowChat: false,
    chat: {
      relations: [],
      currentInfo: null,
      currentRecord: [],
    },
    ws: null,
  },
  mutations: {
    changeChatLastRecord(state, payload) {
      const relations = state.chat.relations
      const relationId = payload.relationId
      relations.forEach((relation) => {
        if (relation._id === relationId) {
          relation.lastRecord = payload.lastRecord
        }
      })
    },
    clearCurrentRecord(state) {
      state.chat.currentRecord = []
    },
    setCurrentRecord(state, list) {
      // 导入消息列表进窗口
      state.chat.currentRecord.push(...list)
      // 设置已读消息（隐藏新消息提示）
      const currentRelationId = state.chat.currentInfo?._id
      const relations = state.chat.relations
      relations.forEach((relation, i) => {
        if (relation._id === currentRelationId) {
          // 如果关系id等于当前窗口关系id
          relation.newRecordCount = 0
          // 发送消息时，将当前关系位置移至最前(list长度为1时就是发送消息)
          if (list.length === 1) {
            let curRelation = relations[i]
            relations.splice(i, 1)
            relations.unshift(curRelation)
          }
        }
      })
    },
    setCurrentInfo(state, payload) {
      state.chat.currentInfo = payload
    },
    clearRelations(state) {
      state.chat.relations = []
    },
    addRelations(state, list) {
      // 目前实现有新消息关系靠前（后面还需要同时实现按时间排序）
      if (list.length > 1) {
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          if (item.newRecordCount > 0) {
            list.splice(i, 1)
            list.unshift(item)
          }
        }
      }
      state.chat.relations.push(...list)
      console.log(state.chat.relations)
    },
    changeShowChatFlag(state, flag) {
      state.isShowChat = flag
    },
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
    changeCommentLikingStatus(state, payload) {
      const commentId = payload.commentId
      const isLiking = payload.isLiking
      const isReply = payload.isReply
      state.comment.list.forEach((comment: CommentProps) => {
        if (isReply == '0') {
          // 不是回复
          if (comment._id === commentId) {
            comment.isLiking = isLiking
            // 修改点赞数量
            if (isLiking === true) {
              comment.likingCount++
            } else if (isLiking === false) {
              comment.likingCount--
            }
          }
        } else {
          // 是回复 -> 遍历评论的回复
          comment.reply.forEach((reply) => {
            if (reply._id === commentId) {
              reply.isLiking = isLiking
              // 修改点赞数量
              if (isLiking === true) {
                reply.likingCount++
              } else if (isLiking === false) {
                reply.likingCount--
              }
            }
          })
        }
      })
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
    initWebSocket(state, config) {
      state.ws = new WebSocketClient(config)
      state.ws.init()
    },
    setMessage(state, msgObj) {
      console.log(msgObj)
      const record = msgObj.message
      if (record.relationId === state.chat.currentInfo?._id) {
        // 是当前聊天窗口消息
        state.chat.currentRecord.push(record)
      } else {
        // 不是当前聊天窗口消息
      }
      // 改变关系列表最后消息记录
      const relations = state.chat.relations
      const relationId = record.relationId
      relations.forEach((relation, i) => {
        if (relation._id === relationId) {
          if (relationId !== state.chat.currentInfo?._id) {
            // 如果不是当前聊天窗口，增加未读消息数量
            relation.newRecordCount++
          }
          relation.lastRecord = record
          // 改变位置到最前
          let curRelation = relations[i]
          relations.splice(i, 1)
          relations.unshift(curRelation)
        }
      })
      // 改变位置到最前
      // for (let i = 0; i<relations.length; i++) {
      //   if (relations[i]._id ===)
      // }
    },
  },
  actions: {
    message({ commit }, msg) {
      commit('setMessage', msg)
    },
  },
})
