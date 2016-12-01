angular.module('app.controllers', [])

  .controller('loginCtrl', ['$scope', '$stateParams', '$http', '$cordovaToast',  
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http, $cordovaToast, $ionicLoading) {
      $scope.fazerLogin = function (inscrito) {
        // definindo Parameters de requisição http
        var req = {
          method: 'POST',
          url: 'http://localhost/intelligenceApp/api/apiLogin.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: {inscrito}
        };

        console.log("Enviando Inscrito JSON - ", inscrito);
        // post
        $http(req).then(function successCallback (data) {
          // msg de sucesso
          console.log('Post Success', data.data);
          $cordovaToast.show('Sucesso', 'short', 'center');
        }, function errorCallback (data) {
          // msg de erro
          console.log('Post Erro');
        });
        
      };
    }])

  .controller('cadastroCtrl', ['$scope', '$stateParams',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
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

  .controller('inCioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
