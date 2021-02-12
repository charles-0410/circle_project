<template>
  <div class="Loader">
    <div class="Loader-mask"></div>
    <div class="Loader-main">
      <div class="Loader-icon">
        <i class="iconfont">&#xe8fc;</i>
      </div>
      <div class="Loader-text">疯狂加载中...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.Loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 199;
  display: flex;
  justify-content: center;
  align-items: center;
  .Loader-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(26, 26, 26, 0.7);
  }
  .Loader-main {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    z-index: 1;
    color: $color-white;
    .Loader-icon {
      width: 40px;
      height: 40px;
      animation: rotate 1s linear infinite;
      i {
        display: block;
        height: 40px;
        line-height: 42px;
        font-size: 40px;
      }
    }
    .Loader-text {
      margin-top: 20px;
      font-size: 16px;
    }
  }
}
</style>
