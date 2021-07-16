import MusicList from '@/components/music-list/music-list'
import { processSongs } from '@/service/song'
import Storage from 'good-storage'

export default function (name, sessionKey, fetch) {
    return {
        name,
        data() {
            return {
                songs: [],
                loading: false
            }
        },
        props: {
            data: {
                type: Object
            }
        },
        computed: {
            computedData() {
                let data = null
                if (this.data) {
                    data = this.data
                } else {
                    const cache = Storage.session.get(sessionKey)
                    if (cache && cache.mid === this.$route.params.id) {
                        data = cache
                    }
                }
                console.log(data)
                return data
            },
            title() {
                return this.computedData && this.computedData.name
            },
            pic() {
                return this.computedData && this.computedData.pic
            }
        },
        components: {
            MusicList
        },
        async created() {
            try {
                const data = this.computedData
                if (!data) { // 如果不存在则回到上一个页面
                    this.$router.push({
                        path: this.$route.matched[0].path
                    })
                    return
                }
                this.loading = true
                const res = await fetch(data)
                const songs = await processSongs(res.songs)
                this.songs = songs
                this.loading = false
            } catch (err) {
                console.log(err)
            }
        }
    }
}
