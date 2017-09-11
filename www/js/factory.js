angular.module('ionicApp')

.factory('$localstorage', ['$window', function($window)
{
    return {
        set: function(key, value)
        {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue)
        {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value)
        {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key)
        {
            return JSON.parse($window.localStorage[key] || '[]');
        },
        clear: function()
        {
            $window.localStorage.clear();
        }
    }
}])

.factory('$eventmanager', function ($rootScope)
{
    return {
        bookmarkChanged: function (msg)
        {
            $rootScope.$broadcast('bookmark.changed', msg);
        },
        onBookmarkChanged: function ($scope, handler)
        {
            $scope.$on('bookmark.changed', function (event, msg)
            {
                handler(msg);
            });
        }
    };
})

.factory('$ionicpopup', function ($ionicPopup)
{
    return {
        alert: function (msg)
        {
            var alertPopup = $ionicPopup.alert({
                title: msg
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        },
        confirm: function(tit, msg)
        {
            return $ionicPopup.confirm({
                title: tit,
                template: msg
            });
        },
        show: function(tit, buttons)
        {
            return $ionicPopup.show({
                title: tit,
                subTitle: '편집을 하실 수 있습니다.',
                buttons: buttons
            });
        }
    };
})

.factory('$loading', function ($ionicLoading)
{
    return {
        show: function ()
        {
            // Setup the loader
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });
        },
        hide: function()
        {
            $ionicLoading.hide();
        }
    };
})