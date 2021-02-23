<template>
  <div class="MessagesBox" ref="MessagesBox">
    <div
      class="Message-wrapper"
      v-for="(item, index) in chatRecord"
      :key="index"
    >
      <div class="Message-time">
        <span>{{ formatTime(item.createdAt) }}</span>
      </div>
      <div
        class="Message"
        :class="item.sender === myInfo._id ? 'Message-reverse' : ''"
      >
        <div class="Message-avatar">
          <img
            :src="
              item.sender === myInfo._id
                ? myInfo.avatar_url
                : currentInfo.userInfo.avatar_url
            "
            class="Avatar"
          />
        </div>
        <div class="Message-content">
          <div class="TextMessage" :class="getTextMessageCls(item)">
            <div v-if="item.type === 0">
              {{ formatContent(item) }}
            </div>
            <div v-else-if="item.type === 1">
              <img :src="formatContent(item)" />
            </div>
            <div v-else-if="item.type === 2" @click="handleRedbagClick">
              <div class="RedbagMessage-top">
                <div class="RedbagMessage-icon">
                  <i class="iconfont">&#xe622;</i>
                </div>
                <p class="RedbagMessage-text">恭喜发财，大吉大利！</p>
              </div>
              <div class="RedbagMessage-bottom">圈子红包</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="Message-wrapper">
      <div class="Message-time"><span>2021-12-23 09:58</span></div>
      <div class="Message Message-reverse">
        <div class="Message-avatar">
          <img src="http://zzy19.cn/tx3.png" class="Avatar" />
        </div>
        <div class="Message-content">
          <div class="TextMessage TextMessage-receiver PicMessage">
            <img src="http://zzy19.cn/FuBQAzvnb8xzTpL2BhlVKFXXV6WJ" />
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="Message-wrapper">
      <div class="Message-time"><span>2021-12-23 09:58</span></div>
      <div class="Message Message-reverse">
        <div class="Message-avatar">
          <img src="http://zzy19.cn/tx3.png" class="Avatar" />
        </div>
        <div class="Message-content">
          <div class="TextMessage TextMessage-receiver RedbagMessage">
            <div class="RedbagMessage-top">
              <div class="RedbagMessage-icon">
                <i class="iconfont">&#xe622;</i>
              </div>
              <p class="RedbagMessage-text">恭喜发财，大吉大利！</p>
            </div>
            <div class="RedbagMessage-bottom">圈子红包</div>
          </div>
        </div>
      </div>
    </div> -->
    <Redbag v-if="isShowRedbag" />
    <Loading v-show="chatRecord.length === 0" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ChatRecord } from '../../store'
import Loading from '../Loading.vue'
import Redbag from './Redbag.vue'
import { formatMsgTime, formatWxTime } from '../../util/js/formatTime'

export default defineComponent({
  props: {
    currentInfo: {
      type: Object,
    },
    chatRecord: {
      type: Array,
    },
  },
  setup() {
    const store = useStore()
    const myInfo = computed(() => store.state.user)

    // 监听切换聊天窗口&聊天记录列表变动
    watch(
      [
        () => store.state.chat.currentInfo,
        () => store.state.chat.currentRecord.length,
      ],
      () => {
        // 因为聊天记录列表会重新渲染导致重新计算时间（不重置为0会出bug）
        latelyTime = 0
        continuityCount = 0
      }
    )

    // 处理&格式化时间
    let latelyTime: number = 0
    let continuityCount = 0
    const formatTime = (time: Date) => {
      const millisecond = new Date(time).getTime()
      if (latelyTime == 0) {
        latelyTime = millisecond
        return formatWxTime(time)
      } else {
        let diff = millisecond - latelyTime
        if (diff < 1000 * 60 * 2) {
          if (continuityCount == 5) {
            continuityCount = 0
            return formatWxTime(time)
          }
          continuityCount++
          return null
        } else {
          latelyTime = millisecond
          return formatWxTime(time)
        }
      }
    }
    // const formatTime = (time: Date) => {
    //   const millisecond = new Date(time).getTime()
    //   if (latelyTime == 0) {
    //     latelyTime = millisecond
    //     return formatMsgTime(time)
    //   } else {
    //     let diff = millisecond - latelyTime
    //     if (diff < 1000 * 60 * 2) {
    //       return null
    //     } else {
    //       latelyTime = millisecond
    //       return formatMsgTime(time)
    //     }
    //   }
    // }

    watch(
      () => store.state.chat.currentRecord.length,
      () => {
        let h
        if (MessagesBox.value) {
          h = MessagesBox.value.scrollHeight - 370 - 120
          // 进入聊天窗口时，定位到最底部
          if (MessagesBox.value.scrollTop === 0) {
            nextTick(() => {
              ScrollToBottom()
            })
          } else if (MessagesBox.value.scrollTop >= h) {
            nextTick(() => {
              ScrollToBottom()
            })
          }
        }
      }
    )

    onMounted(() => {
      nextTick(() => {
        ScrollToBottom()
      })
    })

    const MessagesBox = ref<HTMLElement | null>(null)
    // 窗口定位到最底部
    const ScrollToBottom = () => {
      const h = MessagesBox.value?.scrollHeight || 0
      MessagesBox.value?.scrollTo(0, h)
    }

    // 转换内容
    const formatContent = (item: ChatRecord) => {
      if (item.type === 1) {
        let url = item.content.replace('pic~', '')
        return url
      } else {
        return item.content
      }
    }

    // 获取消息样式
    const getTextMessageCls = (item: ChatRecord) => {
      let cls = ''
      item.sender == myInfo.value._id
        ? (cls = 'TextMessage-receiver')
        : (cls = 'TextMessage-sender')
      item.type === 1
        ? (cls += ' PicMessage')
        : item.type === 2
        ? (cls += ' RedbagMessage')
        : ''
      return cls
    }

    // 红包
    const isShowRedbag = ref<boolean>(false)
    const handleRedbagClick = () => {
      isShowRedbag.value = true
    }

    return {
      MessagesBox,
      formatTime,
      myInfo,
      ScrollToBottom,
      formatContent,
      getTextMessageCls,
      handleRedbagClick,
      isShowRedbag,
    }
  },
  components: {
    Loading,
    Redbag,
  },
})
</script>

