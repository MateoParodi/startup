var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/details/:name',{
            templateUrl: 'Views/details.html',
            controller: 'DetailsController'
        })
        .otherwise({
            redirectTo: '/'
        })
});

