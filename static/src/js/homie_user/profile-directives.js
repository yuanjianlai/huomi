ProfileViewController = function(
  $scope,
  $window,
  $http,
  $log,
  $document,
  $uibModal
) {
  // Is required init calls are done.
  this.loading = true;

  // A django model that contains user's profile data.
  this.profile = null;

  // Buttons shown on nav bar header.
  this.headerButtons = [
    new NavigationButton("主页", "/feed/", {}),
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
};

ProfileImageUploaderController = function($scope) {};

angular
  .module("profile", ["common", "ui.bootstrap"])
  .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  })
  .directive("profileView", function() {
    return {
      restrict: "E",
      scope: true,
      templateUrl: "/static/templates/profile/view.html",
      controller: ProfileViewController,
      controllerAs: "profileCtrl"
    };
  })
  .directive("profileImageUploader", function() {
    return {
      restrict: "E",
      scope: true,
      templateUrl: "/static/templates/profile/profile-image-uploader.html",
      controller: ProfileImageUploaderController,
      controllerAs: "pImgUploaderCtrl"
    };
  });
