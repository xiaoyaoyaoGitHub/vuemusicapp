import {
    SET_PLAYING_STATE,
    SET_SEQUENCE_LIST,
    SET_PLAY_LIST,
    SET_CURRENT_INDEX,
    SET_FULL_SCREEN,
    SET_PLAY,
    SET_PLAY_MODE,
    SET_PLAY_RANDOM,
    SET_FAVORITE_LIST,
    ADD_SONG_LYRIC
} from './type'
import { shuffle } from '@/assets/js/utils'
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
    [SET_PLAY_MODE]({ commit, state, getters }, mode) {
        const currentId = getters.currentSong.id // 保存当前的songid
        if (mode === PLAY_MODE.random) { // 随机播放 洗牌
            commit(SET_PLAY_LIST, shuffle(state.sequenceList))
        } else {
            commit(SET_PLAY_LIST, state.sequenceList)
        }
        const index = state.playList.findIndex(song => { // 当前播放歌曲在播放列表中的索引值
            return song.id === currentId
        })
        commit(SET_CURRENT_INDEX, index)
        commit(SET_PLAY_MODE, mode)
    },
    // 点击播放
    [SET_PLAY]({ commit, state, dispatch }, { songs, index }) {
        dispatch(SET_PLAY_MODE, PLAY_MODE.sequence)
        dispatch(SET_CURRENT_INDEX, index)
        dispatch(SET_PLAY_LIST, songs)
        dispatch(SET_SEQUENCE_LIST, songs)
        dispatch(SET_FULL_SCREEN, true)
    },
    // 点击随机播放
    [SET_PLAY_RANDOM]({ commit, state, dispatch }, songs) {
        dispatch(SET_PLAY_MODE, PLAY_MODE.random)
        dispatch(SET_SEQUENCE_LIST, songs)
        dispatch(SET_PLAY_LIST, shuffle(songs)) // 在此处洗牌
        dispatch(SET_CURRENT_INDEX, 0)
        dispatch(SET_FULL_SCREEN, true)
    },
    // 设置收藏列表
    [SET_FAVORITE_LIST]({ commit, state, dispatch }, lists) {
        commit(SET_FAVORITE_LIST, lists)
    },
    // 设置歌词
    [ADD_SONG_LYRIC]({ commit }, { song, lyric }) {
        commit(ADD_SONG_LYRIC, { song, lyric })
    }
}

export default actions
