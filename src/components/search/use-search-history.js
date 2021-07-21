
import { SEARCH_KEY } from '@/assets/js/constance'
import { save, remove, clear } from '@/assets/js/array-store'
import { SET_SEARCH_HISTORY } from '@/store/type'
import { useStore } from 'vuex'

export default function useSearchHistory() {
    const store = useStore()
    function saveSearchHistory(query) {
        const searchHistory = save(query, SEARCH_KEY, (item) => {
            return item.id === query.id
        })

        store.commit(SET_SEARCH_HISTORY, searchHistory)
    }

    function deleteSearch(query) {
        const searchHistory = remove(query, SEARCH_KEY, (item) => {
            return item.id === query.id
        })
        store.commit(SET_SEARCH_HISTORY, searchHistory)
    }

    function clearSearchHistory() {
        const searchHistory = clear(SEARCH_KEY)
        store.commit(SET_SEARCH_HISTORY, searchHistory)
    }

    return {
        saveSearchHistory,
        deleteSearch,
        clearSearchHistory
    }
}
