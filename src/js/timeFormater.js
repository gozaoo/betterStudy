function formatTime( options = {},time1) {
    // 如果 time1 为空，则使用当前时间
    if (!time1) {
      time1 = new Date();
    } else if (typeof time1 === 'string') {
      // 如果 time1 是字符串，尝试转换成日期类型
      time1 = new Date(time1);
    }
  
    // 确保 time1 是一个有效的日期对象
    if (time1.getTime&&isNaN(time1.getTime())) {
      throw new Error('Invalid date: time1');
    }
  
    // 获取 options 中的 time2，如果存在，也转换成日期类型
    const time2 = options.time2 ? new Date(options.time2) : null;
    if (time2 && isNaN(time2.getTime())) {
      throw new Error('Invalid date: time2');
    }
  
    // 获取 type 参数，默认为 '日期'
    const type = options.type || 'date';
  
    // 获取当前时间
    const now = new Date();
  
    // 根据不同的 type 处理时间
    let formattedTime;
    switch (type) {
      case 'date':
        formattedTime = `${time1.getMonth() + 1}月${time1.getDate()}日`;
        break;
      case 'longDate':
        formattedTime = `${time1.getFullYear()}年${time1.getMonth() + 1}月${time1.getDate()}日`;
        break;
      case 'countdown':
        formattedTime = formatCountdown(now, time1);
        break;
      case 'time':
        formattedTime = `${String(time1.getHours()).padStart(2, '0')}:${String(time1.getMinutes()).padStart(2, '0')}`;
        break;
      case 'duration':
        if (!time2) {
          throw new Error('time2 is required for type "duration"');
        }
        formattedTime = formatLength(time1, time2);
        break;
      default:
        throw new Error('Invalid type');
    }
  
    return formattedTime;
  }
  
  // 格式化倒计时
  function formatCountdown(now, time1) {
    const diff = time1 - now;
    return formatLength(now, new Date(now.getTime() + diff));
  }
  
  // 格式化时间长度
  function formatLength(time1, time2) {
    const diff = Math.abs(time1 - time2);
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30; // 近似值，实际可能根据月份和年份变化
    const year = day * 365; // 近似值，不考虑闰年
  
    if (diff > year) return `大于${Math.ceil(diff / year)}年`;
    if (diff > month) return `大于${Math.ceil(diff / month)}个月，${Math.ceil((diff % month) / day)}天`;
    if (diff > (day * 3)) return `大于${Math.ceil(diff / day)}天`;
    if (diff > day) return `${Math.floor(diff / day)}天${Math.floor((diff % day) / hour)}小时`;
    if (diff > (hour * 3)) return `大于${Math.floor((diff % day) / hour)}小时`;
    if (diff > hour) return `${Math.floor(diff / hour)}小时${Math.floor((diff % hour) / minute)}分钟`;
    if (diff > (minute * 3)) return `大于${Math.floor((diff % hour) / minute)}分钟`;
    if (diff > minute) return `${Math.floor(diff / minute)}分钟${Math.floor((diff % minute) / second)}秒`;
    if (diff > second) return `${Math.floor((diff % minute) / second)}秒`;
    if (diff > 1) return `${Math.floor(diff)}毫秒`;
    return '1毫秒';
  }

  export default {
    formatTime
  }