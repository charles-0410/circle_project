<template>
  <div class="PostItem">
    <div class="PostItem-inner">
      <div class="PostItem-head">
        <div
          class="head-avatar"
          @mouseenter="showProfileCard(post.user.userId)"
          @mouseleave="changeShowProfileCard(false)"
        >
          <img :src="post.user.avatar_url" class="avatar-image" />
          <ProfileCard :isShow="isShowProfileCard" :data="profileData" />
          <div
            class="ani-spread"
            :class="post.user.userId === 'charles' ? 'ani-spread-run' : ''"
          />
        </div>
        <div class="head-userInfo">
          <span class="nickname">{{ post.user.nickName }}</span>
          <p class="headline">
            躲起来的星星也在努力发光
            <span class="datetime">
              <i class="dot">·</i>
              {{ new Date(post.createdAt).toLocaleTimeString() }}
            </span>
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
            <span>{{ post.content }}</span>
          </div>
        </div>
        <div class="image-row">
          <div
            class="image-box"
            :class="post.images.length > 1 ? 'col-3' : 'col-1'"
          >
            <div
              class="image-item"
              v-for="(item, index) in post.images"
              :key="index"
            >
              <img :src="item" />
            </div>
          </div>
        </div>
        <div class="topic-row">
          <div class="topic-box">
            <span class="topic-item">
              <i class="iconfont">&#xe8b1;</i>{{ post.topic.title }}
            </span>
          </div>
        </div>
        <div class="operate-row">
          <div class="operate-wrap">
            <button class="operate-btn">
              <i class="iconfont">&#xe61f;</i>
              喜欢
            </button>
            <button class="operate-btn" @click="handleShowComment">
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
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ProfileCard from './ProfileCard.vue'
import { findUserInfoByUserid } from '../api/users'

export default defineComponent({
  components: {
    ProfileCard,
  },
  props: {
    post: {
      type: Object,
    },
  },
  setup() {
    const store = useStore()
    const isShowProfileCard = ref(false)
    const changeShowProfileCard = (flag: boolean) => {
      isShowProfileCard.value = flag
    }
    const profileData = ref<object>({})
    const showProfileCard = (userId: string) => {
      changeShowProfileCard(true)
      // 判断是否已经请求过用户信息数据(避免频繁重复请求)
      if (profileData.value) {
        const arr = Object.getOwnPropertyNames(profileData.value)
        if (arr.length !== 0) {
          return false
        }
      }
      // 请求用户信息数据
      findUserInfoByUserid(userId).then((res) => {
        console.log(res)
        const result = res.data
        if (result && result.code === 200) {
          profileData.value = result.data
        }
      })
    }
    const handleShowComment = () => {
      store.commit('changeCommentFlag', true)
    }
    return {
      isShowProfileCard,
      changeShowProfileCard,
      handleShowComment,
      showProfileCard,
      profileData,
    }
  },
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
        position: relative;
        width: 40px;
        height: 40px;
        margin-right: 15px;
        cursor: pointer;
        .avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
        .ani-spread {
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
          line-height: 22px;
          color: $color-gray;
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
            color: $color-gray-text;
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
              color: $color-main;
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
