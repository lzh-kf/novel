// 云函数入口文件
const cloud = require('wx-server-sdk')
const fly = require("flyio")
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
  return new Promise((resolve, reject) => {
    fly.get('http://www.zhuishushenqi.com/spread').then(res => {
      try {
        resolve(res.data.data)
      } catch (e) {
        reject(e)
      }
    })
  })
}