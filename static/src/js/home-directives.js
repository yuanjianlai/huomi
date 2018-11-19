function HomeBannerController($scope, $http, $window) {
  this.phoneNumber = "";
  this.password = "";
  this.firstName = "";
  this.lastName = "";
  this.email = "";
  this.city = "";
  this.register = function() {
    username = "pn-" + this.phoneNumber;
    $http
      .post("/account/register/", {
        username: username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        isTrainer: $scope.homeViewCtrl.isTrainer
      })
      .then(function(response) {
        if (response.status == 201) {
          $window.location.href = "/profile/";
        } else if (response.status == 4) {
          //TODO: add warning to warn registration failure.
        } else if (response.data.reason == "user_exists") {
          //TODO: add warning to warn data validation failure.
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
          new NavigationButton("登录", "/login/", {}, null)
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
