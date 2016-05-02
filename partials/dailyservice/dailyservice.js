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
  
   
   $stateProvider.state('getPreviousDailyservice', {	    
	url: '/getPrevious/:startDate',	
    templateUrl: 'partials/dailyservice/dailyservice.html',
	controller: function($rootScope){      
		
		if($rootScope.dateCounter ==null || typeof  $rootScope.dateCounter =='undefined' ||  $rootScope.dateCounter === Number.NaN ){	
		    $rootScope.dateCounter =0;
		}else{
			$rootScope.dateCounter--;
		}
		console.log("after $rootScope.dateCounter---------------    "+$rootScope.dateCounter );
      },
	data:{
		auth:true
	},
	ncyBreadcrumb: {	
    label: 'Daily Expense & Collection'
  }
  });
   
    $stateProvider.state('geNextDailyservice', {	    
	url: '/getNext/:startDate',	
    templateUrl: 'partials/dailyservice/dailyservice.html',
	controller: function($rootScope){      
		console.log("$rootScope.dateCounter---------------    "+$rootScope.dateCounter );
		if($rootScope.dateCounter ==null || typeof  $rootScope.dateCounter =='undefined' ||  $rootScope.dateCounter === Number.NaN ){	
		    $rootScope.dateCounter =0;
		}else{
			$rootScope.dateCounter++;
		}
		console.log("after $rootScope.dateCounter---------------    "+$rootScope.dateCounter );
      },
	data:{
		auth:true
	},
	ncyBreadcrumb: {	
    label: 'Daily Expense & Collection'
  }
  });
   
  
 
  
});


myApp.controller('GetDailyServiceController1', ['$scope', 'NameService', '$filter', '$location','$rootScope','$routeParams','$stateParams','ngTableParams', function($scope,NameService, $filter, $location,$rootScope,$routeParams,$stateParams,ngTableParams ) {	
	 var data = NameService.data;
     var totalCollection=0;
	 var totalExpenses=0;
	 var total=0;
    $scope.tableParams = new ngTableParams(
      {
        page: 1,            // show first page
        count: 10,           // count per page
        sorting: {name:'asc'}
      },
      {
        total: 0, // length of data
        getData: function($defer, params) {
              NameService.getData($defer,params,$scope.filter);			
      }
    });
	
	 	  
			 angular.forEach($scope.tableParams.data, function (product) {
                    if (product.quantity > 0) {
                      console.log("test pme--------");
                    }        
                });
     
				$scope.totalCollection =	totalCollection;
				$scope.totalExpenses =	totalExpenses;
				$scope.total =	totalCollection-totalExpenses;

    $scope.$watch("filter.$", function () {
        $scope.tableParams.reload();
		 console.log("data--jai --"+ $scope.tableParams.data.length);
    });
	
	$scope.clearTableData = function(){
    transactions = [];
    $scope.output = {}
    if ($scope.tableParams){
            $scope.tableParams.reload();
			
    } 
   }
   	
		$scope.deleterow = function(id) {		 
		
		 $scope.tableParams.data.splice(id, 1);
			 for (var i = 0; i < $scope.tableParams.data.length; i++) {
				
             }
		}
   
   	$scope.deleteDailyservice = function(id,index) {
				 $scope.tableParams.data.splice(index, 1);
				console.log("--------"+$scope.dailyserviceList);
				  var deleteCustomer = confirm('Are you absolutely sure you want to delete?');
				  if (deleteCustomer) {
					  myDailyService.remove({id:id},function(result) {	
					if (!result.error) {					
						$location.path("/dailyservice");						
						if ($location.path() === "/dailyservice") {
							$route.reload();
						} else {
							$location.path("/dailyservice");
						}
											
					}
					}, function(errorResult) {
						// do something on error	
						//$scope.login = {"email":"Email", "password": "Password"};				
						console.log("error op "+errorResult.status);
						if(errorResult.status === 500) {  
							$location.path("/dailyservice");
							$scope.error = errorResult.data.statusMessage;				
						}
						
					});
					  
				  }
				
				
			}

	
}]);
function addTotal($scope,dailyServices){
	var totalCollection=0;
	var totalExpenses=0;
	var total=0;
		for(var i = 0; i < dailyServices.length; i++){
					console.log("type----"+dailyServices[i].type);
					if(dailyServices[i].type=="1")	{
					totalCollection += dailyServices[i].price
					}else if(dailyServices[i].type=="2"){
						totalExpenses += dailyServices[i].price
					}					
				}				
				$scope.totalCollection =	totalCollection;
				$scope.totalExpenses =	totalExpenses;
				$scope.total =	totalCollection-totalExpenses;
}


