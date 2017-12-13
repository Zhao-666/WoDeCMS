var config = require('../../config.js')

// pages/login/login.js
Page({
  data: {
    passWord: '',
    userNameTips: '',
    passWordTips: ''
  },
  formSubmit: function (e) {
    console.log(e)
    let username = e.detail.value.username
    let password = e.detail.value.password
    this.setData({
      userNameTips: '',
      passWordTips: ''
    })

    let tips = this.loginValidate(username, password)
    console.log(tips.userNameTips)
    this.setData({
      userNameTips: tips.userNameTips,
      passWordTips: tips.passWordTips
    })
    if (tips.userNameTips === undefined && tips.passWordTips === undefined) {
      let that = this
      wx.request({
        url: config.service.loginUrl,
        data: {
          username: username,
          password: password,
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.errorCode === '10001') {
            that.setData({
              passWordTips: res.data.msg
            })
          } else {
            wx.navigateTo({
              url: '../index/index',
            })
          }
        },
        fail: function (res) {
          console.log(res)
          console.log(res.data.msg)
          that.setData({
            passWordTips: res.data.msg
          })
        }
      })
    }
  },
  formReset: function () {
    console.log('form发生了reset事件')
    this.setData({
      passWordTips: ''
    })
  },
  loginValidate: function (username, password) {
    let tips = {}
    if (username === '') {
      tips.userNameTips = '请输入账户'
    } else if (username.length < 6) {
      tips.userNameTips = '账户字符须大于六位'
    }
    if (password === '') {
      tips.passWordTips = '请输入密码'
    } else if (password.length < 8) {
      tips.passWordTips = '密码字符须大于八位'
    }
    return tips
  },
  cleanPassword: function () {
    if (this.data.passWordTips !== '') {
      console.log('清空密码哦')
      this.setData({
        passWord: ''
      })
    }
  }
})