import {
    SET_CURRENT_INDEX,
    SET_FULL_SCREEN,
    SET_PLAY_LIST,
    SET_SEQUENCE_LIST,
    SET_PLAYING_STATE,
    SET_PLAY_MODE
} from './type'

const mutations = {
    // 设置当前播放索引
    [SET_CURRENT_INDEX](state, currIndex) {
        state.currIndex = currIndex
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
    }
}

export default mutations
