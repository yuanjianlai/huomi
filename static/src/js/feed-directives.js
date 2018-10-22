angular
  .module("feed", ["common"])
  .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  })
  .controller("feedController", [
    "$scope",
    "$http",
    "$window",
    function($scope, $http, $window) {
      $scope.logout = function() {
        $http.post("/account/logout/", {}).then(function(response) {
          $window.location.href = "/login/";
        });
      };
    }
  ])
  .directive("feedView", function() {
    return {
      restrict: "E",
      scope: true,
      templateUrl: "/static/templates/feed/view.html",
      controller: function($scope, $window) {
        this.headerButtons = [
          new NavigationButton("Log out", "/account/logout/", {})
        ];
      },
      controllerAs: "feedCtrl"
    };
  });