<style scoped lang="scss">
@import '../../util/style/variable.scss';
.MessagesBox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .Message-wrapper {
    .Message-time {
      // padding-top: 15px;
      margin-top: 15px;
      text-align: center;
      font-size: 13px;
      line-height: 20px;
      color: $color-gray-text;
    }
    .Message {
      display: flex;
      margin: 20px;
      &.Message-reverse {
        flex-direction: row-reverse;
      }
      .Message-avatar {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 40px;
      }
      .Message-content {
        display: flex;
        margin: 0 10px;
        align-items: center;
        &.Message-content-reverse {
          flex-direction: row-reverse;
        }
        .TextMessage {
          position: relative;
          // max-width: 360px;
          max-width: 280px;
          border-radius: 3px;
          padding: 10px 12px;
          margin: 0 8px;
          font-size: 14px;
          line-height: 20px;
          text-align: left;
          min-height: 40px;
          box-sizing: border-box;
          white-space: pre-wrap;
          word-break: break-all;
          &.TextMessage-sender {
            color: $color-gray;
            background-color: $color-gray-bg-hover;
            &::after {
              transform: rotate(45deg);
              position: absolute;
              content: '';
              width: 8px;
              height: 8px;
              left: -4px;
              top: 16px;
              z-index: -1;
              background-color: $color-gray-bg-hover;
            }
          }
          &.TextMessage-receiver {
            color: $color-white;
            background-color: $color-main;
            &::after {
              transform: rotate(45deg);
              position: absolute;
              content: '';
              width: 8px;
              height: 8px;
              right: -4px;
              top: 16px;
              z-index: -1;
              background-color: $color-main;
            }
          }
          &.PicMessage {
            display: flex;
            flex-wrap: wrap;
            max-width: 120px;
            padding: 0;
            border: 2px solid transparent;
            border-radius: 3px;
            cursor: zoom-in;
            img {
              display: block;
              width: 100%;
              border-radius: 3px;
              object-fit: cover;
            }
          }
          &.RedbagMessage {
            display: flex;
            flex-wrap: wrap;
            width: 200px;
            height: 80px;
            padding: 13px 12px 0 12px;
            background-color: $color-error;
            user-select: none;
            cursor: pointer;
            &:hover {
              opacity: 0.9;
            }
            &::after {
              transform: rotate(45deg);
              position: absolute;
              content: '';
              width: 8px;
              height: 8px;
              right: -4px;
              top: 16px;
              z-index: -1;
              background-color: $color-error;
            }
            .RedbagMessage-top {
              display: flex;
              height: 30px;
              padding-bottom: 12px;
              border-bottom: 1px solid rgba($color: #fff, $alpha: 0.2);
              .RedbagMessage-icon {
                margin-right: 10px;
                i {
                  color: $color-white;
                  font-size: 24px;
                  line-height: 30px;
                }
              }
              .RedbagMessage-text {
                max-width: 140px;
                line-height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .RedbagMessage-bottom {
              display: flex;
              height: 20px;
              line-height: 20px;
              color: $color-gold;
              font-size: 12px;
              padding-left: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
