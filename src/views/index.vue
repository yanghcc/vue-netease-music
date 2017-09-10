<template>
  <div class="index">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <Search></Search>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in songList" :key="index">
          <router-link :to="{ path: '/playList', query: { id: item.id }}" class="block">
            <img :src="item.picUrl" alt="">
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
      <h2 class="least-music">最新音乐</h2>
      <ul class="full-list">
        <li v-for="(item,index) in songs" :key="index"><router-link :to="{path: '/player', query: { id: item.id }}" v-text="index + 1 + '、' + item.name"></router-link></li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
import Search from '../components/search.vue'
import { Indicator } from 'mint-ui'
export default {
  name: 'index',
  data () {
    return {
      songs: [],
      songList: [],
      allLoaded: false
    }
  },
  components: {
    Search
  },
  created () {
    this.getData()
    Indicator.open()
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
      const Murl = '/api/top/list'
      let list = '/api/personalized'
      let ops = {
        idx: 1
      }
      this.$axios.all([this.getUrl(Murl, ops), this.getUrl(list)])
      .then(this.$axios.spread((res, perms) => {
        let data = res.data
        let songList = perms.data
        if (data.code === 200) {
          this.songs = data.result.tracks
          this.songList = songList.result
        }
        console.log(this.songList)
        Indicator.close()
        this.allLoaded = true
        this.$refs.loadmore.onTopLoaded()
      }))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  body{
    font-size: 20px;
  }
  .index{
    height: 100%;
  }
  .full-list{
    padding: 0 10px;
    margin-bottom: 60px;
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
  .mint-swipe{
    height: 300px;
    background-color: #ccc;
  }
  .least-music{
    text-align: left;
    padding-left: 10px;
    margin-top: 10px;
    border-left: 3px solid red;
  }
  .block{
    display: block;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .navbar{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    .nav-item{
      font-size: 12px;
    }
  }
</style>
