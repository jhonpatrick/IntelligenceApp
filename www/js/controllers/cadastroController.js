app.controller('cadastroCtrl', ['$scope', '$stateParams', '$http', '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast, $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {
        $scope.cadastro = 'Cadastro'

        $scope.myToast = function() {
            console.log("texte");
        }

        function loadingShow(msg) {
            $ionicLoading.show({
                template: msg,
                noBackdrop: false
            })
        }

        function loadingHide() {
            $ionicLoading.hide()
        }

        var evt = JSON.parse(window.localStorage.getItem('eventos'))
        $scope.event = evt;
        var estados = JSON.parse(window.localStorage.getItem('estados'));
        $scope.ufEstados = estados;
        // informar o db qual o tipo de cadastro
        var tipoCadastro = {
            tipo: 'App'
        }

        $scope.cadastrarUsuario = function(usuario) {
            console.log(usuario, tipoCadastro)
        }
        $scope.carregarLogin = function() {
            $location.path('/loginPage')
        }

        $scope.listarCidades = function() {
            var idEstado = document.getElementById('idSelectEstado').value;
            console.log("id->", idEstado);
            var configRequestHttpPost = {
                method: 'POST',
                url: 'http://tda.intelligenceeventos.com.br/app_participante/carregarCidades.php',
                timeout: 50000,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: { idEstado: idEstado }
            }
            loadingShow('Carregando...')
                // post
            $http(configRequestHttpPost).then(function successCallback(data) {
                console.log('Requisição wifi deu certo - data.data -> ', data.data)
                $scope.cidades = data.data;
                loadingHide()
            }, function errorCallback(data) {
                var retorno = data.data
                console.log('Retorno Serv = ' + retorno)
                loadingHide()
                    // msg de erro
                $cordovaToast.show('Serviço indisponível no momento. Tente mais tarde!', 'long', 'center')
                console.log('Requisição wifi Falhou')
            })
        }

        $scope.verificaEmail = function() {
            console.log("Email já cadastrado.");
        }
    }
]);