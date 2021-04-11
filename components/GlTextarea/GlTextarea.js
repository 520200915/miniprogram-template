// components/glTextarea/glTextarea.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maxlength: {
      type: Number,
      value: -1
    },
    placeholder: String,
    showWordLimit: Boolean,
    disabled: Boolean,
    value: String,
    filterEmoji:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    edit: true,
    value: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 打开文本编辑器
     */
    openTextarea() {
      if (this.data.disabled) return
      this.setData({
        edit: false,
        textareaFocus: true
      })
    },
    setValue(value) {
      if(this.properties.filterEmoji) {
        if (wx.$util.haveEmoji(value)) value = wx.$util.replaceEmoji(value)
      }   
      this.setData({
        value
      })
    },
    textareaInput(e) {
      let {
        value
      } = e.detail
      this.setValue(value)
      this.triggerEvent('input', {
        value
      })
    },

    textareaBlur(e) {
      let {
        value
      } = e.detail
      this.setData({
        edit: true
      })
      this.setValue(value)
      this.triggerEvent('blur', {
        value
      })
    },
  }
})