// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
// 获取我的阅读记录
exports.main = async(event, context) => {
  let {
    bookId,
    openId
  } = event
  // 单条或者全部查询
  let data = bookId ? {
    bookId,
    openId
  } : {
    openId
  }
  try {
    return await db.collection('updateBook').where(data).get()
  } catch (e) {
    return e
  }

}