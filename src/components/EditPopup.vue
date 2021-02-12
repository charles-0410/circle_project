<template>
  <transition name="fade">
    <div v-show="isShow" class="Modal-wrapper">
      <div class="Modal-backMask" />
      <transition name="slide">
        <div v-show="isShow" class="Modal">
          <div class="Modal-closeButton" @click="handleClose">
            <i class="iconfont">&#xe654;</i>
          </div>
          <div class="Modal-inner">
            <div class="EditPopup-main">
              <h3 class="EditPopup-title">分享新鲜事</h3>
              <div class="EditPopup-body">
                <textarea
                  class="EditPopup-input"
                  v-model="post.content"
                  placeholder="分享点什么..."
                />
                <div
                  :class="
                    isShowImageList === true
                      ? 'imageRow'
                      : 'imageRow imageRow-hide'
                  "
                >
                  <ul class="imageRow-list">
                    <li
                      class="imageRow-item"
                      v-for="(imageUrl, index) in post.sharePicUrlList"
                      :key="index"
                    >
                      <img :src="imageUrl" />
                      <div
                        class="imageItem-delete"
                        @click="handleDeleteImage(index)"
                      >
                        <i class="iconfont">&#xe654;</i>
                      </div>
                    </li>
                    <li
                      class="imageRow-addButton"
                      @click="handleUploadPicClick"
                      v-if="post.sharePicUrlList.length < 4"
                    >
                      <i class="iconfont">&#xe64d;</i>
                    </li>
                  </ul>
                </div>
                <div class="TopicTags">
                  <div class="TopicTags-Tag active">
                    <i class="iconfont">&#xe8b1;</i>
                    <span class="TopicTags-TagName">分享美食</span>
                  </div>
                  <div class="TopicTags-Tag">
                    <i class="iconfont">&#xe8b1;</i>
                    <span class="TopicTags-TagName">分享风景</span>
                  </div>
                  <div class="TopicTags-Tag">
                    <i class="iconfont">&#xe8b1;</i>
                    <span class="TopicTags-TagName">心灵鸡汤</span>
                  </div>
                  <div class="TopicTags-Tag TopicTags-moreButton">
                    <span class="TopicTags-TagName">更多</span>
                    <i class="iconfont">&#xe601;</i>
                  </div>
                </div>
                <div class="ToolsRow">
                  <ul class="ToolsList">
                    <li class="ToolsList-item" @click="handleUploadPic">
                      <i class="iconfont">&#xe75d;</i>
                    </li>
                    <li class="ToolsList-item">
                      <i class="iconfont" style="font-size: 20px">&#xe638;</i>
                    </li>
                    <li class="ToolsList-item">
                      <i class="iconfont">&#xe761;</i>
                    </li>
                  </ul>
                  <button class="sendButton" @click="handleSubmit">
                    发表分享
                  </button>
                </div>
              </div>
              <input
                type="file"
                name="files"
                ref="InputFile"
                style="display: none"
                multiple="multiple"
                @change="imagesChange"
              />
            </div>
            <Loading v-show="isShowLoading" text="正在发布中..." />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, inject, watch } from 'vue'
import { useStore } from 'vuex'
import Loading from './Loading.vue'
import { uploadPic } from '../api/uploadPic'
import { createPost } from '../api/posts'

interface Post {
  content: string
  topic: string
  images: string[]
  sharePicNum: number
  sharePicFileList: object[]
  sharePicUrlList: string[]
}

