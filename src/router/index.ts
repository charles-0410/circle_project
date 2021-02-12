import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import { findUserInfoByToken } from '../api/users'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiredLogin: true,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        redirectAlreadyLogin: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    const token = store.state.token || localStorage.getItem('circleToken')
    if (token) {
      findUserInfoByToken(token).then((res) => {
        if (res.data && res.data.code === 200) {
          const userInfo = res.data.data.user
          store.commit('changeUserInfo', userInfo)
          next()
        } else {
          next('login')
        }
      })
    } else {
      next('login')
    }
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
