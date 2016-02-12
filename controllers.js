'use strict';

function FeatureCatControler($window,$rootScope,$scope, $routeParams, $location,FeatureList,FeatureListDefault,INTERVAL,DEFAULT_LANG) {
	
	setLanguagePreference($window);
	$scope.myInterval = INTERVAL;
	$scope.dataLoaded=false;
	$scope.imageData=[];
	$scope.featureList=[];
	$scope.promotionList=[];
	$scope.dynamicURLList='';	
	if(localStorage.language == 'undefined'){
		console.log("setting to default language "+DEFAULT_LANG);
		localStorage.language=DEFAULT_LANG;
	}
	if(localStorage.store_id!="undefined"){
		getHomePageDetails($scope,FeatureList,DEFAULT_LANG);
		
	}else{
		getHomePageDefaultDetails($scope,FeatureListDefault);
	}
}

function getHomePageDetails($scope,FeatureList,DEFAULT_LANG){
	$scope.topPageLable="ã�ŠçŸ¥ã‚‰ã�›/ã�Šã�™ã�™ã‚�";
	$scope.storelabel='ã�Šåº—ã�®è©³ç´°æƒ…å ±ã‚’è¦‹ã‚‹';
	FeatureList.query({store_id: localStorage.store_id,brand_id:localStorage.brand_id,language:localStorage.language}).$promise.then(
			
    		function(data){
    			if(localStorage.language!=DEFAULT_LANG){
    				$scope.topPageLable="News & Recommendation";
    				$scope.storelabel="Check Store Profile";
    			}
    			
    		$scope.topInfo=	data.topPageInfo;
    		if(localStorage.store_id){
    			$scope.storeLink="#/storeDetails?store_id="+localStorage.store_id;	
    		}
    		
			 var promotionInfo=data.promotionInfo;
			 
   			 for (var i=0;i<promotionInfo.length;i++){
   				 if(promotionInfo[i].promoLinkType===1){
   					 if(promotionInfo[i].promoLinkParam!==null){
   						 	promotionInfo[i].dynamicURL="#/featureItemPage?feature_id="+promotionInfo[i].promoLinkParam;
	   					 }
   					$scope.promotionList[$scope.promotionList.length]=promotionInfo[i];
   				 }
   				 if(promotionInfo[i].promoLinkType==2){
   					 if(promotionInfo[i].promoLinkParam!==null){
   						 promotionInfo[i].dynamicURL="#/menuDetail?menu_id="+promotionInfo[i].promoLinkParam;
	   					 }
	   					$scope.promotionList[$scope.promotionList.length]=promotionInfo[i];
   				 }
   				if(promotionInfo[i].promoLinkType==3){
  					 if(promotionInfo[i].promoLinkParam!==null){
  						 promotionInfo[i].dynamicURL="#/coupon?id="+promotionInfo[i].promoLinkParam;
	   					 }
	   					$scope.promotionList[$scope.promotionList.length]=promotionInfo[i];
  				 }
   				if(promotionInfo[i].promoLinkType==4){
  					 if(promotionInfo[i].promoLinkParam!==null){
  						 promotionInfo[i].dynamicURL="#/news?id="+promotionInfo[i].promoLinkParam;
	   					 }
	   					$scope.promotionList[$scope.promotionList.length]=promotionInfo[i];
  				 }
   				if(promotionInfo[i].promoLinkType==99){
  					 $scope.promotionList[$scope.promotionList.length]=promotionInfo[i];
  				 }
   				 
   			 }
   			$scope.dataLoaded=true;
   			setSlickConfig($scope);
   			var featureInfo=data.featureInfo;	
   			
   			for (var i=0;i<featureInfo.length;i++){
   				featureInfo[i].dynamicURL="#/featureItemPage?feature_id="+featureInfo[i].featureId;
   				$scope.featureList[$scope.featureList.length]=featureInfo[i];
			 }
   		}
    		
    );
}

function getHomePageDefaultDetails($scope,FeatureListDefault){
	FeatureListDefault.query({language:localStorage.language}).$promise.then(
    		
    		function(data){
    			 for (var i=0;i<data.length;i++){
	   				 if(data[i].featureType===1){
	   					
	   					 if(data[i].storeId!==null){
	   						data[i].dynamicURL="#/?store_id="+data[i].storeId+"&language="+localStorage.language;
	   					 }
	   					$scope.imageData[$scope.imageData.length]=data[i];
	   					$scope.featureList[$scope.featureList.length]=data[i];
	   				 }
	   				 
	   			 }
   			$scope.dataLoaded=true;
   			setSlickConfig($scope);
   		}
    		
    );
}

