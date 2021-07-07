<template>
  <div class="progress-bar" @click="changeProgress">
    <div class="bar-inner">
      <!-- 进度条 -->
      <div class="progress" :style="progressStyle"></div>
      <div
        class="progress-btn-wrapper"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
        :style="progressBtnStyle"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  watch,
  ref,
  computed
} from 'vue'
const PROGRESS_BTN_WIDTH = 16
export default defineComponent({
  name: 'progress-bar',
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  emits: ['progrese-change'],
  setup(props, { emit, attrs }) {
    const { ctx } = getCurrentInstance()
    const progressWidth = ref(0)
    const touch = {} // 保存进度条滑动位置
    const progressStyle = computed(() => {
      return {
        width: `${progressWidth.value}px`
      }
    })
    const progressBtnStyle = computed(() => {
      return {
        transform: `translate3D(${progressWidth.value}px, 0, 0)`
      }
    })
    watch(
      () => props.progress,
      newProgress => {
        progressWidth.value =
          (ctx.$el.clientWidth - PROGRESS_BTN_WIDTH) * newProgress
      }
    )

    // touch start
    function onTouchStart(e) {
      touch.touchStart = e.touches[0].pageX // touch 开始的位置
      touch.btnStart = progressWidth.value
    }
    function onTouchMove(e) {
      const currentTouchesPageX = e.touches[0].pageX // 移动中的位置
      const delta = currentTouchesPageX - touch.touchStart // 移动的距离
      const progressWrapperWidth = ctx.$el.clientWidth - PROGRESS_BTN_WIDTH // 外面总宽度
      const currProgress = Math.min(
        1,
        Math.max((touch.btnStart + delta) / progressWrapperWidth, 0)
      ) // 当前进度
      emit('progrese-change', currProgress)
    }
    function onTouchEnd(e) {
      // console.log(e)
      // const currentTouchesPageX = e.touches[0].pageX // 移动中的位置
      // const delta = currentTouchesPageX - touch.touchStart // 移动的距离
      // const progressWrapperWidth = ctx.$el.clientWidth - PROGRESS_BTN_WIDTH // 外面总宽度
      // console.log((touch.btnStart + delta) / progressWrapperWidth)
      // const currProgress = Math.min(
      //   1,
      //   Math.max((touch.btnStart + delta) / progressWrapperWidth, 0)
      // ) // 当前进度
      // emit('progrese-change', currProgress)
    }

    function changeProgress(e) {
      const currentClickPageX = e.pageX // 点击的横坐标位置
      const progrssOffsetLeft = ctx.$el.getBoundingClientRect().left
      const progressWrapperWidth = ctx.$el.clientWidth - PROGRESS_BTN_WIDTH // 外面总宽度
      const finalProgressWidth = currentClickPageX - progrssOffsetLeft // 最终滚动条的位置
      const currProgress = Math.min(
        1,
        Math.max(finalProgressWidth / progressWrapperWidth, 0)
      )
      emit('progrese-change', currProgress)
    }

    return {
      progressStyle,
      progressBtnStyle,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      changeProgress
    }
  }
})
</script>

<style lang="scss" scoped>
;.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
