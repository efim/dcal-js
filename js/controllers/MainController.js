angular.module("app").controller('MainController', [function() {

  var vm = this;

  var cellstTotal = 1080; //months in 90 y.o life
  var cellstInPast = 288; //month in past of 24 y.o person

  var cells = [];

  for (var i = 0; i < cellstInPast; i++) {
    cells.push({
      inPast: true
    });
  }
  for (var i = cellstInPast; i < cellstTotal; i++) {
    cells.push({
      inPast: false
    });
  }

  vm.cells = cells;
}]);