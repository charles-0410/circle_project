<template>
  <div class="Modal-wrapper">
    <div class="Modal-backMask"></div>
    <div class="Modal">
      <div class="Modal-closeButton" @click="handleClose">
        <i class="iconfont">&#xe654;</i>
      </div>
      <div class="Modal-inner">
        <div class="ModifyUserInfo">
          <h3 class="ModifyUserInfo-title">编辑个人资料</h3>
          <div class="ModifyUserInfo-body">
            <div class="userInfo-avatar">
              <img src="http://zzy19.cn/tx2.png" class="Avatar" />
              <div class="userInfo-avatar-btn">
                <i class="iconfont">&#xe606;</i>
              </div>
            </div>
            <div class="ModifyUserInfo-main">
              <div class="ModifyUserInfo-form">
                <div class="form-row">
                  <div class="row-label">用户ID：</div>
                  <div class="row-main">
                    <div class="fixed-input">charles0410</div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="row-label">昵称：</div>
                  <div class="row-main">
                    <div class="fixed-input">首席可爱执行官</div>
                  </div>
                  <div class="row-btn">
                    <button class="modifyBtn">修改</button>
                  </div>
                </div>
                <div class="form-row">
                  <div class="row-label">个性签名：</div>
                  <div class="row-main">
                    <!-- <div class="fixed-input">躲起来的星星也在努力发光</div> -->
                    <input
                      type="text"
                      value="躲起来的星星也在努力发光"
                      class="row-input"
                    />
                  </div>
                  <div class="row-btn">
                    <!-- <button class="modifyBtn">修改</button> -->
                    <button class="modifyBtn defindBtn">确定</button>
                  </div>
                </div>
                <!-- <div class="form-row">
                  <div class="row-label">用户封面：</div>
                  <div class="row-main">
                    <div class="userCover">
                      <img
                        src="http://zzy19.cn/14.jpg"
                        class="userCover-image"
                      />
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="ModifyUserInfo-fotter">
              <button class="ModifyUserInfo-submit">确定修改</button>
            </div>
          </div>
        </div>
        <Loading v-if="false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Loading from './Loading.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: {
    Loading,
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.ModifyUserInfo {
  width: 600px;
  height: 400px;
  padding: 15px;
  box-sizing: border-box;
  .ModifyUserInfo-title {
    color: $color-gray-text;
    font-size: 18px;
    line-height: 30px;
    padding: 5px 10px;
  }
  .ModifyUserInfo-body {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    padding: 0 30px;
    .userInfo-avatar {
      position: absolute;
      top: 0;
      left: 30px;
      width: 80px;
      height: 80px;
      .userInfo-avatar-btn {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(25, 25, 25, 0.7);
        border-radius: 3px;
        transition: $animation;
        user-select: none;
        cursor: pointer;
        i {
          font-size: 36px;
          color: $color-white;
        }
      }
      &:hover {
        .userInfo-avatar-btn {
          opacity: 1;
        }
      }
    }
    .ModifyUserInfo-main {
      margin-left: 100px;
      width: 100%;
      height: 250px;
      .ModifyUserInfo-form {
        padding: 0 10px;
        .form-row {
          display: flex;
          position: relative;
          min-height: 30px;
          margin-bottom: 10px;
          font-size: 15px;
          .row-label {
            width: 80px;
            line-height: 30px;
            font-weight: bold;
            color: $color-gray-text;
          }
          .row-main {
            flex: 1;
            .fixed-input {
              padding: 5px 10px;
              color: $color-black;
              line-height: 20px;
            }
            .row-input {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              padding-left: 10px;
              border: 1px solid $color-main;
              border-radius: 3px;
              color: $color-black;
              font-size: 14px;
            }
            .userCover {
              width: 100%;
              height: 100px;
              box-sizing: border-box;
              padding: 5px 50px 0 10px;
              .userCover-image {
                width: 100%;
                height: 100%;
                border-radius: 3px;
                cursor: pointer;
              }
            }
          }
          .row-btn {
            width: 40px;
            margin-left: 10px;
            .modifyBtn {
              width: 40px;
              height: 24px;
              line-height: 24px;
              color: $color-main;
              margin: 3px 0;
              background-color: $color-main-o;
              border-radius: 3px;
              transition: $animation;
            }
            .defindBtn {
              color: $color-white;
              background-color: $color-main;
              &:hover {
                background-color: $color-main-hover;
              }
            }
          }
        }
      }
    }
    .ModifyUserInfo-fotter {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      .ModifyUserInfo-submit {
        padding: 10px 20px;
        line-height: 20px;
        color: $color-white;
        background-color: $color-main;
        border-radius: 3px;
        transition: $animation;
        &:hover {
          background-color: $color-main-hover;
        }
      }
    }
  }
}
</style>
