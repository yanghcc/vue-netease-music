<template>
  <div class="search">
    <input type="text" placeholder="邓丽君" v-model="keywords" class="search-box" @focus="changeBtn" @blur="blur" @change="searchSuggest">
    <button class="search-btn" v-text="btn" @click="getData"></button>
    <ul class="suggest" v-for="item in suggestWords">
      <li v-text="item.name"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    // console.log(this)
    return {
      btn: '搜索',
      suggestWords: [1, 2],
      keywords: ''
    }
  },
  mounted () {
    // console.log(this.searchSuggest)
  },
  methods: {
    searchSuggest: function (argument) {
      let suggest = '/api/search/suggest'
      this.$axios.get(suggest, {
        params: {
          keywords: this.keywords
        }
      })
      .then((res) => {
        console.log(res)
        let data = res.data
        if (res.status === 200) {
          this.suggestWords = data.result.songs
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
    getData: function (argument) {
      let proxy = 'https://bird.ioliu.cn/v1?url='
      let api = proxy + 'https://api.imjad.cn/cloudmusic'
      // let URLprefix = 'https://bird.ioliu.cn'
      // let list = `${URLprefix}/netease/song`
      this.$axios.post(api, {
        params: {
          type: 'song',
          id: '229010'
        }
      })
      .then(function (res) {
        console.log(res)
        if (res.status === 200) {
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
  .search{
    background-color: red;
    padding: 50px 0;
  }
  .search-box{
    padding: 10px 30px;
    font-size: 50px;
    border-radius: 40px;
  }
  .search-btn{
    padding: 10px 20px;
    background-color: transparent;
    color: #fff;
    font-size: 50px;
  }
</style>
