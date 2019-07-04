import {
  searchBook
} from '../../api/api'
import {
  setTitle
} from '../../utils/util'
const app = getApp()
Page({

  data: {
    list: [],
    loadmore: {}
  },
  // 初始化
  onLoad(options) {
    let {
      query
    } = options
    setTitle(query)
    this.searchBook(query)
  },
  onReachBottom() {
    this.setData({
      'loadmore.item': []
    })
  },
  more(){},
  // 搜索数据
  searchBook(value) {
    searchBook(value).then(res => {
      let list = res.books
      this.setData({
        list,
        loadmore: {
          list,
          item: list
        }
      })
    })
  },
  // 监听子组件传值
  bookDetail(event) {
    let bookId = event.detail
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bookId=${bookId}`,
    })
  }
})