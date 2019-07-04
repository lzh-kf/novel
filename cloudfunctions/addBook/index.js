// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
// 新增书籍阅读记录
exports.main = async(event, context) => {
  let {
    bookId,
    link,
    index,
    openId,
    cover,
    title,
    type
  } = event
  let data = {
    bookId,
    link,
    index,
    openId,
    cover,
    title,
    type
  }
  try {
    return await db.collection('updateBook').add({
      data
    })
  } catch (e) {
    return e
  }

}