// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
// 更新当前阅读记录的数据（主要是更新当前章节）
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
    return await db.collection('updateBook').where({
      bookId,
      openId
    }).update({
      data
    })
  } catch (e) {
    return e
  }

}