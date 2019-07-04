import {
  getOneList
} from '../../api/api'
Page({
  data: {
    bookList: [],
    loadMore: {}
  },
  onLoad(options) {
    let {
      rankId
    } = options
    this.getsingleRank(rankId)
  },
  onReachBottom() {
    this.setData({
      loadMore: {
        list: this.data.bookList,
        item: []
      }
    })
  },
  // 获取榜单
  getsingleRank(rankId) {
    getOneList(rankId).then(res => {
      let bookList = res.ranking.books

      this.setData({
        bookList,
        loadMore: {
          list: bookList,
          item: bookList
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
  },
})