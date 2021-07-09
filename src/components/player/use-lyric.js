import { useStore } from 'vuex'
import { watch, computed } from 'vue'
import { getLyric } from '@/service/song'
import { ADD_SONG_LYRIC } from '@/store/type'
import Lyric from 'lyric-parser'
export default function useLyric() {
    const store = useStore()
    const currentSong = computed(() => store.getters.currentSong)
    watch(currentSong, async (newSong) => {
        const lyric = await getLyric(newSong)
        store.dispatch(ADD_SONG_LYRIC, { song: newSong, lyric })
    })
}
