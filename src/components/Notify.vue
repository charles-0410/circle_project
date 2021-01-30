<template>
  <transition name="slide-fade">
    <div v-if="notifyFlag" class="Notify">
      <div class="Notify-item success">
        <div class="Notify-content">
          成功拉~
        </div>
      </div>
    </div>
  </transition>
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
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.Notify {
  margin: 10px auto;
  width: 350px;
  .Notify-item {
    width: 100%;
    height: 40px;
    .Notify-content {
      text-align: center;
    }
  }
  .success {
    background: green;
  }
}
</style>
