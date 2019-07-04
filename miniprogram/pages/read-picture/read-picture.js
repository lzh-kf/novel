import {
  getPictureAllchapters,
  getBookSectionDeatil,
  getPictureId
} from '../../api/api'
import {
  setReadHistory,
  getReadHistory
} from '../../api/cloudFn'
import {
  setTitle
} from '../../utils/util'
const app = getApp()
const regeneratorRuntime = require('../../utils/async')
Page({
  data: {
    imgList: [],
    chapters: [],
    flag: false
  },
  async onLoad(options) {
    let {
      bookId,
      cover,
      title,
      path,
      classify
    } = options
    let openId = app.openId
    this.bookId = bookId
    this.cover = cover
    this.title = title
    this.classify = classify
    this.bookIndex = 0
    await this.getPictureId()
    await this.searchHistory(
      openId
    )
    this.getPictureAllchapters()
    setTitle(title)
  },
  onHide() {
    this.setHistory()
  },

  onUnload() {
    this.setHistory()
  },

  // 打开目录列表
  openchapters() {
    this.setData({
      flag: true
    })
  },
  // 关闭章节目录
  colsechapters() {
    this.setData({
      flag: false
    })
  },
  // 选择章节
  changeChapters(event) {
    let {
      index
    } = app.encodeParams(event)
    index = Number(index)
    this.bookIndex = index
    let item = this.data.chapters[index]
    this.setData({
      imgList: []
    })
    this.getBookSectionDeatil(item)
    this.colsechapters()
  },

  // 下拉刷新
  onReachBottom() {
    let data = this.data
    let {
      chapters
    } = data
    this.bookIndex++
      if (this.bookIndex <= chapters.length - 1) {
        this.getBookSectionDeatil(chapters[this.bookIndex])
      }
  },
  // 获取漫画的id
  getPictureId() {
    return new Promise((resolve, reject) => {
      getPictureId(this.bookId).then(res => {
        let _id = res[0]._id
        this.bookId = _id
        resolve()
      })
    })
  },
  // 搜索当前书籍是否有阅读记录
  searchHistory(data) {
    return new Promise((resolve, reject) => {
      getReadHistory({
        data,
        bookId: this.bookId
      }).then(res => {
        try {
          let {
            index
          } = res[0]
          this.bookIndex = index
        } catch (e) {
          this.bookIndex = 0
        }
        resolve()
      }).catch(error => {
        console.log('getReadHistory', error)
      })
    })
  },
  // 获取所有漫画章节
  getPictureAllchapters() {
    getPictureAllchapters(this.bookId).then(res => {
      let chapters = res.chapters
      let item = chapters[this.bookIndex]
      this.setData({
        chapters
      })
      this.getBookSectionDeatil(item)
    })
  },
  // 获取具体的某一章节
  getBookSectionDeatil(item) {
    getBookSectionDeatil(item.link).then(res => {
      let imgStr = res.chapter.images
      let imgList = imgStr.split(',')
      let _imgList = this.data.imgList
      _imgList.push(...imgList)
      this.setData({
        imgList: _imgList
      })

    })
  },
  // 保存历史记录
  setHistory() {
    let {
      bookId,
      cover,
      title,
      classify,
      bookIndex
    } = this
    let index = bookIndex
    let link = this.data.chapters[index].link
    let openId = app.openId
    let data = {
      bookId,
      index,
      link,
      openId,
      cover,
      title,
      type: classify
    }
    setReadHistory(data).then(res => {
      console.log(res)
    })
  },
})