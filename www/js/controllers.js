angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    // popup of logout
    $scope.infoApp2 = function () {
        var alertPopup = $ionicPopup.alert({
            template: '<center>You are going out!!</center>',
            buttons: [
				{
				    text: 'Ok',
				    type: 'button-dark'
				}
            ]
        });
        alertPopup.then(function (res) {
            console.log('Out!!');
        });
    };

})

.controller('NewsCtrl', function ($rootScope, $scope, $state, $timeout, SMPasefloraProductService) {
    $scope.ProductsList = {};
    $scope.data = {};
    $scope.data.bgColors = [];
    $scope.data.currentPage = 0;

    $timeout(function () {
        $scope.GetProductsList();
    }, 0);

    $scope.Product = {
        ProductId: -1, ProductStatusId: 1, ProductName1: "", ProductName2: "", ProductNotes1: "", ProductNotes2: "", ProductIconImage: "",
        ProductImage: "", ItemsPerPage: 30, PageNumber: 0
    };
    $scope.GetProductsList = function (source) {
        $rootScope.ShowLoadding();
        SMPasefloraProductService.GetProductsList($scope.Product).success(function (data) {
            $scope.ProductsList = data.ResultData;
            $rootScope.HideLoadding();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.ProductsList = {};
            console.log(err);
        });
    }


    for (var i = 0; i < 5; i++) {
        $scope.data.bgColors.push("bgColor_" + i);
    }

    var setupSlider = function () {
        //some options to pass to our slider
        $scope.data.sliderOptions = {
            initialSlide: 0,
            direction: 'horizontal', //or vertical
            speed: 300 //0.3s transition
        };

        //create delegate reference to link with slider
        $scope.data.sliderDelegate = null;

        //watch our sliderDelegate reference, and use it when it becomes available
        $scope.$watch('data.sliderDelegate', function (newVal, oldVal) {
            if (newVal != null) {
                $scope.data.sliderDelegate.on('slideChangeEnd', function () {
                    $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
                    //use $scope.$apply() to refresh any content external to the slider
                    $scope.$apply();
                });
            }
        });
    };
    setupSlider();
    $scope.goToPage= function (id) {
        $state.go('app.menuDetails', { "Id": id});
    }
})

.controller('menuDetailsCtrl', function ($rootScope, $scope, $stateParams, $state, $timeout, SMPasefloraProductService) {
    $timeout(function () {
        $scope.GetProductDetails($stateParams.Id);
    }, 0);
    $scope.ProductDetails = {};
 
    $scope.GetProductDetails = function (id) {
        $rootScope.ShowLoadding();
        SMPasefloraProductService.GetProductDetails(id).success(function (data) {
            $scope.ProductDetails = data.ResultData;
            $rootScope.HideLoadding();
            //Stop the ion-refresher from spinning
            //$scope.$broadcast('scroll.refreshComplete');
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.ProductItems = {};
            console.log(err);
        });
    }
        $scope.goToHomePage = function () {
            $state.go('app.news');
        }
})

.controller('MenuActiveCtrl', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    };
})
.controller('UsersListCtrl', function ($rootScope, $scope, $location, $timeout, $ionicLoading, SMUserService) {
  
    $timeout(function () {
        $scope.GetUsersList();
    }, 0);

    $scope.UsersList = {};
    $scope.User = {
        UserId: -1, UserStatus: 1, UserType: -1, FullName: "", UserName: "", Password: "", PhoneNumber: "", MobileNumber: "",
        FaxNumber: "", City: "", CreatedBy: -1, ModifiedBy: -1, FromCreatedDate: "", ToCreatedDate: "",
        FromModifiedDate: "", ToModifiedDate: "", ItemsPerPage: 30, PageNumber: 0
    };
    $scope.GetUsersList = function (source) {
        if (source != "refresh") {
            $rootScope.ShowLoadding();
        }
        SMUserService.GetUsersList($scope.User).success(function (data) {
            $scope.UsersList = data.ResultData;
            $rootScope.HideLoadding();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.UsersList = {};
            console.log(err);
        });
    }

    $scope.doRefresh = function () {
        console.log('Refreshing!');
        $scope.GetUsersList("refresh");
    };
})

