import {
  getOneList
} from '../../api/api.js'
const app = getApp()
Page({

  data: {
    list: []
  },

  onLoad(options) {
    let {
      id
    } = options
    this.getRank(id)
  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },
  onShareAppMessage() {

  },
  // 获取单一榜单书籍
  getRank(id) {
    getOneList(id).then(res => {
      let list = res.data.ranking.books
      list.forEach(item => {
        item.cover = decodeURIComponent(item.cover)
        item.cover = item.cover.replace('/agent/', '')
      })
      this.setData({
        list
      })
    })
  },
  bookDetail(event) {
    let item = app.encodeParams(event).item
    let id = item._id
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bookId=${id}`,
    })
  }
})