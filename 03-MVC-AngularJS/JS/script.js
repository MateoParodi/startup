var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/details',{
            templateUrl: 'Views/details.html'
        })
        .otherwise({
            redirectTo: '/'
        })
});

myApp.controller('MoviesController', ['$scope', '$location', function ($scope,$location){

    $scope.formVisibility=true;
    $scope.formVisibility1=false;

        $scope.movies= [
            {title:"Titanic", year:"1956", duration:"90min"},
            {title:"Terminator", year:"1999", duration:"120min"},
            {title:"Inseption", year:"2014", duration:"132min"},
            {title:"Toy Story", year:"2000", duration:"110min"}
        ];
    console.log('ALL THE MOVIES:', $scope.movies);


    $scope.save=function () {
        $location.path('/'); 
        $scope.movies.push({title:$scope.newMovie.title, year:$scope.newMovie.year, duration:$scope.newMovie.duration+'min' });
        $scope.newMovie = null;
    };

    $scope.remove=function (index) {
        $location.path('/');
        console.log('Movie ', $scope.movies[index].title ,' removed...!!')
        $scope.movies.splice(index, 1);
        console.log('ALL THE MOVIES:', $scope.movies);
    };

    $scope.edit = function(movie, index) {
        $location.path('/');
        $scope.formVisibility1=true;
        $scope.formVisibility=false;
        selectedMovie = movie;
        indexMovie = index;
        console.log('....Editing movie: ',selectedMovie);
    };

    $scope.cancelEdit = function() {

        $scope.formVisibility1=false;
        $scope.formVisibility=true;
        $scope.newMovie = null;
        console.log('Edit canceled!!')
    };

    $scope.update=function () {
        selectedMovie = {title:$scope.newMovie.title, year:$scope.newMovie.year, duration:$scope.newMovie.duration+'min' };
        $scope.movies[indexMovie]=selectedMovie;
        console.log('Movie edited successfully!')
        console.log('ALL THE MOVIES:',$scope.movies);
        $scope.formVisibility1=false;
        $scope.formVisibility=true;
        $scope.newMovie = null;
    };
    
    $scope.setRoute=function () {
        $location.path('details');
    }

}]);