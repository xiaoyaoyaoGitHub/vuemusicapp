
import { ref } from 'vue'
import animations from 'create-keyframe-animation'
export default function useAnimation() {
    const cdWrapperRef = ref(null)
    let leaving = false
    let entering = false

    function enter(el, done) {
        if (leaving) { // 如果leave动画还没完成则手动调用afterleave
            afterLeave()
        }
        entering = true
        const { x, y, scale } = getPosAndScale()
        const animation = {
            0: {
                transform: `translate3D(${x}px, ${y}px, 0) scale(${scale})`
            },
            100: {
                transform: 'translate3D(0, 0,0 ) scale(1)'
            }
        }

        animations.registerAnimation({
            name: 'move',
            animation,
            presets: {
                duration: 600,
                easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
            }
        })

        animations.runAnimation(cdWrapperRef.value, 'move', done)
    }

    function afterEnter() {
        entering = false
        animations.unregisterAnimation('move')
        cdWrapperRef.value.style.animation = ''
    }

    function leave(el, done) {
        if (entering) { // 如果enter还没执行完,则手动调动afterenter完成动画
            afterEnter()
        }
        leaving = true
        const { x, y, scale } = getPosAndScale()
        const cdWrapperRefVal = cdWrapperRef.value
        cdWrapperRefVal.style.transition = 'all 0.6s cubic-bezier(0.45, 0, 0.55, 1)'
        cdWrapperRefVal.style.transform = `translate3D(${x}px, ${y}px, 0) scale(${scale})`
        cdWrapperRefVal.addEventListener('transitionend', next)

        function next() {
            cdWrapperRefVal.removeEventListener('transitionend', next)
            done()
        }
    }

    function afterLeave() {
        leaving = false
        const cdWrapperRefVal = cdWrapperRef.value
        cdWrapperRefVal.style.transition = ''
        cdWrapperRefVal.style.transform = ''
    }

    function getPosAndScale() {
        const targetWidth = 40 // 小cd 直径
        const paddingLeft = 40 // 大cd 距离左侧位置
        const paddingBottom = 30 // 小cd 中心点距离底部位置
        const paddingTop = 80 // 大cd 距离顶部位置
        const width = window.innerWidth * 0.8 // 大cd 直径
        const x = paddingLeft - window.innerWidth / 2 // x坐标偏移量
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom // y轴偏移量
        const scale = targetWidth / width // 缩放比

        return {
            x,
            y,
            scale
        }
    }

    return {
        cdWrapperRef,
        enter,
        afterEnter,
        leave,
        afterLeave
    }
}
