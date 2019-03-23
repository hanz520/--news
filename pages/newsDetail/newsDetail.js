const app = getApp()

Page({
  data: {
    show: false,    // 避免还没请求到数据，导致页面难堪
    title: '',
    author: '',
    published: '',
    content: '',
    category: ''
  },
  onLoad: function (options) {
    const id = options.id
    wx.showNavigationBarLoading()
    wx.request({
      url: `${app.api.getNewsDetail}/${id}`,
      success: (res) => {
        wx.hideNavigationBarLoading()
        this.setData({
          show: true,
          title: res.data.title,
          author: res.data.author_name,
          published: res.data.published_at,
          content: res.data.content,
          category: res.data.column_name
        })
      }
    })
  }
})

