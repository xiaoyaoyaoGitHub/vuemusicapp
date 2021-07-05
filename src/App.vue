<template>
  <m-header></m-header>
  <tab></tab>
  <player></player>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'
export default defineComponent({
  components: {
    MHeader: Header,
    Tab,
    Player
  },
  setup() {}
})
</script>

<style lang="scss"></style>