function setLanguagePreference($window){
	var lang = $window.navigator.languages ? $window.navigator.languages[0] : null;
    lang = lang || $window.navigator.language || $window.navigator.browserLanguage || $window.navigator.userLanguage;
	if (lang.indexOf('-') !== -1)
	    lang = lang.split('-')[0];
	
	if (lang.indexOf('_') !== -1)
	    lang = lang.split('_')[0];
	
	if (lang ==='en') {
		console.log("language is english");
		localStorage.language='en';
	}else if (lang ==='ja') {
	   console.log("language is japanese");
	   localStorage.language='ja';
	}
}

function loginController($window,$rootScope,$scope, $routeParams,$location, FeatureList,FeatureListDefault,INTERVAL,DEFAULT_LANG) {	
		console.log("loginController");
	$scope.myInterval = INTERVAL;
	setLanguagePreference($window);	
	if($routeParams.store_id){
		localStorage.store_id='';
		localStorage.brand_id='';
		localStorage.store_id=$routeParams.store_id;
	}else if($routeParams.brand_id){
		localStorage.brand_id='';
		localStorage.store_id='';
		localStorage.brand_id=$routeParams.brand_id;
	}	
	if(localStorage.language == 'undefined'){
		console.log("setting to default language "+DEFAULT_LANG);
		localStorage.language=DEFAULT_LANG;
	}
	$rootScope.language=localStorage.language;
	$scope.imageData=[];
	$scope.dataLoaded=false;
	$scope.featureList=[];
	$scope.promotionList=[];
	$scope.dynamicURL='';
	console.log("localStorage.store_id "+localStorage.store_id);
	if(localStorage.store_id!="undefined" || localStorage.brand_id!="undefined"){
		getHomePageDetails($scope,FeatureList,DEFAULT_LANG);
	}else{
		getHomePageDefaultDetails($scope,FeatureListDefault);
	}
   
}

function FeatureCatHome($window,$rootScope,$scope, $routeParams,$location, FeatureList,FeatureListDefault,INTERVAL,DEFAULT_LANG) {	
	alert("FeatureCatHome");
	$scope.myInterval = INTERVAL;
	setLanguagePreference($window);	
	if($routeParams.store_id){
		localStorage.store_id='';
		localStorage.brand_id='';
		localStorage.store_id=$routeParams.store_id;
	}else if($routeParams.brand_id){
		localStorage.brand_id='';
		localStorage.store_id='';
		localStorage.brand_id=$routeParams.brand_id;
	}	
	if(localStorage.language == 'undefined'){
		console.log("setting to default language "+DEFAULT_LANG);
		localStorage.language=DEFAULT_LANG;
	}
	$rootScope.language=localStorage.language;
	$scope.imageData=[];
	$scope.dataLoaded=false;
	$scope.featureList=[];
	$scope.promotionList=[];
	$scope.dynamicURL='';
	console.log("localStorage.store_id "+localStorage.store_id);
	if(localStorage.store_id!="undefined" || localStorage.brand_id!="undefined"){
		getHomePageDetails($scope,FeatureList,DEFAULT_LANG);
	}else{
		getHomePageDefaultDetails($scope,FeatureListDefault);
	}
   
}

function BrandCatControler($window,$rootScope,$scope, $routeParams,$location, BrandCatList,INTERVAL) {
	setLanguagePreference($window);
	$scope.myInterval = INTERVAL;
	$scope.brandCatList='';
	var storeId=localStorage.store_id;
	var brandId=localStorage.brand_id;
	BrandCatList.query({store_id:storeId,brand_id:brandId,language:localStorage.language}).$promise.then(    		
    		function(data){
    		  
    			 for (var i=0;i<data.length;i++){
    				 if(data[i].hasSubCategories===true){
    					 data[i].dynamicUrl="#/brandSubCategory?brand_id="+data[i].brandId+"&parentBrandCatId="+data[i].brandCategoryId+"&level="+(data[i].brandCategoryLevel+1);
    				 }else{
    					 data[i].dynamicUrl="#/menuCategoryList?category_id="+data[i].brandCategoryId;
    				 }
    			 }
    			
    		 $scope.brandCatList=data;
   			 $scope.dataLoaded=true;
   			setSlickConfig($scope);
   		}
    		
    );
}
	
