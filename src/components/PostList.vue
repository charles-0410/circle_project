<template>
  <div class="PostList">
    <PostItem />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostItem from './PostItem.vue'

export default defineComponent({
  components: {
    PostItem
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';

</style>
