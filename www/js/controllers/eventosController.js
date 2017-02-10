app.controller('eventosCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {
        $scope.eventos = 'Eventos'
        $scope.carregarInicio = function() {
            $location.path('/menuIntelligence')
        }
    }
]);