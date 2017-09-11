angular.module('ionicApp')

.controller('HomeCtrl', function($scope, $http, $timeout, $localstorage, $ionicpopup, $loading)
{
    $scope.items = [];
    $scope.start_idx = 0;
    $scope.end_idx = 10;

    $scope.data =
    {
        isNewPost : true,
        isFavoritePost : false
    };


    $scope.showNewPost = function()
    {
        $scope.data.isNewPost = true;
        $scope.data.isFavoritePost = false;
    }

    $scope.showFavoritePost = function()
    {
        $scope.data.isNewPost = false;
        $scope.data.isFavoritePost = true;
    }

    $scope.onTap = function(idx)
    {
        self.location.href = "#/tab/home-detail/" + idx;
    }

    $scope.onHold = function()
    {
        $ionicpopup.show('Modify, Delete', [
                             {
                                text: 'Modify',
                                onTap: function(e)
                                {
                                }
                             },
                             {
                                text: 'Delete',
                                type: 'button-assertive',
                                onTap: function(e)
                                {
                                }
                             }
                         ]);
    }

    $scope.showNewPost();
})