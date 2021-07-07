// 随机算法 kunth-shuffle 洗牌算法

export function shuffle(lists) {
    const arrs = lists.slice()
    for (let i = 0; i < arrs.length; i++) {
        const j = getRandomInt(i)
        swap(arrs, i, j)
    }

    return arrs
}

// 获取随机索引
function getRandomInt(i) {
    return Math.floor(Math.random() * (i + 1))
}

// 交换位置
function swap(arrs, i, j) {
    const t = arrs[i]
    arrs[i] = arrs[j]
    arrs[j] = t
}

// 格式化时长 单位 s
export function formatTimes(times) {
    const interval = times | 0 // 向下取整
    const minutes = ((interval / 60 | 0) + '').padStart(2, '0')
    const seconds = ((interval % 60 | 0) + '').padStart(2, '0')
    return `${minutes}:${seconds}`
}
