app.filter('tempFilter', [TempFilter]);

function TempFilter () {
  return function(x) {
        return Math.floor(x) + "°C";
    };
}
