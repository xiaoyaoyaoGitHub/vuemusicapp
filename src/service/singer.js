import { get } from './base'
//  查询歌手列表
export function getSingerList() {
    return get('/api/getSingerList')
}
