<template>
  <div class="player">
    <div class="player-bg" :style="{backgroundImage: 'url('+ bg +')'}"></div>
    <div class="shadow-bg"></div>
    <div class="content" :style="{top: top}">
      <div class="audio-ctrl-bar">
        <div class="progress-out">
          <mt-progress :value="progress" :bar-height="5"></mt-progress>
        </div>
        <button type="button" @click="playPrev"><i class="iconfont">&#xe608;</i></button>
        <button type="button" @click="playCtrl"><i class="iconfont" v-html="playIcon"></i></button>
        <button type="button" @click="playNext"><i class="iconfont">&#xe607;</i></button>
        <button type="button" @click="volumeCtrl"><i class="iconfont" v-html="volumeIcon"></i></button>
        <span class="range-outer">
          <mt-range v-model="rangeValue"></mt-range>
        </span>
        <button type="button" @click="download"><i class="iconfont">&#xe69f;</i></button>
      </div>
      <audio :src="songLink" id="media"></audio>
      <p v-for="(item,i) in lrc" :key="item" :class="i === index?'height-light':''">{{item}}</p>
    </div>
  </div>
</template>

<script>
import {util} from '../util/utils.js'
import { Indicator } from 'mint-ui'
export default {
  name: 'player',
  data () {
    return {
      Media: null,
      songLink: '',
      lrcObj: {},
      lrc: '',
      bg: '',
      playIcon: '&#xe633;',
      volumeIcon: '&#xe80a;',
      volume: null,
      rangeValue: 1,
      playTime: 0,
      progress: 0,
      index: 0,
      top: 0
    }
  },
  created () {
    Indicator.open()
    this.getSong()
  },
  mounted () {
    this.Media = document.getElementById('media')
    this.Media.addEventListener('play', () => {
      this.rangeValue = this.Media.volume * 100
      this.playTime = this.Media.duration
      setInterval(() => {
        this.progress = this.Media.currentTime / this.playTime * 100
      }, 1000)
      this.progress = this.Media.currentTime / this.playTime * 100
    })
    this.Media.addEventListener('timeupdate', () => {
      let time = this.lrcObj.time
      let currtime = this.Media.currentTime
      time.forEach((val, index) => {
        if (currtime > time[index]) {
          this.index = index
          this.top = -(index * 28) + 'px'
        }
      })
    })
    this.Media.addEventListener('canplaythrough', () => {
      this.playCtrl()
      this.volume = this.Media.volume
    })
  },
  watch: {
    rangeValue: function (val) {
      this.Media.volume = val / 100
      if (val === 0) {
        this.volumeIcon = '&#xe6a5;'
      } else {
        this.volumeIcon = '&#xe80a;'
      }
    }
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
          time: this.handleTimeFormate(time)
        }
        this.lrc = wolds
        this.bg = bg
        // console.log(time)
        Indicator.close()
      }))
    },
    playCtrl: function () {
      if (this.Media.paused) {
        this.Media.play()
        this.playIcon = '&#xe81e;'
      } else {
        this.Media.pause()
        this.playIcon = '&#xe633;'
      }
    },
    volumeCtrl: function () {
      this.volumeIcon = '&#xe6a5;'
      if (!this.Media.muted) {
        this.volumeIcon = '&#xe6a5;'
        this.Media.muted = true
      } else {
        this.volumeIcon = '&#xe80a;'
        this.Media.muted = false
      }
    },
    playPrev: function () {

    },
    playNext: function () {

    },
    download: function () {

    },
    transformTime: function (seconds) {
      let m, s
      m = Math.floor(seconds / 60)
      m = m.toString().length === 1 ? ('0' + m) : m
      s = Math.floor(seconds - 60 * m)
      s = s.toString().length === 1 ? ('0' + s) : s
      return m + ':' + s
    },
    handleTimeFormate: function (arr) {
      let temp = []
      arr.forEach((val, i) => {
        let m = arr[i].split(':')[0].replace('[', '')
        let s = arr[i].split(':')[1].replace(']', '')
        let t = m * 60 + s * 1
        temp.push(t)
      })
      return temp
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
  .content {
    padding: 100px 0;
    position: relative;
    transition: top .5s ease;
    p {
      font-size: 18px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      color: hsla(0, 0%, 100%, .6)
    }
  }
  .height-light{
    color:#fff!important;
  }
  .audio-ctrl-bar{
    display: inline-block;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 50px;
    background-color: #ccc;
    opacity: .8;
    padding: 10px 0;
  }
  .progress-out{
    margin-top: -22px;
    position: absolute;
    left: 0;
    right: 0;
  }
  .range-outer{
    display: inline-block;
    width: 80px;
  }
</style>
