
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
    toShow: false
  };

  TODO: 
  vm.calculateCells = function() {
   var lifeExpectationYears = getWHOObservation(vm.data);

   var cellsData = calculateCellsData(vm.data.birthDate, lifeExpectationYears);

   var cellsInPast = (vm.data.resolution == 'weeks') ? cellsData.weeksInPast : cellsData.monthsInPast;
   var cellsInFuture = (vm.data.resolution == 'weeks') ? cellsData.weeksInFuture : cellsData.monthsInFuture;

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

    vm.cells = cells;
    vm.data.toShow = true;
  }

}]);




var getCountryCodesMapping = function() {
  return [
  {id: 'RU', name: "Russia"},
  {id: 'UK', name: "United Kingdom"}
  ];
}

var getSexCodesMapping = function() {
  return [
  {id: 'FMLE', name: 'Female'},
  {id: 'MLE', name: 'Male'}
  ];
}

// //TODO:
// var getQueryFilterData = function() {
//     var queryFilerData = {};

//     setAgeGroup(queryFilerData);
//     setSex(queryFilerData);
//     setCountry(queryFilerData);
//     setStaticFilterValues(queryFilerData);

//     return queryFilerData;
// }

// //TODO:
// var getQueryFilter = function () {
//   //var queryFilterData = getQueryFilterData();
//   //for property in queryFilterData
//   //make string like COUNTRY:RUS;YEAR:2013
// }

//TODO:
var getWHOObservation = function(userData) {
  //get query filter from userData
  //return call to WHO server\
  //actually just return expected number of years left.
  return 40;
} 

var calculateCellsData = function(birthDate, expectedYears) {
  var cellsData = {};
  var now = new Date();
  cellsData.weeksInPast = (now - birthDate) / (1000 * 60 * 60 * 24 * 7);
  cellsData.monthsInPast = (now - birthDate) / (1000 * 60 * 60 * 24 * 30.5);
  cellsData.weeksInFuture = (expectedYears * 365) / 7;
  cellsData.monthsInFuture = (expectedYears * 365) / 30.5;

  return cellsData;
}
