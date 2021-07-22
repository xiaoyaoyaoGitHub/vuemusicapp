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
    deleteFromArray(storageList, compare)
    storage.set(key, storageList)
    return storageList
}

export function load(key) {
    return storage.get(key, [])
}

export function clear(key) {
    storage.remove(key)
    return []
}

function insertArray(arr, item, compare) {
    console.log('compare', compare)
    const index = arr.findIndex(compare)
    console.log('index', index)
    if (index >= 0) {
        arr.splice(index, 1)
    }
    arr.unshift(item) // 向数组开头添加
}

function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index, 1)
    }
}
