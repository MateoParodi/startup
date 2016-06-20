angular.module("myApp").factory("MoviesService", ["$window" , function($window) {

    var exports = {};

    exports.getMovies = function() {
        return JSON.parse($window.localStorage.getItem("movies"));
    };
    
    exports.getMovie = function(name) {
        let movies = this.getMovies();

        for (var i = 0, len = movies.length; i < len; i++){
            if (name === movies[i].title){
                var movie = movies[i];
            }
        }
        
        return movie;
    };

    exports.saveMovie = function(movie) {
        let movies = this.getMovies();
        if(movies == null) {
            movies = [];
        }

        movies.push(movie);
        let moviesJson = JSON.stringify(movies);
        $window.localStorage.setItem("movies", moviesJson);
    };
    
    exports.removeMovie = function (index) {
        let movies = this.getMovies();
        movies.splice(index, 1);
        let moviesJson = JSON.stringify(movies);
        $window.localStorage.setItem("movies", moviesJson);
        
    };

    exports.updateMovie = function (movie,index) {
        let movies = this.getMovies();
        movies[index] = movie;
        let moviesJson = JSON.stringify(movies);
        $window.localStorage.setItem("movies", moviesJson);
    };
    
    
    return exports;

}]);