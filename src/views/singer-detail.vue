<template>
  <div class="singer-detail">
    <music-list :title="singer.name"  :pic="singer.pic" :songs="songs" :loading="loading"></music-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list'
export default defineComponent({
  name: 'SingerDetail',
  data() {
    return {
      songs: [],
      loading: false
    }
  },
  props: {
    singer: {
      type: Object
    }
  },
  components: {
    MusicList
  },
  async created() {
    this.loading = true
    const res = await getSingerDetail(this.singer)
    const songs = await processSongs(res.songs)
    this.songs = songs
    this.loading = false
  }
})
</script>

<style lang="scss" scoped>
;.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
