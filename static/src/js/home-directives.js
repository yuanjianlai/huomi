function HomeBannerController($scope, $http, $window) {
  this.password = "";
  this.phoneNumber = null;
  this.register = function() {
    username = "pn-" + this.phoneNumber;
    $http
      .post("/account/register/", {username: username, password: this.password})
      .then(function(response) {
        if (response.data == "register.failed.user_exists") {
          //TODO: add warning to warn registration failure.
          console.log(response.data);
        } else {
          $window.location.href = "/profile/";
        }
      });
  };
}

angular
  .module("homie", ["common"])
  .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  })
  .directive("homeView", function() {
    return {
      restrict: "E",
      scope: true,
      templateUrl: "/static/templates/home/view.html",
      controller: function($scope) {
        this.isTrainer = false;
        this.onSwitchClick = function() {
          this.isTrainer = !this.isTrainer;
        };
        this.getSwitchMessage = function() {
          return this.isTrainer
            ? "SIGN UP TO EXERCISE"
            : "APPLY TO BE A TRAINER";
        };
        this.getRegisterButtonMessage = function() {
          return this.isTrainer ? "Become A Trainer" : "Sign up to exercise";
        };
        this.headerButtons = [
          new NavigationButton("Log in", "/login/", {}, null)
        ];
      },
      controllerAs: "homeViewCtrl"
    };
  })
  .directive("homeBanner", function() {
    return {
      restrict: "E",
      scope: true,
      templateUrl: "/static/templates/home/home-banner.html",
      controller: HomeBannerController,
      controllerAs: "bannerCtrl"
    };
  });
