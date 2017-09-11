angular.module('ionicApp')

.controller('MainCtrl', function($scope, $http, $ionicSideMenuDelegate, $rootScope, $ionicUser, $ionicPush, $state, $ionicHistory,
                                 $ionicModal, $localstorage)
{
    $scope.data =
    {
        isLogined : false
    };

    $ionicModal.fromTemplateUrl('templates/joinform.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.joinModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/loginform.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.loginModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/writeform.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.writeModal = modal;
    });

    $scope.toggleLeft = function()
    {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.isLogined = function()
    {
        return ($localstorage.get('isLogined') == 1);
    }

    $scope.goBack = function()
    {
        $ionicHistory.goBack();
    }

    $scope.goWrite = function()
    {
        //alert('write!');
        $state.go('write');
    };

    $scope.goMyList = function()
    {
        self.location.href = "#/tab/my-list";
    }

    $scope.goFavorite = function()
    {
        self.location.href = "#/tab/favorites/1";
    }

    $scope.showJoinModal = function()
    {
        $scope.hideLoginModal();
        $scope.joinModal.show();
    }

    $scope.hideJoinModal = function()
    {
        $scope.joinModal.hide();
    }

    $scope.showLoginModal = function()
    {
        $scope.loginModal.show();
    }

    $scope.hideLoginModal = function()
    {
        $scope.loginModal.hide();
    }

    $scope.showWriteModal = function()
    {
        $scope.writeModal.show();
    }

    $scope.hideWriteModal = function()
    {
        $scope.writeModal.hide();
    }

    $scope.showConfirmModal = function()
    {
        $scope.confirmModal.show();
    }

    $scope.hideConfirmModal = function()
    {
        $scope.confirmModal.hide();
    }
})
