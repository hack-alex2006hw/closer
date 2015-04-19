angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {
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
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

// sms.pointlook.com

  function checkProximity() {
    var master = $scope.$root.devices[0];
    for(var i = 0; i < $scope.$root.devices.length; i++){
      console.log(i);
      if (i != 0) {
        var slave = $scope.$root.devices[i];
        console.log(slave);
        console.log($scope.$root.number);
        if (slave.distance < parseInt($scope.$root.proximityAlert) && $scope.$root.number) {
          console.log('text logic passed');
          $http.post("http://closer.pointlook.com/sms", {
            phone: $scope.$root.number,
            message: slave.id + " is within " + slave.distance + " from you :)"
          }).success(function(){
            console.log('message sent');
          });
        }
      }  
    }
  }

  $scope.$root.devices = [];
  $scope.$root.$watch('proximityAlert', function(){
    var master = $scope.$root.devices[0];
    for(var i = 0; i < $scope.$root.devices.length; i++){
      console.log(i);
      if (i != 0) {
        var slave = $scope.$root.devices[i];
        console.log(slave);
        if (slave.distance < parseInt($scope.$root.proximityAlert)) {
          console.log('text logic passed');
          $http.post("http://closer.pointlook.com/sms", {
            phone: $scope.$root.number,
            message: slave.id + " is within " + slave.distance + " from you :)"
          }).success(function(){
            console.log('message sent');
          });
        }
      }  
    }    
  });
  $scope.$root.$watch('devices', function(){
    var master = $scope.$root.devices[0];
    for(var i = 0; i < $scope.$root.devices.length; i++){
      console.log(i);
      if (i !== 0) {
        var slave = $scope.$root.devices[i];
        console.log(slave);
        if (slave.distance < parseInt($scope.$root.proximityAlert)) {
          console.log('text logic passed');
          $http.post("http://closer.pointlook.com/sms", {
            phone: $scope.$root.number,
            message: slave.id + " is within " + slave.distance + " from you :)"
          }).success(function(){
            console.log('message sent');
          });
        }
      }  
    }    
  });

  $scope.$root.$watch('number', function(){
    var master = $scope.$root.devices[0];
    for(var i = 0; i < $scope.$root.devices.length; i++){
      console.log(i);
      if (i !== 0) {
        var slave = $scope.$root.devices[i];
        console.log(slave);
        if (slave.distance < parseInt($scope.$root.proximityAlert)) {
          console.log('text logic passed');
          $http.post("http://closer.pointlook.com/sms", {
            phone: $scope.$root.number,
            message: slave.id + " is within " + slave.distance + " from you :)"
          }).success(function(){
            console.log('message sent');
          });
        }
      }  
    }    
  });  

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
