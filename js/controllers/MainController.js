angular.module("app").controller('MainController', [function() {

  var vm = this;

  var yearsTotal = 60;
  var yearsInPast = 24;

  var cells = [];

  for (var i = 0; i < yearsInPast; i++) {
    cells.push({
      inPast: true
    });
  }
  for (var i = yearsInPast; i < yearsTotal; i++) {
    cells.push({
      inPast: false
    });
  }

  vm.cells = cells;
}]);