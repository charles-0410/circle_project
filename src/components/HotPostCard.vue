<template>
  <div class="HotPostCard">
    <div class="HotPostCard-inner">
      <h3 class="HotPostCard-title">
        <i class="iconfont">&#xe67b;</i>热门帖子
      </h3>
      <ul class="HotPostCard-list">
        <li class="HotPostCard-item">
          <div class="item-content">
            <p>时间并没有改变人生的属性 但是它给了我们再来一次的念想 再见，2020 未来不一定会更好，但是 2021 一定是你我新的篇章 愿你我不再负重前行，轻装简从</p>
          </div>
          <div class="item-image">
            <img src="http://zzy19.cn/ms2.jpg">
          </div>
        </li>
        <li class="HotPostCard-item">
          <div class="item-content">
            <p>时间并没有改变人生的属性 但是它给了我们再来一次的念想 再见，2020 未来不一定会更好，但是 2021 一定是你我新的篇章 愿你我不再负重前行，轻装简从</p>
          </div>
          <div class="item-image">
            <img src="http://zzy19.cn/ms1.jpg">
          </div>
        </li>
        <li class="HotPostCard-item">
          <div class="item-content">
            <p>时间并没有改变人生的属性 但</p>
          </div>
          <div class="item-image">
            <img src="http://zzy19.cn/ms3.jpg">
          </div>
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

.HotPostCard {
  margin-top: 10px;
  .HotPostCard-inner {
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
  }
}
</style>
