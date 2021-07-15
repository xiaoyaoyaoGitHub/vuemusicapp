<template>
  <m-header></m-header>
  <tab></tab>
  <player></player>
  <router-view :style="viewStyle"></router-view>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'
import { mapState } from 'vuex'
export default defineComponent({
  components: {
    MHeader: Header,
    Tab,
    Player
  },
  computed: {
    viewStyle() {
      return {
        bottom: this.playList.length ? '60px' : ''
      }
    },
    ...mapState(['playList'])
  }
})
</script>

<style lang="scss"></style>
