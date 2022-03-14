export function login (userInfo) {
  return wx.cloud.callFunction({
    name: 'login',
    data: {userInfoReq: {...userInfo}}
  })
}

export function publishArticle (data) {
  return wx.cloud.callFunction({
    name: 'publishArticle',
    data
  })
}