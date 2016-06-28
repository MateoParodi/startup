myApp.controller('MoviesController', ['$scope', '$location', 'MoviesService', function ($scope,$location, MoviesService){

    $scope.formVisibility=true;
    $scope.formVisibility1=false;
    $scope.newMovie = $scope.editMovie = {
        title : null,
        year : null,
        duration : null,
        description : null,
        image: null
    };


    $scope.movies = MoviesService.getMovies();

    if ($scope.movies === null){
        MoviesService.saveMovie({title:'The Shawshank Redemption', year:1994, duration:142, description:'The Shawshank Redemption (Cadena perpetua en España, Sueños de libertad o Escape a la libertad en Argentina; y Sueño de fuga en Venezuela, Colombia, Chile, México y Perú) es una película estadounidense del año 1994, escrita y dirigida por Frank Darabont y protagonizada por Tim Robbins y Morgan Freeman. Basada en la novela corta de Stephen King, Rita Hayworth y la redención de Shawshank, el film abarca una mirada optimista de la vida, contando la historia de dos amigos, Robbins y Freeman, en una prisión. Se enfatiza en el no perder las esperanzas, incluso en las más inhóspitas situaciones. Fue nominada a múltiples premios, incluyendo siete premios Oscar, con el de mejor película, sin embargo, no obtuvo ningún premio, en parte por competir con otros dos colosos del año: Forrest Gump y Pulp Fiction. Sin embargo, el tiempo le dio una favorable crítica, logrando prestigio y reconocimiento mundial tras sus ediciones en VHS, DVD y Blu-ray. Asimismo, varios críticos, hoy en día, la consideran como una de las mejores obras cinematográficas de los 90, como también una de las más grandes filmaciones jamás hechas.', image:'http://www.hollywoodjesus.com/images/games/shawshankred.jpg'});
        MoviesService.saveMovie({title:'Inglourious Basterds', year:2009, duration:154, description:'Inglourious Basterds es una película de 2009 escrita y dirigida por Quentin Tarantino y protagonizada por Brad Pitt, Christoph Waltz y Mélanie Laurent. Titulada Malditos bastardos2 en España y Bastardos sin gloria3 en Hispanoamérica, la película es una ficción ucrónica sobre la Alemania nazi. El estilo recuerda al spaghetti western y al cine bélico italiano de los años sesenta. Christoph Waltz, que interpretó al Standartenführer Hans Landa, recibió el premio al mejor actor en el Festival de Cannes, el premio al Mejor actor de reparto del Sindicato de Actores, el Globo de oro y Oscar en la misma categoría.', image:'http://vignette4.wikia.nocookie.net/inglouriousbasterds/images/c/c3/Inglourious_Basterds_poster.jpg/revision/latest?cb=20131226131149'});
        MoviesService.saveMovie({title:'Fight Club', year:1999, duration:139, description:'Fight Club (conocida como El club de la lucha en España y como El club de la pelea en Hispanoamérica) es una película de 1999 basada en la novela homónima de Chuck Palahniuk. La cinta fue dirigida por David Fincher y protagonizada por Edward Norton, Brad Pitt y Helena Bonham Carter. Norton interpreta al protagonista, un "hombre común", cuyo nombre no se revela, que está aburrido con su profesión liberal en la sociedad estadounidense, por lo que funda un "club de peleas" clandestino con un vendedor de jabones llamado Tyler Durden (interpretado por Brad Pitt), y se ve envuelto en una relación con éste y con Marla Singer, interpretada por Helena Bonham Carter.', image:'https://resizing.flixster.com/B1JE8gOaEMBpDRJznHrlr8LiDQk=/799x1066/v1.bTsxMTM3MjQ0ODtqOzE3MDU0OzIwNDg7MTE5MTsxNTg4'});
        MoviesService.saveMovie({title:'Toy Story', year:1995, duration:81, description:'Toy Story es una película infantil de animación por computadora dirigida por John Lasseter, estrenada en 1995 y producida por Walt Disney Pictures y Pixar. Fue el primer largometraje de Pixar, además de la primera cinta animada completamente con efectos digitales en la historia del cine. Joss Whedon, Andrew Stanton, Joel Cohen y Alec Sokolow redactaron el guion, y Randy Newman compuso la banda sonora. El reparto principal estuvo integrado por Tom Hanks y Tim Allen, quienes prestaron sus voces en inglés a los personajes de Woody y Buzz, respectivamente. Para el proceso de animación, colaboraron un total de 110 empleados de Pixar,4 a diferencia de los 800 que trabajaron en una de las últimas producciones de Disney en aquellos años, El rey león (1994).', image:'http://vignette4.wikia.nocookie.net/pixar/images/c/ca/Toy_story_ver1_xlg.jpg/revision/latest?cb=20110515142143'});
        $scope.movies = MoviesService.getMovies();
    }


    $scope.save=function () {
        $location.path('/');
        MoviesService.saveMovie({title:$scope.newMovie.title, year:$scope.newMovie.year, duration:$scope.newMovie.duration, description:$scope.newMovie.description, image:$scope.newMovie.image });
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
