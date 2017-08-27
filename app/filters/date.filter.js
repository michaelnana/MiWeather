app.filter('dateFormat', [DateFormat]);

function DateFormat () {
  return function(x) {
        return moment(x * 1000).format('ddd DD MMM');
    };
}
