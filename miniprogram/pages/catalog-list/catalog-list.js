import {
  getBookSection
} from '../../api/api.js'
const app = getApp()
Page({

  data: {
    chapters: []
  },

  onLoad(options) {
    let {
      bookId
    } = options
    this.bookId = bookId
    this.getBookSection(bookId)
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
  // 获取书籍章节
  getBookSection(bookId) {
    getBookSection(bookId).then(res => {
      let chapters = res.data.mixToc.chapters
      this.setData({
        chapters
      })
    })
  },
  catalog(event){
    let index = app.encodeParams(event).index
    let bookId = this.bookId
     wx.redirectTo({
      url: `/pages/read-book/read-book?bookId=${bookId}&bookIndex=${index}`,
    })
  }
})