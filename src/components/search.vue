<template>
  <div class="search">
    <div class="search-wrapper">
      <input type="text" placeholder="搜索音乐" v-model="keywords" class="search-box" @focus="changeBtn" @blur="blur" @change="searchSuggest">
      <button class="search-btn" v-text="btn" @click="getData"></button>
    </div>
    <div class="suggest-wrapper" :style="{display: isSearch}">
      <div class="seggest-content">
        <ul class="suggest suggest-songs" >
          <li v-for="item in suggestSongs" :key="item"><router-link :to="{ path: '/player', query: { id: item.id }}" v-text="item.name"></router-link></li>
        </ul>
        <ul class="suggest suggest-playlist" >
          <li v-for="item in suggestPlaylist" :key="item" v-text="item.name"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      btn: '搜索',
      suggestSongs: [],
      suggestPlaylist: [],
      keywords: '',
      isSearch: 'block'
    }
  },
  mounted () {
  },
  watch: {
    keywords: function () {
      let kw = this.keywords
      this.searchSuggest(kw)
    }
  },
  methods: {
    searchSuggest: function (arg) {
      let url = '/api/search/suggest'
      this.$axios.get(url, {
        params: {
          keywords: arg || this.keywords
        }
      })
      .then((res) => {
        console.log(res)
        let data = res.data
        if (res.status === 200) {
          this.suggestSongs = data.result.songs
          this.suggestPlaylist = data.result.playlists
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    changeBtn: function (argument) {
      this.btn = '取消'
    },
    blur: function (argument) {
      this.btn = '搜索'
    },
    getData: function () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .search{
    position: relative;
  }
  .search-wrapper{
    background-color: red;
    padding: 10px 0;
  }
  .search-box{
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 18px;
    background-color: #fff;
  }
  .search-btn{
    padding: 5px;
    background-color: transparent;
    color: #fff;
    font-size: 20px;
  }
  .suggest-wrapper{
    /* width: 100%; */
    /* height: auto; */
    /* transition: height .3 ease; */
    /* height: 500px;
    overflow: auto;
    background-color: #eee;
    position: absolute;
    top: 179px;
    left: 0;
    z-index: 999; */
  }
</style>
