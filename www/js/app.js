angular.module('ionicApp', [
    'ionic','ionic.service.core','ionic.service.push','ngCordova'
])

.config(['$ionicAppProvider', function($ionicAppProvider, $ionicConfigProvider) {
    // Identify app
    $ionicAppProvider.identify({
        // The App ID (from apps.ionic.io) for the server
        app_id: '4d685291',
        // The public API key all services will use for this app
        api_key: 'cd643d58a1e3fa600a7b7784a160f836c6a7e7b2ef32e3a4',
        // Set the app to use development pushes
        dev_push: false
    });
}])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center')

    $stateProvider
        .state('tabs', {
            url: "/tab",
            templateUrl: "templates/tabs.html"
        })
        .state('tabs.home', {
            url: "/home",
            cache: false,
            views: {
                'home-tab': {
                    templateUrl: "templates/home.html"
                }
            }
        })
        .state('tabs.my', {
            url: "/my",
            cache: false,
            views: {
                'my-tab': {
                    templateUrl: "templates/my.html",
                }
            }
        })
        .state('tabs.my-list', {
            url: "/my-list",
            cache: false,
            views: {
                'person-tab' :{
                    templateUrl: "templates/my-list.html",
                    controller: "MyListCtrl"
                }
            }
        })
        .state('tabs.favorites', {
            url: "/favorites/:type",
            cache: false,
            views: {
                'favorites-tab' :{
                    templateUrl: "templates/favorites.html"
                }
            }
        })
        .state('tabs.home-detail', {
            url: "/home-detail/:index",
            cache: false,
            views: {
                'home-tab' :{
                    templateUrl: "templates/detail.html"
                }
            }
        })
        .state('tabs.my-detail', {
            url: "/my-detail/:index",
            cache: false,
            views: {
                'person-tab' :{
                    templateUrl: "templates/detail.html"
                }
            }
        })
        .state('tabs.bookmark-detail', {
            url: "/bookmark-detail/:index",
            cache: false,
            views: {
                'favorites-tab' :{
                    templateUrl: "templates/bookmark-detail.html"
                }
            }
        })
        .state('tabs.setting', {
            url: "/setting",
            cache: false,
            views: {
                'setting-tab': {
                    templateUrl: "templates/setting.html"
                }
            }
        });

    $urlRouterProvider.otherwise("/tab/home");
})

.controller("ExampleController", function ($scope, $cordovaCamera, $ionicPopup, $timeout, $http) {

 
                      $scope.takePhoto = function () {
                          var options = {
                            quality: 75,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            allowEdit: true,
                            encodingType: Camera.EncodingType.JPEG,
                            targetWidth: 300,
                            targetHeight: 300,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: false
                        };



                     $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;

                         var DataToSend = {
                            image: imageData
                         };


                         $scope.showPopup = function() {
                          $scope.data = {};

                          // An elaborate, custom popup
                          var myPopup = $ionicPopup.show({
                            template: '<input type="text" ng-model="data.wifi">',
                            title: 'Apple recognized',
                            subTitle: 'Is this correct? Otherwise enter name of food. ',
                            scope: $scope,
                            buttons: [
                              { text: 'Cancel' },
                              {
                                text: '<b>Save</b>',
                                type: 'button-positive',
                                onTap: function(e) {
                                  if (!$scope.data.wifi) {
                                    //don't allow the user to close unless he enters wifi password
                                    e.preventDefault();
                                  } else {
                                    return $scope.data.wifi;
                                  }
                                }
                              }
                            ]
                          });

                          myPopup.then(function(res) {
                            console.log('Tapped!', res);
                          });

                          $timeout(function() {
                             myPopup.close(); //close the popup after 3 seconds for some reason
                          }, 100000);
                         };

                         $scope.showPopup();



                        $http({
                            method: 'POST',
                            url: 'http://recipic.net/api/v1/images/photo_identify.json?auth_token=VAPUzkyLUkdYfLZ52t89',
                            headers: {'Content-Type': 'application/json'},
                            data: DataToSend
                        })

                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
            });

