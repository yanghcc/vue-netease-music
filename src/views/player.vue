<template>
  <div class="player">
    <div class="player-bg" :style="{backgroundImage: 'url('+ bg +')'}"></div>
    <div class="shadow-bg"></div>
    <div class="content" :style="{top: top}">
      <div class="audio-ctrl-bar">
        <div class="progress-out">
          <mt-range v-model="progress" @change="setProgress">
            <div slot="start" class="showTime">{{transformTime(currTime)}}</div>
            <div slot="end" class="showTime">{{transformTime(playTime)}}</div>
          </mt-range>
        </div>
        <button type="button" @click="playPrev"><i class="iconfont">&#xe607;</i></button>
        <button type="button" @click="playCtrl"><i class="iconfont" v-html="playIcon"></i></button>
        <button type="button" @click="playNext"><i class="iconfont">&#xe606;</i></button>
        <button type="button" @click="volumeCtrl"><i class="iconfont" v-html="volumeIcon"></i></button>
        <span class="range-outer">
          <mt-range v-model="rangeValue"></mt-range>
        </span>
        <button type="button" @click="playModel"><i class="iconfont" v-html="playModel"></i></button>
        <!-- <a :href="downLoadLink" :download="fileName" @click="download"><i class="iconfont">&#xe69f;</i></a> -->
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
      playIcon: '&#xe667;',
      playIcons: ['&#xe667;', '&#xe62b;'],
      volumeIcon: '&#xe80a;',
      volumeIcons: ['&#xe80a;', '&#xe809'],
      playModel: '&#xe600;',
      volume: null,
      rangeValue: 1,
      playTime: 0,
      currTime: 0,
      progress: 0,
      index: 0,
      top: 0,
      downLoadLink: '',
      fileName: ''
    }
  },
  created () {
    Indicator.open()
    this.getSong()
  },
  mounted () {
    this.Media = util.getDom('#media')[0]
    this.Media.addEventListener('play', () => {
      this.rangeValue = this.Media.volume * 100
      this.playTime = this.Media.duration
      this.Media.loop = true
      setInterval(() => {
        this.currTime = this.Media.currentTime
        this.progress = this.currTime / this.playTime * 100
      }, 1000)
      this.progress = this.currTime / this.playTime * 100
    })
    this.Media.addEventListener('timeupdate', () => {
      let time = this.lrcObj.time
      time.forEach((val, index) => {
        if (this.currTime > time[index]) {
          this.index = index
          this.top = -(index * 46) + 'px'
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
        this.volumeIcon = this.volumeIcons[1]
      } else {
        this.volumeIcon = this.volumeIcons[0]
      }
    }
  },
  computed: {
    // setProgress: function (val) {
    //   this.progress = val
    // }
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
    getSong: function () {
      const Murl = '/api/music/url'
      const Lurl = '/api/lyric'
      const Surl = '/api/song/detail'
      let ops = {
        id: util.getQueryString('id')
      }
      let ops2 = {
        ids: util.getQueryString('id')
      }
      this.$axios.all([this.getUrl(Murl, ops), this.getUrl(Lurl, ops), this.getUrl(Surl, ops2)])
      .then(this.$axios.spread((acct, perms, img) => {
        let song = acct.data.data[0].url
        let lrc = perms.data.lrc.lyric
        let wolds = lrc.split(/\[[^\]]+\]/g)
        let time = lrc.match(/\[[^\]]+\]/g)
        wolds.shift()
        let bg = img.data.songs[0].al.picUrl
        let fn = img.data.songs[0].name + '.mp3'
        this.songLink = song
        this.downLoadLink = song
        this.fileName = fn
        this.lrcObj = {
          wolds: wolds,
          time: this.handleTimeFormate(time)
        }
        this.lrc = wolds
        this.bg = bg
        Indicator.close()
      }))
    },
    playCtrl: function () {
      if (this.Media.paused) {
        this.Media.play()
        this.playIcon = this.playIcons[1]
      } else {
        this.Media.pause()
        this.playIcon = this.playIcons[0]
      }
    },
    volumeCtrl: function () {
      if (!this.Media.muted) {
        this.volumeIcon = this.volumeIcons[1]
        this.Media.muted = true
      } else {
        this.volumeIcon = this.volumeIcons[0]
        this.Media.muted = false
      }
    },
    setProgress: function (val) {
      this.Media.currentTime = val * this.playTime / 100
      this.progress = val / 100
      // debugger
      // console.log(val)
    },
    playPrev: function () {

    },
    playNext: function () {

    },
    download: function () {

    },
    iconSelct: function (arr, index) {
      return arr[index]
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
    padding: 70% 0;
    position: relative;
    transition: top .5s ease;
    p {
      font-size: 18px;
      // height: 28px;
      line-height: 28px;
      text-align: center;
      color: hsla(0, 0%, 100%, .6)
    }
  }
  .height-light{
    color:#fff!important;
  }
  .audio-ctrl-bar{
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    padding: 20px 0;
    justify-content: center;
  }
  .progress-out{
    margin-top: -35px;
    position: absolute;
    left: 0;
    right: 0;
  }
  .range-outer{
    display: inline-block;
    width: 80px;
    margin-right: 10px;
  }
  .showTime{
    font-size: 12px;
    color: #fff;
    margin: 0 5px;
  }
</style>
