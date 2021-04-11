// tabComponents/pages/gl-textarea/gl-textarea.js
const code = `<gl-textarea \nvalue='{{value}}' \nbindinput="input" \nbindblur="blur" \nfilterEmoji='{{false}}' \nmaxlength='11' \nplaceholder='{{placeholder}}' \nshowWordLimit>\n</gl-textarea>`
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    placeholder: '参数：filterEmoji(是否过滤表情，默认true)；\nvalue(绑定数据)；\nmaxlength(最大输入长度);\ndisabled(是否禁用);\nshowWordLimit(是否显示输入数量需要跟maxlength同时使用)',
    code: code
  },
  input(e){
    console.log(e)
  },
  blur(e){
    console.log(e)
  },
  copy:()=> wx.$util.setCopyData(code),
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