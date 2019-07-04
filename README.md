# novel
## 仅限学习!!!

### 开发目的
* 熟悉小程序的开发
<br>

### 接口数据获取来自

[API文档](https://github.com/jianhui1012/bookreader/wiki/API-%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3)
<br>
感谢大佬整合的接口
<br>
### 技术栈
* 小程序云开发（后端）和原生小程序（前端）<br>
* 整个后台，大致分为两大部分<br>
* 获取小说数据（调取追书神器的api）<br>
* 保存读者的阅读记录（云开发)
<br>

###  目前完成的功能
* 小说阅读<br>
* 目录跳转，字体 亮度调节<br>
* 榜单推荐<br>
* 分类推荐<br>
* 书单推荐<br>
* 搜索（书籍和作者）<br>
* 加入书架，以及移出书架<br>
* 保存阅读记录（只展示最新的九条记录）<br>
* 热门书评<br>
* 图片懒加载<br>
* tab手势切换，以及书架和记录手势切换<br>
* 漫画阅读
<br>

### 项目初始化

```javascript

git clone git@github.com:lzh-kf/novel.git

```
* 注：AppID 首次开通云环境后，需等待大约 10 分钟方可正常使用云 API，在此期间官方后台服务正在做准备服务，如尝试在小程序中调用云 API 则会报 cloud init error：{ errMsg: "invalid scope" } 的错误
* 选择小程序开发，导入项目
* 在/novel/miniprogram目录下
```javascript

npm install 安装依赖

```
* 上传云函数（全部都要上传
* 在云开发后台，新建book-classify（二级分类表）bookShelf（书架表）updateBook（阅读记录表)
<br>

### 项目截图
* 首页<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/index.jpg)  
<br>
<br>

* 分类<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/classify.jpg)  

<br>
<br>

* 二级分类<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/child-classify.jpg) 

<br>
<br>

* 排行榜<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/rank.jpg)  

<br>
<br>

* 搜索<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/search.jpg)  

<br>
<br>

* 搜索二级页<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/search-list.jpg)  

<br>
<br>

* 书单<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/book-list-detail.jpg)  

<br>
<br>

* 书单二级页<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/child-book-list.jpg)  

<br>
<br>

* 书籍详情页<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/book-detail1.jpg) 

<br>
<br>

* 书籍详情页<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/book-detail.jpg)  

<br>
<br>

* 阅读页<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/read-book.jpg)  

<br>
<br>

* 书架<br>
![](https://github.com/lzh-kf/novel/blob/master/project-img/book-shelf.jpg)  



