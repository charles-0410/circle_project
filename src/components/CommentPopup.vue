<template>
  <transition name="fade">
    <div v-show="isShow" class="Modal-wrapper">
      <div class="Modal-backMask" />
      <transition name="slide">
        <div v-show="isShow" class="Modal">
          <div class="Modal-closeButton" @click="handleClose">
            <i class="iconfont">&#xe654;</i>
          </div>
          <div class="Modal-inner">
            <div class="CommentPopup-main">
              <div class="CommentTopbar">
                <div class="Topbar-title">
                  <h3>{{ comments.length }} 条评论</h3>
                </div>
              </div>
              <div class="CommentList">
                <ul class="CommentList-inner">
                  <li
                    class="CommentItem"
                    v-for="(item, index) in comments"
                    :key="index"
                  >
                    <div class="userInfo">
                      <div class="userInfo-avatar">
                        <img :src="item.userId.avatar_url" class="Avatar" />
                      </div>
                      <div class="userInfo-detail">
                        <span class="nickName">{{ item.userId.nickName }}</span>
                        <p class="headline">躲起来的星星也在努力发光</p>
                      </div>
                      <div class="timedate">2020-09-16</div>
                    </div>
                    <div class="content">
                      <div class="content-inner">
                        <p>
                          {{ item.content }}
                        </p>
                      </div>
                    </div>
                    <div class="footer">
                      <button class="actionButton">
                        <i class="iconfont">&#xe61f;</i>
                        点赞
                      </button>
                      <button
                        class="actionButton"
                        @click="handleReply(item._id, item.userId)"
                      >
                        <i class="iconfont">&#xe62c;</i>
                        回复
                      </button>
                      <button class="actionButton delButton">
                        <i class="iconfont">&#xe6db;</i>
                        删除
                      </button>
                    </div>
                    <ul class="subCommentList">
                      <li
                        class="subCommentItem"
                        v-for="(subItem, index) in item.reply"
                        :key="index"
                      >
                        <div class="userInfo">
                          <div class="userInfo-avatar">
                            <img
                              :src="subItem.userId.avatar_url"
                              class="Avatar"
                            />
                          </div>
                          <div class="userInfo-detail">
                            <span class="nickName">{{
                              subItem.userId.nickName
                            }}</span>
                            <p class="reply">
                              回复<span class="replyUser">{{
                                subItem.replyUserid.nickName
                              }}</span>
                            </p>
                          </div>
                          <div class="timedate">2020-09-16</div>
                        </div>
                        <div class="content">
                          <div class="content-inner">
                            <p>
                              {{ subItem.content }}
                            </p>
                          </div>
                        </div>
                        <div class="footer">
                          <button class="actionButton">
                            <i class="iconfont">&#xe61f;</i>
                            点赞
                          </button>
                          <button
                            class="actionButton"
                            @click="handleReply(item._id, subItem.userId)"
                          >
                            <i class="iconfont">&#xe62c;</i>
                            回复
                          </button>
                          <button class="actionButton delButton">
                            <i class="iconfont">&#xe6db;</i>
                            删除
                          </button>
                        </div>
                      </li>
                      <!-- <li class="subCommentItem">
                        <button class="loadMore">
                          加载更多...
                        </button>
                      </li> -->
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="CommentFooter">
                <div class="CommentEditor">
                  <input
                    type="text"
                    class="CommentEditor-input"
                    :placeholder="
                      commentData.replyUser.userName === ''
                        ? '说点什么...'
                        : '回复 ' + commentData.replyUser.userName
                    "
                    v-model="commentData.content"
                  />
                  <div class="CommentEditor-tools">
                    <button class="tools-button">
                      <i class="iconfont">&#xe75d;</i>
                    </button>
                    <button class="tools-button">
                      <i class="iconfont">&#xe632;</i>
                    </button>
                  </div>
                </div>
                <button class="CommentSubmit" @click="handleSubmit">
                  发表
                </button>
              </div>
            </div>
            <Loading v-show="isShowLoading" text="拼命加载中..." />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, inject } from 'vue'
