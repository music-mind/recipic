angular.module('ionicApp')

.controller('ViewCtrl', function($scope, $http, $stateParams, $localstorage, $eventmanager, $ionicpopup)
{
    $scope.showForm = true;

    $scope.doLike = function()
    {
        if(!$scope.isLogined())
        {
            $ionicpopup.alert('Liked!');
            return;
        }

        $ionicpopup.alert('Like!');
    };

    $scope.registerBookmark = function ()
    {
        if(!$scope.isLogined())
        {
            $ionicpopup.alert('Are you sure you want to buy Chicken Parmesan for $1.99?');
            return;
        }

        $ionicpopup.alert('Bookmark!');
    };
})