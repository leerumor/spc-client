angular.module('starter.controllers', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngResource', 'ui.router'])

.constant('baseUrl','https://spc-server-leerumor-1.c9users.io/')

.factory('plats',['$http','auth', 'baseUrl', 
    function($http, auth, baseUrl)
    {
        var platFactory=
        {
            plats:[]

        };
        //retrieve plats
        platFactory.getAll = function() {
            return $http.get(baseUrl + "plats").success(function(data){
                angular.copy(data, platFactory.plats);
            });
        };

        //get plat by id
        platFactory.get = function(id) {
            return $http.get(baseUrl + "plats/" + id).then(function(res){
                return res.data;
            });
        };

        return platFactory;

    }])

.factory('auth', ['$http', '$window','baseUrl',  
    function($http, $window, baseUrl){
        var auth = {};

        auth.saveToken = function (token){
            $window.localStorage['spc-token'] = token;
        };

        auth.getToken = function (){
            return $window.localStorage['spc-token'];
        }

        auth.isLoggedIn = function(){
            var token = auth.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.currentUser = function(){
            if(auth.isLoggedIn()){
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
        };

        auth.isAdmin = function(){
            /*
             if(auth.isLoggedIn()){
             var token = auth.getToken();
             var payload = JSON.parse($window.atob(token.split('.')[1]));

             return payload.admin;
             }*/
            return auth.currentUser()=="admin";
        };

        auth.sregister = function(user){
            return $http.post(baseUrl + "register", user).success(function(data){
                auth.saveToken(data.token);
            });
        };

        auth.slogIn = function(user){
            return $http.post(baseUrl + "login", user).success(function(data){
                auth.saveToken(data.token);
            });
        };

        auth.logOut = function(){
            $window.localStorage.removeItem('spc-token');
        };

        return auth;
    }])

.factory('precmd',['$http','auth','baseUrl',
    function($http, auth, baseUrl)
    {
        var precmdFactory=
        {
            precmd:[],
            reservations:[]

        };
         //retrieve precmds according to user
        precmdFactory.getMy = function() {
            var username = auth.currentUser();
            return $http.get(baseUrl +'precmds/'+ username).success(function(data){
                angular.copy(data, precmdFactory.reservations);
            });
        };

        //create new precmd
        precmdFactory.create = function(precmd) {
            return $http.post(baseUrl + "precmds", precmd,{headers: {
                Authorization: 'Bearer '+auth.getToken()}
            }).success(function(data){
                precmdFactory.precmd.nCommande = data.nCommande;
            });
        };

        return precmdFactory;

    }])

//login, register
.controller('AuthCtrl', ['$ionicModal', '$http','$scope', '$state','auth',
    function($ionicModal, $http, $scope, $state, auth ){

        $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/inscription.html', {
        scope: $scope
        }).then(function(modal) {
          $scope.modalreg = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
          $scope.modal.hide();
        };
        $scope.closeRegister = function() {
          $scope.modalreg.hide();
        };

        $scope.register = function() {
          $scope.modalreg.show();
        };
        $scope.login = function() {
          $scope.modal.show();
        };


        $scope.user = {};

        $scope.sregister = function(){
            auth.sregister($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('app.accueil');
                $scope.closeRegister();
            });
        };

        $scope.slogIn = function(){
            auth.slogIn($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('app.accueil');
                $scope.closeLogin();
            });
        };
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
  
    }])

//accueil
.controller ('MainCtrl',['$scope','plats','auth',
    function($scope,plats,auth)
    {
        
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.plats=plats.plats;
    }])

//reservation
.controller ('ReservationCtrl',['$scope','precmd','auth',
    function($scope,precmd,auth)
    {
        $scope.reservations=precmd.reservations;
    }])

//page d'un plat
.controller('PlatCtrl',['$scope','plats','plat','auth',
    function($scope,plats,plat,auth)
    {
        $scope.plat=plat;
        
    }])



