import {
  getBookDetail,
  getPictureId,
  getBookComment,
  getSecondClassify
} from '../../api/api'
import {
  getReadHistory,
  addShelf,
} from '../../api/cloudFn'
import {
  setTitle,
  randomArr,
  time
  } from '../../utils/util'
const app = getApp()
Page({
  data: {
    list: {},
    bookOpen: true,
    commentOpen: true,
    commentList: [],
    guessList: []
  },
  onLoad(options) {
    let {
      bookId,
      classify
    } = options
    this.bookId = bookId
    let openId = app.openId
    if (classify === 'picture') {
      this.classify = classify
    }
    this.getBookDetail(bookId)
    this.getHotComment(bookId)
  },
  // 打开简介
  changeState() {
    this.setData({
      bookOpen: !this.data.bookOpen
    })
  },
  // 推荐书籍
  getSecondClassify(major) {
    let params = {
      type: 'hot',
      major: this.majorCate,
      start: 0,
      limit: 20,
      minor: '',
      gender: ''
    }
    this.params = params
    getSecondClassify(params).then(res => {
      let guessList = res.books || []
      let _arr = randomArr(guessList, 6)
      _arr.forEach(i => {
        i.cover = decodeURIComponent(i.cover)
        i.cover = i.cover.replace('/agent/', '')
      })
      this.setData({
        guessList: _arr
      })
    })
  },
  // 获取热门书评
  getHotComment(bookId) {
    let params = {
      book: bookId,
      sort: 'helpful',
      start: 0,
      limit: 5
    }
    getBookComment(params).then(res => {
      let commentList = res.reviews
      commentList.forEach(item => {
        item.open = true
        item.updated = time(item.updated)
      })
      this.setData({
        commentList
      })
    })
  },
  // 评论展开或者收起
  openComment(event) {
    let {
      index
    } = app.encodeParams(event)
    let commentList = this.data.commentList
    commentList[index].open = !commentList[index].open
    this.setData({
      commentList
    })
  },
  // 猜你喜欢详情
  guessDetail(event) {
    let {
      id
    } = app.encodeParams(event)
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bookId=${id}`,
    })

  },
  //查看更多详情
  allDetail() {
    wx.navigateTo({
      url: `/pages/guess-list/guess-list?params=${JSON.stringify(this.params)}`,
    })
  },
  // 获取书籍详情
  getBookDetail(id) {
    getBookDetail(id).then(res => {
      let list = res
      setTitle(list.title)
      list.cover = decodeURIComponent(list.cover)
      list.cover = list.cover.replace('/agent/', '')
      list.wordCount = (list.wordCount / 10000).toFixed(1)
      this.majorCate = list.majorCate
      if (list.rating) {
        list.rating.score = (list.rating.score).toFixed(1)
        list.star = Math.floor(list.rating.score / 2)
      }
      this.setData({
        list
      })
      // 获取当前同类下的小说
      this.getSecondClassify()
    })
  },
  // 开始阅读
  read(event) {
    let {
      cover,
      title,
      _id
    } = app.encodeParams(event).item
    // 如果是漫画章节
    if (this.classify) {
      let path = this.classify === 'press' ? '/pages/read-book/read-book' : '/pages/read-picture/read-picture'
      wx.navigateTo({
        url: `${path}?bookId=${_id}&}&classify=${this.classify}&cover=${cover}&title=${title}`,
      })
    } else {
      wx.navigateTo({
        url: `/pages/read-book/read-book?bookId=${_id}&cover=${cover}&title=${title}`,
      })
    }
  },
  // 加入书架
  addShelf(event) {
    let openId = app.openId
    let {
      bookId,
      classify
    } = this
    let {
      cover,
      title
    } = this.data.list
    let data = {
      openId,
      bookId,
      cover,
      title,
      type: classify
    }
    addShelf(data).then(res => {}).catch(error => {
      console.error(error)
    })
  }
})