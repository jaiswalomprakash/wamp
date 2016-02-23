'use strict';
angular.module('users', ['ngResource']);

//Routers
myApp.config(function($stateProvider) {
 
  //Login
  $stateProvider.state('login', {
	url: "/login",
    templateUrl: 'partials/users/login.html',
	controller: 'loginController'
  });
  
  //Signup
  $stateProvider.state('signup', {
	url: "/signup",
    templateUrl: 'partials/users/signup.html',
	controller: 'signupController'
  });
  
  //Logout
  $stateProvider.state('logout', {
	url: "/logout",
	template: "<h3>Logging out...</h3>",
    controller: 'logoutController'
  });
  
});

//Factories



myApp.factory('userServices', ['$http', function($http) {

    var factoryDefinitions = {
		 
      login: function(loginReq) {
		  
        return $http.post('partials/users/mock/login.json', {}).success(function(data) { return data; });
      },
	  signup: function(signupReq) {
        return $http.post('partials/common/mock/success.json', signupReq).success(function(data) { return data; });
      }
	}
	
    return factoryDefinitions;
  }
]);
	  
//Controllers


myApp.controller('loginController', ['$scope', 'Login', '$location', '$rootScope','$http', function($scope, userServices, $location, $rootScope,$http) {
	
	
	//$scope.login = {"email":"mail2asik@gmail.com", "password": "mypassword"};
	
	$scope.doLogin = function() {
		
		if ($scope.loginForm.$valid) {
			
			userServices.get({email: $scope.login.email,password: $scope.login.password},function(result) {				
				$scope.data = result;		
				
				if (!result.error) {					
				  window.sessionStorage["userInfo"] = JSON.stringify(result);				 
				  $rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);
				   $rootScope.selectedService = $scope.data.services[0];				   
				   console.log( $scope.data.services[0]);
				   
					$rootScope.serviceID=$rootScope.userInfo.services[0].serviceID;	    
					console.log("$rootScope.userInfo.services[0].serviceId--------"+$rootScope.userInfo.services[0].serviceId);
					$rootScope.token=$rootScope.userInfo.token;	
					
					$http.defaults.headers.common['token'] =$rootScope.userInfo.token;	
					$http.defaults.headers.common['serviceID'] =$rootScope.userInfo.services[0].serviceId;
					$http.defaults.headers.common['userId'] =$rootScope.userInfo.userId;				  
  				  //$location.path("/dashboard");
				  $location.path("/addDailyservice");
				  
				}
			}, function(errorResult) {
				// do something on error	
				//$scope.login = {"email":"Email", "password": "Password"};				
				console.log("error "+errorResult.status);
				if(errorResult.status === 500) {  
					$scope.error = errorResult.data.statusMessage;				
				}
				
			});
					
			
	
		}
	};
}]);

myApp.controller('signupController', ['$scope', 'userServices', '$location', function($scope, userServices, $location) {
	$scope.doSignup = function() {
		if ($scope.signupForm.$valid) {	
			userServices.signup($scope.signup).then(function(result){
				$scope.data = result;
				if (!result.error) {	
					$location.path("/login");
				}	
			});	
		}
	}
}]);

myApp.controller('ServiceCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {	
	 $scope.selectService = function(service) {
	 $rootScope.selectedService = service;	
	 $location.path("/dashboard");
};
}]);

myApp.controller('logoutController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
	sessionStorage.clear();
	$rootScope.userInfo = false;
	$location.path("/login");
}]);