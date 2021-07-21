<template>
    <div class="search-list">
        <transition-group name="list" tag="ul">
            <li class="search-item" v-for="search in searches" :key="search.id">
                <span class="text">{{search.name}}</span>
                <span class="icon">
                    <i class="icon-delete"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SearchList',
    props: {
        searches: {
            type: Array,
            default() {
                return []
            }
        }
    },
    setup() {

    }
})
</script>

<style lang="scss" scoped>
  ;.search-list {
    .search-item {
      display: flex;
      align-items: center;
      height: 40px;
      overflow: hidden;
      .text {
        flex: 1;
        color: $color-text-l;
      }
      .icon {
        @include extend-click();
        .icon-delete {
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }
</style>
