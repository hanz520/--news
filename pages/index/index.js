//index.js
const app = getApp()
let newsList = []

Page({
  data: {
   list: [],
   loading: false,    // 是否显示上拉加载loading
   backTopVisible: false    // 返回顶部按钮可视化
  },
  onLoad() {
    // wx.showLoading({
    //   title: '加载中',
    // })
    wx.showNavigationBarLoading()
    this.ajaxList((res) => {
      this.toSetList(res.data)
      // wx.hideLoading()
      wx.hideNavigationBarLoading()
      
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.ajaxList((res) => {
      this.toSetList(res.data)
      wx.stopPullDownRefresh()
    })
  },
  // 上拉加载
  onReachBottom() {
    this.setData({
      loading: true
    })
    this.ajaxList((res) => {
      res.data.map(v => {
        newsList.push(v)
      })
      this.toSetList(newsList)
      this.setData({
        loading: false
      }) 
    })
  },
  // 滚动触发
  onPageScroll(data) {
    if(data.scrollTop > 280) {
      this.setData({
        backTopVisible: true
      })
    }else{
      this.setData({
        backTopVisible: false
      })
    }
  },
  // 剔除掉无用的数据，避免造成对setData性能的影响，以及可能出现的 exceed max data size! 错误
  toSetList(data) {
    let list = []
    data.map( v => {
      let { cover, title, summary, author_name, created_at, post_id } = v
      list.push({ cover, title, summary, author_name, created_at, post_id })
    })
    this.setData({
      list: list
    })    
  },
  // 请求数据
  ajaxList(fn) {
    wx.request({
      url: app.api.getNewsList,
      success: (res) => {
        // console.log(res.data)
        fn(res)
      }
    })
  },
  // 查看新闻详情
  itemTap: function(e) {
    wx.navigateTo({
      url: `../newsDetail/newsDetail?id=${e.currentTarget.dataset.id}`
    })
  },
  // 返回顶部
  bindBacktop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
})
