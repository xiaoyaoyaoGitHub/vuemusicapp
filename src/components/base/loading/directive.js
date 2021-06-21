import { createApp } from 'vue'
import Loading from './loading.vue'
import { addClass, removeclass, removeClass } from '@/assets/js/dom.js'

const relativeClass = 'g-relative'

const loadingDirective = {
    mounted(el, binging) {
        const loadingApp = createApp(Loading)
        const loadInstance = loadingApp.mount(document.createElement('div'))
        el.instance = loadInstance
        const title = binging.arg
        if (title !== undefined) {
            loadInstance.setTitle(title)
        }
        append(el)
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
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
        addClass(el, relativeClass)
    }
    el.appendChild(el.instance.$el)
}

function remove(el) {
    removeClass(el, relativeClass)
    el.removeChild(el.instance.$el)
}

export default loadingDirective
