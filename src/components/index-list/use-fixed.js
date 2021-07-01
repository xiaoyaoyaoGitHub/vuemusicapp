import { nextTick, ref, watch, computed } from 'vue'

export default function useFixed(props) {
    const groupRef = ref(null) // 获取滚动条dom
    const listHeights = ref([]) // 设置数据,保存每个child的height
    const scrollY = ref(0) // 竖向滚动条的高度
    const currentIndex = ref(0) // 当前滚动到的索引
    const TITLE_HEIGHT = 30
    const distance = ref(0) // 下个group距离顶部位置
    const fixedTitle = ref('')
    // computed(() => {
    //     if (scrollY.value < 0) {
    //         return ''
    //     }
    //     const currentGroups = props.data[currentIndex.value]
    //     return currentGroups ? currentGroups.title : ''
    // })
    const fixedStyle = computed(() => {
        const distanceValue = distance.value
        const diff = (distanceValue > 0 && distanceValue < TITLE_HEIGHT) ? distanceValue - TITLE_HEIGHT : 0
        return {
            transform: `translate3D(0, ${diff}px,0)`
        }
    })
    // 监听props.data的变化,是否有数据传入
    watch(() => props.data, async () => {
        await nextTick()
        calculate()
    })
    watch(scrollY, (newY) => {
        if (scrollY.value <= 0) {
            fixedTitle.value = ''
        } else {
            fixedTitle.value = props.data[currentIndex.value].title
        }
        const listHeightsValue = listHeights.value
        listHeightsValue.forEach((item, index) => {
            const itemBottom = listHeightsValue[index + 1]
            if (newY <= itemBottom && newY >= item) {
                currentIndex.value = index
                distance.value = itemBottom - newY
            }
        })
    })
    watch(currentIndex, () => {
        fixedTitle.value = props.data[currentIndex.value].title
    })
    function calculate() {
        const list = groupRef.value.children
        const listHeightsVal = listHeights.value
        let height = 0
        listHeightsVal.length = 0
        listHeightsVal.push(height)
        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeightsVal.push(height)
        };
    }

    function onScroll(pos) {
        scrollY.value = -pos.y
    }

    return {
        groupRef,
        fixedTitle,
        onScroll,
        fixedStyle
    }
}
