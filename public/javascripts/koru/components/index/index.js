/* 
 * Javascript for index.ejs
 */

//app is declared in /public/javascripts/topit/app.js
app.controller('IndexController', ['$scope', '$location', function ($scope, $location) {
    $scope.location = $location;
    $scope.errors = "m";
    $scope.submit = function (isValid) {
      alert("is Valid: " + isValid);
      $scope.message = isValid ? "Submitted " + $scope.user.username : "All messages are required";
      return;
    };
  }]);

