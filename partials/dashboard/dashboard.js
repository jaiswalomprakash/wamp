'use strict';

angular.module('dashboard', []);

//Routers
myApp.config(function($stateProvider) {
  $stateProvider.state('dashboard', {
	url: '/dashboard',
    templateUrl: 'partials/dashboard/dashboard.html',	
	data:{
		auth:true
	}
  });
  
});

//Factories
myApp.factory('dashboardServices', ['$http', function($http) {

    var factoryDefinitions = {
      getTodaysStats: function() {
        return $http.get('partials/dashboard/mock/todays_stats.json').success(function(data) { return data; });
      },
	  getRecentNews: function() {
        return $http.get('partials/dashboard/mock/recent_news.json').success(function(data, status, headers, config) { return data; });
      },
	  getLastFiveCustomers: function() {
        return $http.get('partials/dashboard/mock/customers_last_five.json').success(function(data) { return data; });
      }
	}
	
    return factoryDefinitions;
  }
]);




myApp.controller('fileUpload', function ($scope, fileUploadManager) {

    $scope.createPost = function (data) {
        var fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }

        fileUploadManager.create({}, fd).$promise.then(function (res) {
            scope.newPost = res;
        }).catch(function (err) {
            scope.newPostError = true;
        });
    };
	
	$scope.uploadFile = function(){
               var file = $scope.myFile;
               
               console.log('file is ' );
               console.dir(file);
               
              fileUploadManager.create({siteID: '123',filename: 'test.jpg',accessToken: 'sfsf',file:file}, file).$promise.then(function (res) {
					scope.newPost = res;
				}).catch(function (err) {
					scope.newPostError = true;
				});
            };

});


myApp.controller('todaysStatsController', ['$scope', 'dashboardServices', function($scope, dashboardServices) {
	dashboardServices.getTodaysStats().then(function(result){
		$scope.data = result.data;	
	});
}]);

myApp.controller('recentNewsController', ['$scope', 'dashboardServices', function($scope, dashboardServices) {
	dashboardServices.getRecentNews().then(function(result){
		$scope.data = result.data;	
	});
}]);

myApp.controller('getLastFiveCustomersController', ['$scope', 'dashboardServices', function($scope, dashboardServices) {
	dashboardServices.getLastFiveCustomers().then(function(result){
		$scope.data = result.data;	
	});
}]);