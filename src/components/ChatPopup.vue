<template>
  <div class="Modal-wrapper" v-if="isShow">
    <div class="Modal-backMask"></div>
    <div class="Modal">
      <div class="Modal-closeButton" @click="handleClosePopup">
        <i class="iconfont">&#xe654;</i>
      </div>
      <div class="Modal-inner">
        <div class="ChatPopup">
          <div class="ChatPopup-UserList">
            <div class="UserList-head">
              <div class="head-searchInput">
                <input type="text" class="searchInput" placeholder="搜索用户" />
              </div>
              <div class="head-searchButton">
                <button class="searchButton">
                  <i class="iconfont">&#xe637;</i>
                </button>
              </div>
            </div>
            <div class="UserList-main">
              <ul class="UserList-list">
                <li
                  class="UserList-item"
                  v-for="(item, index) in relations"
                  :key="index"
                  :class="
                    currentInfo && currentInfo._id === item._id ? 'active' : ''
                  "
                  @click="handleUserClick(item)"
                >
                  <div class="item-avatar">
                    <img :src="item.userInfo.avatar_url" class="Avatar" />
                    <span class="item-newCount" v-if="item.newRecordCount">
                      {{ item.newRecordCount }}
                    </span>
                  </div>
                  <div class="item-r">
                    <div class="UserName">
                      <p>{{ item.userInfo.nickName }}</p>
                      <span class="item-datetime">
                        {{ formatTime(item.lastRecord.createdAt) }}
                      </span>
                    </div>
                    <div class="LastMsg">
                      <p>{{ item.lastRecord.content }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="ChatPopup-ChatBox">
            <div class="ChatBox-inner" v-if="currentInfo">
              <div class="ChatBox-head">
                <span class="ChatBox-head-userName">
                  {{ currentInfo.userInfo.nickName }}
                </span>
              </div>
              <div class="MessagesBox-wrapper">
                <MessagesBox
                  :currentInfo="currentInfo"
                  :chatRecord="chatRecord"
                  ref="MessageBox"
                />
              </div>
              <div class="InputBox">
                <div class="InputBox-ToolsBar">
                  <div class="ToolsBar-inner">
                    <button class="ToolsBar-item" @click="handleUploadPicClick">
                      <i class="iconfont">&#xe75d;</i>
                    </button>
                    <button class="ToolsBar-item">
                      <i class="iconfont">&#xe74a;</i>
                    </button>
                    <button
                      class="ToolsBar-item"
                      @click="handleShowRedbagPanel"
                    >
                      <i class="iconfont" style="font-size: 20px">&#xe678;</i>
                    </button>
                    <button class="ToolsBar-item">
                      <i class="iconfont">&#xe632;</i>
                      <EmojiPanel />
                    </button>
                  </div>
                </div>
                <div class="InputBox-Input">
                  <div class="Input-inner">
                    <textarea
                      placeholder="说点什么..."
                      v-model="message"
                    ></textarea>
                  </div>
                </div>
                <div class="InputBox-Fotter">
                  <div class="Fotter-inner">
                    <button class="InputBox-Submit" @click="handleSubmit">
                      发送
                    </button>
                    <span class="Fotter-tips">按 Enter 键发送</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Loading v-show="false" />
        <PreviewPic
          :picUrl="PreviewImage"
          ref="PreviewPic"
          @handleSend="handleSendPic"
        />
        <RedbagPanel ref="RedbagPanel" />
        <input
          type="file"
          name="files"
          ref="InputFile"
          style="display: none"
          @change="imagesChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  nextTick,
  ref,
  watch,
  Component,
  inject,
} from 'vue'
import { useStore } from 'vuex'
import { RelationProps } from '../store'
import Loading from './Loading.vue'
import MessagesBox from './Chat/MessagesBox.vue'
import PreviewPic from './Chat/PreviewPic.vue'
import RedbagPanel from './Chat/RedbagPanel.vue'
import EmojiPanel from './Chat/EmojiPanel.vue'
import { formatSmallTime } from '../util/js/formatTime'
import { fetchUserRelations, createMessage, fetchMessages } from '../api/chat'
import { uploadPic } from '../api/uploadPic'

interface MessageData {
  content: string
  receiver: string
  relationId: string
}

