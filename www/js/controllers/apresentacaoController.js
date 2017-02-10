app.controller('apresentacaoCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {


        // var imgLogo = document.getElementById('imgLogo');

        // var intervalo = window.setInterval(function() {
        //     imgLogo.className = 'tda-img-border:houver';
        // }, 50);

        // window.setTimeout(function() {
        //     clearInterval(intervalo);
        // }, 3000);

        function loadingShow($msg) {
            $ionicLoading.show({
                template: $msg,
                noBackdrop: false
            });
        }

        function loadingHide() {
            $ionicLoading.hide();
        }

        $scope.carregarEventos = function() {
            var type = $cordovaNetwork.getNetwork();
            var isOnline = $cordovaNetwork.isOnline();
            var isOffline = $cordovaNetwork.isOffline();
            // se está conectado -  Verifique o tipo de conexão
            if (isOnline) {
                if (type == 'wifi') {
                    var configRequestHttp = {
                        method: 'GET',
                        url: 'http://intelligenceeventos.com.br/app_participante/carregarNomeEmpresas.php',
                        timeout: 50000,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }
                    loadingShow('Aguarde...');
                    // post
                    $http(configRequestHttp).then(function successCallback(data) {
                        console.log('Requisição wifi deu certo - data.data -> ', data.data);
                        var eventos = data.data;
                        localStorage.setItem('eventos', JSON.stringify(eventos))
                        loadingHide();
                        $location.path('/loginPage');
                    }, function errorCallback(data) {
                        var retorno = data.data;
                        console.log('Retorno Serv = ' + retorno);
                        loadingHide();
                        // msg de erro
                        $cordovaToast.show('Serviço indisponível no momento. Tente mais tarde!', 'long', 'center');
                        console.log('Requisição wifi Falhou');
                    })
                }
            }
        }

        function isLogado() {
            loadingShow('Aguarde...');
            console.log('Usuario está com Login salvo no localStorage');
            var isConexao = window.localStorage.getItem('manterConexao');
            var usuario = window.localStorage.getItem('usuario');
            console.log('isConexao -> ' + isConexao);
            console.log('userLogado -> ' + usuario)
            if (isConexao != null && isConexao === 'true') {
                $location.path('/menuIntelligence');
            }
            loadingHide();
        }
        isLogado();
    }
]);