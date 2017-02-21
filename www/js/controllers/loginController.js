app.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q', '$cordovaOauth', '$window',
    function($scope, $stateParams, $http, $cordovaToast, $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q, $cordovaOauth, $window) {

        function loadingShow(msg) {
            $ionicLoading.show({
                template: msg,
                noBackdrop: false
            })
        }

        function loadingHide() {
            $ionicLoading.hide()
        }

        $scope.mostrarSenha = function() {
                // muda className do icon
                var senhaNovaClass = document.getElementById('idIconMostrarSenha')
                    // muda tipo input da senha
                var senhaNovoTipo = document.getElementById('idSenha')
                if (senhaNovoTipo.type == 'password') {
                    senhaNovoTipo.type = 'text'
                    senhaNovaClass.className = 'icon ion-eye placeholder-icon positive'
                } else {
                    senhaNovoTipo.type = 'password'
                    senhaNovaClass.className = 'icon ion-eye placeholder-icon'
                }
            }
            // pegando o status do checkebox
        var manterConexao = false
        $scope.salvaConexaoChange = function() {
            manterConexao = $scope.salvaConexao.checked
            console.log('Manter Conexão', manterConexao)
        }
        $scope.salvaConexao = { checked: false }
            // tentativas de login
        var tentativasLogin = 0
        var evt = JSON.parse(window.localStorage.getItem('eventos'))
        $scope.nomeEventos = evt;
        // verificando conexão com internet
        var type = $cordovaNetwork.getNetwork()
        var isOnline = $cordovaNetwork.isOnline()
        var isOffline = $cordovaNetwork.isOffline()
            // função clique do button
        $scope.fazerLogin = function(usuario) {
            // trata url
            var empresa = document.getElementById('idSelectEvento')
            var urlLogin = empresa.options[empresa.selectedIndex].text.toLowerCase()
            console.log(urlLogin)
            tentativasLogin++
            // se está conectado -  Verifique o tipo de conexão
            if (isOnline) {
                if (type == 'wifi') {
                    var configRequestHttpPost = {
                        method: 'POST',
                        url: 'http://' + urlLogin + '.intelligenceeventos.com.br/app_participante/carregarLogin.php',
                        timeout: 50000,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        data: { usuario: usuario }
                    }
                    loadingShow('Carregando Login...')
                        // post
                    $http(configRequestHttpPost).then(
                        function successCallback(data, status) {
                            // msg de Sucesso
                            console.log('status', status)
                            var user = data.data
                            if (user.login == true) {
                                $cordovaToast.show('Login com sucesso!', 'short', 'center')
                                localStorage.setItem('manterConexao', manterConexao)
                                localStorage.setItem('empresa', urlLogin)
                                    // salvando dados em cache  
                                localStorage.setItem('usuario', JSON.stringify(user))
                                loadingHide()
                                $location.path('/menuIntelligence')
                            } else {
                                loadingHide()
                                $cordovaToast.show('Login inválido!', 'short', 'center')
                                if (tentativasLogin == 5) {
                                    loadingHide()
                                    $cordovaToast.show('Tente um novo cadastro!', 'long', 'center')
                                    tentativasLogin = 0
                                }
                            }
                        },
                        function errorCallback(data, status) {
                            console.log('status', status)
                            var user = data.data
                            console.log('Retorno Serv = ' + user)
                            loadingHide()
                                // msg de erro
                            $cordovaToast.show('Serviço indisponível no momento. Tente mais tarde!', 'long', 'center')
                            console.log('Requisição wifi Falhou')
                        })
                }

                // verificando se o tipo de conexão é
                if (type == 'CELL_3G' || type == 'CELL_4G') {
                    // A confirm dialog
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Alerta de Uso de Dados',
                        template: 'Deseja continuar com o uso de Dados Móveis?'
                    })

                    confirmPopup.then(function(res) {
                        if (res) {
                            // post sem rede wi-fi
                            // definindo Parameters de requisição http
                            var configRequestHttpPost = {
                                method: 'POST',
                                url: 'http://' + urlLogin.toLowerCase() + '.intelligenceeventos.com.br/app_participante/carregarLogin.php',
                                timeout: 50000,
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                                data: { usuario: usuario }
                            }
                            loadingShow('Carregando Login...')
                                // post
                            $http(configRequestHttpPost).then(
                                function successCallback(data) {
                                    // msg de Sucesso
                                    var user = data.data
                                    if (user.login == true) {
                                        $cordovaToast.show('Login com sucesso!', 'short', 'center')
                                        localStorage.setItem('manterConexao', manterConexao)
                                        localStorage.setItem('empresa', urlLogin)
                                            // salvando dados em cache  
                                        localStorage.setItem('usuario', JSON.stringify(user))
                                        loadingHide()
                                        $location.path('/menuIntelligence')
                                    } else {
                                        loadingHide()
                                        $cordovaToast.show('Login inválido!', 'short', 'center')
                                        if (tentativasLogin == 5) {
                                            loadingHide()
                                            $cordovaToast.show('Tente um novo cadastro!', 'long', 'center')
                                            tentativasLogin = 0
                                        }
                                    }
                                },
                                function errorCallback(data) {
                                    var user = data.data
                                    console.log('Retorno Serv = ' + user)
                                    loadingHide()
                                        // msg de erro
                                    $cordovaToast.show('Serviço indisponível no momento. Tente mais tarde!', 'long', 'center')
                                    console.log('Requisição wifi Falhou')
                                })
                        }
                    })
                }
            }
            if (isOffline) {
                $cordovaToast.show('Você não está conectado! Verifique sua conexão com a internet.', 'long', 'center')
            }
        }

        // login com Facebook
        $scope.facebookSignIn = function() {
            alert("Ops.. :(");
        }

        $scope.carregarCadastro = function() {

            var typeCon = $cordovaNetwork.getNetwork()
            var online = $cordovaNetwork.isOnline()
            var offline = $cordovaNetwork.isOffline()
                // se está conectado -  Verifique o tipo de conexão
            if (online) {
                if (typeCon == 'wifi') {
                    var configRequestHttp = {
                        method: 'GET',
                        url: 'http://tda.intelligenceeventos.com.br/app_participante/carregarUfInsc.php',
                        timeout: 50000,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }
                    loadingShow('Aguarde...')
                        // post
                    $http(configRequestHttp).then(function successCallback(data) {
                        console.log('Requisição wifi deu certo - data.data -> ', data.data)
                        var estados = data.data
                        localStorage.setItem('estados', JSON.stringify(estados))
                        loadingHide()
                        $location.path('/cadastroPage')
                    }, function errorCallback(data) {
                        var retorno = data.data
                        console.log('Retorno Serv = ' + retorno)
                        loadingHide()
                            // msg de erro
                        $cordovaToast.show('Serviço indisponível no momento. Tente mais tarde!', 'long', 'center')
                        console.log('Requisição wifi Falhou')
                    })
                }
            }
        }
    }
])