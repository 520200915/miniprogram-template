// components/GlCell/GlCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label:String,
    labelWidth:String,
    border:Boolean,
    haveArrow:Boolean,
    value:String,
    valueAlign:String,
    required:Boolean
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
    click(e){
      this.triggerEvent('click')
    }
  }
})