.controller('UserProfileCtrl', function ($rootScope, $scope, $stateParams, $location, $timeout, $ionicLoading, SMUserService, Upload) {
    $scope.UserId = $stateParams.Id;
    $scope.Title = "הוספת משתמש חדש";
    $scope.resImageDataURI = '';
    $scope.oldProfileImage = "";
    if (!$scope.UserId) {
        $scope.UserId = 0;
    }
    if ($scope.UserId > 0) {
        $scope.Title = "עריכת משתמש";
        $timeout(function () {
            $scope.GetUserDetails();
        }, 0);
    }

    $scope.UserData = {
        UserId: -1, UserStatus: 1, UserType: 1, FullName: "", UserName: "", Password: "", PhoneNumber: "", MobileNumber: "", FaxNumber: "",
        AddressLine1: "", AddressLine2: "", City: "", State: "", ZIP: "", Country: "", ProfileImage: "img/92.jpg", ResetGuId: "", CreatedBy: 1, ModifiedBy: 1
    };
    $scope.GetUserDetails = function () {
        $scope.oldProfileImage = $scope.UserData.ProfileImage;
        $rootScope.ShowLoadding();
        SMUserService.GetUserDetails($scope.UserId).success(function (data) {
            $scope.UserData = data.ResultData;
            $scope.oldProfileImage = $scope.UserData.ProfileImage;
            $rootScope.HideLoadding();
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.UserData = {};
            console.log(err);
        });
    }

    $scope.SaveUser = function () {
        $rootScope.ShowLoadding();
        SMUserService.SaveUserDetails($scope.UserData).success(function (data) {
            $scope.UserData = data.ResultData;
            $rootScope.HideLoadding();
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.UserData = {};
            console.log(err);
        });
    }

 
    $scope.upload = function (file) {
        if (file) {
            $rootScope.ShowLoadding();
                Upload.upload({
                    url: Settings.Host+"/api/ImageUpload",
                    fields: { hName: Settings.Host,dName:"UImage" },
                    file: file
                }).progress(function (evt) {

                }).success(function (data, status, headers, config) {
                    $scope.UserData.ProfileImage = data.src;
                    $scope.oldProfileImage = $scope.UserData.ProfileImage;
                    $scope.enableCrop = false;
                    $rootScope.HideLoadding();
                }).error(function (err) {
                    $scope.enableCrop = false;
                    $rootScope.HideLoadding();
                    //alert(JSON.stringify(err));
                });
        }
    };

    $scope.onChange = function ($dataURI) {
        $scope.UserData.ProfileImage = $dataURI;

    };
    $scope.onLoadBegin = function () {
    };
    $scope.onLoadDone = function () {

    };
    $scope.onLoadError = function () {
    };
    $scope.onSelectCropedImage = function () {
        var file = $rootScope.dataURItoBlob($scope.UserData.ProfileImage, 'image/png');
        $scope.upload(file);

    };
    $scope.onCancelCropedImage = function () {
        $scope.enableCrop = false;
        $scope.UserData.ProfileImage = $scope.oldProfileImage;
        $scope.oldProfileImage = $scope.UserData.ProfileImage;
    };
    $scope.handleFileSelect = function (file) {
        $scope.enableCrop = true;
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.imageDataURI = evt.target.result;
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
})



.controller('CustomersListCtrl', function ($rootScope, $scope, $location, $timeout, $ionicLoading, SMCustomerService) {
  
    $timeout(function () {
        $scope.GetCustomersList();
    }, 0);

    $scope.CustomersList = {};
    $scope.Customer = {
        CustomerId: -1, CustomerStatus: 1, CustomerType: -1, FullName: "", PhoneNumber: "", MobileNumber: "",
        FaxNumber: "", City: "", CreatedBy: -1, ModifiedBy: -1, FromCreatedDate: "", ToCreatedDate: "",
        FromModifiedDate: "", ToModifiedDate: "", ItemsPerPage: 30, PageNumber: 0
    };
    $scope.GetCustomersList = function (source) {
        if (source != "refresh") {
            $rootScope.ShowLoadding();
        }
        SMCustomerService.GetCustomersList($scope.Customer).success(function (data) {
            $scope.CustomersList = data.ResultData;
            $rootScope.HideLoadding();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.CustomersList = {};
            console.log(err);
        });
    }

    $scope.doRefresh = function () {
        console.log('Refreshing!');
        $scope.GetCustomersList("refresh");
    };
})

.controller('CustomerProfileCtrl', function ($rootScope, $scope, $stateParams, $location, $timeout, $ionicLoading, SMCustomerService) {
    $scope.CustomerId = $stateParams.Id;
    $scope.Title = "הוספת לקוח חדש";
    if (!$scope.CustomerId) {
        $scope.CustomerId = 0;
    }
    if ($scope.CustomerId > 0) {
        $scope.Title = "עריכת לקוח";
        $timeout(function () {
            $scope.GetCustomerDetails();
        }, 0);
    }

    $scope.CustomerData = {
        CustomerId: -1, CustomerStatus: 1, CustomerType: 1, FullName: "", PhoneNumber: "", MobileNumber: "", FaxNumber: "",
        AddressLine1: "", AddressLine2: "", City: "", State: "", ZIP: "", Country: "", ProfileImage: "", CreatedBy: 1, ModifiedBy: 1
    };
    $scope.GetCustomerDetails = function () {
        $rootScope.ShowLoadding();
        SMCustomerService.GetCustomerDetails($scope.CustomerId).success(function (data) {
            $scope.CustomerData = data.ResultData;
            $rootScope.HideLoadding();
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.CustomerData = {};
            console.log(err);
        });
    }

    $scope.SaveCustomer = function () {
        $rootScope.ShowLoadding();
        SMCustomerService.SaveCustomerDetails($scope.CustomerData).success(function (data) {
            $scope.CustomerData = data.ResultData;
            $rootScope.HideLoadding();
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.CustomerData = {};
            console.log(err);
        });
    }

})


.controller('DriversListCtrl', function ($rootScope, $scope, $location, $timeout, $ionicLoading, SMDriverService) {

    $timeout(function () {
        $scope.GetDriversList();
    }, 0);

    $scope.DriversList = {};
    $scope.Driver = {
        DriverId: -1, ParentId: -1, DriverStatus: 1, DriverType: -1, CarNumber: "", FullName: "", PhoneNumber: "", MobileNumber: "",
        FaxNumber: "", City: "", CreatedBy: -1, ModifiedBy: -1, FromCreatedDate: "", ToCreatedDate: "",
        FromModifiedDate: "", ToModifiedDate: "", ItemsPerPage: 30, PageNumber: 0
    };
    $scope.GetDriversList = function (source) {
        if (source != "refresh") {
            $rootScope.ShowLoadding();
        }
        SMDriverService.GetDriversList($scope.Driver).success(function (data) {
            $scope.DriversList = data.ResultData;
            $rootScope.HideLoadding();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.DriversList = {};
            console.log(err);
        });
    }

    $scope.doRefresh = function () {
        console.log('Refreshing!');
        $scope.GetDriversList("refresh");
    };
})

.controller('DriverProfileCtrl', function ($rootScope, $scope, $stateParams, $location, $timeout, $ionicLoading, SMDriverService) {
    $scope.DriverId = $stateParams.Id;
    $scope.Title = "הוספת נהג חדש";
    if (!$scope.DriverId) {
        $scope.DriverId = 0;
    }
    if ($scope.DriverId > 0) {
        $scope.Title = "עריכת נהג";
        $timeout(function () {
            $scope.GetDriverDetails();
        }, 0);
    }

    $scope.DriverData = {
        DriverId: -1, ParentId: -1, DriverStatus: 1, DriverType: 1, CarNumber: "", FullName: "", PhoneNumber: "", MobileNumber: "", FaxNumber: "",
        AddressLine1: "", AddressLine2: "", City: "", State: "", ZIP: "", Country: "", ProfileImage: "", CreatedBy: 1, ModifiedBy: 1
    };
    $scope.GetDriverDetails = function () {
        $rootScope.ShowLoadding();
        SMDriverService.GetDriverDetails($scope.DriverId).success(function (data) {
            $scope.DriverData = data.ResultData;
            $rootScope.HideLoadding();
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.DriverData = {};
            console.log(err);
        });
    }

    $scope.SaveDriver = function () {
        $rootScope.ShowLoadding();
        SMDriverService.SaveDriverDetails($scope.DriverData).success(function (data) {
            $scope.DriverData = data.ResultData;
            $rootScope.HideLoadding();
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.DriverData = {};
            console.log(err);
        });
    }

})


.controller('OrdersListCtrl', function ($rootScope, $scope, $location, $timeout, $ionicLoading, SMOrderService) {

    $timeout(function () {
        $scope.GetOrdersList();
    }, 0);

    $scope.OrdersList = {};
    $scope.Order = {
        OrderId: -1, CustomerId: -1, DriverId: -1, OrderType: -1, ShippingCertificateId: "", TransferPlace: "", DischargePlace: "", OrderStatus: -1,
        CreatedBy: -1, ModifiedBy: -1, FromCreatedDate: "", ToCreatedDate: "",
        FromModifiedDate: "", ToModifiedDate: "", ItemsPerPage: 30, PageNumber: 0
    };
    $scope.GetOrdersList = function (source) {
        if (source != "refresh") {
            $rootScope.ShowLoadding();
        }
        SMOrderService.GetOrdersList($scope.Order).success(function (data) {
            $scope.OrdersList = data.ResultData;
            $rootScope.HideLoadding();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }).error(function (err) {
            $rootScope.HideLoadding();
            $scope.OrdersList = {};
            console.log(err);
        });
    }

    $scope.doRefresh = function () {
        console.log('Refreshing!');
        $scope.GetOrdersList("refresh");
    };
})

