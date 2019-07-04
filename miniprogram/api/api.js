import fly from '../http/http'
import qs from 'qs'
const path = `http://api.zhuishushenqi.com/`
// 测试练习
// 测试练习001
// 我是分支的东西
// 获取所有榜单
const getAllList = () => {
  return fly.get(`${path}ranking/gender`)
}

// 首页推荐书籍
const swiperList = () => {
  return fly.get(`http://www.zhuishushenqi.com/spread`)
}

// 获取单一榜单
const getOneList = (rankingId) => {
  return fly.get(`${path}ranking/${rankingId}`)
}

// 获取书籍简介
const getBookDetail = (bookid) => {
  return fly.get(`${path}book/${bookid}`)
}

// 获取书籍章节
const getBookSection = (bookid) => {
  return fly.get(`${path}mix-atoc/${bookid}?view=chapters`)
}

// 获取具体章节详情
const getBookSectionDeatil = (link) => {
  return fly.get(`http://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
}

// 搜索书籍
const searchBook = (value) => {
  return fly.get(`${path}book/fuzzy-search?query=${value}`)
}

// 获取分类
const getClassify = () => {
  return fly.get(`${path}cats/lv2/statistics`)
}

// 获取二级分类
const getSecondClassify = (params = {}) => {
  return fly.get(`${path}book/by-categories`, qs.stringify(params))
}

// 获取漫画特殊id
const getPictureId = (params) => {
  return fly.get(`${path}btoc?view=summary&book=${params}&platform=h5`)
}

// 获取漫画和传记全部章节
const getPictureAllchapters = (pictureId) => {
  return fly.get(`${path}btoc/${pictureId}?view=chapters&channel=mweb&platform=h5`)
}

// 获取热门书评
const getBookComment = (params) => {
  return fly.get(`${path}post/review/by-book`, qs.stringify(params))
}

// 获取搜索热词
const getSearchHotword = () => {
  return fly.get(`${path}book/search-hotwords`)
}

// 获取搜索热词
const gethHotRecommend = () => {
  return fly.get(`${path}book/hot-word`)
}

// 获取主题书单列表
const getBookList = (params) => {
  return fly.get(`${path}book-list`, qs.stringify(params))
}

// 获取主题书单标签列表
const getBookType = () => {
  return fly.get(`${path}book-list/tagType`)
}

// 获取书单详情
const getSIngleBook = (bookId) => {
  return fly.get(`${path}book-list/${bookId}`)
}


module.exports = {
  getAllList,
  getOneList,
  getBookDetail,
  getBookSection,
  getBookSectionDeatil,
  searchBook,
  getClassify,
  getSecondClassify,
  getPictureId,
  getPictureAllchapters,
  getBookComment,
  getSearchHotword,
  gethHotRecommend,
  swiperList,
  getBookList,
  getBookType,
  getSIngleBook
}