
import { SEARCH_KEY } from '@/assets/js/constance'
import { save } from '@/assets/js/array-store'
import { SET_SEARCH_HISTORY } from '@/store/type'
import { useStore } from 'vuex'

export default function useSearchHistory() {
    const store = useStore()
    function saveSearchHistory(query) {
        save(query, SEARCH_KEY, (item) => {
            return item === query
        })

        store.commit(SET_SEARCH_HISTORY, query)
    }

    return {
        saveSearchHistory
    }
}
