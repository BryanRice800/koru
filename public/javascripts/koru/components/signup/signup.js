/* 
 * Javascript for login.ejs
 */

//app is declared in /public/javascripts/topit/app.js
app.controller('SignupController', ['$scope', function ($scope) {
    $scope.submit = function (isValid) {
      alert("is Valid: " + isValid);
      $scope.message = isValid ? "Submitted " + $scope.user.username : "All messages are required";
      return;
    };
  }]);
app.directive('fieldMatch', ['$parse', function ($parse) {
    var validation = {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var matchGetter = $parse(attrs.fieldMatch);
        scope.$watch(getMatchValue, function () {
          ctrl.$$parseAndValidate();
        });

        ctrl.$validators.fieldMatch = function () {
          var targetValue = getMatchValue();
          if (ctrl.$viewValue === targetValue || !ctrl.$viewValue || !targetValue) {
            elem.removeClass('error')
            scope.errors = '';
            return true;
          } else {
            elem.addClass('error')
            scope.errors = 'Passwords do not match!';
            return false;
          }

        };

        function getMatchValue() {
          var match = matchGetter(scope);
          if (angular.isObject(match) && match.hasOwnProperty('$viewValue')) {
            match = match.$viewValue;
          }
          return match;
        }
      }
    }
    return validation;
  }]);