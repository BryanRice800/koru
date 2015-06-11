/* 
 *Simply the app initialization
 */

//Add any resource or dependency here.
var app = angular.module('app', ['ngResource', 'ngTagsInput', 'ui.bootstrap']);

app.directive('autoClose', ['$document', function ($document) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, elem, attrs) {
        elem.bind('click', function (event) {
          event.stopPropagation();
        });
        $document.bind('click', function (e) {
          if (scope.$parent && scope.$parent.template) {
            scope.$parent.template = '';
          }
          scope.$apply();
        });
      }
    };
  }]);