function BrandCatSubControler($window,$rootScope,$scope, $routeParams,$location, BrandCatList,INTERVAL) {
		setLanguagePreference($window);
		$scope.myInterval = INTERVAL;
		$scope.brandCatList='';
		var brandId=$routeParams.brand_id;
		BrandCatList.query({brand_id:brandId,parent_brand_category_id:$routeParams.parentBrandCatId,level:$routeParams.level,language:localStorage.language}).$promise.then(    		
	    		function(data){
	    			 for (var i=0;i<data.length;i++){
	    				 if(data[i].hasSubCategories==='true'){
	    					 data[i].dynamicUrl="#/brandSubCategory?brand_id="+data.brandId+"&parentBrandCatId="+data[i].brandCategoryId+"&level="+(data[i].brandCategoryLevel+1);
	    				 }else{
	    					 data[i].dynamicUrl="#/menuCategoryList?category_id="+data[i].brandCategoryId;
	    				 }
	    		 }
	    			
	    		 $scope.brandCatList=data;
	   			 $scope.dataLoaded=true;
	   			setSlickConfig($scope);
	   		}
	    );
}

function FeatureDataControler($window,$rootScope,$scope, $routeParams,$location, FeatureItemData,INTERVAL,DEFAULT_LANG) {
	setLanguagePreference($window);
	$scope.myInterval = INTERVAL;
	if(localStorage.language==DEFAULT_LANG){
		$scope.currncySymb="å††";
	}
	else{
		$scope.currncySymb="JPY";
	}
	
    FeatureItemData.query
	    ({feature_id: $routeParams.feature_id,language:localStorage.language}).$promise.then(
	    		function(data){	    		
	    			 for(var i=0;i<data.menus.length;i++){
	    				 data.menus[i].menu_price_mrp=replaceAmount(data.menus[i].menu_price_mrp);
	    			 }
	    			 $scope.featureItemData =data;
	    		}	    
	    );
}

function MenuDetailControler($window,$rootScope,$scope, $routeParams, $location,MenuItemDetail,productService,INTERVAL,DEFAULT_LANG) {	
	setLanguagePreference($window);
	$scope.myInterval = INTERVAL;
	if(localStorage.language==DEFAULT_LANG){
		$scope.currncySymb="å††";
	}
	else{
		$scope.currncySymb="JPY";
	}
	MenuItemDetail.query({menu_id: $routeParams.menu_id,language:localStorage.language}).$promise.then(
			function(data){	    		
				$scope.menuItemDetail =data;
			    $scope.menuItemDetail.menu_price_mrp=replaceAmount($scope.menuItemDetail.menu_price_mrp);
			    productService.addProduct($scope.menuItemDetail,$routeParams.menu_id);
			    $scope.menuId=$routeParams.menu_id;
			    $scope.myMenuFavClass="star Icon";
			    $scope.storeId=localStorage.store_id;
				var localStorageMenu="menuFav_"+localStorage.store_id;
				if(isFavExist(JSON.parse(localStorage.getItem(localStorageMenu)),$scope.menuId)){		
					$scope.myMenuFavClass="star Icon on";		
				}	
   		}	    
	 );
}

function replaceAmount(amountStr){
	return amountStr.replace(/[^0-9\.]+/g, "");
}

/* Order controller to add new order to local storage based on store id */
function OrderControler($window,$rootScope,$scope, $routeParams,$location,ORDER_STORAGE_NAME,productService,INTERVAL,MENU_TOTAL_PRICE,DEFAULT_LANG){
	setLanguagePreference($window);
	 $scope.myInterval = INTERVAL;
		if(localStorage.language==DEFAULT_LANG){
			$scope.currncySymb="å††";
		}
		else{
			$scope.currncySymb="JPY";
		}
	 var storeId=localStorage.store_id;
	 var menuId=$routeParams.menu_id;	 
	 var localOrderStorageName=ORDER_STORAGE_NAME+storeId;	 
	 var grandMenuTotal=MENU_TOTAL_PRICE+storeId;	 
	 var menuItem=[];
	 var total=0;
	 menuItem=productService.getProducts();
	 total=localStorage.getItem(grandMenuTotal);
	 if(!total){
		 total=0; 
	 }
	 var itemPrice=storeOrderItem(menuId,storeId,localOrderStorageName,menuItem);
	 total=parseInt(total)+itemPrice;
	 localStorage.setItem(grandMenuTotal,total); 	
	 
	 $scope.orderLocalList= JSON.parse(localStorage.getItem(localOrderStorageName));
	 $scope.orderTotal=total;
	 /*click event to handle  increment and decrement order menu item */
	 $scope.qtyIncDec = function(a,type) {		 
		menuItem=JSON.parse(localStorage.getItem(localOrderStorageName));
		updatestoreOrderItem(localOrderStorageName,type,a,grandMenuTotal);
		$scope.orderLocalList= JSON.parse(localStorage.getItem(localOrderStorageName));
		$scope.orderTotal=localStorage.getItem(grandMenuTotal);		
	 };
}

