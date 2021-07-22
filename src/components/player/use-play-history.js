
import { save } from '@/assets/js/array-store'
import { PLAY_HISTORY_KEY } from '@/assets/js/constance'
import { SET_PLAY_HISTORY } from '@/store/type'
import { useStore } from 'vuex'
export default function usePlayHistory() {
    const store = useStore()
    function savePlayHistory(song) {
        const playHistory = save(song, PLAY_HISTORY_KEY, (item) => {
            return item.id === song.id
        })
        store.commit(SET_PLAY_HISTORY, playHistory)
    }

    return {
        savePlayHistory
    }
}
