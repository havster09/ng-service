(function() {

    var app = angular.module('app', ['ngRoute']);

    app.provider('books',['constants',function(constants){
        this.$get = function(){
            var appName = constants.APP_TITLE;
            var appDesc = constants.APP_DESCRIPTION;
            var version = constants.APP_VERSION;
            if(includeVersionInTitle){
                appName += ' '+version;
            }

            return{
                appName:appName,
                appDesc:appDesc
            }
        }
        var includeVersionInTitle = false;
        this.setIncldeVersionInTitle = function(value){
            includeVersionInTitle = value;
        }
    }]);

    //Can only inject providers and contant services into config
    app.config(['booksProvider', '$routeProvider',function(booksProvider,$routeProvider, constants){ //booksProvider is built automatically by angular 'books' +'Provider'
        booksProvider.setIncldeVersionInTitle(true);

        $routeProvider
            .when('/',{
                templateUrl:'/app/templates/books.html',
                controller:'BooksController',
                controllerAs:'books'
            })
            .when('/AddBook',{
                templateUrl:'/app/templates/addBook.html',
                controller:'AddBookController',
                controllerAs:'addBooks'
            })
            .when('/EditBook/:bookID/:smshit/:smshitty',{
                templateUrl:'/app/templates/editBook.html',
                controller:'EditBookController',
                controllerAs:'editBooks'
            })
            .otherwise('/');

    }]);

}());