function myFavControler($window,$rootScope,$scope, $routeParams,$location,INTERVAL,MENU_FAV_URL,STORE_FAV_URL){
	setLanguagePreference($window);
	 $scope.myInterval = INTERVAL;
	 var storeId=localStorage.store_id;
	 //$scope.menuFav=JSON.parse(localStorage.getItem("menuFav_"+storeId));	 
	// $scope.storeFav=JSON.parse(localStorage.getItem("storeFav_"+storeId));
	 var menu=JSON.parse(localStorage.getItem("menuFav_"+storeId));
	 var store=JSON.parse(localStorage.getItem("storeFav_"+storeId));
	 var favArrList = new Array();
	 var i;
	 var j;
	 if(menu!=null){
		 for (i = 0; i < menu.length; i++) {
			 var url=MENU_FAV_URL+menu[i].FavId;
			 favArrList.push({"FavId":menu[i].FavId,"img":menu[i].img,
				 "url":url,"desc":menu[i].desc,
				 "date":menu[i].date,"price":menu[i].price});			
			} 
	 }
	 if(store){
		 for (j = 0; j < store.length; j++) {
			 var url=STORE_FAV_URL+store[j].FavId;
			 favArrList.push({"FavId":store[j].FavId,"img":store[j].img,
				 "url":url,"desc":store[j].desc,
				 "date":store[j].date,"price":store[j].price});			
			} 
	 }	 
	 $scope.favList=favArrList;	
	 $scope.dataLoaded=true;
	 setSlickConfig($scope);
}


/*clear local storage of menu order details and grand total*/
function clearOrder($rootScope,$location,ORDER_STORAGE_NAME,MENU_TOTAL_PRICE){
	var localOrderStoreName=ORDER_STORAGE_NAME+localStorage.store_id;
	var localgrandMenuItemPrice=MENU_TOTAL_PRICE+localStorage.store_id;	
	clearLocalStorageByKey(localOrderStoreName);
	clearLocalStorageByKey(localgrandMenuItemPrice);	
}
function MenuController($window,$rootScope,$scope, $routeParams,$location, FeatureBrand,INTERVAL) {
	setLanguagePreference($window);
	// scope init:	
	$scope.myInterval = INTERVAL;
    $scope.featurebrands = FeatureBrand.query({storeId: localStorage.store_id});
}

function MenuCatList($window,$rootScope,$scope, $routeParams,$location, CategoryList,INTERVAL) {
	setLanguagePreference($window);
	// scope init:
	$('.loader').show();	
	$scope.myInterval = INTERVAL;
    $scope.categoryList = CategoryList.query({cat_id: $routeParams.cat_id});   
    $('.loader').hide();
}

function ItemList($window,$rootScope,$scope, $routeParams,$location, ItemList,INTERVAL) {
	setLanguagePreference($window);
	// scope init:
	$('.loader').show();	
	$scope.myInterval = INTERVAL;
    $scope.itemList = ItemList.query({cat_id: $routeParams.cat_id});
    $scope.categoryName= $routeParams.catName;
    $scope.catImage=$routeParams.catimg;
    $('.loader').hide();
}

function ItemDetails($window,$rootScope,$scope, $routeParams,$location, ItemDetails,INTERVAL) {
	setLanguagePreference($window);
	// scope init:
	$('.loader').show();	
	$scope.myInterval = INTERVAL;
    $scope.itemDetails = ItemDetails.query({item_id: $routeParams.item_id});
    $scope.myFavClass="";
    	if(isFavExist(JSON.parse(localStorage.getItem("retailfavIds")),$routeParams.item_id))
    		$scope.myFavClass="glyphicon glyphicon-heart favclr-red";
    	$scope.listsd=localStorage.getItem("retailfavIds");
    	
    $('.loader').hide();
}

function CouponController($rootScope,$scope,$location) {
}

