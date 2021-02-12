<template>
  <div>
    <div class="alert" :class="isOut === true ? 'ani-out ' + type : '' + type">
      <div class="flex" :class="msg.length > 15 ? 'font-14' : ''">
        {{ msg }}
      </div>
      <!-- <button class="btnCommon" @click="close">确定</button> -->
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  props: {
    type: {
      type: String,
      default: ' success',
    },
    msg: {
      type: String,
      default: '',
    },
    remove: {
      type: Function,
      default: '',
    },
  },
  setup(prop, context) {
    const isOut = ref(false)
    const close = () => {
      // prop.isShow = false
      // context.emit('remove')
    }
    onMounted(() => {
      setTimeout(() => {
        isOut.value = true
      }, 3000)
      setTimeout(() => {
        prop.remove()
      }, 3200)
    })
    return {
      close,
      isOut,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../../../util/style/variable.scss';

@keyframes downIn {
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes upOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-40px);
  }
}
.alert {
  width: 300px;
  height: 30px;
  position: fixed;
  background-color: $color-white;
  border-radius: 3px;
  left: 50%;
  top: 0;
  z-index: 999;
  margin-left: -165px;
  margin-top: 50px;
  padding: 10px 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid transparent;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  animation: downIn 0.2s linear;
  &.success {
    color: $color-main;
    border-left: 4px solid $color-main;
  }
  &.error {
    color: $color-error;
    border-left: 4px solid $color-error;
  }
  &.ani-out {
    animation: upOut 0.3s linear;
  }
  .flex {
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 16px;
    &.font-14 {
      font-size: 14px;
    }
  }
  .btnCommon {
    width: 100px;
    height: 30px;
    color: $color-white;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
    background-color: $color-main;
  }
}
</style>