myApp.controller('GetDailyServiceController', ['$scope', 'DailyService', '$location', '$route','dataTable', '$stateParams','ngTableParams','$filter','$rootScope', function($scope, myDailyService, $location,$route,dataTable, $stateParams,ngTableParams,
$filter,$rootScope) {		
	if($rootScope.dateCounter ==null || typeof  $rootScope.dateCounter =='undefined' ||  $rootScope.dateCounter === Number.NaN ){	
		    $rootScope.dateCounter =0;
		}		
	myDailyService.query({month:$rootScope.dateCounter},function(result) {	
				$scope.tableParams;
				if (!result.error && result.dailyServices) {  				 
				addTotal($scope, result.dailyServices);
				//dataTable.render($scope, '', "dailyserviceList", result.dailyServices);
				 $scope.tableParams = new ngTableParams({
					page: 1,
					count: 10
				}, {
					total: result.dailyServices.length,
					getData: function ($defer, params) {
						    $scope.data = params.sorting() ? $filter('orderBy')(result.dailyServices, params.orderBy()) : result.dailyServices;
                            $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                            $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            $defer.resolve($scope.data);
							console.log("page"+params.page());
					//	$defer.resolve(result.dailyServices.slice((params.page() - 1) * params.count(), params.page() * params.count()));
					}
				});
				
				
				}
			}, function(errorResult) {
				// do something on error	
				//$scope.login = {"email":"Email", "password": "Password"};				
				console.log("error op "+errorResult.status);
				if(errorResult.status === 500) {  
					$scope.error = errorResult.data.statusMessage;				
				}
				
			});	
			 
				$scope.getCurrentMonth = function() {			
				var myDate = new Date();
				var newdate = new Date(myDate);
				console.log("$rootScope.dateCounter----ctr"+$rootScope.dateCounter);	
				newdate.setMonth(myDate.getMonth()+($rootScope.dateCounter));			
				return $filter('date')(newdate, 'MMMM yyyy');	
				
			 }
			 
			  $scope.getPreviousDailyservice = function($defer) {
				  
				
				
				$scope.counter--;
				var myDate = new Date();
				var newdate = new Date(myDate);
				newdate.setMonth(myDate.getMonth()-$scope.counter);
				console.log("---------newdate----"+newdate);
				$scope.today =$filter('date')(newdate, 'MMMM yyyy');
				
				myDailyService.query({month:$scope.counter},function(result) {
						
				for (var i = 0; i < $scope.tableParams.data.length; i++) {
						var index = $scope.data.indexOf($scope.tableParams.data[i]);
							console.log("---------index----"+index);
							//$scope.tableParams.data.splice(index, 1);							
							//$scope.tableParams.reload();
												
							// $scope.tableParams.reload();
					  }
				 		
				if (!result.error) {
  				  
				   $scope.data = result.dailyServices;
				 $scope.tableParams.reload();			
				for(var i = 0; i < result.dailyServices.length; i++){
					console.log("type----"+result.dailyServices[i].type);
					
				//	$scope.tableParams.data.push(result.dailyServices[i]);
					if(result.dailyServices[i].type=="1")	{
					totalCollection += result.dailyServices[i].price
					}else if(result.dailyServices[i].type=="2"){
						totalExpenses += result.dailyServices[i].price
					}					
				}				
				$scope.totalCollection =	totalCollection;
				$scope.totalExpenses =	totalExpenses;
				$scope.total =	totalCollection-totalExpenses;				
				//$scope.tableParams.data =  result.dailyServices;
				
                 
					
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
			 
			 
			   $scope.getNextDailyservice = function() {
				$scope.counter--;
				var myDate = new Date();
				var newdate = new Date(myDate);
				newdate.setMonth(myDate.getMonth()-$scope.counter);
				console.log("---------newdate----"+newdate);
				 $scope.today =$filter('date')(newdate, 'MMMM yyyy');	
			 }
			 
			 
			$scope.deleteDailyservice = function(id,idx) {				
				  var deleteCustomer = confirm('Are you absolutely sure you want to delete?');
				  if (deleteCustomer) {
					  myDailyService.remove({id:id},function(result) {	
					if (!result.error) {					
						$scope.tableParams.data.splice(idx, 1);											
					}
					}, function(errorResult) {
						// do something on error	
						//$scope.login = {"email":"Email", "password": "Password"};				
						console.log("error op "+errorResult.status);
						if(errorResult.status === 500) {  
							$location.path("/dailyservice");
							$scope.error = errorResult.data.statusMessage;				
						}
						
					});
					  
				  }
				
				
			}

	
}]);

 myApp.controller('addDailyserviceController', ['$scope', 'StoreDailyService', '$location','$rootScope','$routeParams', function($scope, userServices, $location,$rootScope,$routeParams ) {
	$scope.addDailyservice = function() {
					addnewDailyServcie($scope,$rootScope,$location,$filter,dailyService);
				
				}
	// $scope.addDailyservice = function() {
		// if ($scope.addDailyserviceForm.$valid) {			
			// console.log("token----------$rootScope.userInfo.userName------- ="+$rootScope.userName);
			// console.log("serviceID ="+$rootScope.serviceID);
			// console.log("itemDesc ="+$scope.dailyservice.itemDesc);
			// var dailyservice ={"active":1,"itemDesc":$scope.dailyservice.itemDesc,"itemDesc":$scope.dailyservice.itemDesc,"price":$scope.dailyservice.price,"type":$scope.dailyservice.type,"userName":$rootScope.userName};	
	// //	$scope.dailyservice["active"]=1;
	// //	$scope.dailyservice["userName"]=$rootScope.userName};		
		// userServices.save($scope.dailyservice,function(result) {	
				// $scope.data = result;
				// if (!result.error) {
  				  // //$location.path("/dashboard");
				  // $location.path("/dailyservice");
				  
				// }
			// }, function(errorResult) {
				// // do something on error	
				// //$scope.login = {"email":"Email", "password": "Password"};				
				// console.log("error op "+errorResult.status);
				// if(errorResult.status === 500) {  
					// $scope.error = errorResult.data.statusMessage;				
				// }
				
			// });	
		// }
	// }
	
	
	$scope.cancel = function() {
		$location.path("/dailyservice");
	}
}]);

  myApp.controller('editDailyserviceController1', ['$scope', 'DailyService', '$location','$filter','$rootScope','$routeParams', function($scope, dailyService, $location,$filter,$rootScope,$routeParams ) {
	
	$scope.addDailyservice = function() {
		addnewDailyServcie($scope,$rootScope,$location,$filter,dailyService);
		// if ($scope.addDailyserviceForm.$valid) {			
			// console.log("token----------$rootScope.userInfo.userName------- ="+$rootScope.userName);
			// console.log("serviceID ="+$rootScope.serviceID);
			// console.log("itemDesc ="+$scope.dailyservice.itemDesc);
			// var dailyservice ={"active":1,"itemDesc":$scope.dailyservice.itemDesc,"itemDesc":$scope.dailyservice.itemDesc,"price":$scope.dailyservice.price,"type":$scope.dailyservice.type,"userName":$rootScope.userName};			
		// userServices.save(dailyservice,function(result) {	
				// $scope.data = result;
				// if (!result.error) {
  				  // //$location.path("/dashboard");
				  // $location.path("/dailyservice");
				  
				// }
			// }, function(errorResult) {
				// // do something on error	
				// //$scope.login = {"email":"Email", "password": "Password"};				
				// console.log("error op "+errorResult.status);
				// if(errorResult.status === 500) {  
					// $scope.error = errorResult.data.statusMessage;				
				// }
				
			// });	
		// }
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
						$scope.dailyservice["dateCreated"]= $filter('date')(new Date(the_date), 'dd, MMMM yyyy hh:mm:ss');
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
					addnewDailyServcie($scope,$rootScope,$location,$filter,dailyService);
				
				}
				$scope.cancel = function() {
				$location.path("/dailyservice");				
				}
}]);



myApp.controller('deleteDailyserviceController', ['$scope', 'DailyService', '$filter', '$location','$rootScope','$routeParams','$stateParams', function($scope,dailyService, $filter, $location,$rootScope,$routeParams,$stateParams ) {
	
	dailyService.remove({id:$stateParams.id},function(result) {	
			   	
		
					
					if (!result.error) {						
						$location.path("/dailyservice");
						
					}
				}, function(errorResult) {
					// do something on error	
					//$scope.login = {"email":"Email", "password": "Password"};				
					console.log("error op "+errorResult.status);
					if(errorResult.status === 500) {  
					    $location.path("/dailyservice");
						$scope.error = errorResult.data.statusMessage;				
					}
					
				});

	
}]);

myApp.controller('newDailyserviceController', ['$scope', 'DailyService', '$filter', '$location','$rootScope','$routeParams', function($scope,dailyService, $filter, $location,$rootScope,$routeParams ) {
	console.log("---test33----"+$rootScope.dateCounter)	;
 if($rootScope.dateCounter ==null || typeof  $rootScope.dateCounter =='undefined' ||  $rootScope.dateCounter === Number.NaN ){	
	$scope.dailyservice = {"dateCreated":$filter("currentdate")(),"price":1500,"type":""};  				 
  }else{
				var myDate = new Date();
				var newdate = new Date(myDate);
				console.log("$rootScope.dateCounter----ctr"+$rootScope.dateCounter);	
				newdate.setMonth(myDate.getMonth()+($rootScope.dateCounter));	
				$scope.dailyservice = {"dateCreated":$filter('date')(newdate, 'dd, MMMM yyyy hh:mm:ss'),"price":1500,"type":""}; 
  }

	
	
//	addnewDailyServcie($scope,$rootScope,$location,$filter,dailyService);
$scope.addDailyservice = function() {
					addnewDailyServcie($scope,$rootScope,$location,$filter,dailyService);
				
				}
				$scope.cancel = function() {
				$location.path("/dailyservice");				
				}
	
	
}]);

function addnewDailyServcie($scope,$rootScope,$location,$filter,userServices){					
					console.log($scope.dailyservice);
	//	if ($scope.addDailyserviceForm.$valid) {			
			
			console.log("serviceID ="+$rootScope.serviceID);
			console.log("itemDesc ="+$scope.dailyservice.itemDesc);
		//	var dailyservice ={"active":1,"itemDesc":$scope.dailyservice.itemDesc,"itemDesc":$scope.dailyservice.itemDesc,"price":$scope.dailyservice.price,"type":$scope.dailyservice.type,"userName":$rootScope.userName};	
		$scope.dailyservice["active"]=1;
		$scope.dailyservice["userName"]=$rootScope.userName;	
		console.log("token------before----dateCreated------ ="+$scope.dailyservice.dateCreated);	
		$scope.dailyservice["dateCreated"]=$filter('date')(new Date($scope.dailyservice.dateCreated), 'yyyy-MM-dd HH:mm:ss');	
console.log("token------after----dateCreated------ ="+$filter('date')(new Date($scope.dailyservice.dateCreated), 'yyyy-MM-dd HH:mm:ss'));		
		userServices.create($scope.dailyservice,function(result) {	
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
		//}
				
}
