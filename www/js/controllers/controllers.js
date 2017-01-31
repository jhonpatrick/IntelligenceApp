angular.module('app.controllers', [])

.controller('loginCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {
        $scope.carregarCadastro = function() {
            $location.path('/cadastroPage')
        }

        function loadingShow() {
            $ionicLoading.show({
                template: 'Aguarde...',
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
            // função clique do button
        $scope.fazerLogin = function(usuario) {
            // verificando conexão com internet
            tentativasLogin++
            var type = $cordovaNetwork.getNetwork()
            var isOnline = $cordovaNetwork.isOnline()
            var isOffline = $cordovaNetwork.isOffline()
                // se está conectado -  Verifique o tipo de conexão
            if (isOnline) {
                if (type == 'wifi') {
                    var configRequestHttpPost = {
                        method: 'POST',
                        url: 'http://tda.intelligenceeventos.com.br/app_participante/carregarLogin.php',
                        timeout: 30000,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        data: { usuario }
                    }
                    loadingShow()
                        // post
                    $http(configRequestHttpPost).then(function successCallback(data) {
                        // msg de Sucesso
                        var user = data.data
                        if (user.login == true) {
                            console.log('Login: ' + user.login)
                            $cordovaToast.show('Login com sucesso!', 'short', 'center')
                            localStorage.setItem('manterConexao', manterConexao)
                            console.log('salvando manterConexao -> ' + manterConexao)
                                // salvando dados em cache  
                            localStorage.setItem('usuario', JSON.stringify(user))
                            var usuario = JSON.parse(window.localStorage.getItem('usuario'))
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
                    }, function errorCallback(data) {
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
                            $ionicLoading.show({
                                template: 'Aguarde...',
                                duration: 30000
                            }).then(function() {
                                var req = {
                                        method: 'POST',
                                        url: 'http://tda.intelligenceeventos.com.br/app_participante/carregarLogin.php',
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                        },
                                        data: { usuario }
                                    }
                                    // post
                                $http(req).then(function successCallback(data) {
                                    console.log('Requisição Rede-3G deu certo')
                                        // msg de Sucesso
                                    var user2 = data.data
                                    if (user2.login == true) {
                                        $cordovaToast.show('Login com sucesso!', 'short', 'center')
                                    }
                                }, function errorCallback(data) {
                                    console.log('Requisição Rede-3G Falhou')
                                        // msg de erro
                                    $cordovaToast.show('Serviço indisponível no momento. Tente mais tarde!', 'short', 'center')
                                })
                            })
                        }
                    })
                }
            }
            if (isOffline) {
                $cordovaToast.show('Você não está conectado! Verifique sua conexão com a internet.', 'long', 'center')
            }
        }

        function isLogado() {
            loadingShow()
            console.log('Usuario está com Login salvo no localStorage')
            var isConexao = window.localStorage.getItem('manterConexao')
            var usuario = window.localStorage.getItem('usuario')
            console.log('isConexao -> ' + isConexao)
            console.log('userLogado -> ' + usuario)
            if (isConexao != null && isConexao === 'true') {
                $location.path('/menuIntelligence')
            }
            loadingHide()
        }
        isLogado()
    }
])

.controller('cadastroCtrl', ['$scope', '$stateParams', '$http',
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
])

.controller('intelligenceCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q', '$ionicPopover',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q, $ionicPopover) {
        $scope.inicio = 'Início'
            // funcção para mandar pro Inicio
        $scope.carregarInicio = function() {
                $location.path('/menuIntelligence')
            }
            // toast
        function loadingShow() {
            $ionicLoading.show({
                template: 'Aguarde...',
                noBackdrop: false
            })
        }

        function loadingHide() {
            $ionicLoading.hide()
        }

        // funcção para mandar pro Perfil
        $scope.carregarPerfil = function() {
            var typeCon = $cordovaNetwork.getNetwork()
            var online = $cordovaNetwork.isOnline()
            var offline = $cordovaNetwork.isOffline()
                // se está conectado -  Verifique o tipo de conexão
            if (online) {
                if (typeCon == 'wifi') {
                    var usuario = JSON.parse(window.localStorage.getItem('usuario'))
                    var idInsc = usuario.id
                    console.log('idInsc - ' + idInsc)
                    var configRequestHttp = {
                        method: 'POST',
                        url: 'http://tda.intelligenceeventos.com.br/app_participante/carregarPerfil.php',
                        timeout: 30000,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        data: { idInsc }
                    }
                    loadingShow()
                        // post
                    $http(configRequestHttp).then(function successCallback(data) {
                        console.log('Requisição wifi deu certo')
                        var insc = data.data
                        localStorage.setItem('inscrito', JSON.stringify(insc))
                        loadingHide()
                        $location.path('/perfilPage')
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

        // funcção para sair do app
        $scope.sairApp = function() {
                localStorage.clear()
                $location.path('/loginPage')
                var tamanho = localStorage.length
                console.log('Qnt de dados salvos no localStorage = ' + tamanho)
            }
            //criando avisos para icon de notificação
        var template =
            '<ion-popover-view style="background: #eeeeee; margin-top: 10px; width: 80%;" hide-nav-bar="true">' +
            '<ion-content padding="true" class="manual-ios-statusbar-padding" scroll="true">' +
            '<ion-list >' +
            '<ion-item style="background: #ccc; padding-left:5px; padding-right: 5px;">' +
            '<h3>{{aviso.nome}}</h3><br>' +
            '<p>{{aviso.ies}}</p><br>' +
            '</ion-item>' +
            '</ion-list>' +
            '</ion-content>' +
            '</ion-popover-view>'

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        })

        $scope.openPopover = function($event) {
            $scope.popover.show($event)
            var avisosJSON = JSON.parse(window.localStorage.getItem('inscrito'))
            $scope.aviso = avisosJSON
        }

        $scope.closePopover = function() {
            $scope.popover.hide()
        }

        // Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove()
        })

        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        })

        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        })
    }
])

