app.controller('intelligenceCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q', '$ionicPopover',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q, $ionicPopover) {
        $scope.inicio = 'Início';
        // funcção para mandar pro Inicio
        $scope.carregarInicio = function() {
                $location.path('/menuIntelligence');
            }
            // toast
        function loadingShow($msg) {
            $ionicLoading.show({
                template: $msg,
                noBackdrop: false
            })
        }

        function loadingHide() {
            $ionicLoading.hide();
        }

        // funcção para mandar pro Perfil
        $scope.carregarPerfil = function() {
            var typeCon = $cordovaNetwork.getNetwork();
            var online = $cordovaNetwork.isOnline();
            var offline = $cordovaNetwork.isOffline();
            // se está conectado -  Verifique o tipo de conexão
            if (online) {
                if (typeCon == 'wifi') {
                    var usuario = JSON.parse(window.localStorage.getItem('usuario'));
                    var idInsc = usuario.id;
                    console.log('idInsc - ' + idInsc);
                    var configRequestHttp = {
                        method: 'POST',
                        url: 'http://tda.intelligenceeventos.com.br/app_participante/carregarPerfil.php',
                        timeout: 50000,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        data: { idInsc: idInsc }
                    };
                    loadingShow('Carregando Perfil...');
                    // post
                    $http(configRequestHttp).then(function successCallback(data) {
                        console.log('Requisição wifi deu certo');
                        var insc = data.data;
                        // /adrciona o novo inscrito
                        localStorage.setItem('inscrito', JSON.stringify(insc));
                        loadingHide();
                        $location.path('/perfilPage');
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

        // funcção para sair do app
        $scope.sairApp = function() {
                localStorage.clear();
                $location.path('/apresentacaoPage');
                var tamanho = localStorage.length;
                console.log('Qnt de dados salvos no localStorage = ' + tamanho);
            }
            // criando avisos para icon de notificação
        var template =
            '<ion-popover-view style="background: #F5F5F5; margin-top: 2%; width: 80%; box-shadow: -1px 1px 3px #9E9E9E; border-radius: 0px 0px 9px 9px;" hide-nav-bar="true">' +
            '<ion-content padding="true" scroll="true">' +
            '<ion-list >' +
            '<ion-item ng-repeat="aviso in avisos" style="background: #eee;">' +
            '<p><strong>{{avisos.titulo}}</strong><p>' +
            '<p><i class="icon ion-clock"></i> {{avisos.data_registro}} - {{avisos.hora}}<p>' +
            '<p style="text-size: 12px;">{{avisos.corpo}}</p>' +
            '</ion-item>' +
            '</ion-list>' +
            '</ion-content>' +
            '</ion-popover-view>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        })

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
            $scope.avisos = {
                titulo: 'Titulo do aviso',
                corpo: 'Corpo/Detalhes do aviso',
                data_registro: '08/02/2017',
                hora: '17:00'
            };
        }

        $scope.closePopover = function() {
            $scope.popover.hide();
        }

        // Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        })

        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        })

        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        })

        $scope.carregarInscrevaSe = function() {
            $location.path('/inscrevaSePage');
        }

        $scope.carregarComprovantes = function() {
            $location.path('/comprovantesPage');
        }

        $scope.carregarEventos = function() {
            $location.path('/eventosPage');
        }

        //JSON Eventos
        $scope.evento = {
            nome: "SEIFPI 2017",
            img: "http://tda.intelligenceeventos.com.br/imagens/banner_eventos/588a4232191ec.png",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            data_inicio: "25/12/2017",
            data_fim: "30/12/2017"
        };
        $scope.compartilharEvento = function() {
            console.log("Compartilhar eventos");
        }
    }
]);