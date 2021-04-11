// components/Calendar/Calendar.js
import Calendar from './Calendar_Function'
import _component_ from './Static_Properties'
const CalendarFunction = Symbol('CalendarFunction')
Component({
  /**
   * 组件的属性列表
   */
  properties: _component_.properties,

  /**
   * 组件的初始数据
   */
  data: _component_.data,

  /**
   * 组件的方法列表
   */
  methods: {
    noScroll(){},
    setCalenderBodyHeight() {
      this[CalendarFunction].setCalenderBodyHeight()
    },
    showCalendar(e) {
      let type = e && e.currentTarget && e.currentTarget.dataset.type || ''
      let result = type === 'show'
      if (!result) {
        this.setData({
          hideCalendar: true
        })
        setTimeout(() => {
          this.setData({
            show: result,
            hideCalendar: false
          })
        }, 300)
      } else {
        this.setData({
          show: result
        })
        if (!this.data.calenderBodyHeight) this[CalendarFunction].setCalenderBodyHeight()
      }
    },
    dateChange(e) {
      let {
        current
      } = e.detail
      this.setData({
        current
      })
    },
    choose(e) {
      let {
        dateType,
        minDate,
        maxDate
      } = this.data
      let {
        data
      } = e.currentTarget.dataset
      if ((minDate && Date.parse(minDate) > Date.parse(data)) || (maxDate && Date.parse(maxDate) < Date.parse(data))) return
      this[CalendarFunction][dateType](e)
    },
    done() {
      let {
        dateType
      } = this.data
      this[CalendarFunction].done(dateType)
    },
    changeDate(e){
      let {value} = e.detail
      this.setData({
        current:value
      })
    },
    showShortcutPicker(){
      this.setData({
        showShortcut:!this.data.showShortcut
      })
    },
  },
  ready() {
    this[CalendarFunction] = new Calendar(this)
  }
})