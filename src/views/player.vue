<template>
  <div class="player">
    <div class="player-bg" :style="{backgroundImage: 'url('+ bg +')'}"></div>
    <div class="shadow-bg"></div>
    <div class="content">
      <audio :src="songLink" autoplay></audio>
      <p v-for="(item,i) in lrc" :key="item" :class="i==0?'height-light':''">{{item}}</p>
    </div>
  </div>
</template>

<script>
import {util} from '../util/utils.js'
export default {
  name: 'player',
  data () {
    return {
      songLink: '',
      lrcObj: {},
      lrc: '',
      bg: ''
    }
  },
  created () {
    this.getSong()
  },
  methods: {
    // TODO:获取歌曲
    getSong: function () {
      const Murl = '/api/music/url?id=' + util.getQueryString('id')
      const Lurl = '/api/lyric?id=' + util.getQueryString('id')
      const Surl = '/api/song/detail?ids=' + util.getQueryString('id')
      let _this = this
      function getUrl (url) {
        return _this.$axios.get(url)
      }
      this.$axios.all([getUrl(Murl), getUrl(Lurl), getUrl(Surl)])
      .then(this.$axios.spread((acct, perms, img) => {
        let song = acct.data.data[0].url
        let lrc = perms.data.lrc.lyric
        let wolds = lrc.split(/\[[^\]]+\]/g)
        let time = lrc.match(/\[[^\]]+\]/g)
        wolds.shift()
        let bg = img.data.songs[0].al.picUrl
        this.songLink = song
        this.lrcObj = {
          wolds: wolds,
          time: time
        }
        this.lrc = wolds
        console.log(lrc)
        this.bg = bg
      }))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .player{
    height: 100%;
    position: relative;
  }
  .player-bg{
    -webkit-filter: blur(80px); /* Chrome, Opera */
      -moz-filter: blur(80px);
      -ms-filter: blur(80px);
          filter: blur(80px);
          width: 100%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          position: fixed;
          top: 0;
          left: 0;
          z-index: -1;
          background-color:rgba(0,0,0,0.2)
  }
  .shadow-bg{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background-color:rgba(0,0,0,0.2)
  }
  .content{
    padding: 100px 0;
  }
  .content p{
    font-size: 50px;
    text-align: center;
    color: hsla(0,0%,100%,.6)
  }
  .height-light{
    color:#fff!important;
  }
</style>
