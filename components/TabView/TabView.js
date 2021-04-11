
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: []
    },
    height: {
      type: String,
      value: '100vh'
    },
    tagIndex: {
      type: Number,
      value: 0,
      observer: function (n, o) {
        this.setData({
          count: n
        })
      }
    },
    key: {
      type: String,
      value: 'name'
    },
    showClickLoading:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    scrollTop: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {
      let {
        item,
        index
      } = e.currentTarget.dataset
      if(this.data.count === index) return
      if(this.properties.showClickLoading) wx.$util.showLoading('')
      item.index = index
      this.setData({
        count: index,
        scrollTop: 0
      })
      this.triggerEvent('click', item)
      wx.nextTick(()=>{
        wx.hideLoading()
      })
    },
    tabScrollTolower(e) {
      this.triggerEvent('tabScrollTolower')
    },
    viewScrollTolower(e) {
      this.triggerEvent('viewScrollTolower')
    }
  },
  ready() {

  }
})