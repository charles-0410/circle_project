<template>
  <div class="EmojiPanel">
    <div class="EmojiPanel-inner">
      <div class="EmojiPanel-item">
        <img
          class="item-image"
          src="//cdnfile2.msstatic.com/cdnfile/material_manage/web_base_material_15790915737134_pic.png"
        />
      </div>
      <div class="EmojiPanel-item">
        <img
          class="item-image"
          src="//cdnfile2.msstatic.com/cdnfile/material_manage/web_base_material_15790915737134_pic.png"
        />
      </div>
      <div class="EmojiPanel-item">
        <img
          class="item-image"
          src="//cdnfile2.msstatic.com/cdnfile/material_manage/web_base_material_15790915737134_pic.png"
        />
      </div>
      <div class="EmojiPanel-item">
        <img
          class="item-image"
          src="//cdnfile2.msstatic.com/cdnfile/material_manage/web_base_material_15790915737134_pic.png"
        />
      </div>
      <div class="EmojiPanel-item">
        <img
          class="item-image"
          src="//cdnfile2.msstatic.com/cdnfile/material_manage/web_base_material_15790915737134_pic.png"
        />
      </div>
      <div class="EmojiPanel-item">
        <img
          class="item-image"
          src="//cdnfile2.msstatic.com/cdnfile/material_manage/web_base_material_15790915737134_pic.png"
        />
      </div>
      <div class="EmojiPanel-item">
        <img
          class="item-image"
          src="//cdnfile2.msstatic.com/cdnfile/material_manage/web_base_material_15790915737134_pic.png"
        />
      </div>
      <div class="EmojiPanel-item">
        <img
          class="item-image"
          src="//cdnfile2.msstatic.com/cdnfile/material_manage/web_base_material_15790915737134_pic.png"
        />
      </div>
      <div class="EmojiPanel-item">
        <img
          class="item-image"
          src="//cdnfile2.msstatic.com/cdnfile/material_manage/web_base_material_15790915737134_pic.png"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
@import '../../util/style/variable.scss';
.EmojiPanel {
  position: absolute;
  bottom: 35px;
  left: -100px;
  width: 290px;
  height: 180px;
  border-radius: 5px;
  background-color: $color-white;
  box-shadow: $shadow-d;
  border: 2px solid $color-main;
  cursor: auto;
  &::after {
    position: absolute;
    bottom: -5px;
    left: 107px;
    z-index: -1;
    width: 10px;
    height: 10px;
    background-color: $color-main;
    transform: rotate(45deg);
    content: '';
  }
  .EmojiPanel-inner {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    .EmojiPanel-item {
      display: flex;
      align-items: center;
      justify-content: center;
      vertical-align: center;
      width: 34px;
      height: 34px;
      margin-right: 1px;
      border-radius: 3px;
      transition: $animation;
      cursor: pointer;
      &:hover {
        background-color: $color-main-o;
      }
      .item-image {
        width: 26px;
        height: 22px;
      }
    }
  }
}
</style>