.controller('perfilCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {

        // toast
        function loadingShow() {
            $ionicLoading.show({
                template: 'Carregando Perfil...',
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
            if (imgPerfilInscri === '') {
                iconPerfil.src = 'img/user_male.png'
            } else {
                iconPerfil.src = 'http://tda.intelligenceeventos.com.br/imagens/perfil_users/' + idUser + '/' + imgPerfilInscri
            }
        }
        if (inscrito.sexo === 'F') {
            $scope.sexoAux = 'Feminino'
            iconSexoClass.className = 'icon ion-female'
            if (imgPerfilInscri === '') {
                iconPerfil.src = 'img/user_female.png'
            } else {
                iconPerfil.src = 'http://tda.intelligenceeventos.com.br/imagens/perfil_users/' + idUser + '/' + imgPerfilInscri
            }
        }

        $scope.carregarEdtPerfil = function() {
            $location.path('/edtPerfilIncPage')
        }
    }
])

.controller('edtPerfilIncCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q', '$cordovaCamera', '$ionicActionSheet',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q, $cordovaCamera, $ionicActionSheet) {
        $scope.edtPerfil = 'Editar Perfil'
        var usuario = JSON.parse(window.localStorage.getItem('usuario'))
        var inscrito = JSON.parse(window.localStorage.getItem('inscrito'))
        var imgPerfilInscri = inscrito.foto
        var iconPerfil = document.getElementById('idFtPerfil')
        var idUser = usuario.id

        function getInscrito(inscrito) {
            $scope.inscritos = inscrito
            if (inscrito.sexo === 'M') {
                if (imgPerfilInscri === '') {
                    iconPerfil.src = 'img/user_male.png'
                } else {
                    iconPerfil.src = 'http://tda.intelligenceeventos.com.br/imagens/perfil_users/' + idUser + '/' + imgPerfilInscri
                }
            }
            if (inscrito.sexo === 'F') {
                if (imgPerfilInscri === '') {
                    iconPerfil.src = 'img/user_female.png'
                } else {
                    iconPerfil.src = 'http://tda.intelligenceeventos.com.br/imagens/perfil_users/' + idUser + '/' + imgPerfilInscri
                }
            }
        }
        getInscrito(inscrito);
        $scope.carregarPerfil = function() {
            getInscrito(inscrito);
            $location.path('/perfilPage')
        }

        $scope.mudarFotoPerfil = function() {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '<b><i class="icon ion-camera"></i>Camera</b>' },
                    { text: '<b><i class="icon ion-image"></i>Escolher da Galeria</b>' }
                ],
                titleText: '<h5>Formas de Edição</h5>',
                cancelText: 'Cancel',
                cancel: function() {
                    console.log('cancelando ActionSheet')
                },
                buttonClicked: function(index) {
                    console.log('index', index)
                    switch (index) {
                        case 0:
                            // Recuperar foto como uma imagem codificada em base64
                            var options = {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: Camera.PictureSourceType.CAMERA,
                                allowEdit: true,
                                encodingType: Camera.EncodingType.JPEG,
                                targetWidth: 100,
                                targetHeight: 100,
                                popoverOptions: CameraPopoverOptions,
                                saveToPhotoAlbum: false,
                                correctOrientation: true
                            };

                            $cordovaCamera.getPicture(options).then(function(imageData) {
                                $scope.imageDePerfilEdt = 'data:image/jpeg;base64,' + imageData
                                console.log('Deu Certo')
                            }, function(err) {
                                // error
                                console.log('Não Deu Certo - ', err)
                            })
                            break;

                        case 1:
                            // Recuperar foto como uma imagem codificada em base64
                            var options = {
                                quality: 100,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                allowEdit: false,
                                encodingType: Camera.EncodingType.JPEG,
                                targetWidth: 230,
                                targetHeight: 300,
                                popoverOptions: CameraPopoverOptions,
                                saveToPhotoAlbum: false,
                                correctOrientation: true
                            }

                            $cordovaCamera.getPicture(options).then(function(imageData) {
                                $scope.imageDePerfilEdt = 'data:image/jpeg;base64,' + imageData
                                console.log('Deu Certo')
                            }, function(err) {
                                // error
                                console.log('Não Deu Certo - ', err)
                            })

                            break;
                    }
                    return true
                }

            })
            $scope.carregarPerfilEditado = function() {
                //$location.path('/perfilPage')

            }
        }
    }
])

.controller('inscrevaSeCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {}
])

.controller('comprovantesCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {}
])