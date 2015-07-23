(function() {

    var app = angular.module('app', ['ngRoute','ngCookies','ngResource']);

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
    app.config(['booksProvider', '$routeProvider','$httpProvider','$logProvider','$provide',function(booksProvider,$routeProvider, $httpProvider,$logProvider,$provide){ //booksProvider is built automatically by angular 'books' +'Provider'
        booksProvider.setIncldeVersionInTitle(true);
        $logProvider.debugEnabled(true);
        $httpProvider.interceptors.push('bookLoggerInterceptor')

        $provide.decorator('$log',['$delegate','books',logDecorator]);

        $routeProvider
            .when('/',{
                templateUrl:'/app/templates/books.html',
                controller:'BooksController',
                controllerAs:'books'
            })
            .when('/AddBook',{
                templateUrl:'/app/templates/addBook.html',
                controller:'AddBookController',
                controllerAs:'bookAdder'
            })
            .when('/EditBook/:bookID',{
                templateUrl:'/app/templates/editBook.html',
                controller:'EditBookController',
                controllerAs:'bookEditor'
            })
            .otherwise('/');

    }]);

    function logDecorator($delegate,books){
        function log(message){
            message += ' - ' + new Date() + ' (' + books.appName + ')';
            $delegate.log(message);
        }
        function info(message){
            $delegate.info(message);
        }
        function warn(message){
            $delegate.warn(message);
        }
        function error(message){
            $delegate.error(message);
        }
        function debug(message){
            $delegate.debug(message);
        }

        return{
            log:log,
            info:info,
            warn:warn,
            error:error,
            debug:debug
        }
    }

    app.run(['$rootScope',function($rootScope){
        $rootScope.$on('$routeChangeSuccess',function(event,current,previous){
            console.log('successfully changing routes');
        });
        $rootScope.$on('$routeChangeError',function(event,current,previous){
            console.log('error changing routes');

            console.log(event);
            console.log(current);
            console.log(previous);

        });
    }
    ])

}());