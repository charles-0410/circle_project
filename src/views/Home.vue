<template>
  <div>
    <Header />
    <div class="main">
      <div class="main-wrap">
        <div class="mainColumn">
          <div class="mainColumnCard shadow">
            <div class="TabCard">
              <ul class="TabsList">
                <li class="active">
                  推荐
                </li>
                <li>关注</li>
                <li>热榜</li>
              </ul>
              <div class="TabCard-r">
                <button class="TabCard-btn">
                  <i class="iconfont">&#xe628;</i>
                  发表
                </button>
              </div>
            </div>
            <div class="PostList">
              <PostList />
            </div>
          </div>
        </div>
        <div class="sideBar">
          <div class="userInfoCard shadow">
            123
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import Header from '../components/Header.vue'
import PostList from '../components/PostList.vue'

export default defineComponent({
  components: {
    Header,
    PostList
  },
  setup () {
    const store = useStore()
    const isLogin = computed(() => store.state.user.isLogin)
    return {
      isLogin
    }
  }
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
        margin-right: 10px;
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
              width: 90px;
              height: 40px;
              font-size: 14px;
              line-height: 40px;
              text-align: center;
              color: $color-white;
              border-radius: 3px;
              background-color: $color-main;
              transition: $animation;
              &:hover {
                background-color: $color-main-o;
              }
            }
          }
        }
        .PostList {
          display: flex;
          min-height: 500px;
        }
      }
    }
    .sideBar {
      .userInfoCard {
        width: 300px;
        min-height: 400px;
      }
    }
  }
}
</style>
