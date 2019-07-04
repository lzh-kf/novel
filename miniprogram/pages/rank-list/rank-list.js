import {
  getAllList
} from '../../api/api'
import {
  getDirection,
  startTouch,
  endTouch
} from '../../utils/util'
const app = getApp()
Page({
  data: {
    categoryInfo: {
      list: [{
          id: 0,
          title: "男频",
          value: 2
        },
        {
          id: 1,
          title: "女频",
          value: 1
        }
      ],
      check: 0
    },
    rankInfo: [],
    startx: 0,
    starty: 0,
    endx: 0,
    endy: 0
  },
  onLoad(options) {
    this.getAllList()
  },
  getAllList() {
    getAllList().then(res => {
      let data = res
      let rankInfo = []
      rankInfo[0] = data.male
      rankInfo[1] = data.female
      rankInfo[2] = data.epub
      rankInfo[3] = data.picture
      this.setData({
        rankInfo
      })
    })
  },
  // tab切换
  changeTab(event) {
    let index = app.encodeParams(event).index
    if (index !== this.data.categoryInfo.check) {
      this.setData({
        'categoryInfo.check': index
      })
    }
  },
  // 触摸开始事件
  start(event) {
    startTouch(this, event)
  },
  // 触摸结束事件
  end(event) {
    let direction = endTouch(this, event)
    if (this.data.categoryInfo.check) {
      if (direction === "right") {
        this.setData({
          "categoryInfo.check": 0
        })
      }
    } else {
      if (direction === "left") {
        this.setData({
          "categoryInfo.check": 1
        })
      }
    }
  }
})