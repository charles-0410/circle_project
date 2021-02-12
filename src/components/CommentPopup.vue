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
                  <h3>99 条评论</h3>
                </div>
              </div>
              <div class="CommentList">
                <ul class="CommentList-inner">
                  <li class="CommentItem">
                    <div class="userInfo">
                      <div class="userInfo-avatar">
                        <img src="http://zzy19.cn/tx7.png" class="Avatar">
                      </div>
                      <div class="userInfo-detail">
                        <span class="nickName">首席可爱执行官</span>
                        <p class="headline">
                          躲起来的星星也在努力发光
                        </p>
                      </div>
                      <div class="timedate">
                        2020-09-16
                      </div>
                    </div>
                    <div class="content">
                      <div class="content-inner">
                        <p>那你先吧html的模板先写出来，css不懂的话，你可以大概看一下css的盒子模型，以及怎么布局，先大概做出来，不要因为老师不教，你就不写，现在网络很多资料</p>
                      </div>
                    </div>
                    <div class="footer">
                      <button class="actionButton">
                        <i class="iconfont">&#xe61f;</i>
                        点赞
                      </button>
                      <button class="actionButton">
                        <i class="iconfont">&#xe62c;</i>
                        回复
                      </button>
                      <button class="actionButton delButton">
                        <i class="iconfont">&#xe6db;</i>
                        删除
                      </button>
                    </div>
                    <ul class="subCommentList">
                      <li class="subCommentItem">
                        <div class="userInfo">
                          <div class="userInfo-avatar">
                            <img src="http://zzy19.cn/tx7.png" class="Avatar">
                          </div>
                          <div class="userInfo-detail">
                            <span class="nickName">首席可爱执行官</span>
                            <p class="reply">
                              回复<span class="replyUser">猪猪琼</span>
                            </p>
                          </div>
                          <div class="timedate">
                            2020-09-16
                          </div>
                        </div>
                        <div class="content">
                          <div class="content-inner">
                            <p>那你先吧html的模板先写出来，css不懂的话，你可以大概看一下css的盒子模型，以及怎么布局，先大概做出来，不要因为老师不教，你就不写，现在网络很多资料</p>
                          </div>
                        </div>
                        <div class="footer">
                          <button class="actionButton">
                            <i class="iconfont">&#xe61f;</i>
                            点赞
                          </button>
                          <button class="actionButton">
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
                  <li class="CommentItem">
                    <div class="userInfo">
                      <div class="userInfo-avatar">
                        <img src="http://zzy19.cn/tx7.png" class="Avatar">
                      </div>
                      <div class="userInfo-detail">
                        <span class="nickName">首席可爱执行官</span>
                        <p class="headline">
                          躲起来的星星也在努力发光
                        </p>
                      </div>
                      <div class="timedate">
                        2020-09-16
                      </div>
                    </div>
                    <div class="content">
                      <div class="content-inner">
                        <p>那你先吧html的模板先写出来，css不懂的话，你可以大概看一下css的盒子模型，以及怎么布局，先大概做出来，不要因为老师不教，你就不写，现在网络很多资料</p>
                      </div>
                    </div>
                    <div class="footer">
                      <button class="actionButton">
                        <i class="iconfont">&#xe61f;</i>
                        点赞
                      </button>
                      <button class="actionButton">
                        <i class="iconfont">&#xe62c;</i>
                        回复
                      </button>
                      <button class="actionButton delButton">
                        <i class="iconfont">&#xe6db;</i>
                        删除
                      </button>
                    </div>
                    <ul class="subCommentList">
                      <li class="subCommentItem">
                        <div class="userInfo">
                          <div class="userInfo-avatar">
                            <img src="http://zzy19.cn/tx7.png" class="Avatar">
                          </div>
                          <div class="userInfo-detail">
                            <span class="nickName">首席可爱执行官</span>
                            <p class="reply">
                              回复<span class="replyUser">猪猪琼</span>
                            </p>
                          </div>
                          <div class="timedate">
                            2020-09-16
                          </div>
                        </div>
                        <div class="content">
                          <div class="content-inner">
                            <p>那你先吧html的模板先写出来，css不懂的话，你可以大概看一下css的盒子模型，以及怎么布局，先大概做出来，不要因为老师不教，你就不写，现在网络很多资料</p>
                          </div>
                        </div>
                        <div class="footer">
                          <button class="actionButton">
                            <i class="iconfont">&#xe61f;</i>
                            点赞
                          </button>
                          <button class="actionButton">
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
                  <li class="CommentItem">
                    <div class="userInfo">
                      <div class="userInfo-avatar">
                        <img src="http://zzy19.cn/tx7.png" class="Avatar">
                      </div>
                      <div class="userInfo-detail">
                        <span class="nickName">首席可爱执行官</span>
                        <p class="headline">
                          躲起来的星星也在努力发光
                        </p>
                      </div>
                      <div class="timedate">
                        2020-09-16
                      </div>
                    </div>
                    <div class="content">
                      <div class="content-inner">
                        <p>那你先吧html的模板先写出来，css不懂的话，你可以大概看一下css的盒子模型，以及怎么布局，先大概做出来，不要因为老师不教，你就不写，现在网络很多资料</p>
                      </div>
                    </div>
                    <div class="footer">
                      <button class="actionButton">
                        <i class="iconfont">&#xe61f;</i>
                        点赞
                      </button>
                      <button class="actionButton">
                        <i class="iconfont">&#xe62c;</i>
                        回复
                      </button>
                      <button class="actionButton delButton">
                        <i class="iconfont">&#xe6db;</i>
                        删除
                      </button>
                    </div>
                    <ul class="subCommentList">
                      <li class="subCommentItem">
                        <div class="userInfo">
                          <div class="userInfo-avatar">
                            <img src="http://zzy19.cn/tx7.png" class="Avatar">
                          </div>
                          <div class="userInfo-detail">
                            <span class="nickName">首席可爱执行官</span>
                            <p class="reply">
                              回复<span class="replyUser">猪猪琼</span>
                            </p>
                          </div>
                          <div class="timedate">
                            2020-09-16
                          </div>
                        </div>
                        <div class="content">
                          <div class="content-inner">
                            <p>那你先吧html的模板先写出来，css不懂的话，你可以大概看一下css的盒子模型，以及怎么布局，先大概做出来，不要因为老师不教，你就不写，现在网络很多资料</p>
                          </div>
                        </div>
                        <div class="footer">
                          <button class="actionButton">
                            <i class="iconfont">&#xe61f;</i>
                            点赞
                          </button>
                          <button class="actionButton">
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
                  <li class="CommentItem">
                    <div class="userInfo">
                      <div class="userInfo-avatar">
                        <img src="http://zzy19.cn/tx7.png" class="Avatar">
                      </div>
                      <div class="userInfo-detail">
                        <span class="nickName">首席可爱执行官</span>
                        <p class="headline">
                          躲起来的星星也在努力发光
                        </p>
                      </div>
                      <div class="timedate">
                        2020-09-16
                      </div>
                    </div>
                    <div class="content">
                      <div class="content-inner">
                        <p>那你先吧html的模板先写出来，css不懂的话，你可以大概看一下css的盒子模型，以及怎么布局，先大概做出来，不要因为老师不教，你就不写，现在网络很多资料</p>
                      </div>
                    </div>
                    <div class="footer">
                      <button class="actionButton">
                        <i class="iconfont">&#xe61f;</i>
                        点赞
                      </button>
                      <button class="actionButton">
                        <i class="iconfont">&#xe62c;</i>
                        回复
                      </button>
                      <button class="actionButton delButton">
                        <i class="iconfont">&#xe6db;</i>
                        删除
                      </button>
                    </div>
                    <ul class="subCommentList">
                      <li class="subCommentItem">
                        <div class="userInfo">
                          <div class="userInfo-avatar">
                            <img src="http://zzy19.cn/tx7.png" class="Avatar">
                          </div>
                          <div class="userInfo-detail">
                            <span class="nickName">首席可爱执行官</span>
                            <p class="reply">
                              回复<span class="replyUser">猪猪琼</span>
                            </p>
                          </div>
                          <div class="timedate">
                            2020-09-16
                          </div>
                        </div>
                        <div class="content">
                          <div class="content-inner">
                            <p>那你先吧html的模板先写出来，css不懂的话，你可以大概看一下css的盒子模型，以及怎么布局，先大概做出来，不要因为老师不教，你就不写，现在网络很多资料</p>
                          </div>
                        </div>
                        <div class="footer">
                          <button class="actionButton">
                            <i class="iconfont">&#xe61f;</i>
                            点赞
                          </button>
                          <button class="actionButton">
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
                  <input type="text" class="CommentEditor-input" placeholder="说点什么...">
                  <div class="CommentEditor-tools">
                    <button class="tools-button">
                      <i class="iconfont">&#xe75d;</i>
                    </button>
                    <button class="tools-button">
                      <i class="iconfont">&#xe632;</i>
                    </button>
                  </div>
                </div>
                <button class="CommentSubmit">
                  发表
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    const isShow = computed(() => store.state.isShowComment)
    const handleClose = () => {
      store.commit('changeCommentFlag', false)
    }
    return {
      handleClose,
      isShow
    }
  }
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
        padding: 10px 20px;
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
