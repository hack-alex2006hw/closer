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
        var tempContainer = {};

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
              tempContainer[msg.id] = msg;
            }
          });         
        // }, 3000000);

        $scope.addDevice = function() {
          console.log(tempContainer);
          var device = tempContainer[this.device];
          if (device) {
            $scope.$root.devices.push(device);
          }
        };

      }

    }

  }
]);