import { useStore } from 'vuex'
import Loading from './Loading.vue'
import { fetchCommentsByPostid, createComment } from '../api/comments'
import { UserInfo } from '../store'

interface CommentParams {
  content: string
  userId: string
  postId: string
  isReply?: string
  replyCommentid?: string
  replyUserid?: string
}

export default defineComponent({
  setup() {
    const store = useStore()
    const Alert = inject('Alert')
    const isShow = computed(() => store.state.isShowComment)
    const comments = computed(() => store.state.comment.list)
    const isShowLoading = ref<boolean>(false)
    const commentData = reactive({
      content: '',
      replyCommentId: '',
      replyUser: {
        id: '',
        userName: '',
      },
    })

    const handleClose = () => {
      store.commit('changeCommentFlag', false)
    }

    watch(
      () => store.state.comment.currentPostId,
      () => {
        _getComments()
      }
    )

    // 请求评论列表数据
    const _getComments = () => {
      store.commit('clearComments')
      const postId = store.state.comment.currentPostId
      if (postId === '') {
        return
      }
      isShowLoading.value = true
      fetchCommentsByPostid(postId).then((res) => {
        const result = res.data
        console.log(result)
        if (result && result.code === 200) {
          const comments = result.data
          if (comments.length > 0) {
            // 处理评论回复数据
            const reply = result.reply
            for (let i = 0; i < comments.length; i++) {
              comments[i].reply = reply[i]
            }
            console.log(comments)
            store.commit('addComments', comments)
          }
        }
        isShowLoading.value = false
      })
    }

    // 处理回复评论
    const handleReply = (commentId: string, userInfo: UserInfo) => {
      commentData.replyCommentId = commentId
      commentData.replyUser.userName = userInfo.nickName
      commentData.replyUser.id = userInfo._id
    }

    // 提交评论信息
    const handleSubmit = () => {
      const content = commentData.content
      if (content === '') {
        Alert({
          type: 'error',
          msg: '评论内容不能为空',
        })
        return
      }
      const userId = store.state.user._id
      const postId = store.state.comment.currentPostId
      const replyCommentid = commentData.replyCommentId
      const replyUserid = commentData.replyUser.id
      if (userId !== '' && postId !== '') {
        const params: CommentParams = {
          isReply: '0',
          content,
          userId,
          postId,
        }
        if (replyCommentid !== '' && replyUserid !== '') {
          params.isReply = '1'
          params.replyCommentid = replyCommentid
          params.replyUserid = replyUserid
        }
        createComment(params).then((res) => {
          console.log(res)
          const result = res.data
          if (result && result.code === 200) {
            const comment = result.data
            if (comment.isReply === '0') {
              // 是评论
              store.commit('addComment', comment)
            } else if (comment.isReply === '1') {
              // 是回复
              store.commit('addReply', comment)
            }
            resetCommentData()
            Alert({
              type: 'success',
              msg: '评论成功！',
            })
          } else {
            Alert({
              type: 'error',
              msg: '评论失败！',
            })
          }
        })
      } else {
        Alert({
          type: 'error',
          msg: '系统出错，请重试！',
        })
      }
    }
    // 重置评论操作
    const resetCommentData = () => {
      ;(commentData.content = ''),
        (commentData.replyCommentId = ''),
        (commentData.replyUser.id = ''),
        (commentData.replyUser.userName = '')
    }
    return {
      handleClose,
      isShow,
      comments,
      isShowLoading,
      commentData,
      handleSubmit,
      handleReply,
      resetCommentData,
    }
  },
  components: {
    Loading,
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.Modal {
  height: calc(100% - 60px);
  transition: $animation;
  .Modal-inner {
    height: 100%;
  }
}
.CommentPopup-main {
  width: 660px;
  height: 100%;
  .CommentTopbar {
    display: flex;
    height: 50px;
    padding: 0 20px;
    align-items: center;
    border-bottom: 1px solid $color-gray-line-s;
    .Topbar-title {
      flex: 1;
      line-height: 24px;
      h3 {
        color: $color-black;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .CommentList {
    height: calc(100% - 51px - 61px);
    overflow-y: scroll;
    overflow-x: hidden;
    .CommentList-inner {
      .CommentItem {
        padding: 10px 0;
        margin: 0 20px;
        border-bottom: 1px solid $color-gray-line-s;
        .userInfo {
          display: flex;
          .userInfo-avatar {
            width: 40px;
            height: 40px;
            margin-right: 15px;
          }
          .userInfo-detail {
            flex: 1;
            line-height: 20px;
            .nickName {
              display: block;
              color: $color-black;
              font-size: 15px;
              font-weight: bold;
              max-width: 120px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
            }
            .headline {
              color: $color-gray-text-s;
              font-size: 14px;
            }
          }
          .timedate {
            line-height: 40px;
            font-size: 14px;
            color: $color-gray-text;
          }
        }
        .content {
          padding: 0 15px 0 55px;
          margin-top: 6px;
          .content-inner {
            line-height: 22px;
            p {
              font-size: 15px;
              color: $color-black;
            }
          }
        }
        .footer {
          margin-top: 6px;
          padding: 0 15px 0 55px;

          .actionButton {
            line-height: 24px;
            padding: 0 6px;
            margin-right: 15px;
            border-radius: 3px;
            color: $color-gray-text;
            background-color: $color-gray-bg;
            &:hover {
              background-color: $color-gray-bg-hover;
            }
          }
        }
        .subCommentList {
          padding-left: 55px;
          // margin-top: 10px;
          .subCommentItem {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid $color-gray-line-s;
            .userInfo {
              .userInfo-avatar {
                width: 30px;
                height: 30px;
              }
              .userInfo-detail {
                line-height: 30px;
                .nickName {
                  display: inline-block;
                  float: left;
                }
                .reply {
                  display: inline-block;
                  float: left;
                  color: $color-gray-text;
                  font-size: 14px;
                  margin-left: 10px;
                  .replyUser {
                    color: $color-black;
                    font-weight: bold;
                    padding-left: 10px;
                  }
                }
              }
              .timedate {
                line-height: 30px;
              }
            }
            .content {
              padding-left: 45px;
            }
            .footer {
              padding-left: 45px;
            }
            .loadMore {
              color: $color-gray;
              line-height: 18px;
              width: 100%;
            }
          }
        }
      }
    }
  }
  .CommentFooter {
    display: flex;
    height: 40px;
    padding: 10px 20px;
    align-items: center;
    border-top: 1px solid $color-gray-line-s;
    .CommentEditor {
      flex: 1;
      display: flex;
      border: 1px solid $color-gray-line;
      border-radius: 3px;
      margin-right: 10px;
      box-sizing: border-box;
      .CommentEditor-input {
        flex: 1;
        height: 38px;
        line-height: 40px;
        color: $color-gray-text;
        font-size: 14px;
        box-sizing: border-box;
        padding: 0 15px;
      }
      .CommentEditor-tools {
        display: inline-block;
        background-color: $color-gray-bg;
        .tools-button {
          width: 40px;
          height: 40px;
          color: $color-gray-text;
          user-select: none;
          &:hover {
            color: $color-main;
          }
          i {
            font-size: 24px;
          }
        }
      }
    }
    .CommentSubmit {
      width: 80px;
      height: 40px;
      color: $color-white;
      font-size: 14px;
      background-color: $color-main;
      border-radius: 3px;
      transition: $animation;
      &:hover {
        background-color: $color-main-hover;
      }
    }
  }
}
</style>
