app.controller('comprovantesCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {
        $scope.comprovantes = 'Comprovantes'
        $scope.carregarInicio = function() {
            $location.path('/menuIntelligence')
        }
    }
]);