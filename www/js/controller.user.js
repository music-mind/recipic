angular.module('ionicApp')

.controller('UserCtrl', function($scope, $http, $localstorage, $cordovaCamera, $cordovaFileTransfer, $cordovaActionSheet, $ionicpopup)
{
    $scope.showActionsheet = function() {

        var options = {
            title: 'Image Selection',
            buttonLabels: ['Photo Album', 'Camera'],
            addCancelButtonWithLabel: 'Cancel',
            androidEnableCancelButton : true,
            winphoneEnableCancelButton : true
          };

        $cordovaActionSheet.show(options)
            .then(function(index) {
            if(index == 1)
            {
                var options = {
                    destinationType : Camera.DestinationType.FILE_URI,
                    sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit : false,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                };
                $scope.selectImage(options);
            }
            else if(index == 2)
            {
                var options = {
                    destinationType : Camera.DestinationType.FILE_URI,
                    sourceType : Camera.PictureSourceType.CAMERA,
                    allowEdit : false,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                };
                $scope.selectImage(options);
            }
          });
    }

    $scope.getImage = function()
    {
        return 'img/default_avatar.png';
    }

    $scope.selectImage = function(options)
    {
        $cordovaCamera.getPicture(options).then(function(imageData) {

            onImageSuccess(imageData);

             function onImageSuccess(fileURI) {
                createFileEntry(fileURI);
             }

             function createFileEntry(fileURI) {
                window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
             }

             function copyFile(fileEntry) {
                var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                var newName = makeid() + name;

                window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                    fileEntry.copyTo(
                    fileSystem2,
                    newName,
                    onCopySuccess,
                    fail);
                }, fail);
            }

             function onCopySuccess(entry) {
                $scope.$apply(function () {
                    $scope.uploadedImage = entry.nativeURL;
                    $scope.uploadedFileName = $scope.uploadedImage.substr($scope.uploadedImage.lastIndexOf('/') + 1);
                });
             }

             function fail(error) {
                 console.log("fail: " + error.code);
                 $ionicpopup.alert("fail: " + error.code);
             }

             function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                 for (var i=0; i < 12; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                 }
                return text;
             }

        }, function(err) {
            console.log(err);
            $ionicpopup.alert(err);
        });
    }

    $scope.login = function()
    {
        var form = window.loginform;
        var email = form.email.value;
        var password = form.password.value;

        if(email == '')
        {
            $ionicpopup.alert('insert email.');
            return;
        }
        if(password == '')
        {
            $ionicpopup.alert('insert password.');
            return;
        }

        $localstorage.set('isLogined', 1);
        $scope.hideLoginModal();
    }

    $scope.join = function()
    {
        var form = window.joinform;
        var email = form.email.value;
        var password = form.password.value;
        var nickname = form.nickname.value;

        if(email == '')
        {
            $ionicpopup.alert('insert email.');
            return;
        }
        if(password == '')
        {
            $ionicpopup.alert('insert password.');
            return;
        }
        if(nickname == '')
        {
          $ionicpopup.alert('insert nickname.');
          return;
        }

        $localstorage.set('isLogined', 1);
        $scope.hideJoinModal();
    }

    $scope.logout = function()
    {
      $localstorage.set('isLogined', 0);
    }

    $scope.onTap = function(idx)
    {
        self.location.href = "#/tab/bookmark-detail/" + idx;
    }
})