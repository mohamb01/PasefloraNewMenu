// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'App.services', 'ngFileUpload', 'ngImgCrop'])

.run(function ($rootScope, $ionicPlatform, $ionicLoading) {
    $rootScope.IsHebrew = true;
    $rootScope.ShowLoadding = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="crescent"></ion-spinner>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
        });
    };

    $rootScope.HideLoadding = function () {
        $ionicLoading.hide();
    };
    $rootScope.ChangeLang = function () {
        if ($rootScope.IsHebrew) {
            $rootScope.IsHebrew = false;
        } else {
            $rootScope.IsHebrew = true;
        }
    };
    $rootScope.dataURItoBlob = function (dataURI, type) {
        // convert base64 to raw binary data held in a string
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var bb = new Blob([ab], { type: type });
        return bb;
    };
  

  	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
		  	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
		  	// org.apache.cordova.statusbar required
		  	StatusBar.styleDefault();
		}
  	});
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	$ionicConfigProvider.navBar.alignTitle('center');
  	$stateProvider

  	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu.html",
		controller: 'AppCtrl'
  	})

  	.state('app.news', {
		url: "/news-feed",
		views: {
			'menuContent': {
				templateUrl: "templates/news-feed.html",
				controller: 'NewsCtrl'
	  		}
		}
  	})
        .state('app.menuDetails', {
            url: '/menuDetails/:Id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/menuDetails.html',
                    controller: 'menuDetailsCtrl'
                }
            }
        })
        

  
        .state('app.profileEdit', {
            url: "/profile-edit/:Id",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/profile-edit.html",
                    controller: 'UserProfileCtrl'
                }
            }
        })




	.state('app.followers', {
		url: "/followers",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/followers.html"
			}
	  	}
	})
	.state('app.listUsers', {
	    url: "/listUsers",
	    cache: false,
	  	views: {
			'menuContent': {
			    templateUrl: "templates/listUsers.html",
			    controller: 'UsersListCtrl'
			}
	  	},
	  	
	})


  	.state('app.listCustomers', {
  	    url: "/listCustomers",
  	    cache: false,
  	    views: {
  	        'menuContent': {
  	            templateUrl: "templates/listCustomers.html",
  	            controller: 'CustomersListCtrl'
  	        }
  	    },
	  	
  	})
            .state('app.customerEdit', {
                url: "/customer-edit/:Id",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/customer-edit.html",
                        controller: 'CustomerProfileCtrl'
                    }
                }
            })

    	.state('app.listDrivers', {
    	    url: "/listDrivers",
    	    cache: false,
    	    views: {
    	        'menuContent': {
    	            templateUrl: "templates/listDrivers.html",
    	            controller: 'DriversListCtrl'
    	        }
    	    },

    	})
            .state('app.driverEdit', {
                url: "/driver-edit/:Id",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/driver-edit.html",
                        controller: 'DriverProfileCtrl'
                    }
                }
            })

    	.state('app.listOrders', {
    	    url: "/listOrders",
    	    cache: false,
    	    views: {
    	        'menuContent': {
    	            templateUrl: "templates/listOrders.html",
    	            controller: 'OrdersListCtrl'
    	        }
    	    },

    	})

  	// if none of the above states are matched, use this as the fallback
  	$urlRouterProvider.otherwise('/app/news-feed');

});
