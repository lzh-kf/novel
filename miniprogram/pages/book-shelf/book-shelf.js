const app = getApp()
import {
  searchAllShelf,
  getReadHistory,
  removeShelf
} from '../../api/cloudFn'
import {
  getState,
  setState,
  getDirection,
  startTouch,
  endTouch
} from '../../utils/util'
Page({
  data: {
    navInfo: {
      list: [
        '我的书架',
        '阅读记录'
      ],
      check: 0
    },
    bookList: [],
    historyList: [],
    flag: false,
    editFlag: false,
    startx: 0,
    starty: 0,
    endx: 0,
    endy: 0
  },
  // 初始化
  onLoad() {
    this.getBookShelf()
    this.readHistory()
  },
  // 上拉刷新
  onPullDownRefresh() {
    this.onLoad()
  },
  // 导航切换
  chnageNav(event) {
    let {
      index
    } = app.encodeParams(event)
    if (index !== this.data.navInfo.check) {
      this.setData({
        "navInfo.check": index
      })
    }
  },
  // 长按编辑书籍
  longGress(event) {
    let index = event.currentTarget.dataset.index
    let bookList = this.data.bookList
    bookList[index].check = true
    this.setData({
      editFlag: true,
      flag: true,
      bookList
    })
  },
  // 获取当前书架内容
  getBookShelf() {
    let openId = app.openId
    let data = {
      openId
    }
    searchAllShelf(data).then(res => {
      this.setData({
        bookList: res
      })
    })
  },
  // 获取全部阅读记录
  readHistory() {
    let openId = app.openId
    getReadHistory({
      openId
    }).then(res => {
      this.setData({
        historyList: res
      })
    })
  },
  // 阅读书籍
  readBook(event) {
    let {
      cover,
      title,
      bookId,
      type
    } = app.encodeParams(event).item
    let openId = app.openId
    let data = {
      openId,
      bookId
    }
    let path = type ? `/pages/read-picture/read-picture?classify=${type}&` : '/pages/read-book/read-book?'
    wx.navigateTo({
      url: `${path}bookId=${bookId}&cover=${cover}&title=${title}`,
    })
  },
  // 取消编辑书籍
  editBook() {
    let bookList = getState('book')
    this.setData({
      editFlag: false,
      flag: false,
      bookList
    })
  },
  // 书籍编辑
  check(event) {
    let index = app.encodeParams(event).index
    let bookList = this.data.bookList
    bookList.forEach((item, key) => {
      if (key === index) {
        item.check = !item.check
      }
    })
    this.setData({
      bookList
    })
  },
  // 删除书籍
  submitEdit() {
    let bookId = []
    this.data.bookList.forEach(item => {
      if (item.check) {
        bookId.push(item.bookId)
      }
    })
    if (bookId.length) {
      let openId = app.openId
      let data = {
        openId,
        bookId
      }
      removeShelf(data).then(res => {
        let _list = this.data.bookList
        let bookList = []
        _list.forEach((item, index) => {
          if (!item.check) {
            bookList.push(item)
          }
        })
        setState('book', bookList)
        this.setData({
          bookList
        })
      })
    }
    this.setData({
      editFlag: false,
      flag: false
    })
  },
  // 开始记录手势
  start(event) {
    startTouch(this, event)
  },
  // 触摸事件结束
  end(event) {
    let direction = endTouch(this, event)
    if (this.data.navInfo.check) {
      if (direction === "right") {
        this.setData({
          "navInfo.check": 0
        })
      }
    } else {
      if (direction === "left") {
        this.setData({
          "navInfo.check": 1
        })
      }
    }
  },
  // 开始记录手势
  start1(event) {
    startTouch(this, event)
  },
  // 触摸事件结束
  end1(event) {
    let direction = endTouch(this, event)
    if (this.data.navInfo.check) {
      if (direction === "right") {
        this.setData({
          "navInfo.check": 0
        })
      }
    } else {
      if (direction === "left") {
        this.setData({
          "navInfo.check": 1
        })
      } else if (direction === "right") {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    }
  }
})