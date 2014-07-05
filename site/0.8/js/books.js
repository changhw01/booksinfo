var app = angular.module('BookInfo', ["firebase", "ngTable"]);
app.controller('MyController', ['$firebase', 'ngTableParams', function($firebase, ngTableParams) {
    var self = this;
    var refBook = new Firebase("https://booksinfo.firebaseio.com/BooksBrief");
    self.books = $firebase(refBook).asArray();
    self.books.loaded().then(function(){
      console.log('num books = ' + self.books.length);
      self.tableParams = new ngTableParams({
        page: 1,
        count: 10
      }, {
        total: self.books.length,
        getData: function($defer, params) {
            $defer.resolve(self.books.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    });
}]);
