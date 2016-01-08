angular.module("app").factory('whoLifeExpectancyService', ['$http', function($http) {
	
	var databaseURL = 'http://apps.who.int/gho/athena/api/GHO/LIFE_0000000035';


	return {
		fetchLifeExpectancy: function(userData, callbackOk, callbackNok) {

			//var urlParameters = getUrlParameters(userData);
			//var urlRequest = databaseURL + "?filter=" + filterParameters + "&format=json";
			//var urlRequest = 'http://apps.who.int/gho/athena/api/GHO/LIFE_0000000035?filter=COUNTRY:RUS;YEAR:2013;SEX:MLE;AGEGROUP:AGE25-29&format=json';
			//var urlRequest = 'https://api.guildwars2.com/v1/wvw/matches.json';
			var urlRequest = '/data/LIFE_0000000035.json';

			$http({
				method: 'GET',
				url: urlRequest
			}).then(function successCallback(response) {
				typeof callbackOk == 'function' ? callbackOk(response.data) : null;
			}, function errorCallback(response) {
				typeof callbackNok == 'function' ? callbackNok(response.statusText) : null;
			});
			// ajaxGet(
			// 	urlRequest, 
			// 	callback);
		},

		getCountryCodesMapping: function() {
			return [
			{id: 'RU', name: "Russia"},
			{id: 'UK', name: "United Kingdom"}
			];
		},

		getSexCodesMapping: function() {
			return [
			{id: 'FMLE', name: 'Female'},
			{id: 'MLE', name: 'Male'}
			];
		}

	};
}]);

// //TODO:
// var getUrlParameters = function(userData) {
//   //for property in queryFilterData
//   //make string like COUNTRY:RUS;YEAR:2013
// }


var ajaxGet = function (url, callback) {
	var callback = (typeof callback == 'function' ? callback : false), xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		try {
			ajxhrax = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	if (!xhr)
		return null;
	console.log('not null');
	xhr.open("GET", url,true);
	xhr.onreadystatechange=function() {
		if (xhr.readyState==4 && callback) {
			callback(xhr.responseText)
			console.log(xhr.responseText);
		}
	}
	xhr.send(null);
	return xhr;
}