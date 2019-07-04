import {
  getAllList,
  getOneList
} from '../../api/api'
import {
  indexSwiper
} from '../../api/cloudFn'
import {
  startTouch,
  endTouch,
  randomArr
} from '../../utils/util'
const app = getApp()
const path = '../../static/img/'
Page({
  data: {
    navList: [{
      img: `${path}classify.png`,
      title: '分类',
      path: '/pages/book-classify/book-classify'
    },
    {
      img: `${path}rank.png`,
      title: '榜单',
      path: '/pages/rank-list/rank-list'
    },
    {
      img: `${path}book-list.png`,
      title: '书单',
      path: '/pages/book-list/book-list'
    },
    {
      img: `${path}no.png`,
      title: '暂无',
      path: '/pages/test'
    }
    ],
    hotRecommend: [],
    imgList: []
  },
  onLoad(options) {
    this.getAllRank()
    this.getNovel()
  },
  onPullDownRefresh() {
    this.onLoad()
  },
  // 跳转到搜索页
  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 导航
  nav(event) {
    let {
      item
    } = app.encodeParams(event)
    if (item.path) {
      wx.navigateTo({
        url: item.path,
      })
    } else {
      wx.showToast({
        title: '暂无页面',
        icon: 'none'
      })
    }
  },
  // 查看更多
  rankDetail(event) {
    let {
      id
    } = app.encodeParams(event)
    wx.navigateTo({
      url: `/pages/single-rank/single-rank?rankId=${id}`,
    })
  },
  // 监听子组件传值
  bookDetail(event) {
    let bookId = event.detail
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bookId=${bookId}`,
    })
  },
  // 获取轮播
  swiperdetail(event) {
    let {
      id
    } = app.encodeParams(event)
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bookId=${id}`,
    })
  },
  // 获取所有榜单
  getAllRank() {
    getAllList().then(res => {
      let _data = [
        res.female,
        res.male
      ]
      // 随机获取榜单的其中五个
      let index = Math.floor(Math.random() * _data.length)
      let rankList = _data[index]
      let _arr = randomArr(rankList, 5)
      this.madomRankBook(_arr).then(res => {
        this.setData({
          hotRecommend: res
        })
      })
    })
  },
  // 获取轮播推荐
  getNovel() {
    indexSwiper().then(res => {
      this.setData({
        imgList: res
      })
    })
  },
  // 随机榜单书籍
  madomRankBook(_arr) {
    let hotRecommend = []
    let promiseAll = _arr.map((item, index) => {
      return new Promise((resolve, reject) => {
        getOneList(item._id).then(res => {
          let _bookList = res.ranking.books
          let bookList = randomArr(_bookList, 4)
          item.title = item.title.replace('榜', '')
          let bookObj = {
            id: item._id,
            title: item.title,
            bookList
          }
          resolve(bookObj)
        })
      })
    })
    return Promise.all(promiseAll).then(res => {
      return res
    })
  },
  // 开始记录手势
  start(event) {
    startTouch(this, event)
  },
  // 触摸事件结束
  end(event) {
    let direction = endTouch(this, event)
    if (direction === 'left') {
      wx.switchTab({
        url: '/pages/book-shelf/book-shelf',
      })
    }
  }
})