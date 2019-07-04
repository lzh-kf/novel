// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let {
    bookId,
    openId
  } = event
  try {
    return await db.collection('bookShelf').where({
      bookId,
      openId
    }).get({
    })
  } catch (e) {
    return e
  }

}