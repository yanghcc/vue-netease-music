<template>
  <div class="index">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <Search></Search>
      <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
      <h2 class="least-music">最新音乐</h2>
      <ul class="full-list">
        <li v-for="(item,index) in songsList" :key="index"><router-link :to="{ path: '/player', query: { id: item.id }}" v-text="item.name"></router-link></li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
import Search from '../components/search.vue'
export default {
  name: 'index',
  data () {
    return {
      songsList: [],
      allLoaded: false
    }
  },
  components: {
    Search
  },
  created () {
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
      let api = '/api/top/list'
      this.$axios({
        method: 'get',
        url: api,
        params: {
          idx: 1
        }
      })
      .then((res) => {
        let data = res.data
        console.log(res)
        if (data.code === 200) {
          this.songsList = data.result.tracks
        }
      })
      .catch((error) => {
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
  .index{
    height: 100%;
  }
  .full-list{
    padding: 0 30px;
  }
  .full-list li{
    border-bottom: 1px solid #ccc;
    text-align: left;
  }
  .full-list li a{
    display: block;
  }
  .mint-swipe{
    height: 500px;
  }
  .least-music{
    font-size: 50px;
  }
</style>
