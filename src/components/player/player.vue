<template>
  <div class="player" v-show="playLists.length">
    <transition name="normal" @enter="enter" @afterEnter="afterEnter" @leave="leave" @afterLeave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.pic" />
        </div>
        <div class="top">
          <div class="back" @click="goBack">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{ currentSong.name }}</h1>
          <h2 class="subtitle">{{ currentSong.singer }}</h2>
        </div>
        <!-- cd 和 歌词 -->
        <div
          class="middle"
          @touchstart.prevent="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend.prevent="onTouchEnd"
        >
          <div :style="middleLStyle" class="middle-l">
            <!-- cd -->
            <div class="cd-wrapper" ref="cdWrapperRef">
              <div class="cd" ref="cdWrapper">
                <img
                  :src="currentSong.pic"
                  ref="cdImage"
                  alt=""
                  class="image"
                  :class="cdClass"
                />
              </div>
            </div>
            <!-- lyric -->
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ playingLyric }}</div>
            </div>
          </div>
          <scroll :style="middleRStyle" ref="lyricScrollRef" class="middle-r">
            <div class="lyric-wrapper">
              <div ref="lyricListRef" v-if="currentLyric">
                <p
                  class="text"
                  v-for="(line, index) in currentLyric.lines"
                  :key="line.num"
                  :class="{ current: currentLineNum === index }"
                >
                  {{ line.txt }}
                </p>
              </div>
              <!-- 无歌词 -->
              <div class="pure-music">
                <p>
                  {{ pureMusicLyric }}
                </p>
              </div>
            </div>
          </scroll>
        </div>
        <!-- 底部 -->
        <div class="bottom">
          <!-- 切换点 -->
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
            <span
              class="dot"
              :class="{ active: currentShow === 'lyric' }"
            ></span>
          </div>
          <!-- 进度条 -->
          <div class="progress-wrapper">
            <span class="time time-l">{{ formatTimes(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                :progress="progress"
                @progrese-change="progressChange"
                ref="barRef"
              ></progress-bar>
            </div>
            <span class="time time-r">{{
              formatTimes(currentSong.duration)
            }}</span>
          </div>
          <!-- 状态切换 -->
          <div class="operators">
            <div class="icon i-left">
              <i @click="changeMode" :class="modeIcon"></i>
            </div>
            <div class="icon i-left" :class="disabledClass">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disabledClass">
              <i @click="togglePlaying" :class="playIcons"></i>
            </div>
            <div class="icon i-right" :class="disabledClass">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i
                @click="toggleFavorite(currentSong)"
                :class="getFavoriteIcon(currentSong)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <mini-player :progress="progress" :togglePlay="togglePlaying"></mini-player>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="readPlay"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import ProgressBar from './progress-bar.vue'
import Scroll from '@/components/wrap-scroll'
import MiniPlayer from './mini-player.vue'
import useMode from './use-mode'
import useCd from './use-cd'
import useLyric from './use-lyric'
import useMiddleInteractive from './use-middle-interactive'
import useFavorite from './use-favorite'
import useAnimation from './use-animation'
import { formatTimes } from '@/assets/js/utils'
import { PLAY_MODE } from '@/assets/js/constance'
import {
  SET_FULL_SCREEN,
  SET_PLAYING_STATE,
  SET_CURRENT_INDEX
} from '@/store/type'
export default defineComponent({
  name: 'player',
  components: {
    ProgressBar,
    Scroll,
    MiniPlayer
  },
  setup() {
    const audioRef = ref(null)
    const barRef = ref(null)
    const songPlay = ref(false)
    const currentTime = ref(0) // 当前播放时长
    //   vuex
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.state.playing)
    const currentIndex = computed(() => store.state.currentIndex)
    const playLists = computed(() => store.state.playList)
    const playIcons = computed(() => {
      return playing.value ? 'icon-pause' : 'icon-play'
    })
    const disabledClass = computed(() => {
      return songPlay.value ? '' : 'disable'
    })
    // 进度条进度
    const progress = computed(() => {
      return currentTime.value / currentSong.value.duration
    })
    // hooks
    const { modeIcon, changeMode, playMode } = useMode()
    const { getFavoriteIcon, toggleFavorite } = useFavorite()
    const { cdClass, cdWrapper, cdImage } = useCd()
    const {
      currentLyric,
      playLyric,
      stopLyric,
      currentLineNum,
      lyricScrollRef,
      lyricListRef,
      pureMusicLyric,
      playingLyric
    } = useLyric({ currentTime, songPlay })
    // watch
    watch(currentSong, newSong => {
      if (!newSong.id) return
      const audioValue = audioRef.value
      audioValue.src = newSong.url
      songPlay.value = false
      audioRef.value.play()
      store.commit(SET_PLAYING_STATE, true)
    })
    watch(playing, newStatus => {
      if (!songPlay.value) {
        return
      }
      const audioRefVal = audioRef.value
      if (newStatus) {
        console.log('newStatus', newStatus)
        audioRefVal.play()
        playLyric()
      } else {
        audioRefVal.pause()
        stopLyric()
      }
    })
    watch(fullScreen, async newFullScreen => {
      if (newFullScreen) {
        await nextTick()
        barRef.value.setOffset(progress.value)
      }
    })
    function goBack() {
      store.dispatch(SET_FULL_SCREEN, false)
    }
    function togglePlaying() {
      if (!songPlay.value) {
        return
      }
      console.log('currentTime', currentTime)
      store.dispatch(SET_PLAYING_STATE, !playing.value)
    }
    function pause() {
      // 监听用户通过其他方式停止播放
      store.dispatch(SET_PLAYING_STATE, false)
    }
    function prev() {
      const lists = playLists.value
      const listLength = lists.length
      if (!songPlay.value || !listLength) {
        return
      }
      if (listLength === 1) {
        // 只有1首歌曲
        loop()
        return
      }

      const prevIndex =
        currentIndex.value === 0 ? listLength - 1 : currentIndex.value - 1
      store.commit(SET_CURRENT_INDEX, prevIndex)
    }
    function next() {
      const lists = playLists.value
      const listLength = lists.length
      if (!songPlay.value || !listLength) {
        return
      }
      if (listLength === 1) {
        // 只有1首歌曲
        loop()
        return
      }
      const nextIndex =
        currentIndex.value === listLength - 1 ? 0 : currentIndex.value + 1
      store.commit(SET_CURRENT_INDEX, nextIndex)
    }
    // 循环播放
    function loop() {
      const audioValue = audioRef.value
      audioValue.currentTime = 0
      audioValue.play()
      store.commit(SET_PLAYING_STATE, true)
    }
    // 监听播放
    function readPlay() {
      console.log('songPlay.value', songPlay.value)
      if (songPlay.value) {
        return
      }
      songPlay.value = true
    }
    // 监听时长
    function updateTime(e) {
      currentTime.value = e.target.currentTime
      playLyric()
    }
    // 进度条
    function progressChange(progress) {
      const audioRefValue = audioRef.value
      audioRefValue.currentTime = currentTime.value =
        audioRefValue.duration * progress
      playLyric()
    }
    function end(e) {
      if (e.target.currentTime === audioRef.value.duration) {
        // 结束
        if (playMode.value === PLAY_MODE.loop) {
          // 循环播放
          loop()
        } else {
          next()
        }
      }
    }

    return {
      currentSong,
      barRef,
      fullScreen,
      playIcons,
      playLists,
      goBack,
      prev,
      next,
      pause,
      togglePlaying,
      audioRef,
      readPlay,
      disabledClass,
      currentTime,
      updateTime,
      formatTimes,
      progress,
      // mode
      modeIcon,
      changeMode,
      // favorite
      getFavoriteIcon,
      toggleFavorite,
      // progress
      progressChange,
      end,
      // cd
      cdClass,
      cdWrapper,
      cdImage,
      // lyric
      currentLyric,
      currentLineNum,
      lyricScrollRef,
      lyricListRef,
      pureMusicLyric,
      playingLyric,
      ...useMiddleInteractive(),
      ...useAnimation()
    }
  }
})
</script>

<style lang="scss" scoped>
;.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
}
</style>
