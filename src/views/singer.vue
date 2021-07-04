<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="select"></index-list>
    <!-- <router-view :singer="selectSinger"></router-view> -->
    <router-view v-slot="{Component}">
      <transition name="slide" appear>
        <component :is="Component" :singer="selectSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list'
import Storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constance'
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
      Storage.session.set(SINGER_KEY, singer)
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
