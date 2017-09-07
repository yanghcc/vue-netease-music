// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import Axios from 'axios'
import Jsonp from 'vue-jsonp'
import 'mint-ui/lib/style.css'
import './assets/reset.css'
Vue.use(Mint)
Vue.use(Jsonp)
Vue.config.productionTip = false
Vue.prototype.$axios = Axios

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
