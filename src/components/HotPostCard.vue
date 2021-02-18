<template>
  <div class="HotPostCard">
    <div class="HotPostCard-inner">
      <h3 class="HotPostCard-title">
        <i class="iconfont">&#xe67b;</i>热门帖子
      </h3>
      <ul class="HotPostCard-list" v-if="hotPosts">
        <li
          class="HotPostCard-item"
          v-for="(item, index) in hotPosts"
          :key="index"
        >
          <div class="item-content">
            <p>{{ item.content }}</p>
          </div>
          <div class="item-image" v-if="item.images.length > 0">
            <img :src="item.images[0]" />
          </div>
        </li>
      </ul>
      <div class="HotPostCard-empty" v-else>
        <Loading />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Loading from './Loading.vue'

export default defineComponent({
  props: {
    hotPosts: {
      type: Array,
    },
  },
  setup() {
    return {}
  },
  components: {
    Loading,
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';

.HotPostCard {
  margin-top: 10px;
  .HotPostCard-inner {
    position: relative;
    padding: 10px 12px;
    .HotPostCard-title {
      font-size: 15px;
      line-height: 20px;
      margin-top: 5px;
      i {
        color: $color-error;
        padding-right: 5px;
      }
    }
    .HotPostCard-list {
      // margin-top: 10px;
      .HotPostCard-item {
        display: flex;
        height: 50px;
        margin-top: 5px;
        padding: 5px 0;
        border-radius: 3px;
        cursor: pointer;
        transition: $animation;
        &:hover {
          background-color: $color-gray-bg;
        }
        .item-content {
          flex: 1;
          line-height: 20px;
          color: $color-gray-text;
          padding: 0 10px;
          margin: 5px 0;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .item-image {
          width: 50px;
          height: 50px;
          padding-right: 5px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 3px;
          }
        }
      }
    }
    .HotPostCard-empty {
      width: 100%;
      height: 195px;
    }
  }
}
</style>
