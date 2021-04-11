// tabComponents/pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let componentsList = []
    try {
      Object.keys(__wxConfig.page).map((key, index) => {
        if (index === 0) throw key
      })
    } catch (error) {
      let {
        window: {
          usingComponents
        }
      } = __wxConfig.page[error]
      componentsList = Object.keys(usingComponents).map(url => {
        return {
          name: `${url}`,
          url
        }
      })
    }
    this.setData({
      componentsList
    })
  },
  jump: e => wx.$router.jump(e),

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