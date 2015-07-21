(function () {

    angular.module('app')
        .controller('EditBookController', ['$routeParams','dataService',EditBookController]);

    function EditBookController($routeParams,dataService) {
        console.log($routeParams.smshit, $routeParams.smshitty);

        var vm = this;

        dataService.getAllBooks()
            .then(function(books) {
                vm.currentBook = books.filter(function(item) {
                    return item.book_id == $routeParams.bookID;
                })[0];
            });





    }

}());