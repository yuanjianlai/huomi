angular
  .module("profile", ["common"])
  .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  })
  .directive("profileView", function() {
    return {
      restrict: "E",
      scope: true,
      templateUrl: "/static/templates/profile/view.html",
      controller: function($scope, $window, $http) {
        this.loading = true;
        this.profile = null;
        this.headerButtons = [
          new NavigationButton("退出", "/account/logout/", {})
        ];
        this.onSubmit = function() {
          $http.post("/data/profile/", {profile: [this.profile]});
        };
        this.$onInit = function() {
          $http.get("/data/profile/").then(
            angular.bind(this, function(response) {
              if (response.status == 403) {
                // No user
                return;
              } else if (response.status == 201 || response.status == 200) {
                this.profile = angular.fromJson(response.data.profile)[0];
              }
              this.loading = false;
            })
          );
        };
      },
      controllerAs: "profileCtrl"
    };
  });
