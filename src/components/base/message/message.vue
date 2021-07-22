<template>
    <teleport to="body">
        <transition name="slide-down">
            <div class="message" v-show="visiable" @click="hide">
                <slot></slot>
            </div>
        </transition>
    </teleport>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from 'vue'

export default defineComponent({
    name: 'Message',
    props: {
        delay: {
            type: Number,
            default: 2000
        }
    },
    setup(props) {
        const visiable = ref(false)
        let timer
        function show() {
            visiable.value = true
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                hide()
            }, props.delay)
        }

        function hide() {
            if (timer) clearTimeout(timer)
            visiable.value = false
        }

        return {
            visiable,
            show,
            hide
        }
    }
})
</script>
<style scoped lang="scss">
  ;.message {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 400;
    background: $color-dialog-background;

    &.slide-down-enter-active, &.slide-down-leave-active {
      transition: all 0.3s
    }

    &.slide-down-enter-from, &.slide-down-leave-to {
      transform: translate3d(0, -100%, 0)
    }
  }
</style>
