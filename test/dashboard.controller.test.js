var assert = require('assert');
var jsdom = require('./test-helper.js');
var app;
var ctrl;
var $httpBackend;
var scope;
var apiKey = '646d1e74a213baf4a82cf94bda09246f';
require('./../app/app.js');
require('./../app/controllers/dashboard.controller.js');
var mockData = {"city":{"id":524901,"name":"Moscow","coord":{"lon":37.6156,"lat":55.7522},"country":"RU","population":0},"cod":"200","message":0.0244592,"cnt":14,"list":[{"dt":1503738000,"temp":{"day":9.34,"min":9.34,"max":9.34,"night":9.34,"eve":9.34,"morn":9.34},"pressure":1006.39,"humidity":76,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01n"}],"speed":3.91,"deg":281,"clouds":0},{"dt":1503824400,"temp":{"day":14.88,"min":7.98,"max":16.55,"night":11.49,"eve":15.93,"morn":7.98},"pressure":1005.77,"humidity":70,"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"speed":5.46,"deg":270,"clouds":68},{"dt":1503910800,"temp":{"day":15.71,"min":7.56,"max":16.17,"night":14.33,"eve":15.91,"morn":7.56},"pressure":1002.94,"humidity":63,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":3.93,"deg":48,"clouds":76,"rain":0.43}]};

describe('DashboardController', function() {
  beforeEach(ngModule('app'));
  beforeEach(ngModule(function($provide) {
    $provide.factory('weatherFactory', function($http) {
      return {
        cityWeatherForecast: function (city, days, success, failure) {
          $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&cnt=' + days + '&appid=' + apiKey
          }).then(success, failure);
        },
        mockForecast: mockData,
      }
    });
  }));
  beforeEach(inject(function ($injector) {
    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    var $weatherFactory = $injector.get('weatherFactory');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Moscow&units=metric&cnt=7&appid=' + apiKey).respond(200, mockData);
    scope = $rootScope.$new();
    ctrl = $controller('dashboardController', {$scope: scope, weatherFactory: $weatherFactory});
  }));
  describe('searchWeather', function() {
    it('should get the forecast from the weatherFactory as well as set forecastAvailable to true and set up the city weekly details', function() {
      ctrl.city = 'Moscow';
      ctrl.searchWeather();
      $httpBackend.flush();
      scope.$digest();
      assert.equal(ctrl.forecastAvailable, true);
      assert.equal(ctrl.forecast.length, 3);
      assert.equal(ctrl.cityWeeklyDetails.name, 'Moscow');
      assert.equal(ctrl.cityWeeklyDetails.country, 'RU');
      assert.equal(ctrl.cityWeeklyDetails.pressure, 1005.0333333333333);
    });
  });
});
