import { get } from './base'
//  查询歌手列表
export function getSingerList() {
    return get('/api/getSingerList')
}

// 歌手歌曲查询
export function getSingerDetail(singer) {
    return get('/api/getSingerDetail', {
        mid: singer.mid
    })
}
