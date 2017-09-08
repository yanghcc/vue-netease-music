<template>
  <div class="playList">
      <h2 class="least-music">歌单详情</h2>
      <ul class="full-list">
        <li v-for="(item, index) in songs" :key="index"><router-link :to="{path: '/player', query: { id: item.id }}" v-text="index + 1 + '、' + item.name"></router-link></li>
      </ul>
  </div>
</template>

<script>
import {util} from '../util/utils.js'
import { Indicator } from 'mint-ui'
export default {
  name: 'playList',
  data () {
    return {
      songs: [],
      allLoaded: false
    }
  },
  created () {
    this.getData()
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
  .full-list{
    padding: 0 10px;
  }
  .full-list li{
    border-bottom: 1px solid #ccc;
    text-align: left;
    &:last-child{
      border-bottom: 0;
    }
  }
  .full-list li a{
    display: block;
    padding: 10px 0;
  }
  .least-music{
    text-align: left;
    padding-left: 10px;
    margin-top: 10px;
    border-left: 3px solid red;
  }
</style>
