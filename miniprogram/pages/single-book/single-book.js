import {
  getSIngleBook
} from '../../api/api'
import {
  imgLazy
} from '../../utils/util'
const app = getApp()
Page({
  data: {
    bookInfo: {
      title: '',
      desc: '',
      list: []
    },
    loadmore: {}
  },

  onLoad(options) {
    let {
      bookId
    } = options
    this.bookId = bookId
    this.moreFlag = true
    this.getSIngleBook()
  },
  // 获取单个书单详情
  getSIngleBook() {
    getSIngleBook(this.bookId).then(res => {
      let {
        books,
        desc,
        title
      } = res.bookList
      books.map(item => {
        item.defaultCover = '../../static/img/loading.png'
        item.flag = false
        item.book.cover = decodeURIComponent(item.book.cover)
        item.book.cover = item.book.cover.replace('/agent/', '')
      })
      this.setData({
        loadmore: {
          list: this.data.bookInfo.list,
          item: books
        },
        bookInfo: {
          list: books,
          desc,
          title
        }
      })
      imgLazy(this, books, 'bookInfo.list', '.book-item', false)
    })
  },
  // 到详情页
  bookDetail(event) {
    let {
      id
    } = app.encodeParams(event)
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bookId=${id}`,
    })
  },
  // 组件传递数据
  more() {
    this.moreFlag = false
  },
  onReachBottom() {
    if (this.moreFlag) {
      this.setData({
        loadmore: {
          list: this.data.bookInfo.list,
          item: []
        }
      })
    }
  },
})