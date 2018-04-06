var app = angular.module('App.services', []);

app.factory('SMUserService', function ($http) {
    return {
        GetUsersList: function (usersObj) {
            return $http.post(Settings.Host+"/api/SMUser/", { ReqType: "GetUsersList", ReqObject: usersObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        GetUserDetails: function (userId) {
            return $http.post(Settings.Host + "/api/SMUser/", { ReqType: "GetUserDetails", ReqObject: { UserId: userId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        SaveUserDetails: function (userObj) {
            return $http.post(Settings.Host + "/api/SMUser/", { ReqType: "SaveUserDetails", ReqObject: userObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        DeleteUser: function (userId) {
            return $http.post(Settings.Host + "/api/SMUser/", { ReqType: "DeleteUser", ReqObject: { UserId: userId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
    }
});

app.factory('SMCustomerService', function ($http) {
    return {
        GetCustomersList: function (customersObj) {
            return $http.post(Settings.Host + "/api/SMCustomer/", { ReqType: "GetCustomersList", ReqObject: customersObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        GetCustomerDetails: function (customerId) {
            return $http.post(Settings.Host + "/api/SMCustomer/", { ReqType: "GetCustomerDetails", ReqObject: { CustomerId: customerId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        SaveCustomerDetails: function (customerObj) {
            return $http.post(Settings.Host + "/api/SMCustomer/", { ReqType: "SaveCustomerDetails", ReqObject: customerObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        DeleteCustomer: function (customerId) {
            return $http.post(Settings.Host + "/api/SMCustomer/", { ReqType: "DeleteCustomer", ReqObject: { CustomerId: customerId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
    }
});

app.factory('SMDriverService', function ($http) {
    return {
        GetDriversList: function (driversObj) {
            return $http.post(Settings.Host + "/api/SMDriver/", { ReqType: "GetDriversList", ReqObject: driversObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        GetDriverDetails: function (driverId) {
            return $http.post(Settings.Host + "/api/SMDriver/", { ReqType: "GetDriverDetails", ReqObject: { DriverId: driverId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        SaveDriverDetails: function (driverObj) {
            return $http.post(Settings.Host + "/api/SMDriver/", { ReqType: "SaveDriverDetails", ReqObject: driverObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        DeleteDriver: function (driverId) {
            return $http.post(Settings.Host + "/api/SMDriver/", { ReqType: "DeleteDriver", ReqObject: { DriverId: driverId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
    }
});

app.factory('SMOrderService', function ($http) {
    return {
        GetOrdersList: function (ordersObj) {
            return $http.post(Settings.Host + "/api/SMOrder/", { ReqType: "GetOrdersList", ReqObject: ordersObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        GetOrderDetails: function (orderId) {
            return $http.post(Settings.Host + "/api/SMOrder/", { ReqType: "GetOrderDetails", ReqObject: { OrderId: orderId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        SaveOrderDetails: function (orderObj) {
            return $http.post(Settings.Host + "/api/SMOrder/", { ReqType: "SaveOrderDetails", ReqObject: orderObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        DeleteOrder: function (orderId) {
            return $http.post(Settings.Host + "/api/SMOrder/", { ReqType: "DeleteOrder", ReqObject: { OrderId: orderId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
    }
});

app.factory('SMLookUpService', function ($http) {
    return {
        GetLookUps: function (searchLookUpObj) {
            return $http.post(Settings.Host + "/api/LookUp/", { ReqType: "GetLookUps", ReqObject: searchLookUpObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },

        GetLookUpDetails: function (lookUpId) {
            return $http.post(Settings.Host + "/api/LookUp/", { ReqType: "GetLookUpDetails", ReqObject: { LookUpId: lookUpId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },

        SaveBalanceHistory: function (lookUpObj) {
            return $http.post(Settings.Host + "/api/LookUp/", { ReqType: "SaveLookUpDetails", ReqObject: lookUpObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        }
    }
});

app.factory('SMPasefloraProductService', function ($http) {
    return {
        GetProductsList: function (productsObj) {
            return $http.post(Settings.Host + "/api/SMPasefloraProduct/", { ReqType: "GetProductsList", ReqObject: productsObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        GetProductDetails: function (productId) {
            return $http.post(Settings.Host + "/api/SMPasefloraProduct/", { ReqType: "GetProductDetails", ReqObject: { ProductId: productId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        SaveProductDetails: function (productObj) {
            return $http.post(Settings.Host + "/api/SMPasefloraProduct/", { ReqType: "SaveProductDetails", ReqObject: productObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        DeleteProduct: function (productId) {
            return $http.post(Settings.Host + "/api/SMPasefloraProduct/", { ReqType: "DeleteProduct", ReqObject: { ProductId: productId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
    }
});

app.factory('SMPasefloraProductItemService', function ($http) {
    return {
        GetProductItemsList: function (productItemsObj) {
            return $http.post(Settings.Host + "/api/SMPasefloraProductItem/", { ReqType: "GetProductItemsList", ReqObject: productItemsObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        GetProductItemDetails: function (itemId) {
            return $http.post(Settings.Host + "/api/SMPasefloraProductItem/", { ReqType: "GetProductItemDetails", ReqObject: { ItemId: itemId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        SaveProductItemDetails: function (productItemObj) {
            return $http.post(Settings.Host + "/api/SMPasefloraProductItem/", { ReqType: "SaveProductItemDetails", ReqObject: productItemObj }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
        DeleteProductItem: function (itemId) {
            return $http.post(Settings.Host + "/api/SMPasefloraProductItem/", { ReqType: "DeleteProductItem", ReqObject: { ItemId: itemId } }, {
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                return response.ResultData;
            }).error(function (err) {

            })
        },
    }
});

