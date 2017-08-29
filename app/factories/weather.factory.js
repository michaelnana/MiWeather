app.factory('weatherFactory', ['$http', WeatherFactory]);

function WeatherFactory ($http) {
  var apiKey = '646d1e74a213baf4a82cf94bda09246f';
  var getCityWeatherForecast = function (city, days, success, failure) {
    $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&cnt=' + days + '&appid=' + apiKey
    }).then(success, failure);
  };

  var mockForecast = {"city":{"id":524901,"name":"Moscow","coord":{"lon":37.6156,"lat":55.7522},"country":"RU","population":0},"cod":"200","message":0.0244592,"cnt":14,"list":[{"dt":1503738000,"temp":{"day":9.34,"min":9.34,"max":9.34,"night":9.34,"eve":9.34,"morn":9.34},"pressure":1006.39,"humidity":76,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01n"}],"speed":3.91,"deg":281,"clouds":0},{"dt":1503824400,"temp":{"day":14.88,"min":7.98,"max":16.55,"night":11.49,"eve":15.93,"morn":7.98},"pressure":1005.77,"humidity":70,"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"speed":5.46,"deg":270,"clouds":68},{"dt":1503910800,"temp":{"day":15.71,"min":7.56,"max":16.17,"night":14.33,"eve":15.91,"morn":7.56},"pressure":1002.94,"humidity":63,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":3.93,"deg":48,"clouds":76,"rain":0.43},{"dt":1503997200,"temp":{"day":11.79,"min":10.92,"max":11.79,"night":11.4,"eve":11.01,"morn":11.54},"pressure":1004.36,"humidity":94,"weather":[{"id":502,"main":"Rain","description":"heavy intensity rain","icon":"10d"}],"speed":6.67,"deg":29,"clouds":92,"rain":14.15},{"dt":1504083600,"temp":{"day":16.55,"min":12.82,"max":16.55,"night":14.28,"eve":15.49,"morn":12.82},"pressure":1005.66,"humidity":0,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":8.61,"deg":26,"clouds":55,"rain":6.36},{"dt":1504170000,"temp":{"day":18.49,"min":10.73,"max":18.49,"night":10.73,"eve":15.49,"morn":14.91},"pressure":1011.6,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":6.75,"deg":40,"clouds":52,"rain":1.13},{"dt":1504256400,"temp":{"day":18.4,"min":15.26,"max":18.4,"night":15.26,"eve":16.24,"morn":16.97},"pressure":1011.65,"humidity":0,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":3.38,"deg":43,"clouds":80,"rain":4.4},{"dt":1504342800,"temp":{"day":16.47,"min":15.13,"max":16.47,"night":15.13,"eve":15.56,"morn":15.93},"pressure":999.83,"humidity":0,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":7.78,"deg":16,"clouds":100,"rain":6.49},{"dt":1504429200,"temp":{"day":15.06,"min":12.11,"max":15.06,"night":12.11,"eve":12.45,"morn":14.17},"pressure":995.53,"humidity":0,"weather":[{"id":502,"main":"Rain","description":"heavy intensity rain","icon":"10d"}],"speed":10.61,"deg":333,"clouds":99,"rain":13.29},{"dt":1504515600,"temp":{"day":13.94,"min":9.03,"max":13.94,"night":9.03,"eve":10.94,"morn":12.43},"pressure":1001.07,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":6.23,"deg":311,"clouds":93,"rain":1.56},{"dt":1504602000,"temp":{"day":17.64,"min":12.14,"max":17.64,"night":12.14,"eve":14.37,"morn":12.98},"pressure":1002.53,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":5.06,"deg":298,"clouds":46,"rain":0.47},{"dt":1504688400,"temp":{"day":18.33,"min":13.95,"max":18.33,"night":13.95,"eve":14.3,"morn":14.35},"pressure":1009.05,"humidity":0,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":1.6,"deg":221,"clouds":70,"rain":5.51},{"dt":1504774800,"temp":{"day":17.58,"min":8.57,"max":17.58,"night":8.57,"eve":13.38,"morn":14.4},"pressure":1007.26,"humidity":0,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":3.67,"deg":10,"clouds":39,"rain":4.65},{"dt":1504861200,"temp":{"day":18.21,"min":12.53,"max":18.21,"night":12.53,"eve":14.55,"morn":14.89},"pressure":1002.53,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":2.97,"deg":198,"clouds":92,"rain":1}]};

  return {
    mockForecast: mockForecast,
    cityWeatherForecast: getCityWeatherForecast
  }
}
