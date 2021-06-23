import { nextTick, ref, watch } from 'vue'

export default function useFixed(props) {
    const groupRef = ref(null) // 获取滚动条dom
    const listHeights = ref([]) // 设置数据,保存每个child的height
    const scrollY = ref(0) // 竖向滚动条的高度
    // 监听props.data的变化,是否有数据传入
    watch(() => props.data, async () => {
        await nextTick()
        calculate()
    })

    function calculate() {
        const list = groupRef.value.children
        const listHeightsVal = listHeights.value
        let height = 0
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
        onScroll
    }
}
