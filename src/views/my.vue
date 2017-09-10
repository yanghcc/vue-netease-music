<template>
  <div class="my">
      wo de
  </div>
</template>

<script>
import {util} from '../util/utils.js'
import { Indicator } from 'mint-ui'
export default {
  name: 'my',
  data () {
    return {
    }
  },
  created () {
    Indicator.open()
  },
  methods: {
    getUrl: function (url, options) {
      return this.$axios(
        {
          method: 'get',
          url: url,
          params: options
        }
      )
    },
    // TODO:获取歌曲
    getData: function () {
      const Murl = '/api/playlist/detail'
      let ops = {
        id: util.getQueryString('id')
      }
      this.$axios.all([this.getUrl(Murl, ops)])
      .then(this.$axios.spread((res) => {
        let data = res.data
        if (data.code === 200) {
          this.songs = data.playlist.tracks
        }
        console.log(data)
        Indicator.close()
      }))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
