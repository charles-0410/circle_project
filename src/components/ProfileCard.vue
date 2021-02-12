<template>
  <transition name="float">
    <div v-show="isShow" class="ProfileCard">
      <div class="ProfileCard-inner shadow" v-if="data.userId">
        <div class="ProfileCard-avatar">
          <img :src="data.avatar_url" class="Avatar" />
        </div>
        <div class="userInfo">
          <span class="userInfo-nickName">{{ data.nickName }}</span>
          <p class="userInfo-headline">躲起来的星星也在努力发光11</p>
        </div>
        <div class="userRecord">
          <ul class="userRecord-list">
            <li class="userRecord-item">
              <span class="title">发表</span>
              <span class="count">999</span>
            </li>
            <li class="userRecord-item">
              <span class="title">关注</span>
              <span class="count">999</span>
            </li>
            <li class="userRecord-item">
              <span class="title">粉丝</span>
              <span class="count">999</span>
            </li>
          </ul>
        </div>
        <div class="ProfileCard-bot">
          <button class="followButton">
            <i class="iconfont">&#xe64d;</i>
            关注
          </button>
          <button class="chatButton">
            <i class="iconfont">&#xe61e;</i>
            私信
          </button>
        </div>
      </div>
      <div class="ProfileCard-loading shadow" v-else>
        <div class="Loading-icon">
          <i class="iconfont">&#xe8fc;</i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.ProfileCard {
  position: absolute;
  bottom: -210px;
  left: 0;
  z-index: 98;
  padding-top: 30px;
  cursor: default;
  .ProfileCard-inner {
    position: relative;
    width: 300px;
    padding-bottom: 15px;
    box-shadow: 0 1px 6px rgba(26, 26, 26, 0.2);
    .ProfileCard-avatar {
      position: absolute;
      top: -20px;
      left: 16px;
      width: 70px;
      height: 70px;
      border-radius: 3px;
      overflow: hidden;
      border: 2px solid $color-white;
    }
    .userInfo {
      padding: 5px 10px 0 100px;
      .userInfo-nickName {
        display: block;
        max-width: 140px;
        color: $color-black;
        font-size: 16px;
        font-weight: bold;
        line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .userInfo-headline {
        max-width: 180px;
        color: $color-gray-text-s;
        font-size: 14px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .userRecord {
      margin-top: 10px;
      .userRecord-list {
        display: flex;
        margin: 0 12px 15px 12px;
        padding: 10px 6px 0 6px;
        border-top: 1px solid $color-gray-line-s;
        .userRecord-item {
          position: relative;
          flex: 1;
          text-align: center;
          user-select: none;
          cursor: pointer;
          transition: $animation;
          &:not(:last-child) {
            &::after {
              position: absolute;
              right: 0;
              top: 12px;
              content: '';
              height: 20px;
              border-right: 1px solid $color-gray-line-s;
            }
          }
          .title {
            display: block;
            font-size: 14px;
            line-height: 20px;
            color: $color-gray-text;
          }
          .count {
            display: block;
            font-size: 18px;
            line-height: 26px;
            font-weight: bold;
            color: $color-black;
          }
        }
      }
    }
    .ProfileCard-bot {
      margin: 0 15px;
      display: flex;
      .followButton {
        flex: 1;
        margin: 0 10px;
        height: 35px;
        border-radius: 3px;
        font-size: 14px;
        color: $color-white;
        background-color: $color-main;
        transition: $animation;
        &:hover {
          background-color: $color-main-hover;
        }
      }
      .chatButton {
        flex: 1;
        margin: 0 10px;
        height: 35px;
        border-radius: 3px;
        font-size: 14px;
        color: $color-gray-text;
        background-color: $color-gray-bg-hover;
        transition: $animation;
        &:hover {
          background-color: $color-gray-bg;
        }
      }
    }
  }
  .ProfileCard-loading {
    position: absolute;
    top: -170px;
    left: 0;
    width: 100px;
    height: 60px;
    box-shadow: 0 1px 6px rgba(26, 26, 26, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>