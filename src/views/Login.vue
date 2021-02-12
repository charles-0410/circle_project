<template>
  <div class="register">
    <div class="TopBar shadow" :class="isShow === true ? 'ani-top' : ''">
      <div class="TopBar-inner">
        <div class="TopBar-logo">circle</div>
      </div>
    </div>
    <div class="Box shadow" :class="isShow === true ? 'ani-bottom' : ''">
      <div class="Box-inner">
        <h3 class="Box-title">登录圈子</h3>
        <div class="Box-form">
          <div class="Box-form-inner">
            <div class="form-row">
              <div class="row-title">用户名：</div>
              <input
                v-model="formData.userId"
                type="text"
                class="row-input"
                placeholder="请输入用户名"
              />
            </div>
            <div class="form-row">
              <div class="row-title">密码：</div>
              <input
                v-model="formData.password"
                type="password"
                class="row-input"
                placeholder="请输入密码"
              />
            </div>
            <div class="form-row">
              <div class="row-title">验证码：</div>
              <input
                v-model="formData.code"
                type="text"
                class="row-input row-input-code"
                placeholder="请输入验证码"
                maxlength="4"
              />
              <div
                class="codeImage"
                @click="handleGetCaptcha"
                v-html="captchaSVG"
              />
            </div>
            <div class="form-row form-bottom">
              <button class="form-submit" @click="handleSubmit">登录</button>
            </div>
          </div>
        </div>
        <div class="Box-footer">
          <router-link to="/register" class="footer-link">
            没有账号?去注册<i class="iconfont">&#xe601;</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import { getCaptcha, login } from '../api/users'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const Alert = inject('Alert')

    const isShow = ref<boolean>(false)
    const captchaSVG = ref<HTMLElement | null>(null)
    const handleGetCaptcha = () => {
      const sid = store.state.sid
      getCaptcha(sid).then((res) => {
        const result = res.data
        if (result.code === 200) {
          captchaSVG.value = result.data
        }
      })
    }
    onMounted(() => {
      setTimeout(() => {
        isShow.value = true
      }, 200)
      let sid = ''
      if (localStorage.getItem('sid')) {
        sid = localStorage.getItem('sid') || ''
      } else {
        sid = uuidv4()
        localStorage.setItem('sid', sid)
      }
      store.commit('setSid', sid)
      handleGetCaptcha()
    })
    const formData = reactive({
      userId: '',
      password: '',
      code: '',
    })
    const handleSubmit = () => {
      if (
        formData.userId !== '' &&
        formData.password !== '' &&
        formData.code !== ''
      ) {
        login({
          userId: formData.userId,
          password: formData.password,
          code: formData.code,
          sid: store.state.sid,
        })
          .then((res) => {
            const result = res.data
            if (result.code === '200') {
              store.commit('login', result.token)
              console.log(result)
              Alert({
                id: '001',
                type: 'success',
                msg: '登录成功，即将跳转至首页！',
              })
              localStorage.setItem('circleToken', result.token)
              setTimeout(() => {
                router.push('/')
              }, 3400)
            } else {
              Alert({
                id: '001',
                type: 'error',
                msg: `登录失败，${result.msg}！`,
              })
            }
          })
          .catch(() => {
            Alert({
              id: '001',
              type: 'error',
              msg: `登录失败，请重试！`,
            })
          })
      }
    }
    return {
      isShow,
      captchaSVG,
      handleGetCaptcha,
      formData,
      handleSubmit,
    }
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';

.register {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .TopBar {
    position: fixed;
    top: -52px;
    left: 0;
    height: 52px;
    width: 100%;
    transition: $animation;
    .TopBar-inner {
      width: 1020px;
      box-sizing: border-box;
      padding: 0 20px;
      margin: 0 auto;
      .TopBar-logo {
        width: 120px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        color: $color-white;
        font-size: 16px;
        letter-spacing: 1px;
        user-select: none;
        background-color: $color-main;
      }
    }
  }
  .ani-top {
    top: 0px;
  }
  .Box {
    width: 500px;
    // height: 400px;
    opacity: 0;
    transform: translateY(40px);
    transition: $animation;
    .Box-inner {
      padding: 15px 25px;
      box-sizing: border-box;
      .Box-title {
        color: $color-gray-text;
        font-size: 20px;
        line-height: 40px;
      }
      .Box-form {
        margin: 35px 0 15px 0;
        .Box-form-inner {
          padding: 0 30px;
          .form-row {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
            .row-title {
              width: 80px;
              height: 40px;
              line-height: 40px;
              color: $color-gray-text;
              text-align: right;
            }
            .row-input {
              flex: 1;
              height: 40px;
              font-size: 14px;
              line-height: 40px;
              color: $color-black;
              padding: 0 15px;
              margin-right: 40px;
              box-sizing: border-box;
              border-bottom: 1px solid $color-gray-line;
              transition: $animation;
              &:focus {
                border-bottom: 1px solid $color-main;
              }
            }
            .row-input-code {
              max-width: 150px;
            }
            .codeImage {
              position: absolute;
              right: 40px;
              top: 0;
              width: 100px;
              height: 40px;
              background-color: $color-gray-bg;
              border-radius: 3px;
              overflow: hidden;
              cursor: pointer;
            }
          }
          .form-bottom {
            display: flex;
            justify-content: center;
            margin-top: 40px;
            .form-submit {
              width: 120px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              color: $color-white;
              border-radius: 3px;
              background-color: $color-main;
              transition: $animation;
              user-select: none;
              &:hover {
                background-color: $color-main-hover;
              }
            }
          }
        }
      }
      .Box-footer {
        text-align: right;
        padding-right: 15px;
        .footer-link {
          display: inline-block;
          height: 25px;
          line-height: 25px;
          font-size: 14px;
          color: $color-gray-text;
          user-select: none;
          cursor: pointer;
          transition: $animation;
          &:hover {
            text-decoration: underline;
          }
          i {
            line-height: 25px;
          }
        }
      }
    }
  }
  .ani-bottom {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
