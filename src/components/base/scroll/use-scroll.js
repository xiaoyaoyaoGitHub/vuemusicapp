
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

BScroll.use(ObserveDOM)

export default function useScroll(scrollRef, options, emit) {
    const scroll = ref(null)
    onMounted(() => {
        const scrollVal = scroll.value = new BScroll(scrollRef.value, {
            ObserveDOM: true,
            mouseWheel: true,
            ...options
        })
        if (options.probeType > 0) { // 监听scroll
            scrollVal.on('scroll', (pos) => {
                emit('scroll', pos)
            })
        }
    })

    // keep-alive
    onActivated(() => {
        if (scroll.value) {
            scroll.value.enable()
            scroll.value.refresh()
        }
    })

    onDeactivated(() => {
        if (scroll.value) {
            scroll.value.disable()
        }
    })

    onUnmounted(() => {
        if (scroll.value) {
            scroll.value.destroy()
        }
    })

    return scroll
}
