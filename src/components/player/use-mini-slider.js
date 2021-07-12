import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { SET_CURRENT_INDEX } from '@/store/type'

BScroll.use(Slide)

export default function useMiniSlider() {
    const sliderWrapperRef = ref(null)
    const slider = ref(null)
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const playList = computed(() => store.state.playList)
    const currentIndex = computed(() => store.state.currentIndex)
    const sliderShow = computed(() => { // mini-slider是否展示
        return !fullScreen.value && !!playList.value
    })

    onMounted(() => {
        let sliderVal
        watch(sliderShow, async (newSliderShow) => {
            if (newSliderShow) {
                await nextTick()
                if (sliderVal) { // 如果存在则不初始化
                    sliderVal.refresh()
                } else {
                    sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        momentum: false,
                        bounce: false,
                        probeType: 2,
                        slide: {
                            autoplay: false,
                            loop: true
                        }
                    })
                    sliderVal.on('slidePageChanged', ({ pageX }) => {
                        store.dispatch(SET_CURRENT_INDEX, pageX)
                    })
                }
                sliderVal.goToPage(currentIndex.value, 0, 0)
            }
        })

        watch(currentIndex, newIndex => {
            if (sliderShow.value && sliderVal) {
                sliderVal.goToPage(newIndex, 0, 0)
            }
        })
    })

    return {
        sliderWrapperRef
    }
}
