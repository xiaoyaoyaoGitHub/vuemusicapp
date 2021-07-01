<template>
  <scroll class="index-list" @scroll="onScroll" :probe-type="3" ref="scrollRef">
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li class="item" @click="selectSinger(item)" v-for="item in group.list" :key="item.id">
            <img v-lazy="item.pic" alt="" class="avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 顶部滚动定位 -->
    <div class="fixed" :style="fixedStyle">
      <div class="fixed-title" v-show="fixedTitle">{{ fixedTitle }}</div>
    </div>
    <!-- 快速定位导航栏 -->
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortCutTouchStart"
      @touchmove.stop.prevent="onShortCutTouchMove"
    >
      <ul>
        <li
          v-for="(item, index) in shortCutList"
          :key="index"
          :data-index="index"
          class="item"
          :class="{ current: index === currentIndex }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import { defineComponent } from 'vue'
import Scroll from './../scroll/scroll'
import useFixed from './use-fixed'
import useShortCut from './use-shortcut'

export default defineComponent({
  name: 'index-list',
  components: {
    Scroll
  },
  emits: ['select'],
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props, { emit }) {
    const {
      groupRef,
      onScroll,
      fixedTitle = '',
      fixedStyle,
      currentIndex,
      selectSinger
    } = useFixed(props, emit)
    const {
      shortCutList,
      onShortCutTouchStart,
      onShortCutTouchMove,
      scrollRef
    } = useShortCut(props, groupRef)
    return {
      groupRef,
      onScroll,
      fixedTitle,
      fixedStyle,
      shortCutList,
      onShortCutTouchStart,
      onShortCutTouchMove,
      scrollRef,
      currentIndex,
      selectSinger
    }
  }
})
</script>

<style lang="scss" scoped>
;.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>
