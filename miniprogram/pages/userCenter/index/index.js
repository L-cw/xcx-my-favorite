// pages/profile/profile.js
const app = getApp()
const db = wx.cloud.database()
import { checkStatus } from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isManager: true, // 是否为公众号管理员身份
    hadAuthFlag: app.globalData.hadAuthUserInfo,
    userInfo: app.globalData.userInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    checkStatus(
      () => {
        this.setData({
          hadAuthFlag: app.globalData.hadAuthUserInfo,
          userInfo: app.globalData.userInfo
        })
        this.getUserManagerAuth()
      },
      () => {
        console.log('NO_AUTH')
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * @description: 检查用户是否为公众号管理猿
   */
  getUserManagerAuth () {
    let that = this
    wx.cloud.callFunction({
      name: 'checkUserIdentity'
    }).then(res => {
      console.log(res.result) // 3
      that.setData({
        isManager: res.result.isManager
      })
    }).catch(console.error)
  },
  // 获取用户信息回调
  bindGetUserInfo (e) {
    let that = this
    console.log(e.detail.userInfo)
    if (!!e.detail.userInfo) { // 同意授权-并登陆
      wx.setStorageSync('hadAuthFlag', true)
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.hadAuthUserInfo = true
      this.setData({
        hadAuthFlag: app.globalData.hadAuthUserInfo,
        userInfo: app.globalData.userInfo
      })
      // 调取登陆 存储用户信息
      wx.cloud.callFunction({
        name: 'login',
        data: {userInfoReq: {...e.detail.userInfo}}
      }).then(res => {
        console.log(res.result) // 3
      }).catch(console.error)
    } else { // 不同意授权
      wx.setStorageSync('hadAuthFlag', false)
      that.setData({
        hadAuthFlag: false
      })
    }
  },
  goPage (e) {
    let url = e.currentTarget.dataset.url
    if (url === '/pages/apply/apply') {
      wx.showToast({
        icon: 'none',
        title: '内测中，暂不开放本功能'
      })
      return
    }
    wx.navigateTo({
      url
    })
  }, 

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})