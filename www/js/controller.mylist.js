angular.module('ionicApp')

.controller('MyListCtrl', function($scope, $http, $timeout, $localstorage, $ionicpopup, $loading)
{
    $scope.items = [];
    $scope.start_idx = 0;
    $scope.end_idx = 10;

    $scope.data =
    {
        isMyPost : true,
        isBookmarkPost: false
    };

    $scope.showMyPost = function()
    {
        $scope.data.isMyPost = true;
        $scope.data.isBookmarkPost = false;
    }

    $scope.showBookmarkPost = function()
    {
        $scope.data.isMyPost = false;
        $scope.data.isBookmarkPost = true;
    }

    $scope.doRefresh = function()
    {
        console.log('Refreshing!');
        $timeout( function()
        {
            //simulate async response

            $scope.doGet();

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };

    $scope.onTap = function(idx)
    {
        self.location.href = "#/tab/my-detail/"+idx;
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

    $scope.showMyPost();
})