<template>
  <div class="user-center" v-no-result="noResult">
    <div class="back" @click="back"><i class="icon-back"></i></div>
    <div class="switches-wrapper">
      <switches
        v-model="currentIndex"
        :items="['我喜欢的', '最近播放']"
      ></switches>
    </div>
    <div class="play-btn" @click="playRandom" v-show="currentList.length">
      <i class="icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrapper">
      <scroll class="list-scroll" v-if="currentIndex === 0">
        <div class="list-inner">
          <song-list :songs="favorites"></song-list>
        </div>
      </scroll>
      <scroll class="list-scroll" v-if="currentIndex === 1">
        <div class="list-inner">
          <song-list :songs="playHistory"></song-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import Scroll from '@/components/wrap-scroll'
import SongList from '@/components/base/song-list/song-list'
import Switches from '@/components/base/switches/switches'
import { SET_PLAY_RANDOM } from '@/store/type'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'UserCenter',
  components: {
    SongList,
    Scroll,
    Switches
  },
  setup() {
    const currentIndex = ref(0)
    const store = useStore()
    const router = useRouter()
    const favorites = computed(() => store.state.favoriteList)
    const playHistory = computed(() => store.state.playHistory)
    const noResult = computed(() => {
        return currentIndex.value === 0 ? !favorites.value.length : !playHistory.value.length
    })
    const currentList = computed(() => {
        return currentIndex.value === 0 ? favorites.value : playHistory.value
    })

    function back() {
        router.back()
    }

    function playRandom() {
      store.dispatch(SET_PLAY_RANDOM, currentList.value)
    }

    return {
      currentIndex,
      favorites,
      playHistory,
      noResult,
      currentList,
      back,
      playRandom
    }
  }
})
</script>
<style scoped lang="scss">
;.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .switches-wrapper {
    margin: 10px 0 30px 0;
  }
  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid $color-text-l;
    color: $color-text-l;
    border-radius: 100px;
    font-size: 0;
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
  .list-wrapper {
    position: absolute;
    top: 110px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      .list-inner {
        padding: 20px 30px;
      }
    }
  }
}
</style>
