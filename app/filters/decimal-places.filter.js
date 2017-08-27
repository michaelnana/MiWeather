app.filter("decimalPlaces", [DecimalPlaces]);

function DecimalPlaces () {
  return function(x) {
      if (x != undefined) {
        return x.toFixed(2);
      } else {
        return x;
      }
    };
}
