<template>
  <div class="NoticeCard">
    <div class="NoticeCard-inner">
      <h3 class="NoticeCard-title">
        <i class="iconfont">&#xe8c4;</i>公告栏
      </h3>
      <ul class="NoticeCard-list">
        <li class="NoticeCard-item">
          <i class="iconfont">&#xe680;</i>
          <p class="item-content">
            本项目于 2021.01.30 开始开发
          </p>
        </li>
        <li class="NoticeCard-item">
          <i class="iconfont">&#xe680;</i>
          <p class="item-content">
            前端技术栈：Vue3.0全家桶 + Vite + TypeScript + Sass + Axios
          </p>
        </li>
        <li class="NoticeCard-item">
          <i class="iconfont">&#xe680;</i>
          <p class="item-content">
            后端技术栈：Node + Koa2 + Mongoose + Redis + MongoDB
          </p>
        </li>
        <li class="NoticeCard-item">
          <i class="iconfont">&#xe680;</i>
          <p class="item-content">
            当前版本：0.0.2（开发阶段）
          </p>
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

.NoticeCard {
  margin-top: 10px;
  .NoticeCard-inner {
    padding: 10px 12px;
    .NoticeCard-title {
      font-size: 15px;
      line-height: 20px;
      margin-top: 5px;
      i {
        color: $color-error;
        padding-right: 5px;
      }
    }
    .NoticeCard-list {
      margin-top: 8px;
      .NoticeCard-item {
        position: relative;
        min-height: 20px;
        padding: 5px 0 5px 30px;
        i {
          display: inline-block;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 30px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          text-align: center;
          color: $color-gray-text;
        }
        .item-content {
          line-height: 20px;
          color: $color-gray-text;
        }
      }
    }
  }
}
</style>
