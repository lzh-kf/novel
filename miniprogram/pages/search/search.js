import {
  searchBook,
  getSearchHotword,
  gethHotRecommend
} from '../../api/api'
import {
  TimerFn,
  toTrim,
  setState,
  getState,
  removeState,
  randomArr
} from '../../utils/util'
const app = getApp()
Page({
  data: {
    value: '',
    list: [],
    focus: true,
    searchList: [],
    madomWordList: [],
    madomRecommendList: []
  },
  onLoad() {
    this.getSearchHotword()
    this.gethHotRecommend()
  },
  onShow() {
    this.setList()
  },
  // 获取历史缓存
  setList() {
    let searchList = getState('searchHistory')
    this.setData({
      searchList
    })
  },
  // 搜索数据
  searchBook(event) {
    TimerFn(this, () => {
      let value = event.detail.value
      searchBook(value).then(res => {
        let list = res.books
        if (list.length > 10) {
          list.length = 10
        }
        this.setData({
          list,
          value
        })
      })
    })
  },
  // 回车搜索
  enterSearch(event) {
    let value = event.detail.value
    let flag = toTrim(value)
    if (flag) {
      this.publicSearch(value)
    }
  },
  // 模糊查询
  jumpDetail(event) {
    let query = app.encodeParams(event).item
    this.publicSearch(query)
  },
  // 公用搜索逻辑
  publicSearch(query) {
    wx.navigateTo({
      url: `/pages/search-list/search-list?query=${query}`,
    })
    // 存储搜索记录
    this.searchHistory(query)
    //重置数据
    setTimeout(() => {
      this.setData({
        value: '',
        list: []
      })
    }, 1000)
  },
  //搜索之前的记录
  search(event) {
    let {
      value
    } = app.encodeParams(event)
    this.publicSearch(value)
  },
  //删除历史
  deleteHistory() {
    removeState('searchHistory')
    this.setList()
  },
  // 获取搜索历史
  searchHistory(query) {
    let searchHistory = getState('searchHistory') || []
    if (searchHistory.includes(query)) {
      return false
    }
    if (searchHistory && searchHistory.length > 9) {
      searchHistory.length = 9
    }
    searchHistory.unshift(query)
    setState('searchHistory', searchHistory)
  },
  // 获取搜索热词
  getSearchHotword() {
    getSearchHotword().then(res => {
      let hotWorldList = res.searchHotWords
      let madomWordList = randomArr(hotWorldList, 12)
      this.setData({
        hotWorldList,
        madomWordList
      })
    })
  },
  // 获取热门推荐
  gethHotRecommend() {
    gethHotRecommend().then(res => {
      let hotRecommendList = res.newHotWords
      let madomRecommendList = randomArr(hotRecommendList,6)
      this.setData({
        hotRecommendList,
        madomRecommendList
      })
    })
  },
  // 随机热词
  madomHotWord() {
    let {
      hotWorldList
    } = this.data
    let madomWordList = randomArr(hotWorldList, 12)
    this.setData({
      madomWordList
    })
  },
  // 随机推荐
  madomHotRecommend() {
    let {
      hotRecommendList
    } = this.data
    let madomRecommendList = randomArr(hotRecommendList,6)
    this.setData({
      madomRecommendList
    })
  }
})