function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type: mimeString});
}

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
  this.profilePhotoUrl = "";
  // A django model that contains user's profile data.
  this.profile = null;
  // Buttons shown on nav bar header.
  this.headerButtons = [
    new NavigationButton("主页", "/feed/", {}),
    new NavigationButton("退出", "/account/logout/", {})
  ];

  this.$onInit = function() {
    $http.get("/data/profile/").then(
      angular.bind(this, function(response) {
        if (response.status == 403) {
          // No user
          return;
        } else if (response.status == 201 || response.status == 200) {
          this.profile = angular.fromJson(response.data.profile)[0];
          this.profilePhotoUrl = "/media/" + this.profile.fields.profile_photo;
        }
        this.loading = false;
      })
    );
  };

  $scope.openPhotoDialog = function() {
    var parentElem =
      angular.element($document[0].querySelector("profile-view"));
    var modal = $uibModal.open({
      controller: function($scope, $uibModalInstance){
        $scope.submitCroppedPhoto = function() {
          var blob = dataURItoBlob($scope.croppedPhoto);
          var fd = new FormData(document.forms[0]);
          fd.append("photo", blob);
          $http
            .post("/data/profile/photo/", fd, {
              transformRequest: angular.identity,
              headers: {"Content-Type": undefined}
            })
            .then(function(response) {
              if (response.status == 200) {
                $scope.profileCtrl.profilePhotoUrl = response.data.url;
                $uibModalInstance.close();
              } else {
                //TODO Not successful.
              }
            });
        };
        $scope.onCancelClick = function() {
          $uibModalInstance.close();
        };
      },
      scope: $scope,
      template: `
      <div class="modal-header">
          <h3 class="modal-title" id="modal-title">更改头像</h3>
      </div>
      <lf-ng-md-file-input
        lf-files="files"
        drag
        preview
        crop
        cropped-img="croppedPhoto"
        ng-change="onFilesChange()"
        accept="image/*">
      </lf-ng-md-file-input>
      <div class="modal-footer">
        <button ng-show="files.length == 1" ng-click="submitCroppedPhoto()" type="button" class="btn btn-success">
          确认
        </button>
        <button ng-click="onCancelClick()" type="button" class="btn btn-light">
          取消
        </button>
      </div>

      `
    }).result.catch(function(res) {
      if (!(res === 'cancel' || res === 'escape key press' || res =='backdrop click')) {
        throw res;
      }
    });
  }

  $scope.submitCroppedPhoto = function() {
    var blob = dataURItoBlob($scope.croppedPhoto);
    var fd = new FormData(document.forms[0]);
    fd.append("photo", blob);
    $http
      .post("/data/profile/photo/", fd, {
        transformRequest: angular.identity,
        headers: {"Content-Type": undefined}
      })
      .then(function(response) {
        if (response.status != 200) {
          //TODO Not successful.
        }
      });
  };

  $scope.onSubmit = function() {
    $http.post("/data/profile/", {profile: [this.profile]});
  };
};

angular
  .module("profile", [
    "common",
    "ui.bootstrap",
    "ngMaterial",
    "lfNgMdFileInput",
    "ngImgCrop"
  ])
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
  });
