angular.module('app.routes', [])
.config(function ($stateProvider, $urlRouterProvider) { 
 
 $stateProvider
 
      .state('login', {
        url: '/loginPage',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('cadastro', {
        url: '/cadastroPage',
        templateUrl: 'templates/cadastro.html',
        controller: 'cadastroCtrl'
      })

      .state('intelligence', {
        url: '/menuIntelligence',
        templateUrl: 'templates/intelligence.html',
        controller: 'intelligenceCtrl'
      })

      .state('perfil', {
        url: '/perfilPage',
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      })

      .state('edtPerfilInc', {
        url: '/edtPerfilIncPage',
        templateUrl: 'templates/edtPerfilInc.html',
        controller: 'edtPerfilIncCtrl'
      })

      .state('intelligence.inscrevaSe', {
        url: '/inscrevasePage',
        views: {
          'menuView': {
            templateUrl: 'templates/inscrevaSe.html',
            controller: 'inscrevaSeCtrl'
          }
        }
      })

      .state('intelligence.comprovantes', {
        url: '/comprovantesPage',
        views: {
          'menuView': {
            templateUrl: 'templates/comprovantes.html',
            controller: 'comprovantesCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('/loginPage')
})
