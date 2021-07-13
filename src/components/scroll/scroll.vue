<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, onUpdated } from 'vue'
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
    onUpdated(() => {
      // console.log('update')
      if (scroll.value) {
        scroll.value.enable()
        scroll.value.refresh()
      }
    })
    return {
      rootRef,
      scroll
    }
  }
})
</script>
