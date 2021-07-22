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
                <div class="search-result" v-show="query">
                    <suggest @selectSong="selectSong" :query="query"></suggest>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import SearchInput from '@/components/search/search-input'
import Suggest from '@/components/search/suggest'
import { ADD_SONG } from '@/store/type'

export default defineComponent({
    name: 'AddSong',
    components: {
        SearchInput,
        Suggest
    },
    setup() {
        const store = useStore()
        const visible = ref(false)
        const query = ref('')
        function show() {
            visible.value = true
        }
        function hide() {
            visible.value = false
        }

        // 选择搜索歌曲
        function selectSong(song) {
          store.dispatch(ADD_SONG, song)
          hide()
        }

        return {
            visible,
            show,
            hide,
            selectSong,
            query
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
      margin: 20px
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
