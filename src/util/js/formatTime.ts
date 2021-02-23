export const formatMsgTime = (timespan: Date) => {
  let dateTime = new Date(timespan) // 转为标准时间
  let year = dateTime.getFullYear()
  let month = dateTime.getMonth() + 1
  let day = dateTime.getDate()
  let hour = dateTime.getHours()
  hour < 10 ? '0' + hour : hour
  let minute = dateTime.getMinutes()
  minute < 10 ? '0' + minute : minute
  let millisecond = dateTime.getTime() // 将当前编辑的时间转换为毫秒
  let now = new Date() // 获取当前时间
  let nowNew = now.getTime() // 将当前时间转换为毫秒
  let milliseconds = 0
  let timeSpanStr
  milliseconds = nowNew - millisecond
  if (milliseconds <= 1000 * 60 * 1) {
    // 小于一分钟展示为刚刚
    timeSpanStr = '刚刚'
  } else if (milliseconds > 1000 * 60 * 1 && milliseconds <= 1000 * 60 * 60) {
    // 大于一分钟小于一小时展示为分钟
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + ' 分钟前'
  } else if (
    milliseconds > 1000 * 60 * 60 * 1 &&
    milliseconds < 1000 * 60 * 60 * 24
  ) {
    // 大于一小时小于一天展示为小时
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + ' 小时前'
  } else if (
    milliseconds > 1000 * 60 * 60 * 24 &&
    milliseconds < 1000 * 60 * 60 * 24 * 15
  ) {
    // 大于一天小于十五天展示为天
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + ' 天前'
  } else if (
    milliseconds > 1000 * 60 * 60 * 24 * 15 &&
    year === now.getFullYear()
  ) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
  }
  return timeSpanStr
}

export const formatSmallTime = (timespan: Date) => {
  let dateTime = new Date(timespan) // 转为标准时间
  let year = dateTime.getFullYear()
  let changeYear
  changeYear = year.toString()
  changeYear.slice(2, 3)
  let month = dateTime.getMonth() + 1
  let day = dateTime.getDate()
  let hour = dateTime.getHours()
  let changeHour
  changeHour = hour < 10 ? `0${hour}` : hour
  let minute = dateTime.getMinutes()
  let changeMinute
  changeMinute = minute < 10 ? `0${minute}` : minute
  let millisecond = dateTime.getTime() // 将当前编辑的时间转换为毫秒
  let now = new Date() // 获取当前时间
  let nowNew = now.getTime() // 将当前时间转换为毫秒
  let milliseconds = 0
  let timeSpanStr
  milliseconds = nowNew - millisecond
  // if (milliseconds <= 1000 * 60 * 1) {
  //   // 小于1分钟展示为刚刚
  //   timeSpanStr = '刚刚'
  // } else
  if (milliseconds > 0 && milliseconds <= 1000 * 60 * 60 * 24) {
    // 大于0秒钟小于24小时展示为分钟
    timeSpanStr = changeHour + ':' + changeMinute
  } else {
    timeSpanStr = changeYear + '/' + month + '/' + day
  }
  return timeSpanStr
}

export const formatWxTime = (timespan: Date) => {
  let time = new Date(timespan)
  let dateTime = time.getTime() // 获取参数的时间戳
  // 获取 今、昨、周、xxxx/xx/xx
  let dayMillisecond = 1000 * 60 * 60 * 24 // 一天的毫秒数
  let today = new Date(new Date().toLocaleDateString()).getTime() // 今天 0 点
  let yesterday =
    new Date(new Date().toLocaleDateString()).getTime() - dayMillisecond // 昨天 0 点
  let week =
    new Date(new Date().toLocaleDateString()).getTime() - dayMillisecond * 7
  let timeSpanStr
  if (dateTime > today) {
    // timeSpanStr = '今天' // 今天就不显示
    timeSpanStr = ''
  } else if (dateTime > yesterday) {
    timeSpanStr = '昨天'
  } else if (dateTime > week) {
    let weekname = time.getDay()
    timeSpanStr = '周' + numToString(weekname)
  } else {
    timeSpanStr =
      time.getFullYear + '/' + time.getMonth() + '/' + time.getDate()
  }
  // 获取 凌早中晚
  let h = time.getHours() // 获取参数时间的小时
  let diffH = Math.ceil(h / 6)
  if (diffH === 1 || diffH === 0) {
    timeSpanStr += ' 凌晨 '
  } else if (diffH === 2) {
    timeSpanStr += ' 上午 '
  } else if (diffH === 3) {
    timeSpanStr += ' 下午 '
  } else if (diffH === 4) {
    timeSpanStr += ' 晚上 '
  }
  // 获取 时分
  let m = time.getMinutes() // 获取参数时间的分钟
  let mStr = m < 10 ? `0${m}` : m
  if (h > 12) {
    h = h - 12
  }
  timeSpanStr += h + ':' + mStr
  return timeSpanStr
}

function numToString(num: number) {
  let Str = ''
  switch (num) {
    case 0:
      Str = '日'
      break
    case 1:
      Str = '一'
      break
    case 2:
      Str = '二'
      break
    case 3:
      Str = '三'
      break
    case 4:
      Str = '四'
      break
    case 5:
      Str = '五'
      break
    case 6:
      Str = '六'
      break
    default:
  }
  return Str
}
