// pages/page2/page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  back(){
    wx.$router.back(page =>{
      page.setData({
        show:true,
        ['page2Obj.c[2]']:123,
      })
      page.num = '10086'
    })
  },
  jump(){
    wx.$router.go('page3')
  },
  onRoute(options){
    console.log('通过onRoute',options)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.$router.getData(res =>{
      console.log('通过getData',res)
    })
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