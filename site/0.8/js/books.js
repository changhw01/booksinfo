var app = angular.module('BookInfo', ["firebase", "ngTable"]).
controller('MyController', ['$filter', '$firebase', 'ngTableParams',
function($filter, $firebase, ngTableParams) {
    var self = this;
    var refBook = new Firebase("https://booksinfo.firebaseio.com/BooksBrief");
    self.books = $firebase(refBook).asArray();
    self.books.loaded().then(function(){
      self.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        sorting: {
          name: 'asc' // initial sorting
        }
      }, {
        total: self.books.length,
        getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                                $filter('orderBy')(self.books, params.orderBy()) :
                                self.books;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    });
}]);
