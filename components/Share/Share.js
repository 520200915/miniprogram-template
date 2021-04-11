// components/share/share.js
import Draw_Function from './draw_function'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        let {
          wxShare
        } = this.data
        this.check(newVal)
        if (!wxShare) {
          this.setData({
            _show: true
          })
        }
      }
    },
    toast: {
      type: String,
      value: '生成中...'
    },
    canvasObject: Object,
    hideCancel: Boolean,
    diyDraw: Boolean,
    hideWx: Boolean,
    wxShare: Boolean
  },
  ready() {

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
     * 检查
     */
    check(bool) {
      if (bool) {
        if (this.data.tempFilePath) return
        this.getImgData(res => {
          this.draw(res)
        })
      }
    },
    /**
     * 禁止滑动
     */
    noScroll: wx.$util.noScroll(),
    /**
     * 取消
     */
    cancel() {
      this.setData({
        _show: false
      })
    },
    saveImg() {
      let _this = this
      wx.saveImageToPhotosAlbum({
        filePath: _this.data.tempFilePath,
        success(e) {
          wx.$util.showToast('保存成功')
          _this.triggerEvent('callBack')
        }
      })
    },
    /**保存 */
    save() {
      this.saveImg()
      wx.nextTick(() => this.cancel())
    },
    /**
     * 检查
     */
    checkSetting() {
      this.setData({
        settingStatus: !this.data.settingStatus
      })
    },
    /**
     * 开始生成
     */
    draw(images) {
      const {
        canvasObject,
        wxShare
      } = this.__data__
      let {
        height,
        width
      } = canvasObject
      width = width || 300
      height = height || 150
      wx.$util.getPhoneInfo(phoneInfo => {
        wx.$util.getViewInfo('.choose-list', listInfo => {
          wx.$util.getViewInfo('.bg', bgInfo => {
            let {
              windowWidth
            } = phoneInfo
            let pixelRatio = windowWidth / 750
            let viewTop = !wxShare ? (bgInfo.height - listInfo.height - height * pixelRatio) / 2 : 0
            this.setData({
              canvasStyle: `width:${width * pixelRatio}px;height:${height * pixelRatio}px;top:${viewTop}px;`,
              previewStyle: `width:${width * pixelRatio}px;height:${width * pixelRatio * 0.8}px;`,
              pixelRatio,
              viewTop,
              height,
              width
            })
            this.ctx = wx.createCanvasContext('canvasImg', this)
            this.ctx.clearRect(0, 0, width, height)
            this.draw_canvas({
              canvasObject,
              images,
              width,
              height
            }, canvas => {
              canvas.draw(false, setTimeout(() => {
                this.getCanvasImg()
              }, 500))
            })
          })
        }, this)
      }, this)
    },
    /**画布 */
    draw_canvas(params, callBack) {
      const {
        canvasObject,
        images,
        height,
        width
      } = params
      const {
        backgroundColor,
        textList,
        lines
      } = canvasObject
      const draw_function = new Draw_Function(this)
      this.ctx.setFillStyle(backgroundColor || '#fff')
      this.ctx.fillRect(0, 0, width, height)
      this.ctx.save()
      if (this.__data__.diyDraw) {
        this.triggerEvent('draw', {
          ctx: this.ctx,
          canvasObject,
          callBack,
          height,
          images,
          width
        })
      } else {
        images && images.length > 0 && (images.map(e => {
          draw_function.drawImages(e)
        }))
        textList && textList.length > 0 && (textList.map(e => {
          e.width = canvasObject.width
          draw_function.drawText(e)
        }))
        lines && lines.length > 0 && (lines.map(e => {
          draw_function.drawLine(e)
        }))
        callBack(this.ctx)
      }
    },
    /**
     * 画布生成图片
     */
    getCanvasImg() {
      let _this = this
      let {
        pixelRatio,
        wxShare,
        height,
        width
      } = _this.data
      wx.canvasToTempFilePath({
        canvasId: 'canvasImg',
        width: width * pixelRatio,
        height: height * pixelRatio,
        fileType: 'jpg',
        quality: 1,
        x: 0,
        y: 0,
        success(res) {
          console.log(res)
          let {
            tempFilePath
          } = res
          if (wxShare) {
            wx.hideLoading()
            _this.checkSetting()
            wx.showShareImageMenu({
              path: tempFilePath,
              success(res) {
                console.log(res)
              }
            })
          } else {
            setTimeout(() => {
              _this.createPreviewImg({
                tempFilePath,
                width
              })
            }, 300)
          }
        },
        fail(err) {
          console.error(err)
          wx.hideLoading()
        }
      }, this)
    },
    /**生成预览图 */
    createPreviewImg(params) {
      const p_ctx = wx.createCanvasContext('preview', this)
      let {
        tempFilePath,
        width
      } = params
      p_ctx.drawImage(tempFilePath, 0, 0, width, width * 0.8)
      let _this = this
      p_ctx.draw(false, setTimeout(() => {
        wx.canvasToTempFilePath({
          height: width * 1.6,
          width: width * 2,
          canvasId: 'preview',
          fileType: 'jpg',
          quality: 1,
          x: 0,
          y: 0,
          success(preview) {
            console.log(preview)
            _this.setData({
              tempFilePath
            })
            _this.triggerEvent('init', {
              previewImg: preview.tempFilePath,
              tempFilePath
            })
            wx.hideLoading()
          },
          fail(err) {
            console.error(err)
            wx.hideLoading()
          }
        }, this)
      }, 500))
    },
    /**
     * 批量转换图片
     */
    getImgData(callBack) {
      let _this = this
      let {
        canvasObject,
        toast,
      } = this.__data__
      let {
        imgList
      } = canvasObject
      wx.showLoading({
        title: toast,
        mask: true,
        success() {
          if (imgList.length > 0) {
            _this.createLocalImg(imgList, 0, res => {
              callBack(res)
            })
          } else {
            callBack()
          }
        }
      })
    },
    /**网络图片转成本地资源 */
    createLocalImg(imgList, index = 0, callBack) {
      if (index === imgList.length) return callBack(imgList)
      wx.$util.promise(resolve => {
        wx.getImageInfo({
          src: imgList[index].url,
          success(res) {
            imgList[index].url = res.path
            resolve()
          },
          fail() {
            wx.$util.showToast('图片生成失败,请稍后再试')
            wx.hideLoading()
            console.error(`索引为:${index}的图片转换本地失败，${JSON.stringify(imgList[index].url)}`)
          }
        })
      }).then(() => {
        this.createLocalImg(imgList, index + 1, callBack)
      })
    }
  }
})