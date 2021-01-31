<template>
  <div class="Profile">
    <div class="userCover">
      <img src="http://zzy19.cn/14.jpg" class="userCover-image">
    </div>
    <div class="userInfo">
      <div class="avatarBox">
        <img src="http://zzy19.cn/tx5.png" class="avatarBox-image">
      </div>
      <div class="userInfo-detail">
        <span class="nickName">首席可爱执行官</span>
        <p class="headline">
          躲起来的星星也在努力发光
        </p>
      </div>
    </div>
    <div class="userRecord">
      <ul class="userRecord-list">
        <li class="userRecord-item">
          <span class="title">发表</span>
          <span class="count">99</span>
        </li>
        <li class="userRecord-item">
          <span class="title">关注</span>
          <span class="count">9</span>
        </li>
        <li class="userRecord-item">
          <span class="title">粉丝</span>
          <span class="count">999</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.Profile {
  .userCover {
    height: 100px;
    .userCover-image {
      width: 100%;
      height: 100%;
      border-radius: 3px 3px 0 0;
      object-fit: cover;
    }
  }
  .userInfo {
    position: relative;
    .avatarBox {
      position: absolute;
      top: -26px;
      left: 18px;
      width: 70px;
      height: 70px;
      border: 2px solid $color-white;
      border-radius: 3px;
      overflow: hidden;
      .avatarBox-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .userInfo-detail {
      margin-left: 92px;
      padding: 6px 10px;
      .nickName {
        display: block;
        max-width: 130px;
        font-size: 18px;
        font-weight: bold;
        color: $color-black;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .headline {
        color: $color-gray-text-s;
        line-height: 20px;
        max-width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .userRecord {
    margin-top: 10px;
    .userRecord-list {
      display: flex;
      padding: 0 10px;
      padding-bottom: 10px;
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
            top: 15px;
            content: "";
            height: 20px;
            border-right: 1px solid $color-gray-line;
          }
        }
        .title {
          display: block;
          color: $color-gray-text;
          font-size: 14px;
          line-height: 20px;
        }
        .count {
          display: block;
          color: $color-black;
          font-size: 18px;
          font-weight: bold;
          line-height: 30px;
        }
        &:hover {
          opacity: .7;
        }
      }
    }
  }
}
</style>
