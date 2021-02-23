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
              {{ formatTime(post.createdAt) }}
            </span>
          </p>
        </div>
        <div class="head-r">
          <button
            class="follow-btn"
            v-if="!post.isFollow"
            @click="handleFollowUser(post.user._id)"
          >
            <i class="iconfont">&#xe64d;</i>关注
          </button>
          <button
            class="follow-btn isFollow"
            v-else
            @click="handleUnFollowUser(post.user._id)"
          >
            已关注
          </button>
        </div>
      </div>
      <div class="PostItem-body">
        <div class="content-row">
          <div class="content-box">
            <span>{{ post.content }}</span>
          </div>
        </div>
        <div class="image-row" v-show="post.images.length > 0">
          <div
            class="image-box"
            :class="post.images.length > 1 ? 'col-3' : 'col-1'"
          >
            <div
              class="image-item"
              v-for="(item, index) in post.images"
              :key="index"
              @click="handleScaleImage(index)"
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
            <button
              class="operate-btn"
              v-if="!post.isLiking"
              @click="handleLikingPost(post._id)"
            >
              <i class="iconfont">&#xe61f;</i>
              点赞 {{ post.likingCount > 0 ? post.likingCount : '' }}
            </button>
            <button
              class="operate-btn isLiking"
              v-else
              @click="handleUnLikingPost(post._id)"
            >
              <i class="iconfont">&#xe663;</i>
              已赞 {{ post.likingCount > 0 ? post.likingCount : '' }}
            </button>
            <button class="operate-btn" @click="handleShowComment(post._id)">
              <i class="iconfont">&#xe655;</i>
              评论 {{ post.CommentCount > 0 ? post.CommentCount : '' }}
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
import { defineComponent, ref, inject } from 'vue'
import { useStore } from 'vuex'
import { UserInfo } from '../store'
import ProfileCard from './ProfileCard.vue'
import { formatMsgTime } from '../util/js/formatTime'
import {
  findUserInfoByUserid,
  followUser,
  unFollowUser,
  likingPost,
  unLikingPost,
} from '../api/users'

export default defineComponent({
  components: {
    ProfileCard,
  },
  props: {
    post: {
      type: Object,
    },
  },
  setup(prop) {
    const store = useStore()
    const Alert = inject('Alert')
    const isShowProfileCard = ref(false)
    const changeShowProfileCard = (flag: boolean) => {
      isShowProfileCard.value = flag
    }
    const profileData = ref<UserInfo | null>(null)
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
          const userInfo = result.data.userInfo
          userInfo.isFollow = result.data.isFollow
          profileData.value = userInfo
        }
      })
    }
    const handleShowComment = (postId: string) => {
      store.commit('changeCommentFlag', true)
      store.commit('changeCurrentPostId', postId)
    }
    const handleScaleImage = (index: number) => {
      store.commit('setScalePic', {
        index,
        list: prop.post?.images,
        isShow: true,
      })
    }
    // 关注用户
    const handleFollowUser = (userId: string) => {
      const myId = store.state.user._id
      if (userId === myId) {
        Alert({ type: 'error', msg: '不可以关注自己！' })
        return
      }
      followUser(userId)
        .then((res) => {
          if (res.status === 204) {
            if (profileData.value?._id === userId) {
              profileData.value.isFollow = true
            }
            store.commit('changeFollowStatus', { userId, isFollow: true })
            Alert({ type: 'success', msg: '关注成功！' })
          }
        })
        .catch((err) => {
          Alert({ type: 'error', msg: '关注失败，请重试！' })
        })
    }
    // 取消关注用户
    const handleUnFollowUser = (userId: string) => {
      unFollowUser(userId)
        .then((res) => {
          if (res.status === 204) {
            if (profileData.value?._id === userId) {
              profileData.value.isFollow = false
            }
            store.commit('changeFollowStatus', { userId, isFollow: false })
            Alert({ type: 'success', msg: '取消关注成功！' })
          }
        })
        .catch((err) => {
          Alert({ type: 'error', msg: '取消关注失败，请重试！' })
        })
    }
    // 点赞帖子
    const handleLikingPost = (postId: string) => {
      likingPost(postId)
        .then((res) => {
          if (res.status === 204) {
            store.commit('changeLikingStatus', { postId, isLiking: true })
            Alert({ type: 'success', msg: '点赞成功！' })
          }
        })
        .catch((err) => {
          Alert({ type: 'error', msg: '点赞失败！' })
        })
    }
    // 取消点赞帖子
    const handleUnLikingPost = (postId: string) => {
      unLikingPost(postId)
        .then((res) => {
          if (res.status === 204) {
            store.commit('changeLikingStatus', { postId, isLiking: false })
            Alert({ type: 'success', msg: '取消点赞成功！' })
          }
        })
        .catch((err) => {
          Alert({ type: 'success', msg: '取消点赞失败！' })
        })
    }
    // 格式化时间
    const formatTime = (time: Date) => {
      return formatMsgTime(time)
    }
    return {
      isShowProfileCard,
      changeShowProfileCard,
      handleShowComment,
      showProfileCard,
      profileData,
      handleScaleImage,
      handleFollowUser,
      handleUnFollowUser,
      handleLikingPost,
      handleUnLikingPost,
      formatTime,
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
          &.isFollow {
            color: $color-white;
            background-color: $color-main;
            &:hover {
              background-color: $color-error;
            }
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
            min-width: 64px;
            padding: 0 8px;
            font-size: 14px;
            line-height: 35px;
            margin-right: 10px;
            transition: $animation;
            &:hover {
              color: $color-main;
            }
            &.isLiking {
              color: $color-error;
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
