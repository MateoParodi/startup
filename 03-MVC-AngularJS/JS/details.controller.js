myApp.controller('DetailsController', ['$scope','$location','MoviesService','$routeParams', function ($scope,$location, MoviesService,$routeParams) {

    $scope.movies = MoviesService.getMovies();

    $scope.setRoute=function () {
        $location.path(`/`);
    };

    $scope.showMovie = function (title) {
        var movie = MoviesService.getMovie(title);
        document.getElementById('titleMovie').innerText = movie.title;
        document.getElementById('yearMovie').innerText = movie.year;
        document.getElementById('durationMovie').innerText = movie.duration ;
        document.getElementById('descriptionMovie').innerText = movie.description;

    }


    $scope.showMovie($routeParams.name);

}]);
