//app.js
import networkImgObj from './resources/js/networkImg'
import { login } from './service/cloundRequest'

App({
  onLaunch: function () {
    let that = this
    wx.cloud.init({
      traceUser: true
    })
    that.getCustomNavParams()
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          that.globalData.hadAuthUserInfo = true
          wx.getUserInfo({
            withCredentials: true,
            success: userInfoRes => {
              that.globalData.userInfo = {...userInfoRes.userInfo}
              that.globalData.getUserInfoFlag = true
              if (that.checkStatusCallback) {
                that.checkStatusCallback()
              }
              console.log(userInfoRes.userInfo)
              login(userInfoRes.userInfo)
            }
          })
        } else {
          that.globalData.hadAuthUserInfo = false
        }
      }
    })
    
  },
  getCustomNavParams () {
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.marginHeight = res.statusBarHeight * 2 + 20 + 4;
        this.globalData.navHeight = res.statusBarHeight * 2 + 44 + 4;
      }, fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    marginHeight: 44,
    userInfo: null,
    getUserInfoFlag: false,
    hadAuthUserInfo: false,
    navHeight: 0,
    share: false,
    networkImg: {...networkImgObj}
  }
    
})