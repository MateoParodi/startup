var movies = [
    {id: 1, title: "Titanic", year: 1997, duration: 142, description: 'A gigant boat that sinks in the ocean'},
    {id: 2, title: "Toy Story", year: 1995, duration: 154, description: 'Some toys playing around'},
    {id: 3, title: "Inglourious Basterds", year: 2009, duration: 139, description: 'A group of americans killing nazis'},
    {id: 4, title: "Fight Club", year: 1999, duration: 81, description: 'Some freak guy messing around'}
];


var MoviesBox = React.createClass({
    render: function () {
        return(
            <div className="moviesBox">
                <MoviesList movies={this.props.movies}/>
                <MoviesForm />
            </div>
        );
    }
});

var MoviesList = React.createClass({
    render: function () {
        var moviesNodes = this.props.movies.map(function(movie) {
            return (
                <Movie title={movie.title} key={movie.id}>
                    {movie.description}
                </Movie>
            );
        });

        return(
            <div className="moviesList">
                {moviesNodes}
            </div>
        );
    }
});

var MoviesForm = React.createClass({
    render: function () {
        return(
            <form className="moviesForm">
                <input type="text" placeholder="Movie title..." />
                <input type="text" placeholder="Release year..." />
                <input type="text" placeholder="Duration..." />
                <input type="text" placeholder="Description..." />
                <input type="submit" value="Add!" />
            </form>

        );
    }
});

var Movie = React.createClass({
    render: function () {
        return(
            <div className="movies">
                <h2 className="moviesTitle">
                    {this.props.title}
                </h2>
                {this.props.children}
            </div>
        );
    }
});

ReactDOM.render(<MoviesBox movies={movies}/>, document.getElementById('content'));