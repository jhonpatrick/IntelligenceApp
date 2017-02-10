app.controller('inscrevaSeCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {
        $scope.inscrevaSe = 'Inscreva-se'
        $scope.carregarInicio = function() {
            $location.path('/menuIntelligence')
        }
    }
]);