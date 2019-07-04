const Fly = require("flyio")
const fly = new Fly()
//添加请求拦截器
fly.interceptors.request.use((request) => {
  //给所有请求添加自定义header
  //打印出请求体
   wx.showLoading({
    mask: true,
    title: '加载中',
  })
  //终止请求
  //var err=new Error("xxx")
  //err.request=request
  //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    wx.showLoading({
      mask: true,
      title: '网络错误',
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 3000)
    console.log('网络qingiqu', err)
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
)
export default fly