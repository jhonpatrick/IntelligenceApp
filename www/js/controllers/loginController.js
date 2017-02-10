app.controller('loginCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {

        $scope.carregarCadastro = function() {
            $location.path('/cadastroPage');
        }

        function loadingShow($msg) {
            $ionicLoading.show({
                template: $msg,
                noBackdrop: false
            });
        }

        function loadingHide() {
            $ionicLoading.hide();
        }

        $scope.mostrarSenha = function() {
                // muda className do icon
                var senhaNovaClass = document.getElementById('idIconMostrarSenha');
                // muda tipo input da senha
                var senhaNovoTipo = document.getElementById('idSenha');
                if (senhaNovoTipo.type == 'password') {
                    senhaNovoTipo.type = 'text';
                    senhaNovaClass.className = 'icon ion-eye placeholder-icon positive';
                } else {
                    senhaNovoTipo.type = 'password';
                    senhaNovaClass.className = 'icon ion-eye placeholder-icon';
                }
            }
            // pegando o status do checkebox
        var manterConexao = false;
        $scope.salvaConexaoChange = function() {
            manterConexao = $scope.salvaConexao.checked;
            console.log('Manter Conexão', manterConexao);
        }
        $scope.salvaConexao = { checked: false };
        // tentativas de login
        var tentativasLogin = 0;
        $scope.nomeEventos = JSON.parse(window.localStorage.getItem('eventos'));
        // função clique do button
        $scope.fazerLogin = function(usuario) {
            // verificando conexão com internet
            tentativasLogin++;
            var type = $cordovaNetwork.getNetwork();
            var isOnline = $cordovaNetwork.isOnline();
            var isOffline = $cordovaNetwork.isOffline();
            // se está conectado -  Verifique o tipo de conexão
            if (isOnline) {
                if (type == 'wifi') {
                    var configRequestHttpPost = {
                        method: 'POST',
                        url: 'http://tda.intelligenceeventos.com.br/app_participante/carregarLogin.php',
                        timeout: 50000,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        data: { usuario: usuario }
                    };
                    loadingShow('Carregando Login...');
                    // post
                    $http(configRequestHttpPost).then(function successCallback(data) {
                        // msg de Sucesso
                        var user = data.data;
                        if (user.login == true) {
                            $cordovaToast.show('Login com sucesso!', 'short', 'center');
                            localStorage.setItem('manterConexao', manterConexao);
                            // salvando dados em cache  
                            localStorage.setItem('usuario', JSON.stringify(user));
                            loadingHide();
                            $location.path('/menuIntelligence');
                        } else {
                            loadingHide();
                            $cordovaToast.show('Login inválido!', 'short', 'center');
                            if (tentativasLogin == 5) {
                                loadingHide();
                                $cordovaToast.show('Tente um novo cadastro!', 'long', 'center');
                                tentativasLogin = 0;
                            }
                        }
                    }, function errorCallback(data) {
                        var user = data.data;
                        console.log('Retorno Serv = ' + user);
                        loadingHide();
                        // msg de erro
                        $cordovaToast.show('Serviço indisponível no momento. Tente mais tarde!', 'long', 'center');
                        console.log('Requisição wifi Falhou');
                    });
                }

                // verificando se o tipo de conexão é
                if (type == 'CELL_3G' || type == 'CELL_4G') {
                    // A confirm dialog
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Alerta de Uso de Dados',
                        template: 'Deseja continuar com o uso de Dados Móveis?'
                    });

                    confirmPopup.then(function(res) {
                        if (res) {
                            // post sem rede wi-fi
                            // definindo Parameters de requisição http
                            var configRequestHttpPost = {
                                method: 'POST',
                                url: 'http://tda.intelligenceeventos.com.br/app_participante/carregarLogin.php',
                                timeout: 50000,
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                                data: { usuario: usuario }
                            };
                            loadingShow('Carregando Login...');
                            // post
                            $http(configRequestHttpPost).then(function successCallback(data) {
                                // msg de Sucesso
                                var user = data.data;
                                if (user.login == true) {
                                    $cordovaToast.show('Login com sucesso!', 'short', 'center');
                                    localStorage.setItem('manterConexao', manterConexao);
                                    // salvando dados em cache  
                                    localStorage.setItem('usuario', JSON.stringify(user));
                                    loadingHide();
                                    $location.path('/menuIntelligence');
                                } else {
                                    loadingHide();
                                    $cordovaToast.show('Login inválido!', 'short', 'center');
                                    if (tentativasLogin == 5) {
                                        loadingHide();
                                        $cordovaToast.show('Tente um novo cadastro!', 'long', 'center');
                                        tentativasLogin = 0;
                                    }
                                }
                            }, function errorCallback(data) {
                                var user = data.data;
                                console.log('Retorno Serv = ' + user);
                                loadingHide();
                                // msg de erro
                                $cordovaToast.show('Serviço indisponível no momento. Tente mais tarde!', 'long', 'center');
                                console.log('Requisição wifi Falhou');
                            })
                        }
                    })
                }
            }
            if (isOffline) {
                $cordovaToast.show('Você não está conectado! Verifique sua conexão com a internet.', 'long', 'center');
            }
        }
    }
]);