const app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * params { Function } authCallback 已授权
 * params { Function } unAuthCb 未授权
 */
const checkStatus = (authCallback, unAuthCb = () => {}) => {
  // 判断是否有授权，有授权的话从回调调用方法初始化数据
  // 无授权的话直接调用方法初始化数据
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        if (app.globalData.getUserInfoFlag) {
          authCallback()
        } else {
          app.checkStatusCallback = res => {
            authCallback()
          }
        }
      } else {
        unAuthCb()
      }
    }
  })
}

module.exports = {
  formatTime,
  checkStatus
}
