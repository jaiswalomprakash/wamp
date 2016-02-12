
	$( document ).ready(function() {
		
		$(document).on("click","#myStoreFav",function(){			
			 var className = $("#myStoreFav").attr("class");
			 var type =$("#myStoreFav").data("storefav-type");
			 var storeImg=$("#myStoreFav").data("storeimg");
			 var storeId=$("#myStoreFav").data("storefav-value");
			 var price="n/a";
			 var descp=$("#myStoreFav").data("storedesc");
			 storeFavItem(storeId,type,storeImg,storeId,price,descp);
			 if(className=="star Icon"){
				 $("#myStoreFav").removeClass("star Icon");
				 $("#myStoreFav").addClass("star Icon on");
			 }
			 else{
				 $("#myStoreFav").removeClass("star Icon on");				 
				 $("#myStoreFav").addClass("star Icon");
			 }	
			
		 });	
		$(document).on("click","#myStoreMenuFav",function(){			
			 var className = $("#myStoreMenuFav").attr("class");
			 var type =$("#myStoreMenuFav").data("storemenufav-type");
			 var menuImg=$("#myStoreMenuFav").data("menuimg-value");
			 var storeId=$("#myStoreMenuFav").data("storeid-value");
			 var price=$("#myStoreMenuFav").data("storemenuprice");
			 var descp=$("#myStoreMenuFav").data("storemenudesc");
			 
			 
			 storeFavItem($("#myStoreMenuFav").data("storemenufav-value"),type,menuImg,storeId,price,descp);
			 if(className=="star Icon"){
				 $("#myStoreMenuFav").removeClass("star Icon");
				 $("#myStoreMenuFav").addClass("star Icon on");
			 }
			 else{
				 $("#myStoreMenuFav").removeClass("star Icon on");				 
				 $("#myStoreMenuFav").addClass("star Icon");
			 }		
			 
		 });
		$(document).on("click","#RightMenu ul li",function(){	
			$( "#menuIcn" ).trigger( "click" );

	  });		
		
	});
 	
	/* Method to call getLocation to initialize map */
	function initializeStoreMap(storelat,storelong) {	
		getLocation(storelat,storelong);	    
    }
	
	function initializeStoreForDistance(storelat,storelong) {		
		var distance=0;
		  if (navigator.geolocation) {
			 navigator.geolocation.getCurrentPosition(function success(pos){
          	 var crd = pos.coords;
          	  console.log('crd.latitude:: ' +crd.latitude);
    		  distance=getDistanceFromLatLonInMeters(storelat,storelong,crd.latitude,crd.longitude);
    		  console.log('distance:: ' +distance + ' meters.');
          }, error, options);
		  } else {
		    alert("Geolocation is not supported by this browser.");
		  }
		  return distance;		
    }
	
	function couponFunctn(val,type){
		var cpnId=$(val).parent().attr('id');
		var isaway =document.getElementById("isaway").value;
		var couponStoreName="couponStore_"+localStorage.store_id;
		var cpnImg=$(val).find("img").attr('src');
		if(type=="R"){
			if(isaway!="true"){
				 var myfavCouponList = [];
				 myfavCouponList=JSON.parse(localStorage.getItem(couponStoreName));
				 var redeemed=isRedeemed(myfavCouponList,cpnId);
				 if(!redeemed){
					 $(val).parent().siblings().addClass('Coupon redeem');
						if(confirm("What to redeemed this.")){				
							storeCoupon(cpnId,couponStoreName,cpnImg,localStorage.store_id,1,-1);
						} 
				}
				 else{
					 alert("Soory, you are already redeemed this coupon");
				 }
			}
			//else{
			//	alert("Coupon can be redeemed only when you are in store.");
			//}
		}
		if(type=="F"){		
			var favVal=0;
			var couponFav=$(val).attr('class');			
			if(couponFav=="star Icon"){
				favVal=1;
				$(val).attr('class','star Icon on');
			}
			else{
				$(val).attr('class','star Icon');
			}
			storeCoupon(cpnId,couponStoreName,cpnImg,localStorage.store_id,0,favVal);
		}
	}
	
	/* Method to get getLocation */
	function getLocation(storelat,storelong) {
		  if (navigator.geolocation) {
			  // timeout at 60000 milliseconds (60 seconds)
              var options = {timeout:60000};
              //var newstorelat=storelat;
             // var newstorelong=storelong;
			  navigator.geolocation.getCurrentPosition(function showLocation(position){
			        var latitude = position.coords.latitude;
			        var longitude = position.coords.longitude;            
			        var mapProp = {
			    	        center:new google.maps.LatLng(storelat,storelong),
			    	        zoom:12,
			    	        mapTypeId:google.maps.MapTypeId.ROADMAP
			          };
			        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);      
			        var distance=getDistanceFromLatLonInMeters(storelat,storelong,latitude,longitude);
			        
			        console.log("Distance In Meters::"+distance);
			        addMarker(map);
				  
			  }, errorHandler, options);
		  } else {
		    alert("Geolocation is not supported by this browser.");
		  }
	}
	
	var options = {enableHighAccuracy: true, timeout: 5000,  maximumAge: 0};
	function getDistance(storelat,storelong) {
		var distance=0;
		  if (navigator.geolocation) {
			 navigator.geolocation.getCurrentPosition(function success(pos){
            	var crd = pos.coords;
            	 console.log('crd.latitude:: ' +crd.latitude);
      		  distance=getDistanceFromLatLonInMeters(storelat,storelong,crd.latitude,crd.longitude);
      		  console.log('distance:: ' +distance + ' meters.');
            }, error, options);
		  } else {
		    alert("Geolocation is not supported by this browser.");
		  }
		  return distance;
	}

	function error(err) {
		 console.warn('ERROR(' + err.code + '): ' + err.message);
	};
		
		
	/* Initialize latitude and longitude for map
	function showLocation(position,storelat,storelong) {
		alert(storelat);
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;            
        var mapProp = {
    	        center:new google.maps.LatLng(storelat,storelong),
    	        zoom:12,
    	        mapTypeId:google.maps.MapTypeId.ROADMAP
          };
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);      
        var distance=getDistanceFromLatLonInMeters(storelat,storelong,latitude,longitude);
        
        console.log("Distance In Meters::"+distance);
        addMarker(map);
    }*/
	
	/* Method to add Marker to the location*/
	function addMarker(map){
		var marker = new google.maps.Marker({
		    position: map.getCenter(),
		    map: map
		  });
	
	}

	/* Method to handle error for geolocation */
     function errorHandler(err) {
        if(err.code == 1) {
           alert("Error: Access is denied!");
        }
        
        else if( err.code == 2) {
           alert("Error: Position is unavailable!");
        }
        var mapProp = {
    	        center:new google.maps.LatLng(latitude,longitude),
    	        zoom:8,
    	        mapTypeId:google.maps.MapTypeId.ROADMAP
          };	     
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
       
     }
     
     /* Method to caclulate distace between 2 lat and lon */
     function getDistanceFromLatLonInMeters(lat1,lon1,lat2,lon2) {
    	 console.log(lat1+"::"+lon1+"::"+lat2+"::"+lon2);
    	  var R = 6371000; // Radius of the earth in meters
    	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
    	  var dLon = deg2rad(lon2-lon1); 
    	  var a = 
    	    Math.sin(dLat/2) * Math.sin(dLat/2) +
    	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    	    Math.sin(dLon/2) * Math.sin(dLon/2); 
    	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    	  var d = R * c; // Distance in meters
    	  return d;
    	}

    	function deg2rad(deg) {
    	  return deg * (Math.PI/180);
    	}
    	
