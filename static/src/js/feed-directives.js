angular
  .module("feed", [])
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
  ]);
