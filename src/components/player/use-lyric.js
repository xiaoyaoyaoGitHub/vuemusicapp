import { useStore } from 'vuex'
import { watch, computed, ref } from 'vue'
import { getLyric } from '@/service/song'
import { ADD_SONG_LYRIC } from '@/store/type'
import Lyric from 'lyric-parser'
export default function useLyric({ currentTime, songPlay }) {
    const store = useStore()
    const currentLyric = ref(null) // 当前歌词
    const currentLineNum = ref(0) // 当前歌词播放行数
    const lyricScrollRef = ref(null) // 歌词scroll实例
    const lyricListRef = ref(null) // 歌词列表实例
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.state.playing)
    watch(currentSong, async (newSong) => {
        stopLyric()
        currentLyric.value = null
        const lyric = await getLyric(newSong)
        store.dispatch(ADD_SONG_LYRIC, { song: newSong, lyric })
        if (currentSong.value.lyric !== lyric) {
            return
        }
        if (songPlay.value) {
            playLyric()
        }
        currentLineNum.value = 0
        currentLyric.value = new Lyric(lyric, handleLyric)
    })

    // 播放歌词
    function playLyric() {
        const currentLyricVal = currentLyric.value
        // console.log('歌词播放', currentTime)
        if (currentLyricVal) {
            currentLyricVal.seek(currentTime.value * 1000)
        }
    }

    // 暂停播放
    function stopLyric() {
        const currentLyricVal = currentLyric.value
        console.log(currentLyricVal)
        if (currentLyricVal) {
            console.log(currentLyricVal.stop)
            currentLyricVal.stop()
        }
    }

    // 监听歌词播放
    function handleLyric({ lineNum }) {
        console.log('lineNum', lineNum)

        const lyricScrollRefVal = lyricScrollRef.value
        const lyricListRefVal = lyricListRef.value
        if (!lyricListRefVal || !playing.value) { // 还没有渲染则不触发
            return
        }
        currentLineNum.value = lineNum
        if (lineNum > 5) {
            const lyricCurrentEl = lyricListRefVal.children[lineNum - 5]
            lyricScrollRefVal.scroll.scrollToElement(lyricCurrentEl, 1000)
        } else {
            lyricScrollRefVal.scroll.scrollTo(0, 0, 1000) // 滚动到顶部
        }
    }

    return {
        currentLyric,
        playLyric,
        stopLyric,
        currentLineNum,
        lyricScrollRef,
        lyricListRef
    }
}
