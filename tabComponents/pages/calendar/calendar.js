// tabComponents/pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calenderHeight: '70%',
    showConfirm: true,
    value:new Date().format('yyyy-MM-dd'),
    rangeText:{
      start:'开始时间',
      end:'结束时间'
    }
  },
  select(e) {
    console.log(e)
    let {
      target
    } = e.currentTarget.dataset
    let {
      date
    } = e.detail
    this.setData({
      [target]: date
    })
  },
  multipleSelect(e){
    let {
      date
    } = e.detail
    this.setData({
      multipleValue: `选择了${date.length}个日期`
    })
  },
  rangeSelect(e){
    let {
      start,
      end
    } = e.detail.date
    this.setData({
      rangeValue: `${start} 至 ${end}`
    })
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