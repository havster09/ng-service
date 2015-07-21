"use strict";

(function(){
    angular.module('app')
        .factory('dataService',dataService);

    function dataService(logger) {
        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };

        function getAllBooks() {
            logger.output('getting all books');
            return [{
                book_id: 1,
                title: "maah nigga",
                author: "lorenzo",
                year_published: 2001
            }];
        }

        function getAllReaders() {
            logger.output('getting all books');
            return [{
                reader_id: 1,
                name: "Ellen",
                weeklyReadingGoal: 315,
                totalMinutesRead: 2001
            }];
        }
    }

    dataService.$inject = ['logger'];

}());