//Called when user is near the store
function BeaconStoreController($window,$rootScope,$scope, $location,$routeParams, StoreData) {
	
	setLanguagePreference($window);
	
	StoreData.query({store_id: localStorage.store_id,language: localStorage.language}).$promise.then(
			function(data){
				$scope.storeData=data[0];
				 if (navigator.geolocation) {
		             var options = {timeout:60000};
					 navigator.geolocation.getCurrentPosition(function(position){
							$scope.position=position;
							$scope.path='/storeSearch';
							$scope.distanceForbeacon=false;
							$scope.$apply(showLocationForBeaconDetection($scope,$location,StoreData));}, 
						function(position){
								$scope.err=err;
								$scope.$apply(errorHandler($scope));}, 
						options);
				 }else{
					 alert("Geolocation is not supported by this browser.");
				 }
				
			}
	);
}
//Called when user is away from the store
function StoreSearchController($window,$rootScope,$scope,$routeParams,$location,SearchStoreData,StoreData,INTERVAL,APP_BASE_URL,DEFAULT_LAT,DEFAULT_LONG){
	setLanguagePreference($window);
	$scope.keyword='';
	$scope.language='';
	$scope.gmarker='';
	$scope.latitude=DEFAULT_LAT;
	$scope.longitude=DEFAULT_LONG;
	$scope.store_name=localStorage.store_name;
	$scope.distance='';
	$scope.APP_BASE_URL=APP_BASE_URL;
	$scope.submit=function(){
		if($scope.keyword!=null){
			SearchStoreData.query({keyword: $scope.keyword,language:localStorage.language}).$promise.then(
					function(data){
						$scope.data=data;
						showMapWithSearchResults($scope);
					}
				);
		}
	}
	$scope.clear=function(){
		$scope.keyword='';
	}
	
	if (navigator.geolocation) {
	  	// timeout at 60000 milliseconds (60 seconds)
    	var options = {timeout:60000};
		navigator.geolocation.getCurrentPosition(function(position){
													$scope.path='/beaconStore';
													$scope.distanceForbeacon=false;
													$scope.position=position;
													$scope.$apply(showLocationForBeaconDetection($scope,$location,StoreData))}, 
												function(err){
														$scope.err=err;
														$scope.$apply(errorHandler($scope))}, 
												options);
		
		
	 }else{
		 alert("Geolocation is not supported by this browser.");
	 }
	
	/*StoreData.query({store_id: localStorage.store_id,language:localStorage.language}).$promise.then(
			function(data){
				$scope.storeData=data[0];
				if (navigator.geolocation) {
					  	// timeout at 60000 milliseconds (60 seconds)
			        	var options = {timeout:60000};
						navigator.geolocation.getCurrentPosition(function(position){
																	$scope.path='/beaconStore';
																	$scope.distanceForbeacon=false;
																	$scope.position=position;
																	$scope.$apply(showLocationForBeaconDetection($scope,$location))}, 
																function(err){
																		$scope.err=err;
																		$scope.$apply(errorHandler($scope))}, 
																options);
					
				 }else{
					 alert("Geolocation is not supported by this browser.");
				 }
			}
		)*/
}

function MyFavController($window,$rootScope,$scope,$location) {
	setLanguagePreference($window);
}


function StoreDetailsController($window,$rootScope,$scope,$routeParams,$location, StoreData,DEFAULT_LAT,DEFAULT_LONG){
	
	setLanguagePreference($window);	
	$scope.latitude=DEFAULT_LAT;
	$scope.longitude=DEFAULT_LONG;
	
	StoreData.query({store_id:  $routeParams.store_id,language:localStorage.language}).$promise.then(
			function(data){
				$scope.storeData=data;
				localStorage.store_name=data.store_name;
				createMap($scope);
			}
		);
	$scope.myStoreFavClass="star Icon";
	var storeFavName="storeFav_"+$routeParams.store_id;
	console.log(storeFavName+""+JSON.parse(localStorage.getItem(storeFavName)));
  	if(isFavExist(JSON.parse(localStorage.getItem(storeFavName)),$routeParams.store_id)){
  		$scope.myStoreFavClass="star Icon on";
  	}
  		
}

