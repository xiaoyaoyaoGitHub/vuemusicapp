<template>
  <teleport to="body">
    <transition name="slide" v-show="visible">
      <div class="add-song">
        <!-- 标题 -->
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <div class="close" @click="hide">
            <i class="icon-close"></i>
          </div>
        </div>
        <div class="search-input-wrapper">
          <search-input v-model="query"></search-input>
        </div>
        <div v-show="!query">
          <switches
            :items="['最近播放', '搜索历史']"
            v-model="currentIndex"
          ></switches>
          <div class="list-wrapper">
            <scroll
              ref="scrollRef"
              class="list-scroll"
              v-if="currentIndex === 0"
            >
              <div class="list-inner">
                <song-list @select="selectSongBySongList" :songs="playHistory"></song-list>
              </div>
            </scroll>
            <scroll
              ref="scrollRef"
              class="list-scroll"
              v-if="currentIndex === 1"
            >
              <div class="list-inner">
                <search-list
                  :searches="searchHistory"
                  :showDelete="false"
                  @select="selectSongBySearchList"
                ></search-list>
              </div>
            </scroll>
          </div>
        </div>
        <div class="search-result" v-show="query">
          <suggest @selectSong="selectSongBySuggest" :query="query"></suggest>
        </div>
        <!-- 提示框 -->
        <message ref="messageRef">
          <div class="message-title">
            <i class="icon-ok"></i>
            <span class="text">1首歌曲已经添加到播放列表</span>
          </div>
        </message>
      </div>

    </transition>
  </teleport>
</template>

<script>
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { useStore } from 'vuex'
import SearchInput from '@/components/search/search-input'
import SongList from '@/components/base/song-list/song-list'
import Switches from '@/components/base/switches/switches'
import SearchList from '@/components/base/search-list/search-list'
import Message from '@/components/base/message/message'
import Suggest from '@/components/search/suggest'
import Scroll from '@/components/wrap-scroll'
import useSearchHistory from '@/components/search/use-search-history'
import { ADD_SONG } from '@/store/type'

export default defineComponent({
  name: 'AddSong',
  components: {
    SearchInput,
    Suggest,
    Switches,
    Scroll,
    SongList,
    SearchList,
    Message
  },
  setup() {
    const store = useStore()
    const scrollRef = ref(null)
    const visible = ref(false)
    const messageRef = ref(null)
    const currentIndex = ref(0)
    const query = ref('')

    const searchHistory = computed(() => store.state.searchHistory)
    const playHistory = computed(() => store.state.playHistory)

    const { saveSearchHistory } = useSearchHistory()

    watch(query, async newQuery => {
      await nextTick()
      if (!newQuery) {
        scrollRef.value.scroll.refresh()
      }
    })

    async function show() {
      visible.value = true
      await nextTick()
      console.log(scrollRef.value)
       scrollRef.value.scroll.enable()
      scrollRef.value.scroll.refresh()
    }
    function hide() {
      visible.value = false
    }

    function selectSongBySongList({ song }) {
      store.dispatch(ADD_SONG, song)
      messageRef.value.show()
      // hide()
    }

    function selectSongBySearchList(song) {
       query.value = song.name
    }

    // 选择搜索歌曲
    function selectSongBySuggest(song) {
      store.dispatch(ADD_SONG, song)
      saveSearchHistory(song)
      hide()
    }
    console.log('playHistory', playHistory)
    return {
      visible,
      show,
      hide,
      selectSongBySuggest,
      selectSongBySongList,
      selectSongBySearchList,
      query,
      currentIndex,
      searchHistory,
      playHistory,
      scrollRef,
      messageRef
    }
  }
})
</script>

<style lang="scss" scoped>
;.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 300;
  background: $color-background;
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .close {
      position: absolute;
      top: 0;
      right: 8px;
      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
  .search-input-wrapper {
    margin: 20px;
  }
  .list-wrapper {
    position: absolute;
    top: 165px;
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
  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
}

.message-title {
  text-align: center;
  padding: 18px 0;
  font-size: 0;
  .icon-ok {
    font-size: $font-size-medium;
    color: $color-theme;
    margin-right: 4px;
  }
  .text {
    font-size: $font-size-medium;
    color: $color-text;
  }
}
</style>
