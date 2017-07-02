<template>
  <div class="index">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <Search></Search>
    <h2 class="least-music">最新音乐</h2>
  <ul class="full-list">
    <li v-for="item in songsList">{{ item }}</li>
  </ul>
</mt-loadmore>
  </div>
</template>

<script>
import Search from '../components/search.vue'
export default {
  name: 'index',
  data () {
    // console.log(this)
    return {
      songsList: [1, 2, 3, 4, 5, 6, 7],
      allLoaded: false
    }
  },
  components: {
    Search
  },
  mounted () {
    this.getData()
  },
  methods: {
    loadTop: function (argument) {
      // body...
      console.log('top active')
      this.getData()
    },
    loadBottom: function (argument) {
      // body...
      console.log('bottom active')
    },
    getData: function (argument) {
      // let proxy = 'https://bird.ioliu.cn/v1?url='
      // let netease = 'https://music.163.com'
      // let newsong = proxy + netease + '/weapi/v3/playlist/detail'
      let api = 'api/search'
      // let api = proxy + 'https://api.imjad.cn/cloudmusic'
      // let URLprefix = 'https://bird.ioliu.cn'
      // let list = `${URLprefix}/netease/song`
      // this.$jsonp(api, {
      //   // callbackName: 'jsonpcallback',
      //   // callbackQuery: 'cb',
      //   type: 'song',
      //   id: '229010'
      // })
      this.$axios({
        method: 'get',
        url: api,
        proxy: {
          host: 'localhost',
          port: 3000
        },
        params: {
          keywords: '海阔天空'
        }
      })
      .then(function (res) {
        console.log(res)
        if (res.status === 200) {
          this.songsList = res.data
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body{
    font-size: 50px;
  }
  .full-list li{
    border-bottom: 1px solid #ccc;
  }
</style>
