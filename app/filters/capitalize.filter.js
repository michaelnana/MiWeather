app.filter('capitalize', [Capitalize]);

function Capitalize () {
  return function(x) {
        return (!!x) ? x.charAt(0).toUpperCase() + x.substr(1).toLowerCase() : '';
    };
}
