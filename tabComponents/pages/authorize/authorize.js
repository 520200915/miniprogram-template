// tabComponents/pages/authorize/authorize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scopeList: [
      'userInfo',
      'userLocation',
      'userLocationBackground',
      'address',
      'invoiceTitle',
      'invoice',
      'werun',
      'record',
      'writePhotosAlbum',
      'camera'
    ],
    scopeName: {
      'userInfo': '用户信息',
      'userLocation': '地理位置',
      'userLocationBackground': '后台定位',
      'address': '通讯地址',
      'invoiceTitle': '发票抬头',
      'invoice': '获取发票',
      'werun': '微信运动步数',
      'record': '录音功能',
      'writePhotosAlbum': '保存到相册',
      'camera': '摄像头'
    }
  },
  click(e) {
    console.log(e)
    let {
      type
    } = e.currentTarget.dataset
    this.setData({
      type,
      settingStatus: !this.data.settingStatus //检查授权状态
    })
  },
  /**授权成功回调 */
  success(e) {
    console.log(e)
    wx.$util.showToast(e.detail.message)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})