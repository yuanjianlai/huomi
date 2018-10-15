function LoginViewController($scope, $http, $window, $location) {
  this.password = "";
  this.phoneNumber = null;
  this.enableSession = true;
  this.error = null;
  this.authenticate = function() {
    username = "pn-" + this.phoneNumber;
    $http
      .post("/account/login/", {
        username: username,
        password: this.password
      })
      .then(function(response) {
        if (response.data == "login.failed.not_found") {
          //TODO: add warning to warn login failure.
          console.log(response.data);
        } else {
          $window.location.href = "/feed/";
        }
      });
  };
}

angular
  .module("login", ["ngCookies"])
  .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  })
  .directive("loginView", function() {
    return {
      restrict: "E",
      scope: true,
      templateUrl: "/static/templates/login/view.html",
      controller: LoginViewController,
      controllerAs: "loginCtrl"
    };
  });
