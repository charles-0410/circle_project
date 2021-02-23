<template>
  <div class="PostList">
    <div v-if="posts.length > 0">
      <PostItem :post="item" v-for="item in posts" :key="item._id" />
    </div>
    <div class="PostList-empty" v-else>
      <div class="empty-text">
        <i class="iconfont">&#xe60f;</i>
        暂无帖子
      </div>
    </div>
    <Loading v-show="isLoading" />
    <div class="LoadMore" v-show="isLoadMore">
      <div class="LoadMore-inner">
        <div class="LoadMore-tips">
          <div class="Loading-icon">
            <i class="iconfont">&#xe8fc;</i>
          </div>
          <p class="LoadMore-text">帖子加载中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import PostItem from './PostItem.vue'
import Loading from './Loading.vue'

export default defineComponent({
  props: {
    isLoadMore: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore()
    const posts = computed(() => store.state.postList)

    return {
      posts,
    }
  },
  components: {
    PostItem,
    Loading,
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.PostList {
  position: relative;
  .PostList-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 1000px;
    .empty-text {
      color: $color-gray-text;
      font-size: 16px;
    }
  }
  .LoadMore {
    .LoadMore-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 0;
      .LoadMore-tips {
        display: flex;
        .Loading-icon {
          width: 30px;
          height: 30px;
          line-height: 30px;
        }
        .LoadMore-text {
          flex: 1;
          color: $color-gray-text;
          font-size: 14px;
          line-height: 30px;
          padding-left: 8px;
        }
      }
    }
  }
}
</style>
