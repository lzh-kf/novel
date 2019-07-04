import {
  getSecondClassify
} from '../../api/api'
const app = getApp()
Page({
  data: {
    typeInfo: {
      list: [{
        title: '热门',
        value: 'hot'
      }, {
        title: '新书',
        value: 'new'
      }, {
        title: '好评',
        value: 'reputation'
      }, {
        title: '完结',
        value: 'over'
      }],
      check: 0
    },
    majorInfo: {
      list: [],
      check: 0
    },
    bookList: [],
    loadmore: {}
  },
  // 初始化
  onLoad(options) {
    this.init(options)
    this.moreData = true
  },
  // 上拉刷新
  onReachBottom() {
    if (this.moreData) {
      let {
        start,
        limit
      } = this.params
      let params = {
        start: start + 20,
        limit: limit + 20
      }
      this.params = Object.assign(this.params, params)
      this.getSecondClassify()
    }
  },
  // 加载更多组建
  more() {
    this.moreData = false
  },
  // 初始化解析参数
  init(options) {
    let {
      childList,
      title,
      classify
    } = JSON.parse(options.params)
    this.classify = classify
    if (childList.length) {
      childList.unshift('全部')
      this.setData({
        "majorInfo.list": childList
      })
    }
    let params = {
      type: this.data.typeInfo.list[0].value,
      major: title,
      start: 0,
      limit: 20,
      minor: '',
      gender: classify
    }
    this.params = params
    this.getSecondClassify()
  },
  // 获取二级分类书籍
  getSecondClassify() {
    getSecondClassify(this.params).then(res => {
      let bookList = res.books
      let _bookList = this.data.bookList
      _bookList.push(...bookList)
      this.setData({
        bookList: _bookList,
        loadmore: {
          list: _bookList,
          item: bookList
        }
      })
    })
  },
  // 一级导航切换
  firstNav(event) {
    let {
      index,
      type
    } = app.encodeParams(event)
    this.pubNav({
      type,
      minor: ''

    }, index, this.data.typeInfo)
  },
  // 公用导航方法
  pubNav(type, index, info, flag = 0) {
    let params = {
      start: 0,
      limit: 20,
    }
    this.params = Object.assign(this.params, type, params)
    if (index !== info.check) {
      if (flag) {
        this.setData({
          'majorInfo.check': index
        })
      } else {
        this.setData({
          'typeInfo.check': index,
          'majorInfo.check': 0
        })
      }
      this.moreData = true
      this.setData({
        bookList: []
      })
      wx.pageScrollTo({
        scrollTop: 0
      })
      this.getSecondClassify()
    }
  },
  // 二级导航切换
  secondNav(event) {
    let {
      index,
      minor
    } = app.encodeParams(event)
    if (!index) {
      minor = ''
    }
    this.pubNav({
      minor
    }, index, this.data.majorInfo, 1)
  },
  // 监听子组件传值
  bookDetail(event) {
    let bookId = event.detail
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bookId=${bookId}&classify=${this.classify}`,
    })
  }
})