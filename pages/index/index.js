//index.js
Page({
  data: {
    num: '0',
    page2Obj: {
      a: 1,
      b: 2,
      c: new Array(5).fill(wx.$util.decimal(Math.random() * 100,2))
    }
  },
  num:0,
  jump: e => wx.$router.jump(e),
  onLoad(options) {
    setTimeout(() => {
      this.num = '100'
    }, 3000)
  },
  watch: {
    'num'(newVal, oldVal) {
      console.log(newVal, oldVal)
      wx.showToast({
        title: newVal,
        icon: 'none'
      })
    }
  }
})