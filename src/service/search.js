import { get } from './base'

// 获取热门搜索
export function getHotKeys() {
    return get('/api/getHotKeys')
}
