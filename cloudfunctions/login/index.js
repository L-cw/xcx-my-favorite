// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { userInfoReq } = event
  let userResult = await db.collection('Users').where({
    openid: wxContext.OPENID
  }).get()
  if (userResult.data.length === 0) {
    await db.collection('Users').add({
      data: {
        openid: wxContext.OPENID,
        isManager: false, // 默认为普通用户，非订阅号管理员
        userInfo: {...userInfoReq}
      },
      success(res) { //成功打印消息
        console.log('用户登录成功')
      },
      fail(res) { //存入数据库失败
        console.log('用户登录失败');
        //云函数更新
      }
    })
  } else {
    console.log('用户已存在')
    await db.collection('Users').where({
      openid: wxContext.OPENID
    }).update({
      data: {
        userInfo: {...userInfoReq}
      },
      success(res) { //成功打印消息
        console.log('用户登录成功')
      },
      fail(res) { //存入数据库失败
        console.log('用户登录失败');
        //云函数更新
      }
    })
  }

  return {
    'errCode': '0'
  }
}