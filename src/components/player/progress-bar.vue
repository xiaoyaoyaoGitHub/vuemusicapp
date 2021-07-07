<template>
  <div class="progress-bar">
    <div class="bar-inner">
      <!-- 进度条 -->
      <div class="progress" :style="progressStyle"></div>
      <div class="progress-btn-wrapper" :style="progressBtnStyle">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, watch, ref, computed } from 'vue'
const PROGRESS_BTN_WIDTH = 16
export default defineComponent({
  name: 'progress-bar',
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit, attrs }) {
    const { ctx } = getCurrentInstance()
    const progressWidth = ref(0)
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
    watch(() => props.progress, (newProgress) => {
      progressWidth.value = (ctx.$el.clientWidth - PROGRESS_BTN_WIDTH) * newProgress
    })
    return {
      progressStyle,
      progressBtnStyle
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
