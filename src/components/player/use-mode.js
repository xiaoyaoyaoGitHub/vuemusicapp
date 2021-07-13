import { useStore } from 'vuex'
import { computed } from 'vue'
import { PLAY_MODE } from '@/assets/js/constance'
import { SET_PLAY_MODE } from '@/store/type'
export default function useMode() {
    const store = useStore()
    const playMode = computed(() => store.state.playMode)
    const modeIcon = computed(() => { // 设置icons
        const modeValue = playMode.value
        return modeValue === PLAY_MODE.sequence ? 'icon-sequence' : (modeValue === PLAY_MODE.random ? 'icon-random' : 'icon-loop')
    })
    const modeText = computed(() => {
        const modeValue = playMode.value
        return modeValue === PLAY_MODE.sequence ? '顺序播放' : (modeValue === PLAY_MODE.random ? '随机播放' : '单曲循环')
    })
    const changeMode = () => {
        const mode = (playMode.value + 1) % 3
        store.dispatch(SET_PLAY_MODE, mode)
    }

    return { modeIcon, changeMode, playMode, modeText }
}
