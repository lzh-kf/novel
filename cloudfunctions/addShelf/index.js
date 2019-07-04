// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let {
    openId,
    bookId,
    cover,
    title,
    type
  } = event
  let data = {
    openId,
    bookId,
    cover,
    title,
    type
  }
  try {
    return await db.collection('bookShelf').add({
      data
    })
  } catch (e) {
    return e
  }

}