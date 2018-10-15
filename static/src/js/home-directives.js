function HomeBannerController($scope, $http, $window) {
  this.password = "";
  this.phoneNumber = null;
  this.register = function() {
    username = 'pn-' + this.phoneNumber;
    $http.post('/account/register/',
    {'username': username, 'password': this.password})
    .then(function (response) {
      if (response.data=='register.failed.user_exists') {
        //TODO: add warning to warn registration failure.
        console.log(response.data);
      } else {
        $window.location.href='/profile/'
      }
    })
  }
};
function HomeHeaderController($scope) {};

angular.module('homie', [])
.config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
})
.directive('homeBanner', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: '/static/templates/home/home-banner.html',
    controller: HomeBannerController,
    controllerAs: 'bannerCtrl'
  };
})
.directive('homeHeader', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: '/static/templates/home/home-header.html',
    controller: HomeHeaderController
  };
});
