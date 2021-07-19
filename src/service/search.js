import { get } from './base'

// 获取热门搜索
export function getHotKeys() {
    return get('/api/getHotKeys')
}

// 搜索结果
export function search(query, page, showSinger) {
    return get('/api/search', {
        query,
        page,
        showSinger
    })
}
