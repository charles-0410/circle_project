<template>
  <div class="PreviewPic" v-if="isShow">
    <div class="PreviewPic-inner">
      <div class="PreviewPic-top">
        <img :src="picUrl" class="PreviewPic-image" />
      </div>
      <div class="PreviewPic-bot">
        <button class="PreviewPic-Btn cancelBtn" @click="handleCancel">
          取消
        </button>
        <button class="PreviewPic-Btn sendBtn" @click="handleSubmit">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    picUrl: { type: String },
  },
  setup(prop, context) {
    const isShow = ref<boolean>(false)
    const setShow = (flag: boolean) => {
      isShow.value = flag
    }
    // 取消发送
    const handleCancel = () => {
      setShow(false)
      // prop.picUrl = ''
    }
    const handleSubmit = () => {
      context.emit('handleSend')
    }
    return { isShow, setShow, handleCancel, handleSubmit }
  },
})
</script>

<style scoped lang="scss">
@import '../../util/style/variable.scss';
.PreviewPic {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .PreviewPic-inner {
    position: relative;
    width: 380px;
    height: 280px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: $shadow-d;
    background-color: $color-white;
    .PreviewPic-top {
      max-height: 220px;
      overflow: hidden;
      box-sizing: border-box;
      border-bottom: 2px solid $color-main;
      .PreviewPic-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .PreviewPic-bot {
      display: flex;
      height: 40px;
      padding: 10px 20px;
      .PreviewPic-Btn {
        flex: 1;
        color: $color-gray-text;
        line-height: 40px;
        font-size: 14px;
        margin: 0 20px;
        border-radius: 3px;
        background-color: $color-gray-bg;
        transition: $animation;
        &.cancelBtn {
          &:hover {
            color: $color-white;
            background-color: $color-error;
          }
        }
        &.sendBtn {
          &:hover {
            color: $color-white;
            background-color: $color-main;
          }
        }
      }
    }
  }
}
</style>
