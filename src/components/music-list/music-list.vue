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
      <div class="play-btn-wrapper" @click="playRandom" :style="playStyle">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <!-- 模糊效果 -->
      <div class="filter" :style="filterStyle"></div>
    </div>
    <!-- 列表 -->
    <scroll
      class="list"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      :probe-type="3"
      :style="scrollStyle"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectSong"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Scroll from '@/components/wrap-scroll'
import SongList from '@/components/base/song-list/song-list'
import { SET_PLAY, SET_PLAY_RANDOM, SET_SEQUENCE_LIST, SET_FULL_SCREEN } from '@/store/type'
import { mapActions, mapState } from 'vuex'
const TOP_HEIGHT = 40
export default defineComponent({
  name: 'music-lists',
  data() {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0

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
    noResultText: {
      type: String,
      default: '抱歉,没有找到歌曲哦'
    },
    loading: Boolean
  },
  components: {
    Scroll,
    SongList
  },
  computed: {
    noResult() {
      return !this.loading && !this.songs.length
    },
    playStyle() {
      let display = ''
      if (this.scrollY > this.maxTranslateY) {
        display = 'none'
      }
      return {
        display
      }
    },
    bgImageStyle() {
      const scrollY = this.scrollY
      let paddingTop = '70%'
      let translateZ = 0
      let height = 0
      let zIndex = 0
      const scale = 1
      if (this.maxTranslateY < scrollY) { // 向上滚动
        height = `${TOP_HEIGHT}px`
        paddingTop = 0
        zIndex = 10
        translateZ = 1
      }

      return {
        backgroundImage: `url(${this.pic})`,
        paddingTop,
        height,
        zIndex,
        transform: `scale(${scale})translateZ(${translateZ}px)`
      }
    },
    filterStyle() {
      const scrollY = this.scrollY
      const imageHeight = this.imageHeight
      let blur = 0
      if (scrollY > 0) {
        blur = Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) * 20
      }
      return {
        backdropFilter: `blur(${blur}px)`
      }
    },
    scrollStyle() {
      const bottom = this.playList.length ? '60px' : ''
      return {
        top: `${this.imageHeight}px`,
        bottom
      }
    },
    ...mapState(['playList'])
  },
  updated() {
    // console.log('updated')
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.maxTranslateY = this.imageHeight - TOP_HEIGHT
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onScroll(e) {
      // console.log(e)
      this.scrollY = -e.y // 保存滚动的高度
    },
    selectSong({ song, index }) {
      this[SET_PLAY]({ songs: this.songs, index })
    },
    playRandom() {
      console.log(this.songs)
      this[SET_PLAY_RANDOM](this.songs)
    },
    ...mapActions([
      SET_PLAY,
      SET_PLAY_RANDOM,
      SET_SEQUENCE_LIST,
      SET_FULL_SCREEN
    ])
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
    // z-index: 0;
    // overflow: hidden;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
