(function () {

    angular.module('app')
        .controller('EditBookController', ['$routeParams','$cookies','$cookieStore','dataService','$log','$location','BooksResource','currentUser',EditBookController]);

    function EditBookController($routeParams,$cookies,$cookieStore,dataService,$log,$location,BooksResource,currentUser) {

        var vm = this;

        dataService.getBookByID($routeParams.bookID)
            .then(getBookSuccess)
            .catch(getBookError);

        /*vm.currentBook = BooksResource.get({
            book_id:$routeParams.bookID
        });*/


        $log.log(vm.currentBook);

        function getBookSuccess(book){
            vm.currentBook = book;
            currentUser.lastBookEdited = vm.currentBook;
        }

        function getBookError(reason){
            $log.error(reason);
        }

        vm.saveBook = function(){
            dataService.updateBook(vm.currentBook)
                .then(updateBookSuccess)
                .catch(updateBookError)
        }

        function updateBookSuccess(message){
            $log.info(message);
            $location.path("/");
        }

        function updateBookError(errorMessage){
            $log.error(errorMessage);
        }

        vm.setAsFavourite = function(){
            $cookies.favouriteBook = vm.currentBook.title;
        };






    }

}());