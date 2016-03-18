// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngRoute', 'ngMaterial', 'ngMessages', 'starter.controllers'])

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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
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
  
  .state('app.precommande2', {
    url: '/precommande2',
    views: {
      'menuContent': {
        templateUrl: 'templates/precommande2.html',
        controller: 'PrecmdCtrl2'
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
    views: {
      'menuContent': {
        templateUrl: 'templates/accueil.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.new', {
    url: '/news/:newId',
    views: {
      'menuContent': {
        templateUrl: 'templates/new.html',
        //controller: 'NewCtrl'
    	  controller: function($scope, $stateParams) 
    	  {
    		  $scope.detail = data[$stateParams.newId - 1]
    	  }
		
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/accueil');
});
