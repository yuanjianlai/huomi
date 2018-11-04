class NavigationButton {
  constructor(name, link, data) {
    this.name = name;
    this.link = link;
    this.data = data;
    this.method = "GET";
    this.type = "navigate";
  }
}
class PostButton {
  constructor(name, link, data, callback) {
    this.name = name;
    this.link = link;
    this.data = data;
    this.method = "POST";
    this.type = "ajax";
    this.callback = callback;
  }
}

angular.module("common", []).directive("header", function() {
  return {
    restrict: "E",
    scope: {buttons: "="},
    templateUrl: "/static/templates/common/header.html",
    controller: function($scope, $http, $window) {
      $scope.onButtonClicked = function(button) {
        if (button.type == "navigate") {
          $window.location.href = button.link;
        } else if (button.type == "ajax") {
          $http({
            method: button.method,
            url: button.link,
            data: button.data
          }).then(function(response) {
            if (button.callback) {
              button.callback(response);
            }
          });
        }
      };
    }
  };
});
