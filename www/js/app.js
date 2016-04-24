// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngRoute','ngResource', 'ngMaterial','ui.router', 'ngMessages', 'starter.controllers','LocalStorageModule'])
.constant('baseUrl','https://spc-server-leerumor-1.c9users.io/')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('starter');
  localStorageServiceProvider.setStorageType('localStorage')
  localStorageServiceProvider.setNotify(false, false);
  // localStorageServiceProvider.setStorageCookieDomain('example.com');
  // localStorageServiceProvider.setStorageType('sessionStorage');
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,  $urlRouterProvider){



  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AuthCtrl'
  })
  .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact.html'
        }
      }
    })
  .state('app.accueil', {
    url: '/accueil',
    resolve: {
        platPromise: ['plats', function(plats){
            return plats.getAll();
        }]
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/accueil.html',
        controller: 'MainCtrl'      
      }
    }
  })
  .state('app.reservation', {
    url: '/reservation',
    resolve: {
        precmdPromise: ['precmd', function(precmd){
            return precmd.getMy();
        }]
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/reservation.html',
        controller: 'ReservationCtrl'      
      }
    }
  })
  .state('app.new', {
    url: '/plats/{id}',
    resolve: {
        plat: ['$stateParams', 'plats', function($stateParams, plats) {
            return plats.get($stateParams.id);
        }]
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/new.html',
        controller: 'PlatCtrl'
      }
    }
  })
   .state('app.precommande1', {
    url: '/precommande1',
    views: {
      'menuContent': {
        templateUrl: 'templates/precommande1.html',
        controller: 'PrecmdCtrl1'
      }
    }
  })

  .state('app.precommande3', {
    url: '/precommande3',
    views: {
      'menuContent': {
        templateUrl: 'templates/precommande3.html',
        controller: 'PrecmdCtrl3'
      }
    }
  })

    .state('app.precommande4', {
    url: '/precommande4',
    views: {
      'menuContent': {
        templateUrl: 'templates/precommande4.html',
        controller: 'PrecmdCtrl4'
      }
    }
  })

      .state('app.precommande5', {
    url: '/precommande5',
    views: {
      'menuContent': {
        templateUrl: 'templates/precommande5.html',
        controller: 'PrecmdCtrl5'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/accueil');
}]);