export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop, context) {
    const store = useStore()
    const Alert = inject('Alert')

    const post = reactive<Post>({
      content: '',
      topic: '600d430b1bd6a64a84a492ba',
      images: [],
      sharePicNum: 0,
      sharePicFileList: [],
      sharePicUrlList: [],
    })
    const handleClose = () => {
      context.emit('handleClose')
    }
    const isShowImageList = ref(false)
    const handleUploadPic = () => {
      isShowImageList.value = !isShowImageList.value
    }
    // 上传图片
    const InputFile = ref<any | null>(null)
    const handleUploadPicClick = () => {
      InputFile.value.click()
    }
    const imagesChange = () => {
      let filesData = InputFile.value.files
      console.log(filesData)
      for (let i = 0; i < filesData.length; i++) {
        // 检查图片文件（格式、大小）
        const isPic =
          filesData[i].type === 'image/jpeg' ||
          filesData[i].type === 'image/jpg' ||
          filesData[i].type === 'image/png'
        const isLt5M = filesData[i].size / 1024 / 1024 < 5
        console.log(filesData[i].type)
        console.log(isLt5M)
        if (!isPic || !isLt5M) {
          Alert({
            type: 'error',
            msg: `第 ${i + 1} 张图片大小或格式有误！`,
          })
          continue
        }
        // 限制只能上传4张图片
        if (post.sharePicNum > 3) {
          Alert({
            type: 'error',
            msg: '最多只能分享 4 张图片！',
          })
          return
        }
        // 添加到图片文件列表
        post.sharePicFileList.push(filesData[i])
        // 转换成url地址用于待上传预览图片
        let reader = new FileReader()
        reader.readAsDataURL(filesData[i])
        reader.onload = function (e: any) {
          // 这里的数据可以使本地图片显示到页面
          post.sharePicUrlList.push(e.target.result)
        }
        // 记录待上传图片数量
        post.sharePicNum++
      }
      console.log(post)
    }
    // 待上传照片删除按钮
    const handleDeleteImage = (index: number) => {
      post.sharePicUrlList.splice(index, 1)
      post.sharePicFileList.splice(index, 1)
      post.sharePicNum--
    }
    // 上传至OSS
    const uploadImages = () => {
      const files = post.sharePicFileList
      if (files.length === 0) {
        return
      }
      let errorNum = 0
      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        uploadPic(file, {
          next(res: any) {
            console.log(res)
          },
          error(err: any) {
            console.log(err)
            errorNum++
          },
          complete(res: any) {
            let imageUrl = 'http://zzy19.cn/' + res.key
            post.images.push(imageUrl)
          },
        })
      }
      errorNum > 0
        ? Alert({
            type: 'error',
            msg: `${errorNum} 张图片上传出错！`,
          })
        : ''
    }
    // 发布
    const isShowLoading = ref<boolean>(false)
    const handleSubmit = () => {
      // 检查必要内容是否为空
      if (post.content == '' || post.topic == '') {
        Alert({
          type: 'error',
          msg: '内容不能为空 & 话题必选',
        })
        return
      }
      isShowLoading.value = true
      // 判断是否附加图片
      if (post.sharePicNum !== 0) {
        uploadImages()
        // 监听图片文件上传完成
        watch(
          () => post.images.length,
          () => {
            if (
              post.images.length === post.sharePicNum &&
              post.sharePicNum !== 0
            ) {
              console.log('ok')
              console.log(post.images)
              // 发布
              handleRelease()
            }
          }
        )
      } else {
        // 发布
        handleRelease()
      }
    }
    const handleRelease = () => {
      // 处理帖子信息
      const postInfo = {
        content: post.content,
        images: post.images,
        topic: post.topic,
        user: store.state.user._id,
      }
      console.log(postInfo)
      createPost(postInfo).then((res) => {
        const result = res.data
        if (result && result.code === 200) {
          const postData = result.data
          successRelease(postData)
        }
      })
    }
    const successRelease = (postData: Object) => {
      // 帖子数据添加进列表中
      store.commit('addPost', postData)
      // 清空编辑器数据
      ;(post.content = ''),
        (post.images = []),
        (post.sharePicNum = 0),
        (post.sharePicFileList = []),
        (post.sharePicUrlList = [])
      // 关闭编辑器
      handleClose()
      // 隐藏加载画面 & 提示发布成功
      isShowLoading.value = false
      Alert({
        type: 'success',
        msg: '发布成功！',
      })
    }
    return {
      post,
      handleClose,
      isShowImageList,
      handleUploadPic,
      isShowLoading,
      handleSubmit,
      InputFile,
      imagesChange,
      handleUploadPicClick,
      handleDeleteImage,
    }
  },
  components: {
    Loading,
  },
})
</script>

<style scoped lang="scss">
@import '../util/style/variable.scss';
.EditPopup-main {
  width: 600px;
  padding: 15px;
  box-sizing: border-box;
  .EditPopup-title {
    display: block;
    height: 40px;
    color: $color-gray-text;
    line-height: 40px;
    font-size: 22px;
    padding-left: 15px;
  }
  .EditPopup-body {
    margin: 10px 15px;
    transition: $animation;
    .EditPopup-input {
      width: 100%;
      height: 120px;
      color: $color-gray-text;
      font-size: 15px;
      resize: none;
    }
    .imageRow-hide {
      height: 0 !important;
    }
    .imageRow {
      transition: $animation;
      height: 130px;
      overflow: hidden;
      .imageRow-list {
        display: flex;
        padding-top: 20px;
        .imageRow-item {
          position: relative;
          width: 110px;
          height: 110px;
          margin-right: 8px;
          border-radius: 3px;
          overflow: hidden;
          cursor: zoom-in;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .imageItem-delete {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 40px;
            height: 40px;
            opacity: 0;
            text-align: center;
            line-height: 40px;
            border-radius: 0 0 0 30px;
            color: $color-white;
            background-color: $color-error;
            transition: $animation;
            user-select: none;
            cursor: pointer;
            i {
              font-size: 22px;
            }
            &:hover {
              top: 0;
              right: 0;
            }
          }
          &:hover {
            .imageItem-delete {
              opacity: 1;
            }
          }
        }
        .imageRow-addButton {
          width: 110px;
          height: 110px;
          line-height: 108px;
          text-align: center;
          box-sizing: border-box;
          border: 1px dashed $color-gray-line-d;
          border-radius: 5px;
          cursor: pointer;
          transition: $animation;
          &:hover {
            border: 1px dashed $color-main;
            i {
              color: $color-main;
            }
          }
          i {
            color: $color-gray-text-s;
            font-size: 22px;
          }
        }
      }
    }
    .TopicTags {
      display: flex;
      margin: 20px 0 10px 0;
      height: 30px;
      .TopicTags-Tag {
        text-align: center;
        line-height: 30px;
        padding: 0 12px;
        margin-right: 10px;
        border-radius: 20px;
        color: $color-gray-text;
        background-color: $color-gray-bg;
        transition: $animation;
        user-select: none;
        cursor: pointer;
        &:hover {
          color: $color-main;
          background-color: $color-main-o;
        }
        &.active {
          color: $color-white;
          background-color: $color-main;
        }
        .TopicTags-TagName {
          padding-left: 3px;
        }
      }
      .TopicTags-moreButton {
        .TopicTags-TagName {
          padding-right: 3px;
        }
        i {
          font-size: 12px;
        }
      }
    }
    .ToolsRow {
      display: flex;
      .ToolsList {
        flex: 1;
        display: flex;
        .ToolsList-item {
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 3px;
          transition: $animation;
          user-select: none;
          cursor: pointer;
          &:hover {
            background-color: $color-main-o;
            i {
              color: $color-main;
            }
          }
          i {
            color: $color-gray-text;
            font-size: 22px;
          }
        }
      }
      .sendButton {
        width: 100px;
        height: 40px;
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
