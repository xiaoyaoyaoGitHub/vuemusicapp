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
import { getSingerDetail } from '@/service/singer'
import { SINGER_KEY } from '@/assets/js/constance'
import createDetailComponent from '@/assets/js/create-detail-component'

export default createDetailComponent('SingerDetail', SINGER_KEY, getSingerDetail)
// export default defineComponent(
//   {
//   name: 'SingerDetail',
//   data() {
//     return {
//       songs: [],
//       loading: false
//     }
//   },
//   props: {
//     singer: {
//       type: Object
//     }
//   },
//   computed: {
//     querySinger() {
//       let singer = null
//       if (this.singer) {
//         singer = this.singer
//       } else {
//         const cacheSinger = Storage.session.get(SINGER_KEY)
//         if (cacheSinger && cacheSinger.mid === this.$route.params.id) {
//           singer = cacheSinger
//         }
//       }
//       return singer
//     },
//     title() {
//       return this.querySinger && this.querySinger.name
//     },
//     pic() {
//       return this.querySinger && this.querySinger.pic
//     }
//   },
//   components: {
//     MusicList
//   },
//   async created() {
//     try {
//       console.log(this.querySinger)
//       console.log(this.$route)
//       if (!this.querySinger) { // 如果不存在则回到上一个页面
//         this.$router.push({
//           path: this.$route.matched[0].path
//         })
//         return
//       }
//       this.loading = true
//       const res = await getSingerDetail(this.querySinger)
//       const songs = await processSongs(res.songs)
//       this.songs = songs
//       this.loading = false
//     } catch (err) {
//       console.log(err)
//     }
//   }
// })

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
