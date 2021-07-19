<template>
  <div class="suggest" v-loading="loading" v-no-result="noResult">
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
      <div class="suggest-item"></div>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue'
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
    const page = ref(1)
    const hasMore = ref(true)
    const loading = computed(() => {
      return !songs.value.length
    })
    const noResult = computed(() => {
      return !songs.value.length && !hasMore.value
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

    const searchFirstTime = async () => {
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
    }

    return {
      songs,
      singer,
      loading,
      noResult
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
