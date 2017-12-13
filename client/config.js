var host = 'https://1krxqcd6.qcloud.la';

var config ={
  service:{
    host,
    loginUrl: `${host}/custom/login`,
    getChartData: `${host}/custom/EventsRiskTrend`,
    getNewEvents: `${host}/custom/EventsInfoNews`,
  }
}

module.exports = config