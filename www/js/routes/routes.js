app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('apresentacao', {
        url: '/apresentacaoPage',
        templateUrl: 'templates/apresentacao.html',
        controller: 'apresentacaoCtrl'
    })

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
        cache: false,
        url: '/menuIntelligence',
        templateUrl: 'templates/intelligence.html',
        controller: 'intelligenceCtrl'
    })

    .state('perfil', {
        url: '/perfilPage',
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
    })

    .state('perfil.intelligence', {
        url: '/menuIntelligence',
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
    })

    .state('edtPerfilInc', {
        url: '/edtPerfilIncPage',
        templateUrl: 'templates/edtPerfilInc.html',
        controller: 'edtPerfilIncCtrl'
    })

    .state('eventos', {
        url: '/eventosPage',
        templateUrl: 'templates/eventos.html',
        controller: 'eventosCtrl'
    })

    .state('inscrevaSe', {
        url: '/inscrevaSePage',
        templateUrl: 'templates/inscrevaSe.html',
        controller: 'inscrevaSeCtrl'
    })

    .state('comprovantes', {
        url: '/comprovantesPage',
        templateUrl: 'templates/comprovantes.html',
        controller: 'comprovantesCtrl'
    })
    $urlRouterProvider.otherwise('/apresentacaoPage');
});