.controller('PrecmdCtrl1', function($scope, $stateParams,$location, precmd, auth) {
  $scope.precmd=precmd.precmd;
  $scope.precmd.resto = "Sully";
  $scope.isLoggedIn = auth.isLoggedIn;
  //$scope.precmd.date = "Aujourd'hui";
  $scope.plagehoraire = [
    {id:1,label:'11:30 - 11:40'},
    {id:2,label:'11:40 - 11:50'},
    {id:3,label:'11:50 - 12:00'},
    {id:4,label:'12:00 - 12:10'},
    {id:5,label:'12:10 - 12:20'},
    {id:6,label:'12:20 - 12:30'},
    {id:7,label:'12:30 - 12:40'},
    {id:8,label:'12:40 - 12:50'},
    {id:9,label:'12:50 - 13:00'},
    {id:10,label:'13:00 - 13:10'}
  ];
  var today = new Date();
  $scope.date = function() {
    var dd = today.getDate();
    if($scope.precmd.jour == "Demain")
      {dd++;}
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    }
    $scope.hour = today.getHours()*100+today.getMinutes();
    $scope.precmd.date = dd+'/'+mm+'/'+yyyy;
    //console.log($scope.horaire);
  }
  $scope.horaire = function() {
    if($scope.precmd.date){
      var mm = today.getMonth()+1;
      var dd = today.getDay()+1;
      var hh = $scope.precmd.horaire.label;
      //console.log($scope.precmd.horaire);
      var msg="";
      if(mm<9 && mm>4) msg="Le RU n'ouvre que la partie droite dans le jour de votre choix";
      else if(hh=="11:30 - 11:40" || hh=="11:40 - 11:50" || hh=="11:50 - 12:00" || hh=="12:50 - 13:00" || hh=="13:00 - 13:10") msg="Moins de 10 minutes";
      else if(hh=="12:00 - 12:10"){
        if(dd>3 && mm==4) msg="Moins de 10 minutes";
        else msg="10 minutes";
      }
      else if(dd<4) {
        switch (hh)
          {
          case "12:10 - 12:20": 
            if(mm<10 && mm>0) msg="15 minutes"; 
            else if(mm==10) msg="10 minutes";
            else msg="20 minutes"; break;
          case "12:20 - 12:30": 
            if(mm==1 || mm==9 || mm==10) msg="30 minutes"; 
            else if(mm==11 || mm==12) msg="35 minutes"; 
            else msg="25 minutes"; break;
          case "12:30 - 12:40": 
            if(mm==2 || mm==3 || mm==9) msg="30 minutes"; 
            else if(mm==4) msg="25 minutes"; 
            else msg="35 minutes"; break;
          case "12:40 - 12:50":
            if(mm==11 || mm==12) msg="25 minutes"; 
            else if(mm==4) msg="15 minutes"; 
            else msg="20 minutes"; break;
          default: msg="On ne peut pas estimer à cause d'une erreur";
          }
      } else {
        switch (hh)
          {
          case "12:10 - 12:20": 
            if(mm==11 || mm==12) msg="15 minutes"; 
            else msg="10 minutes"; break;
          case "12:20 - 12:30": 
            if(mm==2 || mm==3) msg="25 minutes"; 
            else if(mm==4) msg="20 minutes"; 
            else msg="30 minutes"; break;
          case "12:30 - 12:40": 
            if(mm==2 || mm==9) msg="30 minutes"; 
            else if(mm==3) msg="25 minutes";
            else if(mm==4) msg="20 minutes"; 
            else msg="35 minutes"; break;
          case "12:40 - 12:50":
            if(mm==11 || mm==12) msg="25 minutes"; 
            else if(mm==4) msg="15 minutes"; 
            else msg="20 minutes"; break;
          default: msg="On ne peut pas estimer à cause d'une erreur";
          }
      }

      $scope.precmd.estimation = msg;
    }
  }

  $scope.confirmationP = function() {
    //if($scope.precmd.jour == "Aujourd'hui"&& $scope.hour >1130)
      //{$scope.errorMsg=true;}
    //else{
      $location.path('/app/precommande3');
    //}
   };
})

.controller('PrecmdCtrl3', function($scope, $ionicActionSheet, $timeout,$location, plats, precmd,localStorageService) {
  $scope.precmd=precmd.precmd;
  plats.getAll();
  $scope.listplats=plats.plats;
  $scope.typePlat = [
    {id:1,label:'Plat traditionnel'},
    {id:2,label:'Plat végétarien'},
    {id:3,label:'Pâte'},
    {id:4,label:'Pizza'}
  ];
  $scope.precmd.typePlat = $scope.typePlat[0];
  $scope.precmd.peri1="";
  $scope.precmd.peri2="";
  $scope.precmd.peri3="";
  $scope.precmd.peri4="";
  $scope.precmd.boisson="Non";

 $scope.confirmationP = function() {
  $location.path('/app/precommande4');
 };

})

.controller('PrecmdCtrl4', ['$scope','$location','auth','precmd', 
  function($scope,$location,auth,precmd,$stateParams)
    {
        $scope.precmd=precmd.precmd;
        $scope.currentUser=auth.currentUser();
        $scope.precmd.prix = 3.25 ;
       
        $scope.createPrecmd = function(){
           
            precmd.create({
                username:$scope.currentUser,
                date: $scope.precmd.date,
                restaurant:$scope.precmd.restaurant,
                horaire: $scope.precmd.horaire.id,
                typePlat: $scope.precmd.typePlat.label,
                peri1: $scope.precmd.peri1.title,
                peri2: $scope.precmd.peri2.title,
                peri3: $scope.precmd.peri3.title,
                peri4: $scope.precmd.peri4.title,
                boisson: $scope.precmd.boisson.title
            });
        
        $location.path('/app/precommande5');        
        }; 
 }])


.controller('PrecmdCtrl5',['$scope', '$stateParams','$location','precmd', 
  function($scope, $stateParams,$location,precmd) {
    $scope.precmd=precmd.precmd;

    $scope.finir = function(){
      $location.path('/app/accueil');
    };
}])

;


