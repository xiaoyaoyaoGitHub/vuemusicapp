import {
    SET_PLAYING_STATE,
    SET_SEQUENCE_LIST,
    SET_PLAY_LIST,
    SET_CURRENT_INDEX,
    SET_FULL_SCREEN,
    SET_PLAY,
    SET_PLAY_MODE,
    SET_PLAY_RANDOM
} from './type'
import { PLAY_MODE } from '@/assets/js/constance'

const actions = {
    // 设置播放状态
    [SET_PLAYING_STATE]({ commit, state }, playingStatus) {
        commit(SET_PLAYING_STATE, playingStatus)
    },
    // 设置歌曲列表
    [SET_SEQUENCE_LIST]({ commit, state }, songs) {
        commit(SET_SEQUENCE_LIST, songs)
    },
    // 设置播放列表
    [SET_PLAY_LIST]({ commit, state }, playSongs) {
        commit(SET_PLAY_LIST, playSongs)
    },
    // 设置当前播放歌曲
    [SET_CURRENT_INDEX]({ commit, state }, index) {
        commit(SET_CURRENT_INDEX, index)
    },
    // 设置是否全屏
    [SET_FULL_SCREEN]({ commit, state }, isFull) {
        commit(SET_FULL_SCREEN, isFull)
    },
    // 设置播放模式
    [SET_PLAY_MODE]({ commit, state }, mode) {
        commit(SET_PLAY_MODE, mode)
    },
    // 点击播放
    [SET_PLAY]({ commit, state, dispatch }, { song, index }) {
        dispatch(SET_PLAY_MODE, PLAY_MODE.random)
        dispatch(SET_CURRENT_INDEX, index)
    },
    // 点击随机播放
    [SET_PLAY_RANDOM]({ commit, state, dispatch }, songs) {
        dispatch(SET_PLAY_MODE, PLAY_MODE.random)
        // dispatch(SET_SEQUENCE_LIST, songs)
        dispatch(SET_PLAY_LIST, songs)
    }
}

export default actions
