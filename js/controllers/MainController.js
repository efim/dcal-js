angular.module("app").controller('MainController', [function() {

  var vm = this;

  vm.title = 'Title from controller';
  vm.yearsTotal = 10;
  vm.yearsInPast = 5;

  var years = [];

  for (var i = 0; i < vm.yearsInPast; i++) {
    years.push(1);
  }
  for (var i = vm.yearsInPast; i < vm.yearsTotal; i++) {
    years.push(0);
  }

  vm.years = years;
}]);