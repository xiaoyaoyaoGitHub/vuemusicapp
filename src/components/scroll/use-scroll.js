
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted } from 'vue'

BScroll.use(ObserveDOM)

export default function useScroll(scrollRef, options) {
    const scroll = ref(null)
    onMounted(() => {
        scroll.value = new BScroll(scrollRef.value, {
            ObserveDOM: true,
            ...options
        })
    })

    onUnmounted(() => {
        scroll.value.destroy()
    })

    return scroll
}
