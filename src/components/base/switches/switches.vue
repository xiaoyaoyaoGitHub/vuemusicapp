<template>
    <ul class="switches">
        <li class="switch-item" @click="selectItem(index)" v-for="(item, index) in items" :key="index" :class="{'active':index === modelValue}">
            <span>{{item}}</span>
        </li>
        <div class="active-bar" :style="activeBar"></div>
    </ul>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'Switches',
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        },
        modelValue: {
            type: Number,
            default: 0
        }
    },
    setup(props, { emit }) {
        const activeBar = computed(() => {
            const x = 120 * (props.modelValue)
            return {
                transform: `translate3D(${x}px, 0,0)`
            }
        })

        function selectItem(index) {
            emit('update:modelValue', index)
        }

        return {
            selectItem,
            activeBar
        }
    }
})
</script>
<style scoped lang="scss">
  ;.switches {
    display: flex;
    position: relative;
    align-items: center;
    width: 240px;
    margin: 0 auto;
    border: 1px solid $color-highlight-background;
    border-radius: 5px;
    .switch-item {
      position: relative;
      z-index: 10;
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text-d;
      &.active {
        color: $color-text
      }
    }
    .active-bar {
      position: absolute;
      left: 0;
      top: 0;
      width: 120px;
      height: 30px;
      transition: transform 0.3s;
      border-radius: 5px;
      background: $color-highlight-background;
    }
  }
</style>
