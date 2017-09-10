<template>
  <div id="app">
    <router-view></router-view>
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
        <router-link to="/playList" class="block">
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
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped>
html,body{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.mint-tab-item-icon {
    width: 24px;
    height: 24px;
    margin: 0 auto 5px;
    i{
      font-size: 24px;;
    }
  }
</style>
