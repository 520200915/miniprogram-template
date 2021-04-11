export default {
  properties: {
    calenderHeight: {
      type: [String, Number]
    },
    title: String, // 标题名称
    hasRadius: {
      type: Boolean,
      value: true
    }, // 是否圆角
    showTitle: {
      type: Boolean,
      value: true
    }, // 是否显示标题
    showSubTitle: {
      type: Boolean,
      value: true
    }, // 是否显示副标题
    confirmText: String, // 确定按钮文本
    showConfirm: {
      type: Boolean,
      value: true
    }, // 是否显示确定按钮
    calenderColor: {
      type: String,
      value: '#00A479'
    }, // 日历主题色
    previous: {
      type: Number,
      value: 3
    }, // 当前月的前几个月 ，默认3个月
    next: {
      type: Number,
      value: 3
    }, // 当前月的后几个月 ， 默认3个月
    vertical: Boolean, //是否纵向滑动
    dateType: {
      type: String,
      value: 'single'
    },
    /** 选择类型默认单选，single单选, multiple多个日期，range日期范围 */
    value: String, //单选绑定数据
    shortcut: Boolean, //日期快捷切换 默认为false
    /** 分隔符，默认为 "-" */
    separator: {
      type: String,
      value: '-'
    },
    /** 日期范围-开始结束文本 */
    rangeText: {
      type: Object,
      value: {
        start: '开始',
        end: '结束'
      }
    },
    /** 是否允许日期范围的起止时间为同一天, 默认为false */
    allowSameDay:Boolean,
    /** 周起始日,默认周日 */
    firstDayOfWeek: {
      type: [Number, String],
      value: 7
    },
    /** 
     * 可选最小日期，不传则默认无限制。
     * 格式yyyy-MM-dd, 需跟separator一致。 */
    minDate: String,
    /** 可选最大日期，不传则默认无限制。
     * 格式yyyy-MM-dd, 需跟separator一致 */
    maxDate: String,
    /**隐藏水印 */
    hideMark:Boolean
  },
  data: {
    weekdays: ['一', '二', '三', '四', '五', '六', '日'],
    monthList: [],
    dateList: [],
    current: 0,
    height: '80%',
    rangeDate: {},
    multipleDate: []
  }
}