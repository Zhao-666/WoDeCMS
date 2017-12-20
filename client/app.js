//app.js
App({
  getUserInfo: function (callback) {
    if (this.globalData.userInfo) {
      typeof callback == 'function' && callback(this.globalData.userInfo);
    } else {
      var that = this
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log('getUserInfo',res)
              that.globalData.userInfo = res.userInfo
              typeof callback == 'function' && callback(that.globalData.userInfo);
            }
          })
        }
      })
    }
  }

  ,
  globalData: {
    userInfo: null
  }
})