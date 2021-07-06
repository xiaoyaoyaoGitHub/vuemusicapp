import storage from 'good-storage'

export function save(item, key, compare) {
    const storageList = storage.get(key, [])
    insertArray(storageList, item, compare)
    storage.set(key, storageList)
    return storageList
}

export function remove(item, key, compare) {
    console.log('remove')
    const storageList = storage.get(key, [])
    insertArray(storageList, item, compare)
    storage.set(key, storageList)
    return storageList
}

export function load(key) {
    return storage.get(key, [])
}

function insertArray(arr, item, compare) {
    console.log('compare', compare)
    const index = arr.findIndex(compare)
    console.log('index', index)
    if (index >= 0) {
        arr.splice(index, 1)
        return
    }
    arr.unshift(item) // 向数组开头添加
}
