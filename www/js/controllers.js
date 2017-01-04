angular.module('app.controllers', [])

  .controller('loginCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q',

    function ($scope, $stateParams, $http, $cordovaToast,
      $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q) {
      function loadingShow () {
        $ionicLoading.show({
          template: 'Aguarde...',
          noBackdrop: false
        })
      }
      function loadingHide () {
        $ionicLoading.hide()
      }
      var tentativasLogin = 0
      // função clique do button 
      $scope.fazerLogin = function (inscrito) {
        // verificando conexão com internet
        tentativasLogin++
        var type = $cordovaNetwork.getNetwork()
        var isOnline = $cordovaNetwork.isOnline()
        var isOffline = $cordovaNetwork.isOffline()
        // se está conectado -  Verifique o tipo de conexão
        if (isOnline) {
          if (type == 'wifi') {
            loadingShow()
            var configRequestHttp = {
              method: 'POST',
              // url: 'http://localhost/intelligenceApp/api/apiLogin.php',
              url: 'http://intelligenceeventos.com.br/plataforma/seifpi/app_participante/apiLogin.php',
              timeout: 30000,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              data: {inscrito}
            }
            // post
            $http(configRequestHttp).then(function successCallback (data) {
              console.log('Requisição deu certo')
              // msg de Sucesso
              var retorno = data.data
              console.log('Retorno Serv = ' + retorno);
              if (retorno.login == true) {
                console.log('Login: ' + retorno.login);
                $cordovaToast.show('Login com sucesso!', 'short', 'center')
                loadingHide()
                $location.path('/side-menu');              
              }else {
                loadingHide()
                $cordovaToast.show('Login inválido!', 'short', 'center')
                console.log('Login: ' + retorno.login);
                if (tentativasLogin == 5) {
                  loadingHide()
                  $cordovaToast.show('Tente um novo cadastro!', 'long', 'center')
                }
              }
            }, function errorCallback (data) {
              console.log('Retorno Serv = ' + retorno);
              loadingHide()
              // msg de erro
              $cordovaToast.show('Serviço indisponível no momento. Tente mais tarde!', 'long', 'center')
              console.log('Requisição Falhou')
            })
          }

          // verificando se o tipo de conexão é 
          if (type == 'CELL_3G' || type == 'CELL_4G') {
            // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'Alerta de Uso de Dados',
              template: 'Deseja continuar com o uso de Dados Móveis?'
            })
            confirmPopup.then(function (res) {
              if (res) {
                // post sem rede wi-fi
                // definindo Parameters de requisição http
                $ionicLoading.show({
                  template: 'Aguarde...',
                  duration: 30000
                }).then(function () {
                  var req = {
                    method: 'POST',
                    // url: 'http://localhost/intelligenceApp/api/apiLogin.php',
                    url: 'http://intelligenceeventos.com.br/plataforma/seifpi/app_participante/apiLogin.php',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    data: {inscrito}
                  }
                  // post
                  $http(req).then(function successCallback (data) {
                    // msg de Sucesso
                    var retorno = data.data
                    if (retorno.login == true) {
                      $cordovaToast.show('Login com sucesso!', 'short', 'center')
                    }
                  }, function errorCallback (data) {
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
    }])

  .controller('cadastroCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
      // informar o db qual o tipo de cadastro
      var tipoCadastro = 'ap'
      $scope.cadastrarUsuario = function (inscrito) {
        console.log(inscrito, tipoCadastro)
      }
    }])

  .controller('intelligenceCtrl', ['$scope', '$stateParams',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {}])

  .controller('inicioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {}])

  .controller('perfilCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {}])

  .controller('inscrevaSeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {}])

  .controller('comprovantesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {}])
