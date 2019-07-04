const app = getApp()
const path = '../../api/'
import {
  getClassify
} from '../../api/api'
import {
  searchClassify
} from '../../api/cloudFn'
import {
  imgLazy
} from '../../utils/util'
Page({
  data: {
    scrollTop: 0,
    toView: '',
    classifyInfo: {
      list: [{
          title: '男生',
          value: 'male'
        },
        {
          title: '女生',
          value: 'female'
        },
        {
          title: '漫画',
          value: 'picture'
        },
        {
          title: '出版',
          value: 'press'
        }
      ],
      check: 0
    },
    bookList: []
  },
  onLoad(options) {
    this.getClassify()
  },
  // 分类详情
  classifyDetail(event) {
    let {
      title,
      classify
    } = app.encodeParams(event)
    let data = {
      title
    }
    //搜索二级分类
    searchClassify(data).then(res => {
      let childList = res[0].mins
      let params = {
        title,
        childList,
        classify
      }
      wx.navigateTo({
        url: `/pages/classify-child/classify-child?params=${JSON.stringify(params)}`,
      })
    })
  },
  // 切换导航
  changeNav(event) {
    let index = app.encodeParams(event).index
    if (!(index === this.data.classifyInfo.check)) {
      this.setData({
        'classifyInfo.check': index
      })
      this.setData({
        toView: `key${index}`
      })
    }
  },
  // 获取节点信息
  getQuery() {
    const query = wx.createSelectorQuery()
    query.selectAll('.classify-shelf').boundingClientRect().exec(res => {
      let queryInfo = []
      res[0].forEach(item => {
        queryInfo.push(item.height)
      })
      this.setData({
        queryInfo
      })
    })
  },
  // 获取分类列表
  getClassify() {
    getClassify().then(res => {
      let data = res
      let list = this.data.classifyInfo.list
      Object.keys(data).forEach((i, k) => {
        if (i !== 'ok') {
          data[i].forEach((item, index) => {
            let arr = []
            item.bookCover.forEach((value, key) => {
              value = decodeURIComponent(value)
              value = value.replace('/agent/', '')
              arr.push(value)
            })
            item.bookCover = arr
          })
          list[k].bookList = data[i]
        }
      })
      list.map(item => {
        item.flag = false
        item.defaultCover = '../../static/img/loading.png'
      })
      this.setData({
        "classifyInfo.list": list
      })
      imgLazy(this, list, 'classifyInfo.list', '.classify-shelf', false)
      this.getQuery()
    })
  }
})