function showLocationForBeaconDetection($scope,$location,StoreData){
    var latitude = $scope.position.coords.latitude;
    var longitude = $scope.position.coords.longitude; 
    
    localStorage.currentLat=latitude;
    localStorage.currentLong=longitude;
   
    createInitalMap($scope,latitude,longitude);
    
    if(localStorage.store_id!='undefined'){
    
    	StoreData.query({store_id: localStorage.store_id,brand_id:localStorage.brand_id,language:localStorage.language}).$promise.then(
			function(data){
				$scope.storeData=data;				
				$scope.data=data.nearByStores;
				showMapWithSearchResults($scope);				
				localStorage.store_name=data.store_name;
				$scope.store_name=localStorage.store_name;
				if($scope.storeData.latitude!=null && $scope.storeData.longitude!=null){
				 $scope.distance=getDistanceFromLatLonInMeters($scope.storeData.latitude,$scope.storeData.longitude,latitude,longitude);
				    console.log("Distance In Meters::"+$scope.distance);
				    if($scope.distance>=100){
				    	$scope.inStore='yes';
				    }
				}
			});
    }
}

function createInitalMap($scope,latitude,longitude){
	var mapProp = {
	 	        center:new google.maps.LatLng(latitude,longitude),
	 	        zoom:12,
	 	        mapTypeId:google.maps.MapTypeId.ROADMAP
	       };
	$scope.map=new google.maps.Map(document.getElementById("googleMap"),mapProp);   
	addMarkerToMap(latitude,longitude,'test',$scope.map);
}

function createMap($scope){
	
	if($scope.storeData.latitude!==null && $scope.storeData.longitude!==null){
		var mapProp = {
		 	        center:new google.maps.LatLng($scope.storeData.latitude,$scope.storeData.longitude),
		 	        zoom:12,
		 	        mapTypeId:google.maps.MapTypeId.ROADMAP
		       };
		$scope.map=new google.maps.Map(document.getElementById("googleMap"),mapProp);   
		addMarkerToMap($scope.storeData.latitude,$scope.storeData.longitude,'test',$scope.map);
	}
}

function errorHandler($scope){
  if($scope.err.code == 1) {
     alert("Error: Access is denied!");
  } else if( $scope.err.code == 2) {
       alert("Error: Position is unavailable!");
  }
   var mapProp = {
	        center:new google.maps.LatLng($scope.latitude,$scope.longitude),
	        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
   $scope.map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
   addMarkerToMap(latitude,longitude,'',$scope.map);
}

function showMapWithSearchResults($scope,$location){
	var bounds = new google.maps.LatLngBounds();
	
	$scope.markers=[];
	$scope.calculateDirection=function(){

		if(localStorage.position!='undefined' && localStorage.position!='null'){
			
			for (var i = 0; i < $scope.markers.length; i++) {
				 $scope.markers[i].setMap(null);
			}
			
			$scope.map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
			
			var directionsDisplay=new google.maps.DirectionsRenderer();
			//var originVar = new google.maps.LatLng(localStorage.currentLat, localStorage.currentLong);
			var originVar = new google.maps.LatLng($scope.latitude, $scope.longitude);
			console.log($scope.latitude);
			console.log($scope.longitude);
			console.log(localStorage.position);
			var destination=localStorage.position;
			var directionsService = new google.maps.DirectionsService();
			var iconBase =$scope.APP_BASE_URL+'img/';
			var mapProp = {
			        center:originVar,
			        icon: iconBase + 'pin.png',
			        mapTypeId:google.maps.MapTypeId.ROADMAP
		      };
			
			directionsDisplay.setMap($scope.map);
			
			var request = {
				      origin: originVar,
				      destination: localStorage.position,
				      travelMode: google.maps.TravelMode['DRIVING']
				  };
			  directionsService.route(request, function(response, status) {
			    if (status == google.maps.DirectionsStatus.OK) {
			      directionsDisplay.setDirections(response);
			      
			      var steps = response.routes[0].legs[0].steps;
			      var summaryPanel = document.getElementById('directions-panel');
			      summaryPanel.innerHTML = '';
			      // For each route, display summary information.
			      console.log(steps.length);
			      summaryPanel.innerHTML = "Starting Point A:"+response.routes[0].legs[0].start_address    + '<br><br>';

			      var iconBase =$scope.APP_BASE_URL+'img/';
			      
			      for (var i = 0; i < steps.length; i++) {
			        var stepSegment = i + 1;
			        summaryPanel.innerHTML += "Step "+stepSegment+":"+ steps[i].instructions  + '<br>';
			      }
			      
			      var marker = new google.maps.Marker({
			          position: steps[i - 1].end_point, 
			          map: $scope.map,
			          icon: iconBase+"pin.png"
			        });
			      
			      attachInstructionText(marker,localStorage.title,$scope)
			      summaryPanel.innerHTML +="Destination B :"+ response.routes[0].legs[0].end_address    + '<br>';
			    }else{
			    	alert(" No directions possible. Please try again later");
			    }
			  });
	
		}else{
			alert("Please select the destination");
		}
	}
	
	for(var i=0;i<$scope.data.length;i++){
		if(i==0){
			localStorage.position=null;
		}
		if($scope.data[i].latitude!==null && !$scope.data[i].longitude!==null){
			    var infowindow = new google.maps.InfoWindow();
			     
		        var latlng = new google.maps.LatLng($scope.data[i].latitude, $scope.data[i].longitude);
		        bounds.extend(latlng);
		        
		        var iconBase =$scope.APP_BASE_URL+'img/';
		         
		        var marker = new google.maps.Marker({
		            position: latlng,
		            map: $scope.map,
		            icon: iconBase + 'pin.png',
		            title: "<a href='#/storeDetails?store_id="+$scope.data[i].store_id+"'>"+$scope.data[i].store_name + "<br/>" + $scope.data[i].store_2nd_name+"</a>"
		        });
		        
		        $scope.markers[$scope.markers.length]=marker;
		     
		        google.maps.event.addListener(marker, 'click', function() {
		            infowindow.setContent(this.title);
		            infowindow.open( $scope.map, this);
		            localStorage.position=this.position;
		            localStorage.marker=this.marker;
		            localStorage.title=this.title;
		        });
		     
		    $scope.map.fitBounds(bounds);
		}
		
	}
}

function attachInstructionText(marker, text,$scope) {
	var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {
      // Open an info window when the marker is clicked on,
      // containing the text of the step.
    	infowindow.setContent(text);
    	infowindow.open($scope.map, marker);
    });
}

