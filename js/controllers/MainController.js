
angular.module("app").controller('MainController', ['whoLifeExpectancyService', function(whoLifeExpectancyService) {

  var vm = this;
  vm.now = new Date();

  vm.countryCodes = whoLifeExpectancyService.getCountryCodesMapping();

  vm.sexCodes = whoLifeExpectancyService.getSexCodesMapping();

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

  vm.calculateCells = function() {
    calculateCells(vm);
  };

  vm.showCells = function() {
    showCells(vm);
  }

  whoLifeExpectancyService.fetchLifeExpectancy(vm.data
    , function successCallback(data) {
      console.log('successCallback done');
      vm.message = data;
    }
    , function errorCallback(statusText) {
      vm.message = statusText;
      console.log('errorCallback done');
    });

}]);

var calculateCells = function(vm) {
  var lifeExpectationYears = getWHOObservation(vm.data);

  var cellsData = calculateCellsData(vm.data.birthDate, lifeExpectationYears);

  vm.cells.week = initiateCells(cellsData.weeksInPast, cellsData.weeksInFuture);
  vm.cells.month = initiateCells(cellsData.monthsInPast, cellsData.monthsInFuture);

  showCells(vm);
};

var showCells = function(vm) {
  vm.cells.active = (vm.data.resolution == 'week') ? vm.cells.week : vm.cells.month;
}

var calculateCellsData = function(birthDate, expectedYears) {
  var cellsData = {};
  var now = new Date();
  cellsData.weeksInPast = (now - birthDate) / (1000 * 60 * 60 * 24 * 7);
  cellsData.monthsInPast = (now - birthDate) / (1000 * 60 * 60 * 24 * 30.5);
  cellsData.weeksInFuture = (expectedYears * 365) / 7;
  cellsData.monthsInFuture = (expectedYears * 365) / 30.5;

  return cellsData;
};

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

//TODO:
var getWHOObservation = function(userData) {
  //get query filter from userData
  //return call to WHO server\
  //actually just return expected number of years left.
  return 10;
};