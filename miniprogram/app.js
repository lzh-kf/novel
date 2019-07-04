//app.js
wx.cloud.init()
App({
  openId: '',
  onLaunch(options) {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      wx.setStorageSync('openId', res.result.openId)
      let openId = wx.getStorageSync('openId')
      this.openId = openId
    })
  },
  encodeParams(event) {
    let data = event.currentTarget.dataset
    return data || {}
  },
  globalData: {
    imgUrl: `http://statics.zhuishushenqi.com`
  }
})