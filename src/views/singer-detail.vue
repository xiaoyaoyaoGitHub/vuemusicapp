<template>
  <div class="singer-detail">
    singer detail
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getSingerDetail } from '@/service/singer'
export default defineComponent({
  name: 'SingerDetail',
  data() {
    return {}
  },
  props: {
    singer: {
      type: Object
    }
  },
  async created() {
    const res = await getSingerDetail(this.singer.mid)
    console.log(res)
  }
})
</script>

<style lang="scss" scoped>
;.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
