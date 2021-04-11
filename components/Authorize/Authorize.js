// components/Authorize/Authorize.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scopeType: String,
    checkSetting: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        this.check()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 禁止滑动
     */
    noScroll: wx.$util.noScroll(),
    cancel() {
      this.setData({
        openSet: false
      })
    },
    check() {
      const _this = this
      let {
        scopeType
      } = this.properties
      let type = `scope.${scopeType}`
      let buttonType = 'openSetting'
      if (type === 'scope.userInfo') buttonType = 'getUserInfo'
      this.setData({
        buttonType
      })
      wx.getSetting({
        success(res) {
          if (!res.authSetting[type]) {
            wx.authorize({
              scope: type,
              success() {
                _this.triggerEvent('success',{
                  message:'授权成功'
                })
              },
              fail() {
                _this.setData({
                  openSet: true
                })
              }
            })
          } else {
            _this.triggerEvent('success',{
              message:'已授权'
            })
          }
        }
      })
    }
  }
})