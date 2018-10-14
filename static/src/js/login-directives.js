function LoginViewController($scope, $http, $cookies, $window) {
  this.username = "";
  this.password = "";
  this.error = null;
  this.authenticate = function() {
    // $window.location.href='/'
    $http.post('/account/authenticate/', {'username': this.username, 'password': this.password}).then(function(response) {
      if (response.data == 'login.success') {
        $window.location.href='/';
      } else if (response.data == 'login.failed.not_found'){
        //TODO: add warning to warn login failure.
        console.log(response.data);
      }
    });
  };

  this.register = function() {
    $http.post('/account/register/', {'username': this.username, 'password': this.password}).then(function (response) {
      console.log(response)
      $window.location.href='/'
    })
  }
};

angular.module('login', ['ngCookies'])
.config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
})
.directive('loginView', function() {
  return {
      restrict: 'E',
      scope: true,
      templateUrl: '/static/templates/login/view.html',
      controller: LoginViewController,
      controllerAs: 'loginCtrl'
  };
});
