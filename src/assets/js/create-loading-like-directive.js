import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom.js'

const relativeClass = 'g-relative'

export default function CreateLoadingLikeDirective(Comp) {
    return {
        mounted(el, binging) {
            const compApp = createApp(Comp)
            const instance = compApp.mount(document.createElement('div'))
            const name = Comp.name
            if (!el[name]) {
                el[name] = {}
            }
            el[name].instance = instance // 开辟各个指令自己的name空间,防止覆盖
            const title = binging.arg
            if (title !== undefined) {
                instance.setTitle(title)
            }
            if (binging.value) {
                append(el)
            }
        },
        updated(el, { value, oldValue }) {
            if (value !== oldValue) {
                value ? append(el) : remove(el)
            }
        }
    }

    function append(el) {
        // 主动给父元素添加relative
        const style = getComputedStyle(el)
        const name = Comp.name
        if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
            addClass(el, relativeClass)
        }
        el.appendChild(el[name].instance.$el)
    }

    function remove(el) {
        const name = Comp.name
        removeClass(el, relativeClass)
        el.removeChild(el[name].instance.$el)
    }
}
