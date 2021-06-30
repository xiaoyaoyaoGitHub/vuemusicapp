<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, onUpdated, onActivated } from 'vue'
import useScroll from './use-scroll'
export default defineComponent({
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  emit: ['scroll'],
  setup(props, { emit }) {
    const rootRef = ref(null)
    const scroll = useScroll(rootRef, props, emit)
    return {
      rootRef,
      scroll
    }
  }
})
</script>
