app.controller('cadastroCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {
        $scope.cadastro = 'Cadastro'
            // informar o db qual o tipo de cadastro
        var tipoCadastro = 'ap'
        $scope.cadastrarUsuario = function(usuario) {
            console.log(usuario, tipoCadastro)
        }
        $scope.carregarLogin = function() {
            $location.path('/loginPage')
        }
    }
]);