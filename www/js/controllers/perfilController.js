app.controller('perfilCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {
        // toast
        function loadingShow($msg) {
            $ionicLoading.show({
                template: $msg,
                noBackdrop: false
            })
        }

        function loadingHide() {
            $ionicLoading.hide()
        }

        $scope.perfil = 'Perfil'
        $scope.carregarInicio = function() {
            $location.path('/menuIntelligence')
        }
        var empresa = window.localStorage.getItem('empresa');
        var usuario = JSON.parse(window.localStorage.getItem('usuario'))
        var inscrito = JSON.parse(window.localStorage.getItem('inscrito'))
        var iconSexoClass = document.getElementById('idIconSexo')
        var iconPerfil = document.getElementById('idIconPerfil')
        var imgPerfilInscri = inscrito.foto
        var idUser = usuario.id
        $scope.inscritos = inscrito
        if (inscrito.sexo === 'M') {
            $scope.sexoAux = 'Masculino'
            iconSexoClass.className = 'icon ion-male'
            if (imgPerfilInscri === 'img/av.png') {
                iconPerfil.src = 'img/user_male.png'
            } else {
                iconPerfil.src = 'http://' + empresa + '.intelligenceeventos.com.br/imagens/perfil_users/' + idUser + '/' + imgPerfilInscri
            }
        }
        if (inscrito.sexo === 'F') {
            $scope.sexoAux = 'Feminino'
            iconSexoClass.className = 'icon ion-female'
            if (imgPerfilInscri === 'img/av.png') {
                iconPerfil.src = 'img/user_female.png'
            } else {
                iconPerfil.src = 'http://' + empresa + '.intelligenceeventos.com.br/imagens/perfil_users/' + idUser + '/' + imgPerfilInscri
            }
        }

        $scope.carregarEdtPerfil = function() {

            var typeCon = $cordovaNetwork.getNetwork()
            var online = $cordovaNetwork.isOnline()
            var offline = $cordovaNetwork.isOffline()
                // se está conectado -  Verifique o tipo de conexão
            if (online) {
                if (typeCon == 'wifi') {
                    var configRequestHttp = {
                        method: 'GET',
                        url: 'http://' + empresa + '.intelligenceeventos.com.br/app_participante/carregarUfInsc.php',
                        timeout: 50000,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }
                    loadingShow('Aguarde...')
                        // get
                    $http(configRequestHttp).then(function successCallback(data) {
                        console.log('Requisição wifi deu certo - data.data -> ', data.data)
                        var estados = data.data
                        localStorage.setItem('estados', JSON.stringify(estados))
                        loadingHide()
                        $location.path('/edtPerfilIncPage')
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
]);