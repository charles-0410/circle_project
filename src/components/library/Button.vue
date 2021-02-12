<template>
  <button class="btn" :class="btnCls">
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'm',
    },
  },
  setup(prop) {
    const btnColor = {
      primary: 'btn-primary',
      danger: 'btn-danger',
    }
    const btnSize = {
      s: 'btn-s',
      m: 'btn-m',
      b: 'btn-b',
    }
    const btnCls = computed(() => {
      return `${btnColor[prop.type]} ${btnSize[prop.size]}`
    })
    return {
      btnCls,
    }
  },
})
</script>

<style scoped lang="scss">
@import '../../util/style/variable.scss';
.btn {
  margin-top: 100px;
  width: 100px;
  height: 40px;
  color: #fff;
  border-radius: 3px;
}
.btn-primary {
  background: $color-main;
}
.btn-danger {
  background: red;
}
.btn-s {
  width: 50px;
  height: 24px;
}
.btn-m {
  width: 90px;
  height: 35px;
}
.btn-b {
  width: 110px;
  height: 40px;
}
</style>
