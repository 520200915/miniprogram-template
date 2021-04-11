const _CalendarObject_ = Symbol('_CalendarObject_')
const _nowDate_ = Symbol('_nowDate_')
const _separator_ = Symbol('_separator_')
class Calendar {
  [_CalendarObject_] = {};
  [_nowDate_] = new Date();
  [_separator_] = '-';
  constructor(calendarObject) {
    this[_CalendarObject_] = calendarObject
    this[_separator_] = calendarObject.data.separator
    this.setCalenderHeight()
    this.setMonthList()
    let {
      weekdays,
      firstDayOfWeek
    } = calendarObject.data
    let firstDay = weekdays[firstDayOfWeek - 1]
    let [last, first] = weekdays.join('').split(firstDay)
    calendarObject.setData({
      weekdays: [firstDay, ...first, ...last]
    })
  }
  /**设置日历高度 */
  setCalenderHeight() {
    let _this = this[_CalendarObject_]
    let {
      data: calenderHeight
    } = _this
    let height = '80%'
    if (typeof calenderHeight === 'number') {
      wx.$util.getPhoneInfo(res => {
        let {
          windowHeight
        } = res
        if (calenderHeight > windowHeight) calenderHeight = windowHeight
        if (calenderHeight < windowHeight * 0.5) calenderHeight = windowHeight * 0.5
        height = `${calenderHeight}px`
      })
    }
    if (typeof calenderHeight === 'string') {
      if (calenderHeight.includes('%')) {
        height = calenderHeight
        let [num] = calenderHeight.split('%')
        if (num < 50) height = '50%'
        if (num > 100) height = '80%'
      } else {
        if (calenderHeight < 50) calenderHeight = '50'
        if (calenderHeight > 100) calenderHeight = '80'
        height = `${calenderHeight}%`
      }
    }
    _this.setData({
      isFullSucreen: wx.$util.isFullSucreen(),
      height
    })
  }
  /**设置日期高度 */
  setCalenderBodyHeight() {
    let _this = this[_CalendarObject_]
    wx.$util.getViewInfo('.calender-header', header => {
      wx.$util.getViewInfo('.calender-footer', footer => {
        let headerHeight = header.height
        let footerHeight = footer && footer.height || 0
        _this.setData({
          calenderBodyHeight: `${headerHeight + footerHeight}px`
        })
      }, _this)
    }, _this)
  }
  /**设置日期列表 */
  setMonthList() {
    let {
      previous,
      minDate,
      maxDate,
      next
    } = this[_CalendarObject_].data
    if (maxDate || minDate) {
      previous = this.getMonthDifference(minDate, maxDate)
      next = this.getMonthDifference(maxDate, this[_nowDate_].format('yyyy-MM-dd'))
    } else {
      previous = previous < 0 ? 0 : previous
      next = next < 0 ? 0 : next
    }
    let nowMonth = this[_nowDate_].getMonth()
    for (let i = nowMonth - previous; i <= nowMonth + next; i++) {
      this.init(new Date().setMonth(i))
    }
  }
  /**初始化日期 */
  init(date) {
    let _this = this[_CalendarObject_]
    let {
      firstDayOfWeek,
      allowSameDay,
      multipleDate,
      monthList,
      rangeDate,
      dateList,
      dateType,
      current,
      minDate,
      maxDate,
      value,
    } = _this.data
    let separator = this[_separator_]
    let [year, month] = new Date(date).format(`yyyy${separator}MM`).split(separator)
    let days = this.getDayNumber(year, Number(month))
    let week = new Date(year, Number(month) - 1, 1).getDay()
    let dateFormat = `yyyy${separator}MM${separator}dd`
    let today = value || this[_nowDate_].format(dateFormat)
    let nextDay = ''
    let arr = []
    dateList.push(`${year}${separator}${month}`)
    if (dateType === 'range') {
      nextDay = new Date(new Date().setDate(new Date(new Date(today)).getDate() + 1)).format(dateFormat)
    }
    let [now_year, now_month, now_day] = today.split(separator)
    let [next_year, next_month, next_day] = allowSameDay ? today.split(separator) : nextDay.split(separator)
    for (let i = 1; i <= days; i++) {
      let todayStr = `${year}${separator}${month}${separator}${now_day}`
      let dayStr = `${year}${separator}${month}${separator}${i < 10 ? `0${i}`:i}`
      let obj = {
        day: i,
        data: dayStr,
        active: now_year == year && now_month == month && i == Number(now_day)
      }
      if ((minDate && Date.parse(minDate) > Date.parse(dayStr)) || (maxDate && Date.parse(maxDate) < Date.parse(dayStr))) obj.disable = true
      if (dateType === 'multiple') multipleDate.push(todayStr)
      if (nextDay) {
        if (now_year == year && now_month == month && i == Number(now_day)) {
          obj.start = true
          rangeDate.start = todayStr
        }
        if (next_year == year && next_month == month && i == Number(next_day)) {
          obj.active = true
          obj.end = true
          rangeDate.end = `${year}${separator}${next_month}${separator}${next_day}`
        }
      }
      firstDayOfWeek = firstDayOfWeek == 7 ? 0 : firstDayOfWeek
      if (i === 1) obj.week = `week-${week - firstDayOfWeek}`
      arr.push(obj)
    }
    monthList.push({
      data: arr,
      mark: Number(month)
    })
    if (current <= 1) {
      let [nowYear, nowMonth] = today.split(separator)

      current = dateList.findIndex(e => e === `${nowYear}${separator}${nowMonth}`)
    }
    _this.setData({
      multipleDate,
      date: today,
      rangeDate,
      monthList,
      dateList,
      current
    })
  }
  /**当设置最小日期或者最大日期时 自动设置前后月份 */
  getMonthDifference(date1, date2) {
    let separator = this[_separator_]
    //获取年,月数
    let [year1, month1] = date1.split(separator)
    let [year2, month2] = date2.split(separator)
    let months = (parseInt(year2) - parseInt(year1)) * 12 + (parseInt(month2) - parseInt(month1))
    return months
  }
  /**单选 */
  single(e) {
    let _this = this[_CalendarObject_]
    let {
      index,
      data,
      ind
    } = e.currentTarget.dataset
    let {
      showConfirm,
      monthList
    } = _this.data
    monthList.map(x => {
      x.data.map(i => i.active = false)
    })
    monthList[index].data[ind].active = true
    _this.setData({
      monthList,
      date: data
    })
    if (!showConfirm) this.done()
  }
  /**多选 */
  multiple(e) {
    let _this = this[_CalendarObject_]
    let {
      index,
      ind,
    } = e.currentTarget.dataset
    let {
      monthList
    } = _this.data
    let arr = []
    monthList[index].data[ind].active = !monthList[index].data[ind].active
    monthList.map(x => x.data.map(i => {
      if (i.active) arr.push(i.data)
    }))
    _this.setData({
      [`monthList[${index}].data`]: monthList[index].data,
      multipleDate: arr
    })
  }
  /**范围选择 */
  range(e) {
    const _this = this[_CalendarObject_]
    let {
      index,
      data,
      ind
    } = e.currentTarget.dataset
    let {
      allowSameDay,
      showConfirm,
      monthList,
      rangeDate
    } = _this.data
    const start = Date.parse(rangeDate.start)
    if (rangeDate.end || start > Date.parse(data)) {
      monthList = this.clearStatus({
        monthList,
        index,
        ind
      })
      rangeDate.start = data
      rangeDate.end = ''
    } else {
      if (!allowSameDay && Date.parse(data) == Date.parse(rangeDate.start)) return
      monthList[index].data[ind].active = true
      monthList[index].data[ind].end = true
      rangeDate.end = data
      monthList.map(x => {
        x.data.map(i => {
          let day = Date.parse(i.data)
          i.middle = day > start && day < Date.parse(data)
        })
      })
    }
    _this.setData({
      monthList,
      rangeDate
    })
    if (!showConfirm && rangeDate.end) this.done()
  }

  /**点击完成 */
  done() {
    let _this = this[_CalendarObject_]
    let {
      multipleDate,
      rangeDate,
      dateType,
      date
    } = _this.data
    let targer = {
      'single': date,
      'multiple': multipleDate,
      'range': rangeDate
    }
    if ((dateType === 'multiple' && multipleDate.length < 1) || (dateType === 'range' && !rangeDate.end)) return
    _this.triggerEvent('select', {
      date: targer[dateType]
    })
    _this.showCalendar()
  }

  /**清空范围选择状态 */
  clearStatus(params) {
    let {
      monthList,
      index,
      ind
    } = params
    monthList.map(x => x.data.map(i => {
      i.active = false
      i.start = false
      i.end = false
      i.middle = false
    }))
    monthList[index].data[ind].active = true
    monthList[index].data[ind].start = true
    return monthList
  }
  /**
   * 获取月份天数
   */
  getDayNumber(year, month) {
    let days = 31
    switch (month) {
      case 2:
        days = (year % 4 == 0 && year % 100 !== 0) || year % 400 == 0 ? 29 : 28
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        days = 30
        break;
    }
    return days
  }
}


export default Calendar