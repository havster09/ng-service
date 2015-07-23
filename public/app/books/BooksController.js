(function() {

    angular.module('app')
        .controller('BooksController',['books','dataService','logger','badgeService','$cookies','$cookieStore','$route','$log','BooksResource','currentUser',BooksController]);


    function BooksController(books,dataService,logger,badgeService,$cookies,$cookieStore,$route,$log,BooksResource,currentUser) {

        var vm = this;

        vm.appName = books.appName;

        dataService.getUserSummary()
            .then(getUserSummarySuccess);

        function getUserSummarySuccess(summaryData){
            console.log(summaryData);
            vm.summaryData = summaryData;
        }

        //$q.all() to compile all promise objects | returns a dataArray of is dataArray[0]

        /*dataService.getAllBooks()
            .then(getBooksSuccess,null,getBooksNotification)
            .then(function(data){
                console.log(data);
            })
            .catch(errorCallBack)//named functions
            .finally(getAllBooksComplete);*/

        vm.allBooks = BooksResource.query();

        function getAllBooksComplete(){
            console.log('gets executed regardless');
        }

        function getBooksSuccess(books){
            //throw 'error u fuck';
            vm.allBooks = books;
            return books //return to chain then functions
        }

        function getBooksError(error){
            console.log(error);
        }

        function getBooksNotification(msg){
            console.log(msg);
        }

        function errorCallBack(error){
            console.log(error);
        }

        dataService.getAllReaders()
            .then(getReadersSuccess);

        function getReadersSuccess(data){
            vm.allReaders = data;
            $log.log('all readers retrieved');
        }

        vm.deleteBook = function(bookId){
            dataService.deleteBook(bookId)
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        }

        function deleteBookSuccess(msg){
            $log.info(msg);
            $route.reload();
        }
        function deleteBookError(error){
            $log.error(error);
        }

        vm.getBadge = badgeService.retrieveBadge; //inject only

        vm.favoriteBook = $cookies.favouriteBook;
        vm.currentUser = currentUser;

        logger.output('BookController has been created');
    }


}());