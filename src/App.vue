<template>
  <m-header></m-header>
  <tab></tab>
  <!-- <suspense> -->
    <router-view></router-view>
  <!-- </suspense> -->
</template>

<script>
import { defineComponent } from 'vue'
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
export default defineComponent({
  components: {
    MHeader: Header,
    Tab
  },
  setup() {}
})
</script>

<style lang="scss"></style>
