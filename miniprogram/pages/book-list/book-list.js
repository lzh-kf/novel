import {
  getBookList,
  getBookType
} from '../../api/api'
import {
  randomArr,
  TimerFn,
  imgLazy
} from '../../utils/util'
const app = getApp()
Page({
  data: {
    channelInfo: {
      list: [{
          value: '男生',
          key: 'male'
        },
        {
          value: '女生',
          key: 'female'
        }
      ],
      check: 0
    },
    firstInfo: {
      list: [{
          value: '本周最热',
          params: {
            duration: 'last-seven-days',
            sort: 'collectorCount',
          }
        },
        {
          value: '最新发布',
          params: {
            duration: 'all',
            sort: 'created',
          }
        },
        {
          value: '最多收藏',
          params: {
            duration: 'all',
            sort: 'collectorCount',
          }
        }
      ],
      check: 0
    },
    secondInfo: {
      list: [],
      check: 0
    },
    bookType: [],
    bookList: [],
    typeFLag: false,
    loadmore: {}
  },
  // 初始化
  onLoad(options) {
    this.params = {
      duration: 'last-seven-days',
      sort: 'collectorCount',
      start: 0,
      limit: 20,
      tag: '',
      gender: 'male',
    }
    this.moreFlag = true
    this.madomList = []
    this.getBookList()
    this.getBookType()
  },
  onReachBottom() {
    if (!this.data.typeFLag) {
      if (this.moreFlag) {
        this.params.start = this.params.start + 20
        this.params.limit = this.params.limit + 20
        this.getBookList()
      }
    }
  },
  // 打开筛选
  chnageType() {
    this.setData({
      typeFLag: !this.data.typeFLag
    })
  },
  // 监听组件
  more() {
    this.moreFlag = false
  },
  // 顶级导航
  channelNav(event) {
    let {
      index,
      key
    } = app.encodeParams(event)
    if (index !== this.data.channelInfo.check) {
      this.setData({
        'channelInfo.check': index
      })
      this.params = Object.assign(this.params, {
        gender: key
      })
      this.initNav()
    }
  },
  // 一级导航
  firstNav(event) {
    let {
      index,
      params
    } = app.encodeParams(event)
    if (index !== this.data.firstInfo.check) {
      this.setData({
        'firstInfo.check': index,
        'secondInfo.check': 0,
      })
      this.params = Object.assign(this.params, params)
      this.params.tag = ''
      this.initNav()
    }
  },
  // 二级导航
  secondNav(event) {
    let {
      index,
      item
    } = app.encodeParams(event)
    let tag = index ? item : ''
    if (index !== this.data.secondInfo.check) {
      this.setData({
        'secondInfo.check': index
      })
      // 初始化隐藏导航数据
      let bookType = this.data.bookType
      bookType.map(item => {
        item.check = null
      })
      this.setData({
        bookType
      })
      this.params = Object.assign(this.params, {
        tag
      })
      this.initNav()
    }
  },
  // 隐藏的二级导航
  typeChange(event) {
    let {
      item,
      index,
      inx
    } = app.encodeParams(event)
    let tag = item.tags[inx]
    let bookType = this.data.bookType
    if (inx !== bookType[index].check) {
      bookType.map(item => {
        item.check = null
      })
      bookType[index].check = inx
      this.setData({
        bookType,
        'secondInfo.check': null
      })
      this.params = Object.assign(this.params, {
        tag
      })
      this.initNav()
    }
  },
  // 初始化数据（切换导航时，执行）
  initNav() {
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.setData({
      typeFLag: false,
      bookList: []
    })
    this.params.start = 0
    this.params.limit = 20
    this.moreFlag = true
    this.getBookList()
  },
  // 获取书单
  getBookList() {
    getBookList(this.params).then(res => {
      let _bookList = res.bookLists
      let bookList = this.data.bookList
      _bookList.map(item => {
        item.flag = false
        item.defaultCover = '../../static/img/loading.png'
        let _arr = []
        item.covers.map(i => {
          i = decodeURIComponent(i)
          i = i.replace('/agent/', '')
          _arr.push(i)
        })
        item.covers = _arr
      })
      bookList.push(..._bookList)
      this.setData({
        bookList,
        loadmore: {
          list: bookList,
          item: _bookList
        }
      })
      this.imgLazy()
    })
  },
  // 获取书籍类型
  getBookType() {
    getBookType().then(res => {
      let _list = res.data
      _list.map(item => {
        item.check = null
        if (item.tags) {
          this.madomList.push(...item.tags)
        }
      })
      let list = randomArr(this.madomList, 4)
      list.unshift('全部')
      this.setData({
        bookType: _list,
        'secondInfo.list': list
      })
    })
  },

  // 跳转到书单详情
  bookDetail(event) {
    let {
      id
    } = app.encodeParams(event)
    wx.navigateTo({
      url: `/pages/single-book/single-book?bookId=${id}`,
    })
  },
  // 图片懒加载
  imgLazy() {
    let bookList = this.data.bookList
    imgLazy(this, bookList, 'bookList', '.book-item', false)
  },
})