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
