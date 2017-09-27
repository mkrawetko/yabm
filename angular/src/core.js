'use strict';

var scotchTodo = angular.module('builds', []);

function mainController($scope, $http) {
    $scope.formData = {};


    // when landing on the page, get all builds and show them
    $http.get('/api/builds')
        .success(function(data) {
            $scope.builds = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

}