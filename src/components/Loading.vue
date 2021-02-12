<template>
  <div class="Loading">
    <div class="Loading-icon">
      <i class="iconfont">&#xe8fc;</i>
    </div>
    <div class="Loading-text">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: '拼命加载中...',
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
</style>
