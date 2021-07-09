import {
    SET_CURRENT_INDEX,
    SET_FULL_SCREEN,
    SET_PLAY_LIST,
    SET_SEQUENCE_LIST,
    SET_PLAYING_STATE,
    SET_PLAY_MODE,
    SET_FAVORITE_LIST,
    ADD_SONG_LYRIC
} from './type'

const mutations = {
    // 设置当前播放索引
    [SET_CURRENT_INDEX](state, currIndex) {
        state.currentIndex = currIndex
    },
    // 设置是否全屏
    [SET_FULL_SCREEN](state, isFull) {
        state.fullScreen = isFull
    },
    // 设置歌曲列表
    [SET_SEQUENCE_LIST](state, songs) {
        state.sequenceList = songs
    },
    // 设置播放列表
    [SET_PLAY_LIST](state, songs) {
        state.playList = songs
    },
    // 设置播放状态
    [SET_PLAYING_STATE](state, status) {
        state.playing = status
    },
    // 设置播放模式
    [SET_PLAY_MODE](state, mode) {
        state.playMode = mode
    },
    // 设置收藏列表
    [SET_FAVORITE_LIST](state, lists) {
        state.favoriteList = lists
    },
    // 设置歌词
    [ADD_SONG_LYRIC](state, { song, lyric }) {
        // state.getters.currentSong.lyric = lyric;
        const sequenceList = state.sequenceList
        sequenceList.map(item => {
            if (item.mid === song.mid) {
                item.lyric = lyric
            };
            return item
        })
    }
}

export default mutations