/*  Method used to store/remove favorite item to localStorage*/
	 function storeFavItem(favId,storeName,img,storeId,price,descp){	 
		// console.log(localStorage.getItem(localStoreName));
		 if (typeof(Storage) !== "undefined") {
			    // Store
			  var localStoreName=storeName+"_"+storeId;
			  //console.log(localStoreName);
			  var myfavStoreList = [];
			  var localstr = JSON.parse(localStorage.getItem(localStoreName));	  
			  if(localstr){
				  myfavStoreList= localstr;
			  }
			  var filterarr =  $.grep(myfavStoreList, function( item, i ){
			 	return item.FavId==favId;
			  });
			 if(filterarr.length==0){
				 	addItemToLocalStore(myfavStoreList,favId,localStoreName,img,price,descp);
			 }
			 else{
				 if(myfavStoreList){
					removeItemFrmLocalStore(myfavStoreList,favId,localStoreName);
				 }
			 }
			
		} else {
			    console.log("Sorry, your browser does not support Web Storage...");
			}
		}
	 
	 
	 function storeOrderItem(menuId,storeId,localStoreOrderName,menuItem){	
		 var totalPrice=0;
		 if (typeof(Storage) !== "undefined") {
			    // Store
			  var localStoreName=localStoreOrderName;
			  var OrderList = [];
			  var localstr = JSON.parse(localStorage.getItem(localStoreName));	  
			  if(localstr){
				  OrderList= localstr;
			  }
			  var filterarr =  $.grep(OrderList, function( item, i ){
			 	return item.menuId==menuId;
			  });
			 if(filterarr.length==0){
				 OrderList.push(
						 {
							 "storeId":storeId,
							 "menuId":menuId,
							 "title":menuItem[0].menu_name,
							 "img":menuItem[0].menu_image1_url,
							 "qty":1,
						     "price":menuItem[0].menu_price_mrp.replace(/[^0-9.]/g, ""),
						     "total":menuItem[0].menu_price_mrp.replace(/[^0-9.]/g, "") ,
							 "date":Date()
						 }
				);
				 totalPrice= parseInt(menuItem[0].menu_price_mrp.replace(/[^0-9.]/g, ""));
				 addOrderLocalStoreByStaff(OrderList,localStoreName);				
			 }
						
		} else {
			    console.log("Sorry, your browser does not support Web Storage...");
			}
		 return totalPrice;
		}
	 
	 function updatestoreOrderItem(localStoreOrderName,type,menu_id,grandMenuTotal){
		
		  var OrderList = [];
		  var localstr = JSON.parse(localStorage.getItem(localStoreOrderName));
		  var grandTotal=localStorage.getItem(grandMenuTotal);
		  if(localstr){
			  OrderList= localstr;
		  } 
		  if(!grandTotal){
			  grandTotal=0;
		  }
		  else{
			  grandTotal= parseInt(grandTotal);
		  }
			   for (var i in OrderList) {
				   var tempQty=0;
			     if (OrderList[i].menuId == menu_id) {
			    	 tempQty=OrderList[i].qty;
			    	 if(type=="inc"){
			    		 tempQty=tempQty+1;
			    		 OrderList[i].qty=tempQty;			    	 
			    		 OrderList[i].total=tempQty * OrderList[i].price ;
			    		 grandTotal=grandTotal+parseInt(OrderList[i].price);
			    	 }
			    	 if(tempQty!=0 && type=="dec"){
			    		 tempQty=tempQty-1;
			    		 OrderList[i].qty=tempQty;			    	 
			    		 OrderList[i].total=tempQty * OrderList[i].price ;
			    		 grandTotal=grandTotal-parseInt(OrderList[i].price);
			    	 }			    	 
			        break; 
			     }
			   }
			   /*store both menu item order details and total into local storage*/
			   localStorage.setItem(localStoreOrderName, JSON.stringify(OrderList)); 
			   localStorage.setItem(grandMenuTotal, grandTotal);		   
			 
	 }
	
	 function storeCoupon(favId,couponName,img,storeId,redeemed,isFav){	 
		// console.log(localStorage.getItem(localStoreName));
		 if (typeof(Storage) !== "undefined") {
			    // Store
			  var localStoreName=couponName;
			  //console.log(localStoreName);
			  var myfavStoreList = [];
			  var localstr = JSON.parse(localStorage.getItem(localStoreName));	  
			  if(localstr){
				  myfavStoreList= localstr;
			  }
			  var filterarr =  $.grep(myfavStoreList, function( item, i ){
			 	return item.FavId==favId;
			  });
			 
			 if(filterarr.length==0){
				 addCouponToLocalStore(myfavStoreList,favId,localStoreName,img,redeemed,isFav);
			 }
			 else{
				 if(myfavStoreList){
				  updateCouponToLocalStore(myfavStoreList,favId,localStoreName,redeemed,isFav);
				 }
			 }
			//console.log(":::"+localStorage.getItem(localStoreName));
			//localStorage.clear();
		} else {
			    console.log("Sorry, your browser does not support Web Storage...");
			}
		}
	 /* Method to add myfav item to localStorage */
	 function addItemToLocalStore(arrayList,favId,localStoreName,imgSrc,price,descp){
		
		 arrayList.push({"FavId":favId,"img":imgSrc,"price":price,"desc":descp,"date":Date()});
		 localStorage.setItem(localStoreName, JSON.stringify(arrayList));		 
	 }
	 function addCouponToLocalStore(arrayList,favId,localStoreName,imgSrc,reddemed,isFav){
			
		 arrayList.push({"FavId":favId,"img":imgSrc,"isReddemed":reddemed,"isFav":isFav,"date":Date()});
		 localStorage.setItem(localStoreName, JSON.stringify(arrayList));
		
	 }
	 function addOrderLocalStoreByStaff(arrayList,localStoreOrder){		
		 localStorage.setItem(localStoreOrder, JSON.stringify(arrayList));	
	 }
	 
	 /* Method to remove myfav item to localStorage */
	 function removeItemFrmLocalStore(arrayList,Id,localStoreName){
		
		 $.each(arrayList, function(i, el){
			    if (this.FavId == Id){
			    	arrayList.splice(i, 1);
			    	localStorage.setItem(localStoreName, JSON.stringify(arrayList));
			    }
			});		
	 }
	 function updateCouponToLocalStore(arrayList,Id,localStoreName,redeemed,isFav){
			
		 $.each(arrayList, function(i, el){
			    if (this.FavId == Id){
			    	if(isFav!=-1){
			    		arrayList[i].isFav=isFav;
			    	}			    	
			    	if(redeemed!=0){
			    		arrayList[i].isReddemed=redeemed;
			    	}
			    	
			    	localStorage.setItem(localStoreName, JSON.stringify(arrayList));
			    }
			});		
		
	 }
	 
 /* Method to check favorite item exist or not */ 
	 function isFavExist(array, item){
		 var isExist=false;
		 var i;
		if(array){			
			for(i=0;i<array.length;i++){
				if(array[i].FavId==item){
					isExist=true;		
				}		
			}
		}		
		console.log(array+""+isExist);
		 return isExist;
	}

	/*Method to check redeemed status of coupon*/
	 function isRedeemed(array, item){		
		 var isExist=false;
		 var i;
		if(array){			
			for(i=0;i<array.length;i++){
				if(array[i].FavId==item && array[i].isReddemed==1){					
					isExist=true;		
				}		
			}
		}		
		return isExist;
	}	 
	 
	 
	 /* Method to clear LocalStorage data by key item*/ 	 
	 function clearLocalStorageByKey(localStoreItem){
		 localStorage.removeItem(localStoreItem);
	 }
	 
	 /* Method to clear LocalStorage data*/ 
	 function clearLocalStorage(){
		 localStorage.clear();
	 }
	 
	