angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.agregarModulo', {
    url: '/add_module',
    views: {
      'side-menu21': {
        templateUrl: 'templates/agregarModulo.html',
        controller: 'agregarModuloCtrl'
      }
    }
  })

  .state('indoor', {
    url: '/indoor',
    templateUrl: 'templates/indoor.html',
    controller: 'indoorCtrl'
  })

  .state('sensores', {
    url: '/sensors',
    templateUrl: 'templates/sensores.html',
    controller: 'sensoresCtrl'
  })

$urlRouterProvider.otherwise('/indoor')

  

});