import { ref } from 'vue'
export default function useMiddleInteractive() {
    const currentShow = ref('cd') // 控制底部点动
    const middleLStyle = ref(null)
    const middleRStyle = ref(null)
    let currentView = 'cd' // 当前展示视图
    const touch = {}
    function onTouchStart(e) {
        touch.startX = e.touches[0].pageX // 保存touch开始位置
        touch.startY = e.touches[0].pageY
        touch.directionLocked = ''
    }

    function onTouchMove(e) {
        const currentPageX = e.touches[0].pageX // 当前位置
        const currentPageY = e.touches[0].pageY

        const deltaX = currentPageX - touch.startX // 偏移量
        const deltaY = currentPageY - touch.startY

        if (!touch.directionLocked) {
            touch.directionLocked = Math.abs(deltaX) >= Math.abs(deltaY) ? 'h' : 'v'
        }

        if (touch.directionLocked === 'v') {
            return
        }

        const lyricLeft = currentView === 'cd' ? '0' : -window.innerWidth // 默认是在视图外侧
        const offsetLeft = Math.min(0, Math.max(lyricLeft - 0 + deltaX, -window.innerWidth))
        touch.precent = Math.abs(offsetLeft / window.innerWidth) // 移动百分比 //取绝对值
        if (currentView === 'cd') {
            if (touch.precent > 0.2) { // 移动距离超过20%
                currentShow.value = 'lyric'
            } else {
                currentShow.value = 'cd'
            }
        } else {
            if (touch.precent < 0.8) { // 移动距离超过20%
                currentShow.value = 'cd'
            } else {
                currentShow.value = 'lyric'
            }
        }

        middleLStyle.value = {
            opacity: 1 - touch.precent
        }
        middleRStyle.value = {
            transform: `translate3D(${offsetLeft}px, 0, 0)`
        }
    }

    function onTouchEnd(e) {
        let offsetLeft, opacity
        if (currentShow.value === 'cd') {
            currentView = 'cd'
            offsetLeft = 0
            opacity = 1
        } else {
            currentView = 'lyric'
            offsetLeft = -window.innerWidth
            opacity = 0
        }

        const duration = 300
        middleLStyle.value = {
            opacity,
            transitionDuration: `${duration}ms`
        }
        middleRStyle.value = {
            transform: `translate3D(${offsetLeft}px, 0,0)`,
            transitionDuration: `${duration}ms`
        }
    }

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        currentShow,
        middleRStyle,
        middleLStyle
    }
}
