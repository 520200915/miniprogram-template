//app.js
import api from './api/api.js'
import router from './router/index.js'
import util from './utils/util.js'
App({
  onLaunch: function () {
    /**挂载到wx对象 */
    wx.$util = util
    wx.$api = api
    wx.$router = router
  },
  globalData: {

  }
})