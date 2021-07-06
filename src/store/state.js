
import { PLAY_MODE, FAVORITE_KEY } from '@/assets/js/constance'
import { load } from '@/assets/js/array-store'
const state = {
    sequenceList: [], // 歌曲列表
    playList: [], // 播放列表
    playing: false, // 是否播放
    playMode: PLAY_MODE.sequence, // 播放模式
    currentIndex: 0, // 当前播放索引
    fullScreen: false, // 是否全屏播放
    favoriteList: load(FAVORITE_KEY) // 收藏列表
}

export default state
