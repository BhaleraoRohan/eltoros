materialAdmin

.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
})


.filter('object2Array', function() {
    return function(input) {
      var out = []; 
      for(i in input){
        out.push(input[i]);
      }
      return out;
    }
  });