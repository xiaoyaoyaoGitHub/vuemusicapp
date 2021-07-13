
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted } from 'vue'

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

    onUnmounted(() => {
        if (scroll.value) {
            scroll.value.destroy()
        }
    })

    return scroll
}
