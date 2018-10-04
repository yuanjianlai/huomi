function HomeBannerController($scope) {
  $scope.location = 'Sunnyvale';
};
function HomeHeaderController($scope) {
  $scope.location = 'San Jose';
};

angular.module('homie', [])
.controller('mainController', ['$scope', function($scope) {
  $scope.name = "yuanjian"
}])
.directive('homeBanner', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: '/static/templates/home/home-banner.html',
    controller: HomeBannerController
  };
})
.directive('homeHeader', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: '/static/templates/home/home-header.html',
    controller: HomeHeaderController
  };
});
