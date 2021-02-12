<template>
  <div v-show="isShow" class="Modal-wrapper">
    <div class="Modal-backMask" @click="handleCloseClick" />
    <div class="Modal">
      <div class="ImageView">
        <div class="ImageView-main">
          <img :src="imageList[currentImage]">
          <div v-show="isShowTips" class="ImageView-tips">
            <span>已经是最后一张了</span>
          </div>
        </div>
        <div class="ImageView-bottom">
          <ul class="ImageView-list">
            <li
              v-for="(item, index) in imageList"
              :key="index"
              class="ImageView-item"
              :class="currentImage === index ? 'active' : ''"
              @click="handleImageClick(index)"
            >
              <img :src="item">
            </li>
          </ul>
        </div>
        <div class="ImageView-Button ImageView-Button-L" @click="handleLeftClick">
          <i class="iconfont">&#xe63b;</i>
        </div>
        <div class="ImageView-Button ImageView-Button-R" @click="handleRightClick">
          <i class="iconfont">&#xe601;</i>
        </div>
      </div>
    </div>
  </div>
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
    const imageList = ref([
      'http://zzy19.cn/ms1.jpg',
      'http://zzy19.cn/ms2.jpg',
      'http://zzy19.cn/ms3.jpg',
      'http://zzy19.cn/ms4.jpg'
    ])
    const currentImage = ref(0)
    // 图片列表点击事件
    const handleImageClick = (i: number) => {
      currentImage.value = i
    }
    // 上一张按钮
    const handleLeftClick = () => {
      if (currentImage.value === 0) {
        showTips()
        return
      }
      currentImage.value--
    }
    // 下一张按钮
    const handleRightClick = () => {
      if (currentImage.value === imageList.value.length - 1) {
        showTips()
        return
      }
      currentImage.value++
    }
    // 提示事件
    const isShowTips = ref(false)
    const showTips = () => {
      let timer
      isShowTips.value = true
      if (timer) {
        clearTimeout(timer)
      }
      setTimeout(() => {
        isShowTips.value = false
      }, 2000)
    }
    // 关闭事件
    const handleCloseClick = () => {
      context.emit('handleClose')
    }
    return {
      imageList,
      currentImage,
      handleImageClick,
      handleLeftClick,
      handleRightClick,
      isShowTips,
      handleCloseClick
    }
  }
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';

.ImageView {
  position: relative;
  height: calc(100vh - 48px);
  .ImageView-main {
    position: relative;
    height: calc(100% - 140px);
    img {
      height: 100%;
      border-radius: 3px;
    }
    .ImageView-tips {
      position: absolute;
      top: 20px;
      left: 0;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      span {
        color: $color-white;
        padding: 0 15px;
        line-height: 40px;
        border-radius: 3px;
        background-color: $color-main;
      }
    }
  }
  .ImageView-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 140px;
    .ImageView-list {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      .ImageView-item {
        width: 120px;
        height: 120px;
        border: 2px solid $color-white;
        border-radius: 3px;
        margin-right: 12px;
        overflow: hidden;
        box-sizing: border-box;
        cursor: pointer;
        transition: $animation;
        &:hover {
          border: 2px solid $color-main;
          // transform: scale(1.1);
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .active {
        transform: scale(1.1);
        border: 2px solid $color-main;
      }
    }
  }
  .ImageView-Button {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: calc(100% - 140px);
    user-select: none;
    cursor: pointer;
    transition: $animation;
    &:hover {
      background-color: rgba(0, 0, 0, .5);
      i {
        background-color: transparent;
      }
    }
    i {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: $color-white;
      font-size: 40px;
      background-color: rgba(0, 0, 0, .5);
      border-radius: 50%;
      transition: $animation;
    }
  }
  .ImageView-Button-L {
    left: 0px;
  }
  .ImageView-Button-R {
    right: 0px;
  }
}
</style>
