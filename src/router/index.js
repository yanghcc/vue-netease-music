import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Player from '@/views/player'
import PlayList from '@/views/PlayList'
import Recommand from '@/views/recommand'
import My from '@/views/my'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: Index
  }, {
    path: '/player',
    name: 'player',
    component: Player
  }, {
    path: '/playList',
    name: 'playList',
    component: PlayList
  }, {
    path: '/my',
    name: 'my',
    component: My
  }, {
    path: '/recommand',
    name: 'recommand',
    component: Recommand
  }]
})
