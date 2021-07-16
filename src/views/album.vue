<template>
  <div class="album">
      <music-list
      :title="title"
      :pic="pic"
      :songs="songs"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import createDetailComponent from '@/assets/js/create-detail-component'
import { ALBUM_KEY } from '@/assets/js/constance'
import { getAlbum } from '@/service/recommend'

export default createDetailComponent('Album', ALBUM_KEY, getAlbum)
</script>

<style lang="scss" scoped>
;.album {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
