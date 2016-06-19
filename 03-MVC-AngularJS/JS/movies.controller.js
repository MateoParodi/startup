myApp.controller('MoviesController', ['$scope', '$location', 'MoviesService', function ($scope,$location, MoviesService){

    $scope.formVisibility=true;
    $scope.formVisibility1=false;
    $scope.newMovie = $scope.editMovie = {
        title : null,
        year : null,
        duration : null,
        description : null
    };


    $scope.movies = MoviesService.getMovies();

    $scope.save=function () {
        $location.path('/');
        MoviesService.saveMovie({title:$scope.newMovie.title, year:$scope.newMovie.year, duration:$scope.newMovie.duration+'min', description:$scope.newMovie.description });
        $scope.movies = MoviesService.getMovies();
        $scope.newMovie = null;
    };

    $scope.remove=function (index) {
        $location.path('/');
        console.log('Movie ', $scope.movies[index].title ,' removed...!!');
        MoviesService.removeMovie(index);
        $scope.movies = MoviesService.getMovies();
        console.log('ALL THE MOVIES:', $scope.movies);
    };

    $scope.edit = function(movie, index) {
        $location.path('/');
        $scope.formVisibility1=true;
        $scope.formVisibility=false;
        $scope.editMovie = movie;
        indexMovie = index;
        console.log('....Editing movie: ',$scope.editMovie);
    };

    $scope.cancelEdit = function() {

        $scope.formVisibility1=false;
        $scope.formVisibility=true;
        $scope.newMovie = null;
        console.log('Edit canceled!!')
    };

    $scope.update=function () {
        MoviesService.updateMovie($scope.editMovie,indexMovie);
        console.log('Movie edited successfully!');
        console.log('ALL THE MOVIES:',$scope.movies);
        $scope.movies = MoviesService.getMovies();
        $scope.formVisibility1=false;
        $scope.formVisibility=true;
        $scope.newMovie = null;
    };

    $scope.setRoute=function (movie) {
        $location.path(`details/${movie.title}`);
    };


}]);
