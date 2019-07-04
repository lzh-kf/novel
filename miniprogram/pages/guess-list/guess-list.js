const app = getApp()
import {
  getSecondClassify
} from '../../api/api'
Page({

  data: {
    bookList: [],
    loadmore: {}
  },
  onLoad(options) {
    let {
      params
    } = options
    this.params = JSON.parse(params)
    this.moreData = true
    this.getSecondClassify()
  },
  onReachBottom() {
    if (this.moreData) {
      this.params.start = this.params.start + 20
      this.params.limit = this.params.limit + 20
      this.getSecondClassify()
    }
  },
  getSecondClassify() {
    getSecondClassify(this.params).then(res => {
      let _bookList = res.books
      let bookList = this.data.bookList
      bookList.push(..._bookList)
      this.setData({
        bookList,
        loadmore: {
          list: bookList,
          item: _bookList
        }
      })
    })
  },
  more() {
    this.moreData = false
  },
  // 监听子组件传值
  bookDetail(event) {
    let bookId = event.detail
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bookId=${bookId}`,
    })
  }
})