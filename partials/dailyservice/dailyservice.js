'use strict';
angular.module('dailyservice', ['ngTable']);

//Routers
myApp.config(function($stateProvider,$urlRouterProvider) {
 //Search Customers
  $stateProvider.state('dailyservice', {
	url: '/dailyservice',	
    templateUrl: 'partials/dailyservice/dailyservice.html',
	data:{
		auth:true
	},ncyBreadcrumb: {
    label: 'Daily Expense & Collection'
  }
  });
  
  //Add Customer
  $stateProvider.state('addDailyservice', {
	url: '/addDailyservice',	
    templateUrl: 'partials/dailyservice/addDailyservice.html',
	data:{
		auth:true
	},
	ncyBreadcrumb: {
	parent: 'dailyservice',
    label: 'Add Daily Expense & Collection'
  }
  });
  
  
  
  
 
  
});

myApp.controller('GetDailyServiceController', ['$scope', 'GetDailyService', 'dataTable', 'API_BASE_URL', function($scope, userServices, dataTable, API_BASE_URL) {
    var totalCollection=0;
	var totalExpenses=0;
	var total=0;
	userServices.get({},function(result) {	
				$scope.data = result;
				
				if (!result.error) {
  				  //$location.path("/dashboard");
				//  $location.path("/addDailyservice");
				for(var i = 0; i < result.dailyServices.length; i++){
					console.log("type----"+result.dailyServices[i].type);
					if(result.dailyServices[i].type=="1")	{
					totalCollection += result.dailyServices[i].price
					}else if(result.dailyServices[i].type=="2"){
						totalExpenses += result.dailyServices[i].price
					}
					
				}
				
				$scope.totalCollection =	totalCollection;
				$scope.totalExpenses =	totalExpenses;
				$scope.total =	totalCollection-totalExpenses;
				  dataTable.render($scope, '', "customerstList", result.dailyServices);
				}
			}, function(errorResult) {
				// do something on error	
				//$scope.login = {"email":"Email", "password": "Password"};				
				console.log("error op "+errorResult.status);
				if(errorResult.status === 500) {  
					$scope.error = errorResult.data.statusMessage;				
				}
				
			});	
		
		

	
}]);

  myApp.controller('addDailyserviceController', ['$scope', 'StoreDailyService', '$location','$rootScope','$routeParams', function($scope, userServices, $location,$rootScope,$routeParams ) {
	
	$scope.addDailyservice = function() {
		if ($scope.addDailyserviceForm.$valid) {			
			console.log("token----------$rootScope.userInfo.userName------- ="+$rootScope.userName);
			console.log("serviceID ="+$rootScope.serviceID);
			console.log("itemDesc ="+$scope.dailyservice.itemDesc);
			var dailyservice ={"active":1,"itemDesc":$scope.dailyservice.itemDesc,"itemDesc":$scope.dailyservice.itemDesc,"price":$scope.dailyservice.price,"type":$scope.dailyservice.type,"userName":$rootScope.userName};			
		userServices.save(dailyservice,function(result) {	
				$scope.data = result;
				if (!result.error) {
  				  //$location.path("/dashboard");
				  $location.path("/dailyservice");
				  
				}
			}, function(errorResult) {
				// do something on error	
				//$scope.login = {"email":"Email", "password": "Password"};				
				console.log("error op "+errorResult.status);
				if(errorResult.status === 500) {  
					$scope.error = errorResult.data.statusMessage;				
				}
				
			});	
		}
	}
	
	$scope.cancel = function() {
		$location.path("/dailyservice");
	}
}]);
