myApp.controller('DetailsController', ['$scope','$location','MoviesService', function ($scope,$location, MoviesService) {

    $scope.movies = MoviesService.getMovies();
    console.log('estoy en details controller')

    $scope.setRoute=function () {
        $location.path(`/`);
    };

}]);
