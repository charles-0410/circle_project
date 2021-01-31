<template>
  <div class="PostItem">
    <div class="PostItem-inner">
      <div class="PostItem-head">
        <div class="head-avatar">
          <img src="http://zzy19.cn/tx5.png" class="avatar-image">
        </div>
        <div class="head-userInfo">
          <span class="nickname">首席可爱执行官</span>
          <p class="headline">
            躲起来的星星也在努力发光<span class="datetime"><i class="dot">·</i>1小时前</span>
          </p>
        </div>
        <div class="head-r">
          <button class="follow-btn">
            <i class="iconfont">&#xe64d;</i>关注
          </button>
        </div>
      </div>
      <div class="PostItem-body">
        <div class="content-row">
          <div class="content-box">
            <span>时间并没有改变人生的属性
              但是它给了我们再来一次的念想
              再见，2020
              未来不一定会更好，但是 2021 一定是你我新的篇章
              愿你我不再负重前行，轻装简从</span>
          </div>
        </div>
        <div class="image-row">
          <div class="image-box col-3">
            <div class="image-item">
              <img src="http://zzy19.cn/ms1.jpg">
            </div>
            <div class="image-item">
              <img src="http://zzy19.cn/ms2.jpg">
            </div>
            <div class="image-item">
              <img src="http://zzy19.cn/ms3.jpg">
            </div>
            <div class="image-item">
              <img src="http://zzy19.cn/ms4.jpg">
            </div>
          </div>
        </div>
        <div class="topic-row">
          <div class="topic-box">
            <span class="topic-item"><i class="iconfont">&#xe8b1;</i>分享美食</span>
          </div>
        </div>
        <div class="operate-row">
          <div class="operate-wrap">
            <button class="operate-btn">
              <i class="iconfont">&#xe61f;</i>
              喜欢
            </button>
            <button class="operate-btn">
              <i class="iconfont">&#xe655;</i>
              评论
            </button>
            <button class="operate-btn">
              <i class="iconfont">&#xe635;</i>
              转发
            </button>
          </div>
        </div>
      </div>
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
.PostItem {
  width: 100%;
  .PostItem-inner {
    padding: 15px 20px 10px 20px;
    border-bottom: 1px solid $color-gray-line-s;
    .PostItem-head {
      display: flex;
      height: 40px;
      align-items: center;
      .head-avatar {
        width: 40px;
        height: 40px;
        margin-right: 15px;
        cursor: pointer;
        .avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
      }
      .head-userInfo {
        flex: 1;
        line-height: 20px;
        .nickname {
          display: block;
          font-size: 15px;
          font-weight: bold;
          color: $color-black;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        .headline {
          font-size: 14px;
          color: $color-gray-text-s;
          // max-width: 180px;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap
          .datetime {
            margin-left: 8px;
            .dot {
              padding-right: 8px;
            }
          }
        }
      }
      .head-r {
        .follow-btn {
          width: 70px;
          height: 30px;
          font-size: 14px;
          color: $color-gray-text;
          background-color: $color-gray-bg;
          border-radius: 3px;
          transition: $animation;
          &:hover {
            color: $color-main;
            background-color: $color-main-o;
          }
        }
      }
    }
    .PostItem-body {
      .content-row {
        margin: 10px 80px 10px 55px;
        .content-box {
          font-size: 15px;
          line-height: 24px;
          color: $color-gray-text;
          overflow: hidden;
          white-space: pre-line;
        }
      }
      .image-row {
        margin: 0 80px 10px 55px;
        .image-box {
          display: flex;
          flex-wrap: wrap;
          width: 300px;
          .image-item {
            margin: 6px 6px 0 0;
            img {
              width: 100%;
              height: 100%;
              border-radius: 3px;
              object-fit: cover;
              cursor: zoom-in;
            }
          }
        }
        .col-1 {
          .image-item {
            width: 200px;
            height: 200px;
          }
        }
        .col-3 {
          .image-item {
            width: 110px;
            height: 110px;
          }
        }
      }
      .topic-row {
        margin: 0 80px 10px 55px;
        .topic-box {
          display: flex;
          height: 30px;
          .topic-item {
            color: $color-gray;
            line-height: 30px;
            border-radius: 3px;
            padding: 0 8px;
            background-color: $color-gray-bg;
            cursor: pointer;
            &:hover {
              background-color: $color-gray-bg-hover;
            }
            i {
              padding-right: 3px;
            }
          }
        }
      }
      .operate-row {
        margin: 0 80px 0 55px;
        .operate-wrap {
          display: flex;
          align-items: center;
          .operate-btn {
            color: $color-gray-text;
            padding: 0 8px;
            font-size: 14px;
            line-height: 35px;
            margin-right: 10px;
            transition: $animation;
            &:hover {
              color: $color-main
            }
          }
          .operate-btn-bg {
            height: 35px;
            padding: 0 16px;
            border-radius: 3px;
            margin-right: 20px;
            background-color: $color-gray-bg;
            &:hover {
              color: $color-white;
              background-color: $color-main;
            }
          }
        }
      }
    }
  }
}
</style>
