// components/TimeHorizon/TimeHorizon.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {
      type: Object,
      observer: function (newVal, oldVal) {
        let {
          havehhmmss,
          startData,
          startTime,
          startLabel,
          valueAlign,
          endData,
          endLabel,
          
        } = newVal
        valueAlign = valueAlign || 'left'
        this.setData({
          havehhmmss,
          startData,
          startTime,
          startLabel,
          valueAlign,
          endData,
          endLabel
        })
      }
    }
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
    dateChange(e) {
      let {
        value
      } = e.detail
      let {
        type
      } = e.currentTarget.dataset
      if (this.data.endData && type === 'start') {
        this.setData({
          endData: ''
        })
      }
      let {
        havehhmmss
      } = this.data
      if(havehhmmss) 
      value = havehhmmss ? type === 'start' ? `${value} 00:00:00` : `${value} 23:59:59` : value
      this.setData({
        [`${type}Data`]: value
      })
      let {
        startData,
        endData,
      } = this.data
      if (startData && endData) this.triggerEvent('change', {
        startData,
        endData
      })
    }
  }
})