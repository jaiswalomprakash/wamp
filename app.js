'use strict';

// Declare app level module which depends on views, and components

var myApp = angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'validation', 
  'validation.rule',  
  'users', 
  'ngRoute',
  'ngSanitize',
  'ncy-angular-breadcrumb',
  '720kb.datepicker',
  'wt.responsive',
  'dashboard',
  'myApp.services',
  'reports',
  'customers'
]);


myApp.constant('APP_BASE_URL',"http://api.tangerine.io/inboundhtml/");
myApp.constant('API_BASE_URL',"http://localhost:8080/mywebs/");
myApp.constant('INTERVAL',5000);
myApp.constant('DEFAULT_LANG','ja');
myApp.constant('DEFAULT_LAT','35.6833');
myApp.constant('DEFAULT_LONG','139.6833');
myApp.constant('TOKEN','');

var storeGlobalVal=[];
storeGlobalVal.push({"language":"n/a","gStoreId":1,"gOrderLocalStorage":"orderStoreHistory_","grandMenuItemPrice":"grandMenuItemPrice_"});
myApp.value({"globalVar":storeGlobalVal});
myApp.constant('ORDER_STORAGE_NAME','orderStoreHistory_');
myApp.constant('MENU_TOTAL_PRICE','grandMenuItemPrice_');

myApp.constant('ORDER_STORAGE_NAME','orderStoreHistory_');
myApp.constant('MENU_TOTAL_PRICE','grandMenuItemPrice_');

myApp.constant('MENU_FAV_URL','#/menuDetail?menu_id=');
myApp.constant('STORE_FAV_URL','#/storeDetails?store_id=');
	
myApp.constant('API_Local_URL',"http://localhost:8081/tangerine_inbound/");
//Config phase
myApp.config(function($urlRouterProvider, $httpProvider,$breadcrumbProvider, $locationProvider) {
	
	$breadcrumbProvider.setOptions({
      template: 'bootstrap2'
    });
	/*if(window.history && window.history.pushState){
            //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

         // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

         // if you don't wish to set base URL then use this
         $locationProvider.html5Mode({
                 enabled: true,
                 requireBase: false
          });
        } */
  //session check and redirect to specific state
  // $httpProvider.interceptors.push("CORSInterceptor");
  //$httpProvider.defaults.useXDomain = true;
   //$httpProvider.defaults.headers["Access-Control-Request-Headers"] = "X-Requested-With, accept, content-type";
 // delete $httpProvider.defaults.headers.common['X-Requested-With'];
  if(!window.sessionStorage["userInfo"]){
	$urlRouterProvider.otherwise("/login");  
  }else{
	$urlRouterProvider.otherwise("/dashboard");  
  }
    
});



//Run phase
myApp.run(function($rootScope, $state,$http) {
	$rootScope.$state = $state; //Get state info in view
		console.log("run condition");	
	if(window.sessionStorage["userInfo"]){
	   console.log("if condition");
	   $rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);	
	   $rootScope.selectedService =  $rootScope.userInfo.services[0];	   
	   $rootScope.serviceID=$rootScope.userInfo.services[0].serviceId;
	    $rootScope.userName=$rootScope.userInfo.realname;
	     console.log(" =$rootScope.userInfo.service "+$rootScope.userInfo.services[0].serviceId);
	   $rootScope.token=$rootScope.userInfo.token;	   	 
	   $http.defaults.headers.common['token'] =$rootScope.userInfo.token;	
	   $http.defaults.headers.common['serviceID'] =$rootScope.userInfo.services[0].serviceId;
	   $http.defaults.headers.common['userId'] =$rootScope.userInfo.userId;		
	}else{		
		console.log("else condition");
	}
	
		   
	//Check session and redirect to specific page
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		 
		if(toState && toState.data && toState.data.auth && !window.sessionStorage["userInfo"]){
			event.preventDefault();
			window.location.href = "#login";
		}		
		
		if(!toState && !toState.data && !toState.data.auth && window.sessionStorage["userInfo"]){
			event.preventDefault();
			window.location.href = "#dashboard";
		}
	});
});

myApp.factory("CORSInterceptor", [
    function()
    {
        return {
            request: function(config)
            {
                 config.headers["Access-Control-Allow-Origin"] = "*";
                 config.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
                 config.headers["Access-Control-Allow-Headers"] = "Content-Type";
                 config.headers["Access-Control-Request-Headers"] = "X-Requested-With, accept, content-type,X-auth-token";
                 return config;
            }
     };
}
]);


myApp.factory('httpRequestInterceptor', function ($q, $location) {
  return {
    response: function(response){
		console.error("httpRequestInterceptor---"+response)
      return promise.then(
        function success(response) {
          return response;
        },
        function error(response) {
			  switch (response.status) {
            case 403:
			   $location.path('/403.html');              
                break;
            case 500:
                $location.path('/500.html');
                break;
			default :
				 return $q.reject(response);
            }
        }
      );
    }
  };
});

//Datatable
myApp.factory('dataTable', ['$filter', 'ngTableParams', function($filter, ngTableParams) {

    var factoryDefinition = {
      render: function($scope, config, componentId, data) {
        
		if(!config) config ={};
		var config = angular.extend({}, {page:1, count:10}, config)
		
		$scope[componentId] = new ngTableParams(config, {
			total: data.length, // length of data
			getData: function($defer, params) {
				// use build-in angular filter
				var filteredData = params.filter() ?
						$filter('filter')(data, params.filter()) :
						data;
				var orderedData = params.sorting() ?
						$filter('orderBy')(filteredData, params.orderBy()) :
						data;
				params.total(orderedData.length); // set total for recalc pagination
				$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			}
		}); 
		
		
      }
    }
	
    return factoryDefinition;
  }
]);
myApp.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
		 
myApp.directive('valid-number', function () {
    return {
        require: 'ngModel',
        link: function (scope) {    
            scope.$watch('wks.number', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.wks.number = oldValue;
                }
            });
        }
    };
});
myApp.filter('currentdate',['$filter',  function($filter) {
    return function() {
        return $filter('date')(new Date(), 'yyyy-MM-dd');
    };
}])

//For top sub menu (look others menu)
$(function () {
	$('.subnavbar').find ('li').each (function (i) {
		var mod = i % 3;
		if (mod === 2) {
			$(this).addClass ('subnavbar-open-right');
		}
	});
});

$(document).on('click','.nav-collapse.in',function(e) {

    if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) ) {
        $(this).collapse('hide');
    }

});

