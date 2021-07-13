<template>
    <teleport to="body"> <!--内置组件  直接挂载到body上-->
        <transition name="list-fade">
            <div class="playlist" v-show="visible && playlist.length">
                <div class="list-wrapper">
                    <div class="list-header">
                        <h1 class="title">
                            <!-- 循环模式 -->
                            <i class="icon" :class="modeIcon" @click.stop="changeMode"></i>
                            <span class="text">{{modeText}}</span>
                            <span class="clear"></span>
                        </h1>
                    </div>
                    <!-- 列表部分 -->
                    <scroll class="list-content" ref="scrollRef" v-if="sequenceList.length">
                         <transition-group tag="ul">
                             <li class="item" v-for="song in sequenceList" :key="song.mid">
                                <!-- 当前播放的歌曲 -->
                                <i class="current" :class="getCurrentIcon(song)"></i>
                                <!-- 歌曲名称 -->
                                <span class="text">{{song.name}}</span>
                                <!-- favorite -->
                                <span class="favorite" @click.stop="toggleFavorite(song)">
                                    <i class="icon" :class="getFavoriteIcon(song)"></i>
                                </span>
                            </li>
                         </transition-group>
                    </scroll>
                    <!-- 添加 -->
                    <div class="list-add">
                        <div class="add">
                            <i class="icon-add"></i>
                            <span class="text">添加歌曲到队列</span>
                        </div>
                    </div>
                    <!-- 关闭 -->
                    <div @click.stop="hide" class="list-footer">
                        <span>关闭</span>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
import { defineComponent, computed, ref, nextTick } from 'vue'
import Scroll from '@/components/scroll/scroll'
import { useStore } from 'vuex'
import useMode from './use-mode'
import useFavorite from './use-favorite'
export default defineComponent({
    name: 'PlayList',
    components: {
        Scroll
    },
    setup() {
        const visible = ref(false)
        const scrollRef = ref(null)
        const store = useStore()
        const { changeMode, modeIcon, modeText } = useMode()
        const { getFavoriteIcon, toggleFavorite } = useFavorite()
        const currentSong = computed(() => store.getters.currentSong)
        const playlist = computed(() => store.state.playList)
        const sequenceList = computed(() => store.state.sequenceList)

        async function show() {
            visible.value = true
            await nextTick()
            scrollRef.value.scroll.refresh()
        }

        function hide() {
            visible.value = false
        }

        function getCurrentIcon(song) {
            if (song.id === currentSong.value.id) {
                return 'icon-play'
            }
        }

        return {
            scrollRef,
            currentSong,
            playlist,
            sequenceList,
            visible,
            changeMode,
            modeIcon,
            modeText,
            getCurrentIcon,
            getFavoriteIcon,
            toggleFavorite,
            show,
            hide
        }
    }
})
</script>

<style lang="scss" scoped>
  ;.playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: $color-background-d;
    &.list-fade-enter-active, &.list-fade-leave-active {
      transition: opacity .3s;
      .list-wrapper {
        transition: all .3s;
      }
    }
    &.list-fade-enter-from, &.list-fade-leave-to {
      opacity: 0;
      .list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
    .list-wrapper {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 210;
      width: 100%;
      background-color: $color-highlight-background;
      .list-header {
        position: relative;
        padding: 20px 30px 10px 20px;
        .title {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 10px;
            font-size: 24px;
            color: $color-theme-d;
          }
          .text {
            flex: 1;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
      .list-content {
        max-height: 240px;
        overflow: hidden;
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          .current {
            flex: 0 0 20px;
            width: 20px;
            font-size: $font-size-small;
            color: $color-theme-d;
          }
          .text {
            flex: 1;
            @include no-wrap();
            font-size: $font-size-medium;
            color: $color-text-d;
          }
          .favorite {
            @include extend-click();
            margin-right: 15px;
            font-size: $font-size-small;
            color: $color-theme;
            .icon-favorite {
              color: $color-sub-theme;
            }
          }
          .delete {
            @include extend-click();
            font-size: $font-size-small;
            color: $color-theme;
            &.disable {
              color: $color-theme-d;
            }
          }
        }
      }
      .list-add {
        width: 140px;
        margin: 20px auto 30px auto;
        .add {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid $color-text-l;
          border-radius: 100px;
          color: $color-text-l;
          .icon-add {
            margin-right: 5px;
            font-size: $font-size-small-s;
          }
          .text {
            font-size: $font-size-small;
          }
        }
      }
      .list-footer {
        text-align: center;
        line-height: 50px;
        background: $color-background;
        font-size: $font-size-medium-x;
        color: $color-text-l;
      }
    }
  }
</style>
