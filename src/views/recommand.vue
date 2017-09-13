<template>
  <div class="recommand">
      find
      <mt-tabbar class="is-fixed">
      <mt-tab-item id="外卖">
        <router-link to="/" class="block">
          <div class="mint-tab-item-icon">
            <i class="iconfont">&#xe601;</i>
          </div>
          首页
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="发现">
        <router-link to="/recommand" class="block">
          <div class="mint-tab-item-icon">
            <i class="iconfont">&#xe691;</i>
          </div>
          发现
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <router-link to="/my" class="block">
          <div class="mint-tab-item-icon">
            <i class="iconfont">&#xe755;</i>
          </div>
          我的
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import {util} from '../util/utils.js'
import { Indicator } from 'mint-ui'
export default {
  name: 'recommand',
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
