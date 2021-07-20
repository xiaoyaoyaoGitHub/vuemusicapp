<template>
  <div class="suggest" v-loading="loading" v-no-result="noResult" ref="rootRef">
    <ul class="suggest-list">
      <li class="suggest-item" v-show="singer">
        <div class="icon">
          <div class="icon-mine"></div>
        </div>
        <div class="name">
          <p class="text"></p>
        </div>
      </li>
      <li class="suggest-item" v-for="song in songs" :key="song.id">
        <div class="icon"><i class="icon-music"></i></div>
        <div class="name">
          <p class="text">{{song.singer}}-{{song.name}}</p>
        </div>
      </li>
      <div class="suggest-item" v-loading:[pullLoadingText]="isPullLoading"></div>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed, nextTick } from 'vue'
import usePullUpLoad from './use-pull-up-load'
import { search } from '@/service/search'
import { processSongs } from '@/service/song'
export default defineComponent({
  name: 'Suggest',
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const songs = ref([])
    const singer = ref(null)
    const pullLoadingText = ref('')
    const page = ref(1)
    const hasMore = ref(true)
    const { rootRef, isPullUpLoad, scroll } = usePullUpLoad(searchMore)
    const loading = computed(() => {
      return !songs.value.length
    })
    const noResult = computed(() => {
      return !songs.value.length && !hasMore.value
    })
    const isPullLoading = computed(() => {
      return isPullUpLoad.value && hasMore.value
    })

    watch(
      () => props.query,
      async newQuery => {
        console.log(newQuery)
        if (!newQuery) {
          return
        }
        await searchFirstTime()
      }
    )

    // 搜索
    async function searchFirstTime() {
      songs.value = []
      singer.value = null
      page.value = 1
      const result = await search(
        props.query,
        page.value,
        props.showSinger
      )
      songs.value = await processSongs(result.songs)
      singer.value = result.singer
      hasMore.value = result.hasMore
       await nextTick()
      await makeItScrollable()
    }
    // 搜索更多
    async function searchMore () {
      if (!hasMore.value || !props.query) {
        return
      }
      page.value++
      const result = await search(
        props.query,
        page.value,
        props.showSinger
      )
      songs.value = songs.value.concat(await processSongs(result.songs))
      hasMore.value = result.hasMore
      await nextTick()
      await makeItScrollable()
    }

    // 不足一屏时再次请求
    async function makeItScrollable() {
      if (scroll.value.maxScrollY >= -1) {
        await searchMore()
      }
    }

    return {
      songs,
      singer,
      loading,
      pullLoadingText,
      noResult,
      rootRef,
      isPullLoading
    }
  }
})
</script>

<style lang="scss" scoped>
;.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        [class^="icon-"] {
          font-size: 14px;
          color: $color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text {
          @include no-wrap();
        }
      }
    }
  }
}
</style>
