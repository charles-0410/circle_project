<template>
  <div class="Redbag">
    <div class="Redbag-inner ani-scaleIn">
      <div class="Redbag-top">
        <div
          class="Redbag-cover"
          :class="redbagStatus === 2 ? 'Redbag-cover-hidden' : ''"
        >
          <div class="Redbag-cover-inner">
            <div class="Redbag-cover-avatar">
              <div class="avatar-wrap">
                <img
                  src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/dc091106610575951164260e0b55a01c~300x300.image"
                  class="Avatar"
                />
              </div>
            </div>
            <p class="Redbag-cover-title">前端一汁猪 发出的红包</p>
            <p class="Redbag-cover-blessing">恭喜发财，大吉大利！</p>
          </div>
        </div>
        <div class="Redbag-inside">
          <div class="Redbag-inside-luckRedbag"></div>
          <div class="Redbag-inside-noLuckRedbag">
            <div class="noLuckRedbag-inner">
              <div class="noLuckRedbag-avatar">
                <div class="avatar-wrap">
                  <img
                    src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/dc091106610575951164260e0b55a01c~300x300.image"
                    class="Avatar"
                  />
                </div>
              </div>
              <p class="noLuckRedbag-title">前端一汁猪 发出的红包</p>
              <p class="noLuckRedbag-money">200.00<em>元</em></p>
            </div>
          </div>
        </div>
        <button
          class="Redbag-openBtn"
          :class="
            redbagStatus === 1 ? 'ani-spin' : redbagStatus === 2 ? 'hidden' : ''
          "
          @click="handleOpenRedbag"
        >
          開
        </button>
      </div>
      <!-- <button class="Redbag-closeBtn">
        <i class="iconfont">&#xe654;</i>
      </button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    // 红包状态 0.未开 1.正在打开 2.已打开
    const redbagStatus = ref<number>(0)
    const handleOpenRedbag = () => {
      redbagStatus.value = 1
      setTimeout(() => {
        redbagStatus.value = 2
      }, 2000)
    }
    return {
      redbagStatus,
      handleOpenRedbag,
    }
  },
})
</script>

<style scoped lang="scss">
@import '../../util/style/variable.scss';
.Redbag {
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
  .Redbag-inner {
    position: relative;
    width: 260px;
    height: 380px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: $shadow-d;
    background-color: $color-error;
    .Redbag-top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 280px;
      background-color: $color-gold;
      border-radius: 0 0 150px 150px;
      .Redbag-cover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 277px;
        background-color: $color-error;
        border-radius: 0 0 150px 150px;
        transition: $animation;
        &.Redbag-cover-hidden {
          top: -277px;
        }
        .Redbag-cover-inner {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          padding: 50px 15px 10px 15px;
          .Redbag-cover-avatar {
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            .avatar-wrap {
              width: 50px;
              height: 50px;
            }
          }
          .Redbag-cover-title {
            line-height: 20px;
            margin-top: 10px;
            font-size: 15px;
            font-weight: bold;
            color: $color-gold;
          }
          .Redbag-cover-blessing {
            font-size: 15px;
            color: $color-gold;
            margin-top: 40px;
          }
        }
      }
      .Redbag-inside {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 277px;
        background-color: $color-white;
        border-radius: 0 0 150px 150px;
        transition: $animation;
        .Redbag-inside-noLuckRedbag {
          height: 100%;
          .noLuckRedbag-inner {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            padding: 50px 15px 10px 15px;
            box-sizing: border-box;
            .noLuckRedbag-avatar {
              display: flex;
              width: 100%;
              justify-content: center;
              align-items: center;
              .avatar-wrap {
                width: 50px;
                height: 50px;
              }
            }
            .noLuckRedbag-title {
              line-height: 20px;
              margin-top: 10px;
              font-size: 15px;
              font-weight: bold;
              color: $color-black;
            }
            .noLuckRedbag-money {
              position: relative;
              font-size: 32px;
              line-height: 40px;
              margin-top: 30px;
              color: $color-black;
              em {
                position: absolute;
                top: 5px;
                font-size: 16px;
                padding-left: 5px;
              }
            }
          }
        }
      }
      .Redbag-openBtn {
        position: absolute;
        bottom: -40px;
        left: 90px;
        z-index: 2;
        width: 80px;
        height: 80px;
        text-align: center;
        color: $color-error;
        line-height: 80px;
        font-size: 34px;
        // font-weight: bold;
        border-radius: 50%;
        background-color: $color-gold;
        box-shadow: $shadow-d;
        &.hidden {
          display: none;
        }
      }
    }
  }
}
</style>
