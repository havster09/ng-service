(function() {

    var app = angular.module('app', []);

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
    app.config(function(booksProvider,constants){ //booksProvider is built automatically by angular 'books' +'Provider'
        booksProvider.setIncldeVersionInTitle(true);
        console.log('title: '+ constants.APP_TITLE);
    })

}());