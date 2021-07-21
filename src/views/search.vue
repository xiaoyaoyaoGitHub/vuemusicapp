<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <!-- 热门搜索 -->
    <div class="search-content" v-show="!query">
      <div class="hot-keys">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li
            class="item"
            @click="addQuery(item)"
            v-for="item in hotKeys"
            :key="item.id"
          >
            <span>{{ item.key }}</span>
          </li>
        </ul>
      </div>
      <!-- 搜索历史 -->
      <div class="search-history">
        <h1 class="title">
          <span class="text">搜索历史</span>
          <span class="clear">
            <i class="icon-clear"></i>
          </span>
        </h1>
        <search-list :searches="searchHistory"></search-list>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search-result" v-show="query">
      <suggest :query="query" @selectSong="selectSong"></suggest>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import SearchInput from '@/components/search/search-input'
import SearchList from '@/components/base/search-list/search-list'
import Suggest from '@/components/search/suggest'
import { getHotKeys } from '@/service/search'
import { ADD_SONG } from '@/store/type'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Search',
  components: {
    SearchInput,
    Suggest,
    SearchList
  },
  setup() {
    const store = useStore()
    const query = ref('')
    const hotKeys = ref([])
    const searchHistory = computed(() => store.state.searchHistory)
    // 获取热门搜索
    getHotKeys().then(res => {
      hotKeys.value = res.hotKeys
    })

    // 热门搜索点击搜索
    function addQuery(hotkey) {
      query.value = hotkey.key
    }

    // 选择歌曲
    function selectSong(song) {
      // console.log(song)
      store.dispatch(ADD_SONG, song)
    }

    return {
      query,
      hotKeys,
      addQuery,
      selectSong,
      searchHistory
    }
  }
})
</script>
<style lang="scss" scoped>
;.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  .search-content {
    flex: 1;
    overflow: hidden;
    .hot-keys {
      margin: 0 20px 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;
        .text {
          flex: 1;
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
  }
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
