function HomeBannerController($scope, $http, $window) {
  this.password = "";
  this.phoneNumber = null;
  this.register = function() {
    username = "pn-" + this.phoneNumber;
    $http
      .post("/account/register/", {username: username, password: this.password})
      .then(function(response) {
        if (response.data == "register.failed.user_exists") {
          //TODO: add warning to warn registration failure.
          console.log(response.data);
        } else {
          $window.location.href = "/profile/";
        }
      });
  };

  //show the trainer sign up box when user click "Apply as a trainer"
  this.showTrainerSignUpBox = function() {
    var firstNameInput = angular.element(
      document.querySelector(".sign_up_box_firstname")
    );
    var lastNameInput = angular.element(
      document.querySelector(".sign_up_box_lastname")
    );
    var emailInput = angular.element(
      document.querySelector(".sign_up_box_email")
    );
    var cityInput = angular.element(
      document.querySelector(".sign_up_box_city")
    );
    var trainerSignUpLink = angular.element(
      document.querySelector(".trainer_sign_up_link")
    );
    var traineeSignUpLink = angular.element(
      document.querySelector(".trainee_sign_up_link")
    );
    var traineeSignUpText = angular.element(
      document.querySelector(".sign_up_trainee_text")
    );
    var trainerSignUpText = angular.element(
      document.querySelector(".sign_up_trainer_text")
    );
    var trainerSignUpBtn = angular.element(
      document.querySelector(".trainer_sign_up_btn")
    );
    var traineeSignUpBtn = angular.element(
      document.querySelector(".trainee_sign_up_btn")
    );

    //hide all trainee sign up element
    traineeSignUpText.addClass("non-display");
    trainerSignUpLink.addClass("non-display");
    traineeSignUpBtn.addClass("non-display");

    //add all trainer sign up element
    trainerSignUpText.removeClass("non-display");
    firstNameInput.removeClass("non-display");
    lastNameInput.removeClass("non-display");
    emailInput.removeClass("non-display");
    cityInput.removeClass("non-display");
    traineeSignUpLink.removeClass("non-display");
    trainerSignUpBtn.removeClass("non-display");
  };

  //show trainee sign up box when user click "Sign up to exercis"
  this.showTraineeSignUpBox = function() {
    var firstNameInput = angular.element(
      document.querySelector(".sign_up_box_firstname")
    );
    var lastNameInput = angular.element(
      document.querySelector(".sign_up_box_lastname")
    );
    var emailInput = angular.element(
      document.querySelector(".sign_up_box_email")
    );
    var cityInput = angular.element(
      document.querySelector(".sign_up_box_city")
    );
    var trainerSignUpLink = angular.element(
      document.querySelector(".trainer_sign_up_link")
    );
    var traineeSignUpLink = angular.element(
      document.querySelector(".trainee_sign_up_link")
    );
    var traineeSignUpText = angular.element(
      document.querySelector(".sign_up_trainee_text")
    );
    var trainerSignUpText = angular.element(
      document.querySelector(".sign_up_trainer_text")
    );
    var trainerSignUpBtn = angular.element(
      document.querySelector(".trainer_sign_up_btn")
    );
    var traineeSignUpBtn = angular.element(
      document.querySelector(".trainee_sign_up_btn")
    );

    //hide all trainer sign up elements
    trainerSignUpText.addClass("non-display");
    firstNameInput.addClass("non-display");
    lastNameInput.addClass("non-display");
    emailInput.addClass("non-display");
    cityInput.addClass("non-display");
    traineeSignUpLink.addClass("non-display");
    trainerSignUpBtn.addClass("non-display");

    //show all trainee sign up elements
    traineeSignUpText.removeClass("non-display");
    trainerSignUpLink.removeClass("non-display");
    traineeSignUpBtn.removeClass("non-display");
  };
}

angular
  .module("homie", ["common"])
  .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  })
  .directive("homeView", function() {
    return {
      restrict: "E",
      scope: true,
      templateUrl: "/static/templates/home/view.html",
      controller: function() {
        this.headerButtons = [
          new NavigationButton("Log in", "/login/", {}, null)
        ];
      },
      controllerAs: "homeViewCtrl"
    };
  })
  .directive("homeBanner", function() {
    return {
      restrict: "E",
      scope: true,
      templateUrl: "/static/templates/home/home-banner.html",
      controller: HomeBannerController,
      controllerAs: "bannerCtrl"
    };
  });
