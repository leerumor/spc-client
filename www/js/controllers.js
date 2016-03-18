angular.module('starter.controllers', ['ngRoute', 'ngMaterial', 'ngMessages'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    //$timeout(function() {
     // $scope.closeLogin();
    //}, 1000);

    if($scope.loginData.username){
       console.log('End', $scope.loginData)
       $scope.loginData.isLogged=true;
       $scope.closeLogin();
    }
   
  };
  $scope.logout = function() {
    $scope.loginData = {};

  };
})

.controller('HomeCtrl', function($scope, $http) {

$scope.getItems = function(){
    
    var promise = $http.get("http://popovskiy.com/phone/testSPCapp/testSPCapp/www/serveur/tableplat.php");
    promise.then(fullfilled, rejected)
}
function fullfilled(response) {
    console.log("Status: " + response.status);
    console.log("Type: " + response.headers("content-type"));
    console.log("Length: " + response.headers("content-length"));
    data = response.data.records;
            $scope.plats = data;
}
                 
function rejected(error) {
    console.error(error.status);
    console.error(error.statusText);
}

$scope.getItems();
})

.directive('appInfo', function() { 
  return { 
    templateUrl: 'js/directives/appInfo.html' 
  }; 
})
.directive('buttonApp', function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/directives/buttonApp.html',
    
    link: function(scope, element, attrs) {
      scope.buttonText = "Ajouter",
      scope.installed = false,

      scope.download = function() {
        element.toggleClass('button-positive')
        if(scope.installed) {
          scope.buttonText = "Ajouter";
          scope.installed = false;
        } else {
          scope.buttonText = "Rétirer";
          scope.installed = true;
        }
      }
    }
  };
})

//service
.factory('precmd', [function(){
  var o = {
    precmd: []
  };
  return o;
}])

.controller('PrecmdCtrl1', function($scope, $stateParams,$location,precmd) {
  $scope.precmd=precmd.precmd;
  $scope.date = [
    {id:1,label:"Aujourd'hui"},
    {id:2,label:'Demain'}
  ];
  $scope.precmd.date = $scope.date[0];
  $scope.horaire = [
    {id:1,label:'11:30 - 11:40'},
    {id:2,label:'11:40 - 11:50'},
    {id:3,label:'11:50 - 12:00'},
    {id:4,label:'12:00 - 12:10'},
    {id:5,label:'12:10 - 12:20'},
    {id:6,label:'12:20 - 12:30'},
    {id:7,label:'12:30 - 12:40'},
    {id:8,label:'12:40 - 12:50'},
    {id:9,label:'12:50 - 13:00'},
    {id:10,label:'13:00 - 13:10'},
    {id:11,label:'13:10 - 13:20'},
    {id:12,label:'13:20 - 13:30'}
  ];
  $scope.precmd.horaire =$scope.horaire[0];

  $scope.confirmationP = function() {
    console.log($scope.precmd.date, $scope.precmd.horaire);
    $location.path('/app/precommande2');
    
   };

})

.controller('PrecmdCtrl2', function($scope, $stateParams,$location,precmd) {
$scope.confirmationP = function() {
  $location.path('/app/precommande3');
 };
$scope.precmd=precmd.precmd;
})

.controller('PrecmdCtrl3', function($scope, $ionicActionSheet, $timeout,$location,precmd) {
  $scope.precmd=precmd.precmd;
  $scope.precmd.reservations = [
      { id:1, typePlat:'',peri1:'', peri2:'', peri3:'', peri4:'', boisson:''}
  ];
  $scope.typePlat = [
    {id:1,label:'Plat traditionnel'},
    {id:2,label:'Plat végétarien'},
    {id:3,label:'Pâte'},
    {id:4,label:'Pizza'}
  ];
  $scope.precmd.reservations[0].typePlat = $scope.typePlat[0];
  $scope.peripheriques = [
    {id:1,label:"Salade",type:"Entrée"},
    {id:2,label:"Saumon",type:"Entrée"},
    {id:3,label:"Jambon",type:"Entrée"},
    {id:4,label:"Pomme",type:"Fruit"},
    {id:5,label:"Soupe de carottes",type:"Soupe"},
    {id:6,label:"Eclair",type:"Dessert"},
  ];
  $scope.boissons = [
    {id:1,label:'Non'},
    {id:2,label:'Coca'},
    {id:3,label:'Cristal'}
  ];
  $scope.precmd.reservations[0].boisson = $scope.boissons[0];
  $scope.show = function(reservation) {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     destructiveText: 'Delete',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     destructiveButtonClicked: function(index) {
       var i = $scope.precmd.reservations.indexOf(reservation);
          $scope.precmd.reservations.splice(i, 1);
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

 };

 $scope.addP = function() {
  var i = $scope.precmd.reservations.length+1;
  if(i<5){
    $scope.precmd.reservations.push(
      { id: i , typePlat:$scope.typePlat[0],peri1:'', peri2:'', peri3:'', peri4:'', boisson:$scope.boissons[0]}
    );
  }
 };
 $scope.confirmationP = function() {
  $location.path('/app/precommande4');
 };

})

.controller('PrecmdCtrl4', function($scope, $stateParams,$location,precmd) {
  $scope.precmd=precmd.precmd;
  var boissons = 0;
  for ( var i = 0; i < $scope.precmd.reservations.length; i++){
    if ($scope.precmd.reservations[i].boisson.id != 1)
      boissons ++ ;
  }
  $scope.precmd.prix = $scope.precmd.reservations.length * 3.25 + boissons * 0.8;
  $scope.confirmationP = function() {
    $location.path('/app/precommande5');
   };
  
})

.controller('PrecmdCtrl5', function($scope, $stateParams,$location,precmd) {
$scope.precmd=precmd.precmd;
});
