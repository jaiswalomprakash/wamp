'use strict';

// create new module with its dependencies:
angular.module('myApp.services', ['ngResource']);
//fetch products for shopping department service; online version:
angular.module('myApp.services').factory('Login', function($resource,API_BASE_URL) {	
	 //return $resource(API_BASE_URL+'Console/Login', 
	  return $resource(API_BASE_URL+'menuService/getMenuData', 
	            {eamil:'@email',password:'@password'}, {});
 // return $resource('partials/users/mock/login.json'); // Note the full endpoint address

 
});

angular.module('myApp.services').factory('fileUpload1', function($resource,API_BASE_URL) {	
	 return $resource(API_BASE_URL+'Console/Login', 
	            {eamil:'@email',password:'@password'}, {});
 // return $resource('partials/users/mock/login.json'); // Note the full endpoint address

 
});

angular.module('myApp.services').factory('fileUploadManager', function ($resource,API_BASE_URL) {
    return $resource(API_BASE_URL+'Console/UploadSitePhoto/:id', { id: "@id" }, {
        create: {
            method: "POST"
        }
    });
})


angular.module('myApp.services').factory('CategoryList', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'mdbCategoryService/getMdbCategory?cat_id=:cat_id', 
	            {cat_id:'@cat_id'}, {});
	});


angular.module('myApp.services').factory('ItemList', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'productService/getProductListByCat?cat_id=:cat_id', 
	            {cat_id:'@cat_id'}, {});
	});

angular.module('myApp.services').factory('ItemDetails', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'productService/getProductListByItem?item_id=:item_id', 
	            {item_id:'@item_id'}, {});
	});

// page config
angular.module('myApp.services').factory('FeatureList', function($resource,API_BASE_URL){
	alert("FeatureList");
	  return $resource(API_BASE_URL+'/pageConfigService/getPageConfigList?store_id=:store_id&brand_id=:brand_id&language=:language', 
	            {store_id:'@store_id',brand_id:'@brand_id',language:'@language'}, {'query':  {method:'GET', isArray:false}});
	});

angular.module('myApp.services').factory('FeatureListDefault', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'featureService/getFeatureList?language=:language', 
	            {language:'@language'}, {});
	});

angular.module('myApp.services').factory('FeatureItemData', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'featureService/getFeatureMaster?feature_id=:feature_id&language=:language', 
	            {feature_id:'@feature_id',language:'@language'}, {'query':  {method:'GET', isArray:false}});
	});


angular.module('myApp.services').factory('MenuItemDetail', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'menuService/getMenuData?menu_id=:menu_id&language=:language', 
	            {menu_id:'@menu_id',language:'@language'}, {'query':  {method:'GET', isArray:false}});
	});

myApp.service('productService', function() {
	  var productList = [];
	
	  var addProduct = function(newObj,menuId) {
		  productList=[];
	      productList.push(newObj);	    
	  };

	  var getProducts = function(){
	      return productList;
	  };
	 
	  return {
	    addProduct: addProduct,
	    getProducts: getProducts	    
	  };
	 
	});

angular.module('myApp.services').factory('StoreData', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'storeService/getStoreDetailsForInbound?shop_id=:store_id&language=:language', 
	            {store_id:'@store_id',language:'@language'},{'query':  {method:'GET', isArray:false}});
	});

angular.module('myApp.services').factory('SearchStoreData', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'storeService/searchStore?keyword=:keyword&language=:language', 
	            {keyword:'@keyword',language:'@language'},{});
	});

angular.module('myApp.services').factory('MenuCategoryData', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'menuService/getMenuCategories?store_id=:store_id&language=:language', 
	            {store_id:'@store_id',language:'@language'},{});
	});

angular.module('myApp.services').factory('MenuCategoryListData', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'menuService/getMenuListForCategory?category_id=:category_id&store_id=:store_id&language=:language', 
	            {category_id:'@category_id',store_id:'@store_id',language:'@language'},{'query':  {method:'GET', isArray:false}});
	});

angular.module('myApp.services').factory('MenuListData', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'menuService/getMenuListForCategory?store_id=:store_id&language=:language', 
	            {store_id:'@store_id',language:'@language'},{});
	});

angular.module('myApp.services').factory('CouponList', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'couponService/getCouponList?store_id=:store_id', 
	            {store_id:'@store_id',from_beacon:'@from_beacon',language:'@language'}, {});
	});
angular.module('myApp.services').factory('StoreNearList', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'storeService/getNearByStore?store_id=:store_id&latitude=:latitude&longitude=:longitude&language=:language', 
	           {store_id:'@store_id',latitude:'@latitude',longitude:'@longitude',language:'@language'}, {});
});
angular.module('myApp.services').factory('BrandCatList', function($resource,API_BASE_URL){
	  return $resource(API_BASE_URL+'brandService/getBrandCategory?store_id=:store_id&brand_id=:brand_id&language=:language', 
	           {store_id:'@store_id',brand_id:'@brand_id',language:'@language'}, {});
});