//for the marker.
function addMarkerToMap(lat, long, htmlMarkupForInfoWindow,map)
{ 
	 var infowindow = new google.maps.InfoWindow(); 
	 var bounds = new google.maps.LatLngBounds();
	 var myLatLng = new google.maps.LatLng(lat, long); 
	 var markerCount = 0;
	
	 var marker = new google.maps.Marker(
			 			{ position: myLatLng, map: map, animation: google.maps.Animation.DROP, }
			 		); 
	
	markerCount++; 
	//Creates the event listener for clicking the marker 
	google.maps.event.addListener(marker, 'click', (function(marker, markerCount) 
		{ 
			return function() { 
					infowindow.setContent(htmlMarkupForInfoWindow); 
					infowindow.open(map, marker); 
			} 
		}
	),marker, markerCount); 
	 map.panTo(myLatLng);
}

function PrivacyController($window,$scope,$location){
	setLanguagePreference($window);
}

function ContactController($window,$scope){
	setLanguagePreference($window);
}

function MenuCategoryController($window,$rootScope,$scope,MenuCategoryData){
	setLanguagePreference($window);
	
	$scope.storeMenuSpecial='';
	$scope.storeMenuCategory=[];
	
	MenuCategoryData.query({store_id: localStorage.store_id,language: localStorage.language}).$promise.then(
			function(data){
				var isMenuSpecial=false;
				for(var i=0;i<data.length;i++){
					if(data[i].menuid!==null && isMenuSpecial===false){
						$scope.storeMenuSpecial=data[i];
						isMenuSpecial=true;
						console.log("isMenuSpecial menuid "+$scope.storeMenuSpecial.menuid);
					}
					if(data[i].foodcategoryid!=null){
						$scope.storeMenuCategory[$scope.storeMenuCategory.length]=data[i];
						console.log("menucategory "+data[i].foodcategoryid);
					}
				}
				if(isMenuSpecial===false && $scope.storeMenuCategory.length>0){
					$scope.storeMenuSpecial=$scope.storeMenuCategory[0];
				}
				localStorage.storeMenuCategory=$scope.storeMenuCategory;
			}
	);
	
}

function MenuCategoryListController($window,$rootScope,$scope,$routeParams,MenuCategoryListData,DEFAULT_LANG){
	setLanguagePreference($window);
	$scope.brandMenuInfo=[];
	$scope.catImgUrl='';
	$scope.specialMenuInfo='';
	
	MenuCategoryListData.query({category_id:$routeParams.category_id,store_id: 0,language: localStorage.language}).$promise.then(
			function(data){
				$scope.brandMenuInfo=data;
				for(var i=0;i<data.menuInfo.length;i++){
					console.log("data index "+i);
					if(data.menuInfo[i].isSpecialMenu===true){
						$scope.specialMenuInfo=data.menuInfo[i];
						console.log("special menu is set");
						break;
					}
				}
				
				for(var i=0;i<data.menuInfo.length;i++){
					 data.menuInfo[i].menu_price_mrp=replaceAmount(data.menuInfo[i].menu_price_mrp);
				}
				
				if(localStorage.language==DEFAULT_LANG){
					$scope.currncySymb="å††";
				}
				else{
					$scope.currncySymb="JPY";
				}
			}
	);
}

