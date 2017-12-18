Page({
  data: {
    animationData: {}
  },
  onShow: function () {
    // var animation = wx.createAnimation({
    //   duration: 1000,
    //   timingFunction: 'ease',
    // })

    // this.animation = animation

    // animation.scale(2, 2).rotate(45).step()

    // this.setData({
    //   animationData: animation.export()
    // })

    // setTimeout(function () {
    //   animation.translate(30).step()
    //   this.setData({
    //     animationData: animation.export()
    //   })
    // }.bind(this), 1000)
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
    })

    animation.translateX('-100%').step()
    this.setData({
      animationData: animation.export()
    })
  
  },
  clickbutton: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
    })
    animation.translateX(0).step()
    this.setData({
      animationData: animation.export()
    })
  },
  rotateAndScale: function () {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale: function () {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function () {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  }
})