angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

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
    url: '/side-menu',
    templateUrl: 'templates/intelligence.html',
    controller: 'intelligenceCtrl'
  })

  .state('intelligence.inCio', {
    url: '/inicioPage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/inCio.html',
        controller: 'inCioCtrl'
      }
    }
  })

  .state('intelligence.perfil', {
    url: '/perfilPage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('intelligence.inscrevaSe', {
    url: '/inscrevasePage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/inscrevaSe.html',
        controller: 'inscrevaSeCtrl'
      }
    }
  })

  .state('intelligence.comprovantes', {
    url: '/comprovantesPage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/comprovantes.html',
        controller: 'comprovantesCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/loginPage')

});