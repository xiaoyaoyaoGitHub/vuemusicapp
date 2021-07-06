
import { SET_FAVORITE_LIST } from '@/store/type'
import { FAVORITE_KEY } from '@/assets/js/constance'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { save, remove } from '@/assets/js/array-store'
export default function useFavorite() {
    const store = useStore()
    const favoriteList = computed(() => store.state.favoriteList)

    const getFavoriteIcon = (song) => {
        return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
    }

    const toggleFavorite = (song) => {
        let favorites
        if (isFavorite(song)) {
            // remove
            favorites = remove(song, FAVORITE_KEY, songCompare)
        } else {
            // save
            favorites = save(song, FAVORITE_KEY, songCompare)
        }
        store.dispatch(SET_FAVORITE_LIST, favorites)

        function songCompare(item) {
            return item.id === song.id
        }
    }

    // 判断是否是收藏歌曲
    const isFavorite = (song) => {
        console.log('currentSong', song)
        console.log('favoriteList', favoriteList)
        return favoriteList.value.findIndex(item => {
            console.log('findIndex', item)
            return song.id === item.id
        }) >= 0
    }

    return {
        getFavoriteIcon,
        toggleFavorite
    }
}
