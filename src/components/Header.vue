<template>
  <div class="Header">
    <div class="Header-inner">
      <div class="Header-Logo">Circle</div>
      <div class="Header-nav">
        <ul class="Header-nav-inner">
          <li class="active">首页</li>
          <li>分享</li>
          <li>圈子</li>
          <li>活动</li>
        </ul>
      </div>
      <div class="Header-search">
        <div class="Header-search-inner">
          <input
            type="text"
            class="Header-search-input"
            placeholder="输入想要搜索..."
          />
          <button class="search-btn">
            <i class="iconfont">&#xe636;</i>
          </button>
        </div>
      </div>
      <div class="Header-userInfo">
        <div class="Header-userInfo-item">
          <button class="Header-userInfo-btn">
            <i class="iconfont">&#xe6d5;</i>
          </button>
          <div class="btn-tips">22</div>
        </div>
        <div class="Header-userInfo-item">
          <button class="Header-userInfo-btn" @click="handleOpenChatPopup">
            <i class="iconfont">&#xe61e;</i>
          </button>
          <div class="btn-tips">2</div>
        </div>
        <div class="Header-profile">
          <div class="Header-avatar">
            <img src="http://zzy19.cn/tx5.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const handleOpenChatPopup = () => {
      store.commit('changeShowChatFlag', true)
    }
    return {
      handleOpenChatPopup,
    }
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.Header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 98;
  width: 100%;
  box-shadow: $shadow-g;
  background-color: $color-white;
  .Header-inner {
    display: flex;
    // width: 1100px;
    width: 1020px;
    padding: 0 20px;
    height: 52px;
    margin: 0 auto;
    box-sizing: border-box;
    .Header-Logo {
      display: flex;
      width: 120px;
      color: $color-white;
      // font-weight: bold;
      letter-spacing: 1px;
      font-size: 16px;
      align-items: center;
      justify-content: center;
      background-color: $color-main;
      user-select: none;
    }
    .Header-nav {
      .Header-nav-inner {
        display: flex;
        margin: 0 20px;
        li {
          color: $color-gray-text-s;
          font-size: 15px;
          line-height: 24px;
          padding: 13px 0;
          margin: 0 15px;
          border-bottom: 2px solid transparent;
          transition: $animation;
          cursor: pointer;
          &:hover {
            color: $color-black;
          }
        }
        .active {
          color: $color-black;
          font-weight: bold;
          border-bottom: 2px solid $color-main;
        }
      }
    }
    .Header-search {
      flex: 1;
      display: flex;
      justify-content: center;
      .Header-search-inner {
        position: relative;
        width: 320px;
        height: 34px;
        border-radius: 3px;
        border: 1px solid $color-gray-line;
        margin: 8px 0;
        .Header-search-input {
          height: 100%;
          width: 100%;
          font-size: 14px;
          line-height: 34px;
          padding-right: 34px;
          padding-left: 10px;
          box-sizing: border-box;
          background-color: $color-gray-bg;
        }
        .search-btn {
          position: absolute;
          top: 0;
          right: 0;
          width: 34px;
          height: 34px;
          color: $color-gray-text;
          line-height: 34px;
          text-align: center;
          cursor: pointer;
          i {
            font-size: 20px;
          }
        }
      }
    }
    .Header-userInfo {
      display: flex;
      align-items: center;
      .Header-userInfo-item {
        position: relative;
        margin-left: 20px;
        .Header-userInfo-btn {
          display: block;
          width: 40px;
          height: 40px;
          color: $color-gray-text;
          line-height: 40px;
          text-align: center;
          i {
            font-size: 24px;
          }
        }
        .btn-tips {
          position: absolute;
          left: 18px;
          top: 5px;
          font-size: 12px;
          color: $color-white;
          text-align: center;
          line-height: 14px;
          height: 14px;
          padding: 0 4px;
          border-radius: 20px;
          border: 2px solid $color-white;
          background-color: $color-main;
          user-select: none;
          cursor: pointer;
        }
      }
      .Header-profile {
        margin-left: 30px;
        .Header-avatar {
          width: 34px;
          height: 34px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
