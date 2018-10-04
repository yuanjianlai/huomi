function LoginViewController($scope) {
  $scope.aa = 'bb';
};

angular.module('login', [])
.directive('loginView', function() {
  return {
      restrict: 'E',
      scope: true,
      templateUrl: '/static/templates/login/view.html',
      controller: LoginViewController,
  };
});
