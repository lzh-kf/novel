import {
  setState
} from '../utils/util'

// 公共方法
const publicFn = (name, data) => {
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data
    }).then(res => {
      wx.hideLoading()
      resolve(res.result)
    }).catch(error => {
      reject(error)
      wx.hideLoading()
      wx.showToast({
        title: e,
      })
    })
  })
}

// 获取二级分类
const searchClassify = (data) => {
  return new Promise((resolve, reject) => {
    publicFn('searchClassify', data).then(res => {
      resolve(res.data)
    })
  })
}

// 获取我的书架
const searchAllShelf = (data) => {
  return new Promise((resolve, reject) => {
    publicFn('searchAllShelf', data).then(res => {
      let list = res.data
      if (list.length) {
        list.forEach((item) => {
          item.check = false
        })
        setState('book', list.reverse())
      }
      resolve(list)
    })
  })
}

// 获取我的阅读记录
const getReadHistory = (data) => {
  return new Promise((resolve, reject) => {
    publicFn('searchBook', data).then(res => {
      let list = res.data.reverse()
      if (list.length > 9) {
        list.length = 9
      }
      resolve(list)
    })
  })
}

// 搜索书籍
const searchBook = (data) => {
  return new Promise((resolve, reject) => {
    publicFn('searchBook', data).then(res => {
      resolve(res.data)
    })
  })
}
// 更新书籍记录
const updateBook = (data) => {
  return new Promise((resolve, reject) => {
    publicFn('updateBook', data).then(res => {
      resolve(res.data)
    })
  })
}

// 添加书籍纪录
const addBook = (data) => {
  return new Promise((resolve, reject) => {
    publicFn('addBook', data).then(res => {
      resolve(res.data)
    })
  })
}

// 保存我的阅读记录
const setReadHistory = (data) => {
  return new Promise((resolve, reject) => {
    searchBook(data).then(res => {
      if (res.length) {
        updateBook(data)
      } else {
        addBook(data)
      }
    })
  })
}

// 搜索书架
const searchShelf = (data) => {
  return new Promise((resolve, reject) => {
    publicFn('searchShelf', data).then(res => {
      resolve(res.data)
    })
  })
}

// 加入书架
const addShelf = (data) => {
  return new Promise((resolve, reject) => {
    searchShelf(data).then(response => {
      if (response.length) {
        wx.showToast({
          title: '你已添加改书籍，快去添加其他的吧！',
          icon: 'none',
          duration: 2000
        })
      } else {
        publicFn('addShelf', data).then(res => {
          wx.showToast({
            title: '加入成功',
            icon: 'none',
            duration: 2000
          })
          resolve()
        })
      }
    })
  })
}

// 删除书架
const removeShelf = (data) => {
  return new Promise((resolve, reject) => {
    publicFn('removeShelf', data).then(res => {
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 2000
      })
      resolve(res)
    })
  })
}

// 获取首页轮播消息
const indexSwiper = () => {
  return new Promise((resolve, reject) => {
    publicFn('indexSwiper').then(res => {
      resolve(res)
    })
  })
}

module.exports = {
  searchClassify,
  searchAllShelf,
  getReadHistory,
  setReadHistory,
  addShelf,
  removeShelf,
  indexSwiper
}