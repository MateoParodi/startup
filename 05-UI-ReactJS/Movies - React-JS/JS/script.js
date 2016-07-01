var moviesObject = [
    {id: 1, title: "Titanic", year: 1997, duration: 142, description: 'A gigant boat that sinks in the ocean'},
    {id: 2, title: "Toy Story", year: 1995, duration: 154, description: 'Some toys playing around'},
    {id: 3, title: "Inglourious Basterds", year: 2009, duration: 139, description: 'A group of americans killing nazis'},
    {id: 4, title: "Fight Club", year: 1999, duration: 81, description: 'Some freak guy messing around'}
];


var MoviesBox = React.createClass({
    handleMovieSubmit: function (movie) {
        // console.log(movie);
        moviesObject.push(movie);
        this.setState({movies: moviesObject});
        // console.log(moviesObject);
    },
    render: function () {
        return (
            <div className="moviesBox">
                <MoviesList movies={this.props.movies}/>
                <MoviesForm onMovieSubmit={this.handleMovieSubmit}/>
            </div>
        );
    }
});

var MoviesList = React.createClass({
    render: function () {
        var moviesNodes = this.props.movies.map(function (movie) {
            return (
                <Movie title={movie.title} key={movie.id}>
                    {movie.description}
                </Movie>
            );
        });

        return (
            <div className="moviesList">
                {moviesNodes}
            </div>
        );
    }
});

var MoviesForm = React.createClass({
    getInitialState: function () {
        return {title: '', description: ''};
    },
    handleTitleChange: function (e) {
        this.setState({title: e.target.value});
    },
    handleDescriptionChange: function (e) {
        this.setState({description: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var description = this.state.description.trim();
        if (!description || !title) {
            return;
        }

        this.props.onMovieSubmit({title: title, description: description});
        this.setState({author: '', text: ''});
    },
    render: function () {
        return (
            <form className="moviesForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Movie title..."
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                />
                <input
                    type="text"
                    placeholder="Movie description..."
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                />
                <input type="submit" value="Post"/>
            </form>

        );
    }
});

var Movie = React.createClass({
    render: function () {
        return (
            <div className="moviesList">
                <ul>
                    <li>
                        <b>{this.props.title}</b> - {this.props.children}
                    </li>
                </ul>
            </div>
        );
    }
});


ReactDOM.render(<MoviesBox movies={moviesObject}/>, document.getElementById('content'));
