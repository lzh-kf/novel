import {
  getBookSection,
  getBookSectionDeatil,
  getPictureAllchapters
} from '../../api/api'
import {
  setReadHistory,
  getReadHistory,
  addShelf
} from '../../api/cloudFn'
import {
  setState,
  getState,
  setTitle
} from '../../utils/util'
const regeneratorRuntime = require('../../utils/async')
const app = getApp()
Page({
  data: {
    index: 0,
    list: [],
    chapters: [],
    fontSize: 36,
    editFlag: false,
    lightValue: 0,
    openChapter: false
  },
  async onLoad(options) {
    let {
      bookId,
      classify,
      cover,
      title
    } = options
    this.setData({
      title
    })
    let openId = app.openId
    setTitle(title)
    this.bookId = bookId
    this.cover = cover
    this.title = title
    if (classify) {
      this._getBookSection(bookId)
    } else {
      await this.searchHistory({
        openId,
        bookId
      })
      this.getBookSection(bookId)
    }
    this.getLight()
    this.getFontSize()
  },
  // 获取字体
  getFontSize() {
    let fontSize = getState('fontSize') || 36
    this.setData({
      fontSize
    })
  },
  // 获取记录
  searchHistory(data) {
    return new Promise((resolve, reject) => {
      getReadHistory(data).then(res => {
        let index = 0
        try {
          index = res[0].index
          this.setData({
            index
          })
        } catch (e) {
          this.setData({
            index: 0
          })
        }
        resolve()
      }).catch(error => {
        console.log('getReadHistory', error)
      })
    })
  },
  // 设置亮度
  setLight(event) {
    let {
      value
    } = event.detail.detail
    wx.setScreenBrightness({
      value,
      success() {},
      fail(error) {
        console.log('setScreenBrightness', error)
      }

    })
  },
  // 获取亮度
  getLight() {
    let _this = this
    wx.getScreenBrightness({
      success(res) {
        _this.setData({
          lightValue: res.value
        })
      }
    })
  },
  onHide() {
    this.setHistory()
  },

  onUnload() {
    this.setHistory()
  },
  // 上拉监听
  onReachBottom() {
    let data = this.data
    let {
      index,
      chapters
    } = data
    index++
    if (index <= chapters.length - 1) {
      this.setData({
        index
      })
      this.getBookSectionDeatil(chapters[data.index])
    }
  },
  // 返回
  goBack() {
    this.setData({
      openChapter: false,
      editFlag: false
    })
  },
  // 获取传记详情
  _getBookSection(bookId) {
    getPictureAllchapters(bookId).then(res => {
      let chapters = res.data.chapters
      let item = chapters[this.data.index]
      this.setData({
        chapters
      })
      this.getBookSectionDeatil(item)
    })
  },
  // 获取书籍章节
  getBookSection(bookId) {
    getBookSection(bookId).then(res => {
      let chapters = res.mixToc.chapters
      let item = chapters[this.data.index]
      this.getBookSectionDeatil(item)
      this.setData({
        chapters
      })
    })
  },
  // 获取具体章节
  getBookSectionDeatil(item) {
    getBookSectionDeatil(item.link).then(res => {
      let data = this.data.list
      let list = {
        body: res.chapter.cpContent || res.chapter.body,
        title: item.title
      }
      data.push(list)
      this.setData({
        list: data
      })
    })
  },
  // 跳转到目录列表
  catalog() {
    this.setData({
      openChapter: true
    })
  },
  // 保存历史记录
  setHistory() {
    let {
      bookId,
      cover,
      title
    } = this
    let index = this.data.index
    let link = this.data.chapters[index].link
    let openId = app.openId
    let data = {
      bookId,
      index,
      link,
      openId,
      cover,
      title
    }
    setReadHistory(data).then(res => {})
  },
  // 编辑字体大小
  editSize(event) {
    let flag = app.encodeParams(event).flag
    let fontSize = this.data.fontSize
    fontSize = flag ? fontSize - 2 : fontSize + 2
    setState('fontSize', fontSize)
    this.setData({
      fontSize
    })
  },
  // 加入书架
  addBookShelf(event) {
    let openId = app.openId
    let {
      bookId,
      classify,
      cover,
      title
    } = this
    let data = {
      openId,
      bookId,
      cover,
      title,
      type: classify
    }
    addShelf(data)
  },
  // 跳转到具体章节
  jumpCatalog(event) {
    let {
      index,
      item
    } = app.encodeParams(event)
    this.setData({
      list: [],
      index
    })
    this.getBookSectionDeatil(item)
    this.setData({
      openChapter: false,
      editFlag: false
    })
  },
  // 展开编辑
  showEdit() {
    this.setData({
      editFlag: !this.data.editFlag
    })
  }
})