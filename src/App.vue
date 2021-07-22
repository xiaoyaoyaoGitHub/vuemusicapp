<template>
  <m-header></m-header>
  <tab></tab>
  <player></player>
  <router-view :style="viewStyle" v-slot="{Component}">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view v-slot="{Component}" :style="viewStyle" name="user">
      <transition name="slide" appear>
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
      </transition>
  </router-view>
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
