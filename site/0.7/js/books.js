var app = angular.module('BookInfo', ["firebase", "ngTable"]);
app
app.factory('$firebaseArr', ['$firebase', '$filter', function($firebase, $filter) {
    return function(ref) {
        var dataObj = $firebase(ref);
        var dataArr = angular.extend([], dataObj);

        dataObj.$on('change', function() {
            dataArr.length = 0;
            angular.extend(dataArr, $filter('orderByPriority')(dataObj));
        });
        return dataArr;
    }
}])
.controller('MyController', ['$firebase', '$firebaseArr', 'ngTableParams', function($firebase, $firebaseArr, ngTableParams) {
    var self = this;
    var refBook = new Firebase("https://booksinfo.firebaseio.com/BooksBrief");
    var query = refBook.limit(100);
    self.books = $firebase(query);
    self.books_array = $firebaseArr(query);
    /*
    self.books_array.loaded().then(function(){
      console.log('num books = ' + self.books.length);
    });
    */
    
    self.tableParams = new ngTableParams({
      page: 1,
      count: 10
    },{
      total: self.books_array.length,
      getData: function($defer, params) {
        $defer.resolve(self.books_array.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });    
}]);