<template>
  <transition name="fade" mode="out-in" appear>
    <div v-show="isShow" class="Modal-wrapper">
      <div class="Modal-backMask" />
      <transition name="slide" mode="out-in" appear>
        <div v-show="isShow" class="Modal">
          <div class="Modal-closeButton" @click="handleClose">
            <i class="iconfont">&#xe654;</i>
          </div>
          <div class="Modal-inner">
            <div class="EditPopup-main">
              <h3 class="EditPopup-title">
                分享新鲜事
              </h3>
              <div class="EditPopup-body">
                <textarea class="EditPopup-input" placeholder="分享点什么..." />
                <div :class="isShowImageList === true ? 'imageRow' : 'imageRow imageRow-hide'">
                  <ul class="imageRow-list">
                    <li class="imageRow-item">
                      <img src="http://zzy19.cn/ms1.jpg">
                    </li>
                    <li class="imageRow-addButton">
                      <i class="iconfont">&#xe64d;</i>
                    </li>
                  </ul>
                </div>
                <div class="TopicTags">
                  <div class="TopicTags-Tag">
                    <i class="iconfont">&#xe8b1;</i>
                    <span class="TopicTags-TagName">分享美食</span>
                  </div>
                  <div class="TopicTags-Tag">
                    <i class="iconfont">&#xe8b1;</i>
                    <span class="TopicTags-TagName">分享风景</span>
                  </div>
                  <div class="TopicTags-Tag">
                    <i class="iconfont">&#xe8b1;</i>
                    <span class="TopicTags-TagName">心灵鸡汤</span>
                  </div>
                  <div class="TopicTags-Tag TopicTags-moreButton">
                    <span class="TopicTags-TagName">更多</span>
                    <i class="iconfont">&#xe601;</i>
                  </div>
                </div>
                <div class="ToolsRow">
                  <ul class="ToolsList">
                    <li class="ToolsList-item" @click="handleUploadPic">
                      <i class="iconfont">&#xe75d;</i>
                    </li>
                    <li class="ToolsList-item">
                      <i class="iconfont" style="font-size: 20px">&#xe638;</i>
                    </li>
                    <li class="ToolsList-item">
                      <i class="iconfont">&#xe761;</i>
                    </li>
                  </ul>
                  <button class="sendButton">
                    发表分享
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup (prop, context) {
    const handleClose = () => {
      context.emit('handleClose')
    }
    const isShowImageList = ref(false)
    const handleUploadPic = () => {
      isShowImageList.value = !isShowImageList.value
    }
    return {
      handleClose,
      isShowImageList,
      handleUploadPic
    }
  }
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.EditPopup-main {
  width: 600px;
  padding: 15px;
  box-sizing: border-box;
  .EditPopup-title {
    display: block;
    height: 40px;
    color: $color-gray-text;
    line-height: 40px;
    font-size: 22px;
    padding-left: 15px;
  }
  .EditPopup-body {
    margin: 10px 15px;
    transition: $animation;
    .EditPopup-input {
      width: 100%;
      height: 120px;
      color: $color-gray-text;
      font-size: 15px;
      resize: none;
    }
    .imageRow-hide {
      height: 0 !important;
    }
    .imageRow {
      transition: $animation;
      height: 130px;
      overflow: hidden;
      .imageRow-list {
        display: flex;
        padding-top: 20px;
        .imageRow-item {
          width: 110px;
          height: 110px;
          margin-right: 8px;
          border-radius: 3px;
          overflow: hidden;
          cursor: zoom-in;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .imageRow-addButton {
          width: 110px;
          height: 110px;
          line-height: 108px;
          text-align: center;
          box-sizing: border-box;
          border: 1px dashed $color-gray-line-d;
          border-radius: 5px;
          cursor: pointer;
          transition: $animation;
          &:hover {
            border: 1px dashed $color-main;
            i {
              color: $color-main;
            }
          }
          i {
            color: $color-gray-text-s;
            font-size: 22px;
          }
        }
      }
    }
    .TopicTags {
      display: flex;
      margin: 20px 0 10px 0;
      height: 30px;
      .TopicTags-Tag {
        text-align: center;
        line-height: 30px;
        padding: 0 12px;
        margin-right: 10px;
        border-radius: 20px;
        color: $color-gray-text;
        background-color: $color-gray-bg;
        user-select: none;
        cursor: pointer;
        .TopicTags-TagName {
          padding-left: 3px;
        }
      }
      .TopicTags-moreButton {
        .TopicTags-TagName {
          padding-right: 3px;
        }
        i {
          font-size: 12px;
        }
      }
    }
    .ToolsRow {
      display: flex;
      .ToolsList {
        flex: 1;
        display: flex;
        .ToolsList-item {
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 3px;
          transition: $animation;
          user-select: none;
          cursor: pointer;
          &:hover {
            background-color: $color-main-o;
            i {
              color: $color-main;
            }
          }
          i {
            color: $color-gray-text;
            font-size: 22px;
          }
        }
      }
      .sendButton {
        width: 100px;
        height: 40px;
        color: $color-white;
        background-color: $color-main;
        border-radius: 3px;
        transition: $animation;
        &:hover {
          background-color: $color-main-hover;
        }
      }
    }
  }
}
</style>
