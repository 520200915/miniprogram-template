// tabComponents/pages/tab-view/tab-view.js
const code = `<tab-view tabList='{{list}}' tagIndex='{{tagIndex}}'  bindclick='tabclick' >
<view class='content'>
  <block wx:for='{{5}}' wx:key='index'>
    <view class="box" bindtap="copy">{{index}}复制代码</view>
  </block>
</view>
</tab-view>`
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:new Array(20).fill({test:'123'}),
    tagIndex:0,
    key: 'name'
  },
  tabclick(e){
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