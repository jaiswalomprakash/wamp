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
	controller: 'newDailyserviceController',
	data:{
		auth:true
	},
	ncyBreadcrumb: {
	parent: 'dailyservice',
    label: 'Add Daily Expense & Collection'
  }
  });
  
   //Edit customer

  $stateProvider.state('editDailyservice', {
	url: '/editDailyservice/:id',	
    templateUrl: 'partials/dailyservice/addDailyservice.html',
	controller: 'editDailyserviceController',
	data:{
		auth:true
	},
	ncyBreadcrumb: {
	parent: 'dailyservice',
    label: 'Edit Daily Expense & Collection'
  }
  });
  
 
  
});

myApp.controller('GetDailyServiceController', ['$scope', 'DailyService', '$location', 'dataTable', 'API_BASE_URL', function($scope, myDailyService, $location, dataTable, API_BASE_URL) {
    var totalCollection=0;
	var totalExpenses=0;
	var total=0;
	myDailyService.query({},function(result) {	
				$scope.data = result;
				
				/* date caluculation */			
				if($scope.today ==null){
					$scope.today = new Date();	
				}else{
					$scope.today =$scope.today.setMonth($scope.today - 1);
				}
				
				$scope.month = $scope.today.getMonth()+1 ;
				console.log("$scope.today  $scope.month ---"+$scope.month);
				var previousDate = new Date()
				previousDate.setDate(previousDate.getDate() - 1)
				var nextDate = new Date()
				nextDate.setDate(nextDate.getDate() + 1)
				var previousMonth = new Date()
				previousMonth.setMonth(previousMonth.getMonth() - 1);
				var nextMonth = new Date()
				nextMonth.setMonth(nextMonth.getMonth() + 1);
				var year = new Date()
				year.setFullYear(year.getFullYear())
				$scope.cdate = new Date();
				$scope.pday = previousDate;
				$scope.nday = nextDate;
				$scope.pmonth = previousMonth;
				$scope.nmonth = nextMonth;
				$scope.cyear = year;				
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
				  dataTable.render($scope, '', "dailyserviceList", result.dailyServices);
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
	//	$scope.dailyservice["active"]=1;
	//	$scope.dailyservice["userName"]=$rootScope.userName};		
		userServices.save($scope.dailyservice,function(result) {	
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

  myApp.controller('editDailyserviceController1', ['$scope', 'StoreDailyService', '$location','$rootScope','$routeParams', function($scope, userServices, $location,$rootScope,$routeParams ) {
	
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


myApp.controller('editDailyserviceController', ['$scope', 'DailyService','$filter', '$location','$rootScope','$routeParams','$stateParams', function($scope, dailyService,$filter, $location,$rootScope,$routeParams,$stateParams ) {	

	dailyService.get({id:$stateParams.id},function(result) {	
			   	$scope.dailyservice =result;	
		
				$scope.test= $scope.dailyservice.id;
				 $scope.result1 = $filter('date')($scope.dailyservice.dateCreated, 'shortDate');	

					
					  $scope.ddMMyyyy = $filter('date')(new Date(the_date), 'dd/MM/yyyy');
					$scope.ddMMMMyyyy = $filter('date')(new Date(), 'dd, MMMM yyyy');
				   $scope.HHmmss = $filter('date')(new Date(), 'HH:mm:ss');
					$scope.hhmmsstt = $filter('date')(new Date(), 'hh:mm:ss a');
					
						//console.log("---ddMMyyyy----"+ $scope.ddMMyyyy );
						//console.log("---ddMMMMyyyy----"+$scope.ddMMMMyyyy);
						//console.log("---HHmmss----"+$scope.HHmmss);
						//console.log("---hhmmsstt----"+$scope.hhmmsstt);
					
					if (!result.error) {						
						var date1 = $scope.dailyservice.dateCreated.split(':');
						var date2 = date1[0].split(' ');
						var date3 = date2[0].split('-');
						var the_date = new Date(parseInt(date3[0]),parseInt(date3[1])-1,parseInt(date3[2]),parseInt(date2[1]),parseInt(date1[1]),parseInt(date1[2]));
						$scope.dailyservice["dateCreated"]= $filter('date')(new Date(the_date), 'MMMM d, y hh:mm:ss');
						$scope.dailyservice["type"] =$scope.dailyservice.type.toString()
						
					}
				}, function(errorResult) {
					// do something on error	
					//$scope.login = {"email":"Email", "password": "Password"};				
					console.log("error op "+errorResult.status);
					if(errorResult.status === 500) {  
						$scope.error = errorResult.data.statusMessage;				
					}
					
				});
				$scope.addDailyservice = function() {
					addnewDailyServcie();
				
				}
				$scope.cancel = function($scope) {
				$location.path("/dailyservice");				
				}
}]);

myApp.controller('newDailyserviceController', ['$scope', '$filter', '$location','$rootScope','$routeParams', function($scope,  $filter, $location,$rootScope,$routeParams ) {
	console.log("---test33----"+$filter("currentdate")())	;			
	$scope.dailyservice = {"dateCreated":$filter("currentdate")(),"price":1500,"type":""};
	
	
}]);

function addnewDailyServcie($scope){
					addnewDailyServcie($scope.dailyservice);
					console.log($scope.dailyservice)
				
}
