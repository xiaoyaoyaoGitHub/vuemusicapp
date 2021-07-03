<template>
  <div class="music-list">
    <!-- 返回按钮 -->
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <!-- 标题 -->
    <h1 class="title">{{ title }}</h1>
    <!-- 背景图 -->
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <!-- 播放按钮 -->
      <div class="play-btn-wrapper">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <!-- 模糊效果 -->
      <div class="filter"></div>
    </div>
    <!-- 列表 -->
    <scroll
      class="list"
      v-loading="loading"
      :probe-type="3"
      :style="scrollStyle"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Scroll from '@/components/scroll/scroll'
import SongList from '@/components/base/song-list/song-list'
const IMAGE_HEIGHT = 263
export default defineComponent({
  name: 'music-lists',
  data() {
    return {
      imageHeight: IMAGE_HEIGHT
    }
  },
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    pic: {
      type: String,
      default() {
        return ''
      }
    },
    songs: {
      type: Array,
      default() {
        return []
      }
    },
    loading: Boolean
  },
  components: {
    Scroll,
    SongList
  },
  computed: {
    bgImageStyle() {
      return {
        backgroundImage: `url(${this.pic})`,
        height: this.imageHeight + 'px'
      }
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped>
;.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      text-align: center;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    overflow: hidden;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
