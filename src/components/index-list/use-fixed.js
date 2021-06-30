import { nextTick, ref, watch, computed } from 'vue'

export default function useFixed(props) {
    const groupRef = ref(null) // 获取滚动条dom
    const listHeights = ref([]) // 设置数据,保存每个child的height
    const scrollY = ref(0) // 竖向滚动条的高度
    const currentIndex = ref(0) // 当前滚动到的索引
    const fixedTitle = computed(() => { // 计算滚动的title
        if (scrollY.value <= 0) {
            return ''
        }
        return props.data[currentIndex.value].title
    })
    // 监听props.data的变化,是否有数据传入
    watch(() => props.data, async () => {
        await nextTick()
        calculate()
    })
    watch(() => scrollY.value, () => {
        listHeights.value.forEach((item, index) => {
            if (scrollY.value >= item) {
                currentIndex.value = index // 监听当前滚动到的位置
            }
        })
    })
    function calculate() {
        const list = groupRef.value.children
        console.log('list', list)
        const listHeightsVal = listHeights.value
        let height = 0
        listHeightsVal.length = 0
        listHeightsVal.push(height)
        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeightsVal.push(height)
        };
        console.log(listHeightsVal)
    }

    function onScroll(pos) {
        scrollY.value = -pos.y
    }

    return {
        groupRef,
        fixedTitle,
        onScroll
    }
}
