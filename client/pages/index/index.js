var Charts = require('../../utils/wxcharts.js')
var config = require('../../config.js')

Page({
  data: {
    chartIndex: 0,
    chartArray: [{
      value: 1,
      name: '事件1'
    }, {
      value: 2,
      name: '事件2'
    }, {
      value: 3,
      name: '事件3'
    }],
    chartData: {},
    chartWidth: 0,
    chartHeight: 0,
    newEventsList: [],
    chartReady: false,
    eventReady: false,
    timeType: 1, //1-一个月 2-半年 3-一年
    timeTitle: ['', '30 天', '半 年', '一 年'],
    ballOpacity: 0.7,
    ballBottom: 20,
    ballRight: 30
  },
  loadChart: function () {
    console.log("loadChart:")
    let result = this.formatChartData()
    var chartWidth = this.data.chartWidth
    var chartHeight = this.data.chartHeight
    new Charts({
      canvasId: 'chart-canvas',
      background: '#2d3235',
      type: 'area',
      categories: result.date,//横坐标
      animation: true,
      dataLabel: false,
      series: [{
        name: '日期',
        data: result.count, //纵坐标
        color: '#448ff9'
      }],
      yAxis: {
        min: 0,
        fontColor: '#dddddd',
        gridColor: '#dddddd',
        format: function (val) {
          return val
        },
      },
      xAxis: {
        fontColor: '#dddddd',
        gridColor: '#dddddd'
      },
      extra: {
        legendTextColor: '#dddddd',
        lineStyle: 'curve'
      },
      width: chartWidth,
      height: chartHeight
    })
    this.setData({
      chartReady: true
    })
  },
  onLoad: function () {
    var res = wx.getSystemInfoSync()
    let chartWidth = res.windowWidth - 20
    let chartHeight = res.windowHeight / 3
    let screenWidth = res.windowWidth
    let screenHeight = res.windowHeight
    this.setData({
      chartWidth,
      chartHeight,
      screenWidth,
      screenHeight
    })
    this.getChartData()
    this.getNewEvents()
  },
  getChartData() {
    console.log('getChartData')
    let that = this
    let chartID = this.data.chartArray[this.data.chartIndex].value
    let timeType = this.data.timeType
    wx.request({
      url: config.service.getChartData + '/?type=' + timeType + '&id=' + chartID,
      method: 'GET',
      success: function (res) {
        let chartData = res.data.data
        console.log(chartData)
        that.setData({
          chartData
        })
        that.loadChart()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  getNewEvents() {
    console.log('getNewEvent')

    let that = this
    wx.request({
      url: config.service.getNewEvents + '/custom/EventsInfoNews',
      method: 'GET',
      success: function (res) {
        let newEventsList = res.data.data
        that.setData({
          newEventsList,
          eventReady: true
        })
        console.log(newEventsList)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  formatChartData() {
    console.log('formatChartData:')
    let result = {
      date: [],
      count: []
    }
    let chartData = this.data.chartData
    for (let i = 0; i < chartData['sequence'].length; i++) {
      result.date[i] = chartData['sequence'][i].date
      result.count[i] = chartData['sequence'][i].count
    }
    if (result.date[0] == undefined) {
      result = {
        date: [1, 2, 3, 4, 5],
        count: [0, 0, 0, 0, 0]
      }
    }
    console.log(result)
    return result
  },
  refreshEvent() {
    this.setData({
      newEventsList: [],
      eventReady: false
    })
    this.getNewEvents()
  },
  changeChart(e) {
    let chartIndex = e.detail.value;
    this.setData({
      chartIndex,
      chartData: {},
      chartReady: false
    })
    this.getChartData()
  },
  changeTimeType() {
    let timeType = this.data.timeType + 1
    timeType = timeType > 3 ? 1 : timeType
    this.setData({
      timeType,
      chartData: {},
      chartReady: false
    })
    this.getChartData()
  },
  ballClickStart() {
    this.setData({
      ballOpacity: 1
    })
  },
  ballClickEnd() {
    this.setData({
      ballOpacity: 0.7
    })
  },
  ballClickEvent() {

  },
  ballMoveEvent(e) {
    var touchs = e.touches[0];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;
    if (pageX < 25) return;
    if (pageX > this.data.screenWidth - 25) return;
    if (this.data.screenHeight - pageY <= 25) return;
    if (pageY <= 25) return;
    var x = this.data.screenWidth - pageX - 25;
    var y = this.data.screenHeight - pageY - 25;
    this.setData({
      ballBottom: y,
      ballRight: x
    });
  }
})
