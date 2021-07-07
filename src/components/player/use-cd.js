
import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
export default function useCd() {
    const store = useStore()
    const cdWrapper = ref(null) // cd外层容器
    const cdImage = ref(null) // cd
    const playing = computed(() => store.state.playing)
    const cdClass = computed(() => {
        return playing.value ? 'playing' : ''
    })

    watch(playing, (newPlaying) => {
        console.log('newPlaying', newPlaying)
        if (!newPlaying) { // 暂停播放
            syncTransform(cdWrapper.value, cdImage.value)
        }
    })

    function syncTransform(wrapper, inner) {
        const wrapperTransform = getComputedStyle(wrapper).transform
        const innerTransfrom = getComputedStyle(inner).transform
        // 不能直接判断 wrapperTransform ?
        wrapper.style.transform = wrapperTransform !== 'none' ? innerTransfrom.concat('', wrapperTransform) : innerTransfrom
    }

    return {
        cdClass,
        cdWrapper,
        cdImage
    }
}
