<template>
  <div class="singer-detail">
    <music-list
      :title="title"
      :pic="pic"
      :songs="songs"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import { getTopDetail } from '@/service/top-list'
import { TOPDETAIL_KEY } from '@/assets/js/constance'
import createDetailComponent from '@/assets/js/create-detail-component'

export default createDetailComponent('TopDetail', TOPDETAIL_KEY, getTopDetail)

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
