angular.module('ionicApp')

.controller('WriteCtrl', function($scope, $http, $localstorage, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaActionSheet, $ionicpopup)
{
  	$scope.saveContent = function()
  	{
  	    var form = window.writeform;
        var title = form.title.value;
        var content = form.content.value;

        if(title == '')
        {
            $ionicpopup.alert('insert title.');
            return;
        }
        if(content == '')
        {
            $ionicpopup.alert('insert content.');
            return;
        }

        $scope.hideWriteModal();
  	}

  	$scope.attachImage = function()
  	{
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
                    //sourceType : Camera.PictureSourceType.CAMERA,
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
})