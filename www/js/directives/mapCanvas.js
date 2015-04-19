app.directive('mapCanvas', [
  '$http',
  function($http){

    return {
      restrict: "A",
      scope: {

      },
      templateUrl: "templates/shared/mapCanvas.html",
      controller: function($scope) {

        var msgs = [];
        $scope.tempContainer = {};
        var pushed = [];

        // setTimeout(function(){
          PUBNUB.init({
            subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
          }).subscribe({
            channel : 'pubnub-twitter',
            message : function(msg){ 
              if (msgs.length < 2 && msg.geo) {
                PUBNUB.publish({channel: 'closer.pointlook.com', message: msg}, function(data){
                  msgs.push(data);
                });
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
          if (device && pushed.indexOf(device.id) == -1) {
            $scope.$root.devices.push(device);
            pushed.push(device.id);
          }
        };

      }

    }

  }
]);