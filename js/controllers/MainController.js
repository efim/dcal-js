
angular.module("app").controller('MainController', [function() {

  var vm = this;
  vm.now = new Date();

  vm.countryCodes = getCountryCodesMapping();

  vm.sexCodes = getSexCodesMapping();

  vm.data = {
    birthDate: null,
    country: null,
    sex: null,
    resolution: null,
  };

  vm.cells = {
    week: null,
    month: null,
    active: null
  };

  TODO: 
  vm.calculateCells = function() {
    calculateCells(vm);
  };

  vm.showCells = function() {
    showCells(vm);
  }

}]);

var calculateCells = function(vm) {
    var lifeExpectationYears = getWHOObservation(vm.data);

    var cellsData = calculateCellsData(vm.data.birthDate, lifeExpectationYears);

    vm.cells.week = initiateCells(cellsData.weeksInPast, cellsData.weeksInFuture);
    vm.cells.month = initiateCells(cellsData.monthsInPast, cellsData.monthsInFuture);

    showCells(vm);
  };


var calculateCellsData = function(birthDate, expectedYears) {
  var cellsData = {};
  var now = new Date();
  cellsData.weeksInPast = (now - birthDate) / (1000 * 60 * 60 * 24 * 7);
  cellsData.monthsInPast = (now - birthDate) / (1000 * 60 * 60 * 24 * 30.5);
  cellsData.weeksInFuture = (expectedYears * 365) / 7;
  cellsData.monthsInFuture = (expectedYears * 365) / 30.5;

  return cellsData;
};

var showCells = function(vm) {
  vm.cells.active = (vm.data.resolution == 'week') ? vm.cells.week : vm.cells.month;
}

var initiateCells = function(cellsInPast, cellsInFuture) {
    var cells = [];

    for (var i = 0; i < cellsInPast; i++) {
      cells.push({
        inPast: true
      });
    }
    for (var i = 0; i < cellsInFuture; i++) {
      cells.push({
        inPast: false
      });
    }

    return cells;
};

var getCountryCodesMapping = function() {
  return [
  {id: 'RU', name: "Russia"},
  {id: 'UK', name: "United Kingdom"}
  ];
};

var getSexCodesMapping = function() {
  return [
  {id: 'FMLE', name: 'Female'},
  {id: 'MLE', name: 'Male'}
  ];
};

//TODO:
var getWHOObservation = function(userData) {
  //get query filter from userData
  //return call to WHO server\
  //actually just return expected number of years left.
  return 10;
};