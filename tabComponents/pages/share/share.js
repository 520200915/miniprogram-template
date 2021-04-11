// tabComponents/pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxShare: true, //是否使用微信分享样式,默认为false 
    /**
     * 单位为PX
     */
    canvasObject: {
      /** 如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素 */
      backgroundColor: '#fff', //默认为#fff
      width: 400, //默认 600rpx 
      height: 800, //默认 300rpx
      imgList: [],
      lines: [{
        startX: 0,
        startY: 760,
        endX: 400,
        endY: 760,
        width: 10,
        color: '#096',
        opacity: .5
      }],
      textList: [{
          text: '测试长度ABC',
          x: 0,
          y: 440,
          color: '#096',
          fontSize: 36,
          textBaseline: 'top',
          textAlign: 'left',
          // textDecoration: 'overline',
          // textWidth:'80',
          textDecoration: 'line-through'
        },
        {
          text: '林则徐名言：\t苟利国家生死以岂因祸福避趋之',
          x: 100,
          y: 520,
          color: '#333',
          fontSize: 40,
          fontWeight: 700, //字体加粗,同CSS
          /**
           * textBaseline
           * top, middle,bottom,normal
           * 默认 normal
           */
          textBaseline: 'top',
          /**
           * textDecoration
           * underline:定义文本下的一条线。
           * overline:定义文本上的一条线。
           * line-through:定义穿过文本下的一条线。
           */
          textDecoration: 'underline',
          /**
           * textAlign
           * left, center, right
           * 默认 left
           */
          textAlign: 'left',
          lineNum: 4, //默认1行
          lineHeight: 60, // 行高，默认是字符大小
          opacity: .5, //透明度
        }
      ],
      
    }
  },
  /**
   * 点击||隐藏分享组件
   */
  share() {
    this.setData({
      showShare: !this.data.showShare
    })
  },
  draw(e) {
    console.log(e)
  },
  init(e) {
    console.log(e)
    this.setData({
      shareImg: e.detail.previewImg
    })
  },
  num: 1,
  watch: {
    num(n, o) {
      console.log(n, o)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imgList = [{
        url: 'https://img01.glsx.com.cn/weapp/resource/glsx-web/images/common/logo.png',
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        borderRadius: '100%'
      },
      {
        url: 'https://img01.glsx.com.cn/weapp/resource/glsx-web/images/common/GLSX.png',
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        borderRadius: '100%'
      }
    ]
    this.setData({
      ['canvasObject.imgList']: imgList
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
  onShow: function () {},

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
    console.log(this.data.shareImg)
    return {
      title: `恒河猴`,
      imageUrl: this.data.shareImg
    }
  }
})