export default defineComponent({
  setup() {
    const store = useStore()
    const Alert = inject('Alert')
    const isShow = computed(() => store.state.isShowChat)
    const handleClosePopup = () => {
      store.commit('changeShowChatFlag', false)
    }

    watch(
      () => store.state.isShowChat,
      () => {
        _fetchUserRelations()
      }
    )

    const currentInfo = computed(() => store.state.chat.currentInfo)

    // 获取关系用户列表
    const relations = computed(() => store.state.chat.relations)
    const _fetchUserRelations = () => {
      const userId = store.state.user._id
      if (!userId) {
        return
      }
      fetchUserRelations(userId).then((res) => {
        const result = res.data
        if (result && result.code === 200) {
          store.commit('clearRelations')
          store.commit('addRelations', result.data)
          console.log(result.data)
        }
      })
    }

    // 格式化时间
    const formatTime = (time: Date) => {
      return formatSmallTime(time)
    }

    // 处理列表点击
    const handleUserClick = (item: RelationProps) => {
      // 如果点击的是当前关系，则不做处理
      const curRelationId = store.state.chat.currentInfo?._id
      if (item._id === curRelationId) {
        return
      }

      store.commit('setCurrentInfo', item)
      store.commit('clearCurrentRecord')
      // 获取聊天记录
      fetchMessages(item._id).then((res) => {
        const result = res.data
        if (result && result.code === 200) {
          store.commit('setCurrentRecord', result.data)
          console.log(store.state.chat.currentRecord)
        }
      })
    }

    // 消息记录列表
    const chatRecord = computed(() => store.state.chat.currentRecord)

    // 发送消息
    const MessageBox = ref<Component | null>(null)
    const message = ref('')
    const handleSubmit = () => {
      if (!currentInfo) {
        return
      }
      if (message.value === '') {
        Alert({ type: 'error', msg: '消息不能为空' })
        return
      }
      const MessageData = {
        content: message.value,
        receiver: currentInfo.value.userInfo._id,
        relationId: currentInfo.value._id,
        type: 0,
      }
      _createMessage(MessageData)
    }
    // 发送消息api
    const _createMessage = (MessageData: MessageData) => {
      createMessage(MessageData).then((res) => {
        const result = res.data
        if (result && result.code === 200) {
          console.log(result)
          message.value = ''
          store.commit('setCurrentRecord', [result.data])
          nextTick(() => {
            MessageBox.value?.ScrollToBottom()
          })
          // 改变关系列表最后消息记录
          console.log(result.data)
          const relationId = result.data.relationId
          const lastRecord = result.data
          store.commit('changeChatLastRecord', { relationId, lastRecord })
        }
      })
    }

    // 按下回车键发送消息
    onMounted(() => {
      document.onkeydown = function (e) {
        if (e.keyCode === 13 && isShow.value === true) {
          handleSubmit()
        }
      }
    })

    // 红包功能
    const RedbagPanel = ref<HTMLElement | null>(null)
    const handleShowRedbagPanel = () => {
      RedbagPanel.value?.handleOpenPanel()
    }

    // 图片发送功能
    const InputFile = ref<any | null>(null)
    const PreviewImage = ref<string | null>(null)
    const imageFile = ref<object | null>(null)
    const PreviewPic = ref(null)
    const handleUploadPicClick = () => {
      InputFile.value?.click()
    }
    const imagesChange = () => {
      let file = InputFile.value.files[0]
      // 检查图片文件（格式、大小）
      const isPic =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isPic || !isLt5M) {
        Alert({
          type: 'error',
          msg: `图片大小或格式有误！`,
        })
        return
      }
      // 转换成url地址用于待上传预览图片
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e: any) {
        // 这里的数据可以使本地图片显示到页面
        PreviewImage.value = e.target.result
      }
      imageFile.value = file
      PreviewPic.value?.setShow(true)
    }
    const handleSendPic = () => {
      let file = imageFile.value
      // 上传至OSS
      uploadPic(file, {
        next(res: any) {
          console.log(res)
        },
        error(err: any) {
          console.log(err)
        },
        complete(res: any) {
          let imageUrl = 'http://zzy19.cn/' + res.key
          console.log(imageUrl)

          const MessageData = {
            content: `pic~${imageUrl}`,
            receiver: currentInfo.value.userInfo._id,
            relationId: currentInfo.value._id,
            type: 1,
          }
          _createMessage(MessageData)
        },
      })
    }
    return {
      isShow,
      handleClosePopup,
      handleSubmit,
      handleUserClick,
      relations,
      currentInfo,
      chatRecord,
      message,
      MessageBox,
      formatTime,
      InputFile,
      handleUploadPicClick,
      imagesChange,
      PreviewImage,
      PreviewPic,
      handleSendPic,
      RedbagPanel,
      handleShowRedbagPanel,
    }
  },
  components: {
    Loading,
    MessagesBox,
    PreviewPic,
    RedbagPanel,
    EmojiPanel,
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.ChatPopup {
  display: flex;
  height: 600px;
  .ChatPopup-UserList {
    width: 240px;
    background-color: $color-gray-bg;
    .UserList-head {
      display: flex;
      height: 30px;
      padding: 19px 12px 10px 12px;
      background-color: $color-white;
      border-bottom: 1px solid $color-gray-line-s;
      .head-searchInput {
        flex: 1;
        .searchInput {
          width: 100%;
          height: 100%;
          color: $color-gray-text;
          padding: 0 10px;
          box-sizing: border-box;
          border-radius: 3px;
          background-color: $color-gray-bg-hover;
        }
      }
      .head-searchButton {
        width: 30px;
        height: 30px;
        padding-left: 5px;
        .searchButton {
          width: 100%;
          color: $color-gray-text;
          text-align: center;
          line-height: 30px;
          border-radius: 3px;
          background-color: $color-gray-bg-hover;
        }
      }
    }
    .UserList-main {
      position: relative;
      .UserList-list {
        list-style: none;
        .UserList-item {
          display: flex;
          width: 100%;
          height: 61px;
          padding: 10px 12px;
          box-sizing: border-box;
          background-color: $color-white;
          border-bottom: 1px solid $color-gray-line-s;
          user-select: none;
          cursor: pointer;
          &.active {
            background-color: $color-gray-bg-hover;
          }
          &:hover {
            background-color: $color-gray-bg-hover;
          }
          .item-avatar {
            position: relative;
            width: 40px;
            height: 40px;
            margin-right: 10px;
            .item-newCount {
              position: absolute;
              top: -6px;
              right: -6px;
              min-width: 16px;
              height: 16px;
              color: $color-white;
              font-size: 12px;
              line-height: 16px;
              text-align: center;
              box-sizing: border-box;
              padding: 0 4px;
              border-radius: 20px;
              background-color: $color-error;
            }
          }
          .item-r {
            flex: 1;
            .UserName {
              position: relative;
              display: flex;
              color: $color-black;
              line-height: 20px;
              font-size: 14px;
              padding-right: 40px;
              p {
                max-width: 120px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              .item-datetime {
                position: absolute;
                top: 0;
                right: 0;
                line-height: 20px;
                font-size: 12px;
                color: $color-gray-text-s;
              }
            }
            .LastMsg {
              color: $color-gray-text-s;
              line-height: 20px;
              font-size: 13px;
              p {
                max-width: 160px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
  .ChatPopup-ChatBox {
    width: 560px;
    box-shadow: $shadow-d;
    z-index: 2;
    .ChatBox-inner {
      .ChatBox-head {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        padding: 19px 12px 10px 12px;
        background-color: $color-white;
        border-bottom: 1px solid $color-gray-line-s;
        .ChatBox-head-userName {
          color: $color-gray-text;
          font-size: 15px;
        }
      }
      .MessagesBox-wrapper {
        height: 370px;
      }
      .InputBox {
        height: 170px;
        box-sizing: border-box;
        border-top: 1px solid $color-gray-line-s;
        .InputBox-ToolsBar {
          display: flex;
          height: 40px;
          .ToolsBar-inner {
            flex: 1;
            padding: 5px 15px;
            .ToolsBar-item {
              position: relative;
              width: 30px;
              height: 30px;
              color: $color-gray-text;
              border-radius: 3px;
              margin-right: 8px;
              &:hover {
                background-color: $color-gray-bg-hover;
              }
              i {
                font-size: 22px;
              }
            }
          }
        }
        .InputBox-Input {
          height: 80px;
          margin: 5px 0;
          .Input-inner {
            height: 100%;
            padding: 0 20px;
            box-sizing: border-box;
            textarea {
              width: 100%;
              height: 100%;
              color: $color-gray;
              font-size: 14px;
              resize: none;
            }
          }
        }
        .InputBox-Fotter {
          margin-bottom: 10px;
          .Fotter-inner {
            padding: 0 20px;
            .InputBox-Submit {
              float: right;
              width: 80px;
              height: 30px;
              line-height: 30px;
              color: $color-white;
              background-color: $color-main;
              border-radius: 3px;
              transition: $animation;
              &:hover {
                background-color: $color-main-hover;
              }
            }
            .Fotter-tips {
              float: right;
              font-size: 13px;
              color: $color-gray-text-s;
              line-height: 30px;
              margin-right: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
