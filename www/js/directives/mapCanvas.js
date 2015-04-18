app.directive('mapCanvas', function(){

  return {
    restrict: "A",
    scope: {

    },
    templateUrl: "templates/shared/mapCanvas.html",
    controller: function($scope) {

      function initialize() {
        var mapOptions = {
          center: { lat: -34.397, lng: 150.644},
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize); 

    }

  }

});