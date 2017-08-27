app.controller('dashboardController', ['$scope', 'weatherFactory', DashboardController]);

function DashboardController ($scope, weatherFactory) {
  var dashboard = this;
  dashboard.forecast = [];
  dashboard.cityWeeklyDetails = {};

  dashboard.init = function () {

  };

  dashboard.searchWeather = function () {
    console.log(JSON.stringify(weatherFactory.mockForecast));
    dashboard.forecast = weatherFactory.mockForecast.list;
    weeklyDetails(weatherFactory.mockForecast);
    setupWeatherChart(dashboard.forecast);
    /*weatherFactory.cityWeatherForecast(
    dashboard.city,
    7,
    function (data) {
    dashboard.forecast = data.data.list;
    console.log("Forecast: " + JSON.stringify(dashboard.forecast));
  },
  function () {
  console.log("Failure");
}
)*/
}

function weeklyDetails (forecast) {
  dashboard.cityWeeklyDetails.name = forecast.city.name;
  dashboard.cityWeeklyDetails.country = forecast.city.country;
  var weeklyPressureSum = _.reduce(forecast.list, function (sum, value) {
    return sum + value.pressure;
  }, 0);
  dashboard.cityWeeklyDetails.pressure = weeklyPressureSum / forecast.list.length;
}

function setupWeatherChart (forecast) {
  Highcharts.chart('weather-chart', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Weekly Forecast for ' + dashboard.cityWeeklyDetails.name
    },
    xAxis: {
      categories: _.map(forecast, function (value) { return value.dt}),
      type: 'date',
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: '°C'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: dashboard.cityWeeklyDetails.name,
      data: _.map(forecast, function (value) { return value.temp.day})

    }]
  });
}
}
