app.directive('mapCanvas', [
  '$http',
  '$ionicPopup',
  function($http, $ionicPopup){

    return {
      restrict: "A",
      scope: {

      },
      templateUrl: "templates/shared/mapCanvas.html",
      controller: function($scope) {

        var msgs = [];
        var pushed = [];

        $scope.tempContainer = {};
        $scope.markers = [];

        // function distanceBetween(slave, master) {
        //   var x = slave[0] - master[0];
        //   var y = slave[1] - master[1];
        //   return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));          
        // }

        function distanceBetween(slave, master) {
            // default miles
            var unit = "M";
            var lat1 = slave[0],
                lon1 = slave[1],
                lat2 = master[0],
                lon2 = master[1];

            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var radlon1 = Math.PI * lon1/180;
            var radlon2 = Math.PI * lon2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }

        // function fakeMessage(msg) {
        //   var coordinates = msg.geo.coordinates;
        //   msg.geo.coordinates = [(coordinates[0] + 1), (coordinates[1] + 1)];
        //   msg.id += 1000000;
        //   return msg;
        // }

  
        function addToMap(device) {
          if ($scope.markers.length == 0){
            device.geo.coordinates.push(device.id)
            $scope.markers.push(device.geo.coordinates);
          } else {
            var slave = device.geo.coordinates;
            var master = $scope.markers[0];
            var distance = distanceBetween(slave, master);
            if (distance < 75) {
              device.geo.coordinates.push(device.id)
              $scope.markers.push(device.geo.coordinates);
            } else {
              // error message too large of distance
               // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                  title: 'Oops! The distance is too large.',
                  subTitle: 'Please use a closer device id.',
                  scope: $scope,
                  buttons: [
                    {text: "OK"}
                  ]
                });
            }
          }
        }

        // setTimeout(function(){
          PUBNUB.init({
            subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
          }).subscribe({
            channel : 'pubnub-twitter',
            message : function(msg){ 
              if (msg.geo && msgs.length == 0) {
                msgs.push(msg);
                PUBNUB.publish({channel: 'closer.pointlook.com', message: msg});
                // var justInCase = fakeMessage(msg);
                // msgs.push(justInCase);
                // PUBNUB.publish({channel: 'closer.pointlook.com', message: justInCase});
              } else if (msgs.length < 3 && msg.geo) {
                if (distanceBetween(msg.geo.coordinates, msgs[0].geo.coordinates) < 75){
                  msgs.push(msg);
                  PUBNUB.publish({channel: 'closer.pointlook.com', message: msg});
                }
              }
            }
          }); 

          PUBNUB.init({
            subscribe_key: 'demo'
          }).subscribe({
            channel : 'closer.pointlook.com',
            message : function(msg){ 
              console.log(msg.id);
              $scope.tempContainer[msg.id] = msg;
              console.log($scope.tempContainer);
            }
          });         
        // }, 3000000);

        $scope.addDevice = function() {
          console.log($scope.tempContainer);
          var device = $scope.tempContainer[this.device];
          if (device && pushed.indexOf(device.id) == -1 && pushed.length == 0) {
            $scope.$root.devices.push(device);
            pushed.push(device.id);
            addToMap(device);
          } else if (device && pushed.indexOf(device.id) == -1){
            device.distance = parseInt(distanceBetween($scope.tempContainer[pushed[0]].geo.coordinates, device.geo.coordinates));
            $scope.$root.devices.push(device);
            pushed.push(device.id);
            addToMap(device);
          }
        };

        $scope.activeMarker = function(id) {
          return $root.active === id;
        }

      }

    }

  }
]);