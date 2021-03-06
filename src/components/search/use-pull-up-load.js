
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'

import { ref, onMounted, onUnmounted, onActivated } from 'vue'

BScroll.use(PullUp)
BScroll.use(ObserveDOM)

export default function usePullUpLoad(requestData) {
    const scroll = ref(null)
    const rootRef = ref(null)
    const isPullUpLoad = ref(false)

    onMounted(() => {
        const scrollVal = scroll.value = new BScroll(rootRef.value, {
            click: true,
            observeDOM: true,
            pullUpLoad: true
        })

        scrollVal.on('pullingUp', pullingUpHandle)

        async function pullingUpHandle() {
            isPullUpLoad.value = true
            await requestData()
            scrollVal.finishPullUp()
            scrollVal.refresh()
            isPullUpLoad.value = false
        }
    })
    onActivated(() => {
        // scroll.value.refresh()
    })
    onUnmounted(() => {
        scroll.value.destory && scroll.value.destory()
    })

    return {
        scroll,
        rootRef,
        isPullUpLoad
    }
}
