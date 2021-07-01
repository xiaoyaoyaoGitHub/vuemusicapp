<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="select"></index-list>
    <router-view :singer="selectSinger"></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list'

export default defineComponent({
  name: 'Singer',
  components: {
    'index-list': IndexList
  },
  data() {
    return {
      singers: [],
      selectSinger: null
    }
  },
  async created() {
    const res = await getSingerList()
    this.singers = res.singers
  },
  methods: {
    select(singer) {
      // console.log(singer)
      this.selectSinger = singer
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    }
  }
})
</script>

<style lang="scss" scoped>
;.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
