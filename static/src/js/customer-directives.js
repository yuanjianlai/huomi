function CustomerViewController($scope) {
  this.username = "yuanjianl";
};

angular.module('homie')
.directive('customerView', function() {
  return {
      restrict: 'E',
      scope: true,
      templateUrl: 'static/templates/customer/view.html',
      controller: CustomerViewController
  }
});
