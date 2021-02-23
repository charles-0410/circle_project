<template>
  <div class="RedbagPanel" v-if="isShow">
    <div class="RedbagPanel-inner">
      <button class="RedbagPanel-closeBtn" @click="handleClosePanel">
        <i class="iconfont">&#xe654;</i>
      </button>
      <h3 class="RedbagPanel-title">设置红包</h3>
      <div class="RedbagPanel-row">
        <div class="row-label">金额</div>
        <input
          type="text"
          class="row-input input-r"
          onkeyup="this.value=/^[0-9]*\.?[0-9]{0,2}$/.test(this.value) ? this.value : this.value.substring(0,this.value.length-1)"
          placeholder="0.00"
          v-model="redbagData.amount"
        />
        <span class="row-text">元</span>
      </div>
      <div class="RedbagPanel-row">
        <div class="row-label">留言</div>
        <input
          type="text"
          class="row-input input-r"
          placeholder="恭喜发财, 大吉大利"
          v-model="redbagData.message"
        />
      </div>
      <div class="RedbagPanel-amount">
        <span class="Symbol">￥</span>{{ formatAmount(redbagData.amount) }}
      </div>
      <div class="RedbagPanel-footer">
        <button class="RedbagPanel-submit">塞钱进红包</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const redbagData = reactive({
      amount: null,
      message: '',
    })
    // 控制展示
    const isShow = ref<boolean>(false)
    const changeShowFlag = (flag: boolean) => {
      isShow.value = flag
    }
    // 关闭面板
    const handleClosePanel = () => {
      changeShowFlag(false)
    }
    // 打开面板
    const handleOpenPanel = () => {
      changeShowFlag(true)
    }
    // 转换金额格式
    const formatAmount = (num: number) => {
      num = Number(num)
      return num.toFixed(2)
    }
    return {
      isShow,
      redbagData,
      formatAmount,
      changeShowFlag,
      handleOpenPanel,
      handleClosePanel,
    }
  },
})
</script>

<style scoped lang="scss">
@import '../../util/style/variable.scss';
.RedbagPanel {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: rgba(25, 25, 25, 0.7);
  .RedbagPanel-inner {
    position: relative;
    width: 300px;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 12px 15px;
    box-shadow: $shadow-d;
    background-color: $color-white;
    border: 2px solid $color-error;
    .RedbagPanel-closeBtn {
      position: absolute;
      top: 8px;
      right: -30px;
      width: 30px;
      height: 30px;
      border-radius: 0 50% 50% 0;
      color: $color-white;
      background-color: $color-error;
      border: 2px solid $color-error;
      &:hover {
        i {
          transform: rotate(90deg);
        }
      }
      i {
        font-size: 22px;
      }
    }
    .RedbagPanel-title {
      color: $color-error;
      font-size: 16px;
      line-height: 30px;
      margin-bottom: 10px;
    }
    .RedbagPanel-row {
      display: flex;
      flex-wrap: nowrap;
      min-height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: $color-gray-text;
      padding: 0 10px;
      margin-bottom: 10px;
      border-radius: 3px;
      background-color: $color-gray-bg;
      .row-label {
        text-align: center;
        padding-right: 10px;
      }
      .row-input {
        flex: 1;
        color: $color-gray-text;
        font-size: 14px;
        line-height: 40px;
        background-color: $color-gray-bg;
        &.input-r {
          text-align: right;
        }
      }
      .row-text {
        // display: ;
        text-align: center;
        padding-left: 10px;
      }
    }
    .RedbagPanel-amount {
      text-align: center;
      font-size: 28px;
      line-height: 40px;
      margin-bottom: 6px;
      .Symbol {
        font-size: 18px;
        margin-right: 2px;
      }
    }
    .RedbagPanel-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      .RedbagPanel-submit {
        width: 120px;
        line-height: 40px;
        color: $color-white;
        background-color: $color-error;
        border-radius: 3px;
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
}
</style>
