<template>
    <div class="search-input">
        <i class="icon-search"></i>
        <input type="text" v-model="query" class="input-inner"/>
        <i v-show="query" @click="clear" class="icon-dismiss"></i>
    </div>
</template>

<script>
import { defineComponent, ref, watch, watchEffect } from 'vue'
import { debounce } from 'throttle-debounce'
export default defineComponent({
    name: 'SearchInput',
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    // 如果props在此处解构会丢失响应式
    setup(props, { emit }) {
        const query = ref(props.modelValue)

        watchEffect(() => {
            query.value = props.modelValue
        })

        watch(query, debounce(300, (newQuery) => {
            emit('update:modelValue', newQuery)
        }))

        // 清空
        function clear() {
            query.value = ''
        }

        return {
            query,
            clear
        }
    }
})
</script>

<style lang="scss" scoped>
  ;.search-input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 32px;
    background: $color-highlight-background;
    border-radius: 6px;
    .icon-search {
      font-size: 24px;
      color: $color-text-d;
    }
    .input-inner {
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: $color-highlight-background;
      color: $color-text;
      font-size: $font-size-medium;
      outline: 0;
      &::placeholder {
        color: $color-text-d;
      }
    }
    .icon-dismiss {
      font-size: 16px;
      color: $color-text-d;
    }
  }
</style>
