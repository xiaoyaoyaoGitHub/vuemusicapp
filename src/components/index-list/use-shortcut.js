
import { computed, ref } from 'vue'

export default function useShortCut(props, groupRef) {
    const scrollRef = ref(null)
    const SHOUTCUT_HEIGHT = 18
    const touch = {}
    const shortCutList = computed(() => {
        return props.data.map(group => {
            return group.title
        })
    })
    // touchstart
    function onShortCutTouchStart(e) {
        const touchIndex = e.target.dataset.index
        touch.y1 = e.touches[0].pageY
        touch.touchIndex = touchIndex
        scroll(touchIndex)
    }
    // touchmove
    function onShortCutTouchMove(e) {
        touch.y2 = e.touches[0].pageY
        const delta = (touch.y2 - touch.y1) / SHOUTCUT_HEIGHT | 0 // 偏移到的索引
        const moveIndex = +touch.touchIndex + delta
        scroll(moveIndex)
    }

    function scroll(index) {
        if (!index) { // 点击右侧导航没有item时,会有undefined的情况
            return
        }
        index = Math.max(0, Math.min(index, shortCutList.value.length - 1))
        const scroll = scrollRef.value.scroll // BScroll实例
        const targetEl = groupRef.value.children[index]
        scroll.scrollToElement(targetEl, 0)
    }

    return {
        shortCutList,
        scrollRef,
        onShortCutTouchStart,
        onShortCutTouchMove

    }
}
