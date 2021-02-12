<template>
  <div>
    <Header />
    <div class="main" ref="Main">
      <div class="main-wrap">
        <div class="mainColumn">
          <div class="mainColumnCard shadow">
            <div class="TabCard">
              <ul class="TabsList">
                <li class="active">推荐</li>
                <li>关注</li>
                <li>热榜</li>
              </ul>
              <div class="TabCard-r">
                <button class="TabCard-refresh">
                  <i class="iconfont">&#xe659;</i>
                </button>
                <button class="TabCard-btn" @click="changeEditFlag(true)">
                  <i class="iconfont">&#xe628;</i>
                  发表
                  <div class="ani-spread" />
                </button>
              </div>
            </div>
            <div class="PostList-wrap">
              <PostList :isLoadMore="isLoadMore" />
            </div>
          </div>
        </div>
        <div class="sideBar" ref="SideBar">
          <div class="userInfoCard shadow">
            <Profile />
          </div>
          <div class="hotPostCard shadow">
            <HotPostCard />
          </div>
          <div class="noticeCard shadow">
            <NoticeCard />
          </div>
        </div>
      </div>
    </div>
    <EditPopup
      :is-show="isShowEditPopup"
      @handleClose="changeEditFlag(false)"
    />
    <ImageView
      :is-show="isShowImageView"
      @handleClose="changeImageViewFlag(false)"
    />
    <CommentPopup />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, inject } from 'vue'
import { useStore } from 'vuex'
import Header from '../components/Header.vue'
import PostList from '../components/PostList.vue'
import Profile from '../components/Profile.vue'
import HotPostCard from '../components/HotPostCard.vue'
import NoticeCard from '../components/NoticeCard.vue'
import EditPopup from '../components/EditPopup.vue'
import ImageView from '../components/ImageView.vue'
import CommentPopup from '../components/CommentPopup.vue'
import { fetchPosts } from '../api/posts'

export default defineComponent({
  components: {
    Header,
    PostList,
    Profile,
    HotPostCard,
    NoticeCard,
    EditPopup,
    ImageView,
    CommentPopup,
  },
  setup() {
    const store = useStore()
    const Alert = inject('Alert')

    const isLogin = computed(() => store.state.user.isLogin)
    const isShowEditPopup = ref<boolean>(false)
    const changeEditFlag = (flag: boolean) => {
      isShowEditPopup.value = flag
    }
    const isShowImageView = ref<boolean>(false)
    const changeImageViewFlag = (flag: boolean) => {
      isShowImageView.value = flag
    }
    const _fetchPosts = () => {
      store.commit('setLoading', true)
      fetchPosts()
        .then((res) => {
          const result = res.data
          if (result && result.code === 200) {
            const list = result.data.list
            store.commit('addPosts', list)
            Alert({
              type: 'success',
              msg: `已为您推荐了 ${list.length} 条帖子`,
            })
          }
          store.commit('setLoading', false)
        })
        .catch((err) => {
          store.commit('setLoading', false)
        })
    }
    // 处理侧边栏定位问题
    const SideBar = ref<HTMLElement | null>(null)
    const setSideBar = () => {
      const w = window.innerWidth
      const right = (w - 910) / 2
      if (SideBar.value) {
        SideBar.value.style.right = right - 3 + 'px'
      }
    }
    // 计算 scroll 位置加载更多帖子
    const isLoadMore = ref<boolean>(false)
    const Main = ref<HTMLElement | null>(null)
    let canLoadMore = true
    const scrollToAddPosts = () => {
      if (Main.value) {
        const scrollH = Main.value.scrollHeight
        const scrollY = window.scrollY
        const diff = scrollH - scrollY
        // 803 到底
        if (diff < 950 && canLoadMore === true) {
          console.log('触发加载更多帖子')
          isLoadMore.value = true
          loadMorePost()
          canLoadMore = false
        }
      }
    }
    // 加载更多帖子
    const loadMorePost = () => {
      let page = store.state.postCurrentPage
      page++
      fetchPosts(page).then((res) => {
        console.log(res)
        const result = res.data
        if (result && result.code === 200) {
          const posts = result.data.list
          store.commit('addPosts', posts)
          store.commit('changePostCurrentPage', page)
          isLoadMore.value = false
          canLoadMore = true
        }
      })
    }
    onMounted(() => {
      _fetchPosts()
      setSideBar()
      window.addEventListener('resize', () => {
        setSideBar()
      })
      document.addEventListener('scroll', () => {
        scrollToAddPosts()
      })
    })
    return {
      isLogin,
      isShowEditPopup,
      changeEditFlag,
      isShowImageView,
      changeImageViewFlag,
      SideBar,
      setSideBar,
      Main,
      isLoadMore,
    }
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.main {
  padding-top: 52px;
  .main-wrap {
    display: flex;
    width: 910px;
    margin: 10px auto;
    .mainColumn {
      .mainColumnCard {
        width: 600px;
        margin-right: 310px;
        .TabCard {
          display: flex;
          border-bottom: 1px solid $color-gray-line-s;
          .TabsList {
            flex: 1;
            display: flex;
            li {
              margin: 0 16px;
              height: 50px;
              line-height: 50px;
              color: $color-black;
              font-size: 15px;
              cursor: pointer;
            }
            .active {
              color: $color-main;
            }
          }
          .TabCard-r {
            display: flex;
            align-items: center;
            margin-right: 10px;
            .TabCard-btn {
              position: relative;
              width: 90px;
              height: 40px;
              font-size: 14px;
              line-height: 40px;
              text-align: center;
              color: $color-white;
              border-radius: 20px;
              background-color: $color-main;
              transition: $animation;
              &:hover {
                background-color: $color-main-hover;
                .ani-spread {
                  animation: spread 0.6s linear;
                }
              }
            }
            .TabCard-refresh {
              width: 40px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              color: $color-gray-text;
              border-radius: 20px;
              margin-right: 6px;
              background-color: $color-gray-bg-hover;
              transition: $animation;
              i {
                font-size: 18px;
              }
              &:hover {
                color: $color-main;
                background-color: $color-main-o;
              }
            }
          }
        }
        .PostList-wrap {
          min-height: 500px;
        }
      }
    }
    .sideBar {
      position: fixed;
      top: 62px;
      right: 0;
      z-index: 1;
      width: 300px;
    }
  }
}
</style>
