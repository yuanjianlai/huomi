angular
  .module("feed", ["common"])
  .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  })
  .directive("feedView", function() {
    return {
      restrict: "E",
      scope: true,
      templateUrl: "/static/templates/feed/view.html",
      controller: function($scope, $window) {
        this.headerButtons = [
          new NavigationButton("退出", "/account/logout/", {}),
          new NavigationButton("主页", "/profile/", {})
        ];
      },
      controllerAs: "feedCtrl"
    };
  });