function MenuListController($window,$rootScope,$scope,$routeParams,MenuListData,StoreData,DEFAULT_LANG){
	setLanguagePreference($window);
	$scope.menuListInfo=[];
	$scope.storeData='';
	
	if($routeParams.language!==null){
		localStorage.language=$routeParams.language;
	}
	
	if(localStorage.language=='undefined'){
		localStorage.language=DEFAULT_LANG;
	}
	
	MenuListData.query({store_id: $routeParams.store_id,language: localStorage.language}).$promise.then(
			function(data){
				$scope.menuListInfo=data;
			}
	);
	
	StoreData.query({store_id: $routeParams.store_id,language:localStorage.language}).$promise.then(
		function(data){
			if(data){
				$scope.storeData=data;
			}
		}
	);
}

function CouponListControler($window,$rootScope,$scope, $routeParams,$location, CouponList,StoreData,INTERVAL) {
	setLanguagePreference($window);
	// scope init:
	$scope.myInterval = INTERVAL;
	$scope.dataLoaded=false;
    var couponList=[];
    var couponFavList=[];
    var i;
    var j;
    var beacon=0;
    var couponStoreName="couponStore_"+localStorage.store_id;
    couponFavList=JSON.parse(localStorage.getItem(couponStoreName));
    $scope.isAway=true;
    StoreData.query({store_id: localStorage.store_id,language:localStorage.language}).$promise.then(
    		function(data){
    			if(data){			
    				if (navigator.geolocation) {
    					navigator.geolocation.getCurrentPosition(function(pos){    						
    		          	 var crd = pos.coords;
    		          	  console.log('crd.latitude:: ' +crd.latitude+""+data.longitude);
    		          	  $scope.distance=getDistanceFromLatLonInMeters(data.latitude,data.longitude,crd.latitude,crd.longitude);
    		    		  console.log('distance:: ' +$scope.distance + ' meters.');
    		    		  if($scope.distance<=100){
    	    					console.log("Cotrolder::In::"+$scope.distance);
    	    			    	$scope.isAway=false;
    	    			    	beacon=1;
    	    			    }    	    				
    	        		    CouponList.query({store_id: localStorage.store_id,from_beacon:beacon,language: localStorage.language}).$promise.then(
    	        		    		function(data){
    	        		    			couponList=data;    			
    	        			    			for(i=0;i<couponList.length;i++){
    	        			    		    	var favClass="star Icon";
    	        			    		    	if(couponFavList!=null){
    	        			    		    	  for(j=0;j<couponFavList.length;j++){
    	        			    		    		  if(couponList[i].couponID==couponFavList[j].FavId && couponFavList[j].isFav==1){
    	        			    		    			  favClass="star Icon on";
    	        			    		    		  }    		 
    	        			    		    	  }
    	        			    		    	}	    		    	
    	        			    		    	  couponList[i].favClass = favClass;
    	        			    		    }
    	        		    			
    	        		    			$scope.couponList=couponList;        		    		     			
    	        		    		}
    	        		    );
    		          },function(error){
							$scope.err=err;
							$scope.$apply(errorHandler($scope));}, 
					options);
    				  } else {
    				    alert("Geolocation is not supported by this browser.");
    				  }			
    				
    				$scope.dataLoaded=true;
    			}
    			
    		}
    );    
 }
function NearStoreList($rootScope,$scope,$routeParams,StoreNearList){	
	
	$scope.nearByStores;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(pos){    						
      	 var crd = pos.coords;      	 
		  StoreNearList.query({store_id: localStorage.store_id,latitude:crd.latitude,longitude:crd.longitude,language: localStorage.language}).$promise.then(
				function(data){
					$scope.nearByStores=data;
					 $scope.dataLoaded=true;
					 setSlickConfig($scope);
				}
			);
		 
      },function(error){
			$scope.err=err;
			$scope.$apply(errorHandler($scope));}, 
	options);
	  } else {
	    alert("Geolocation is not supported by this browser.");
	  }			
}

function setSlickConfig($scope){
	$scope.slickConfig = {
				adaptiveHeight: true,
				autoplay: true,
				autoplaySpeed: 3000,
				fade: true
	     };
}