# vuemusicapp
vue3开发的音乐app


# 歌手列表页
 - 如果按照教程上写,因为fixTitle会一直更新,导致会一直触发updated钩子,导致BScroll不能下拉回弹,所以改为监听当前索引值变化,索引值变化则更新fixedTitle

 
## 问题
- 因为组件不停的触发updated导致BScroll不能下拉回弹问题
- uncaught (in promise) domexception: failed to load because no supported source was found.
    如果出现这个问题大概率是audi找不到播放资源导致的,看下自己currentSong的值


## state
 - sequenceList 列表
 - playList 播放列表
 - playing 是否播放
 - playMode 播放模式
 - currentIndex 当前播放索引
 - fullScreen 是否全屏

 getter

 - currentSong 当前播放歌曲

 mutations

 - setPlayingState 修改播放状态
 - setSquenceList 歌曲列表
 - setPlayList 修改播放歌曲列表
 - setPlayMode 修改播放状态
 - setCurrentIndex 修改当前播放歌曲
 - setFullScreen 设置全屏

 actions 

 - selectPlay 
