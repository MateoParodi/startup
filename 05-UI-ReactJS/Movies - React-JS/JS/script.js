var moviesObject = [
    {id: 1, title: "Titanic", year: 1997, duration: 142, description: 'A gigant boat that sinks in the ocean'},
    {id: 2, title: "Toy Story", year: 1995, duration: 154, description: 'Some toys playing around'},
    {id: 3, title: "Inglourious Basterds", year: 2009, duration: 139, description: 'A group of americans killing nazis'},
    {id: 4, title: "Fight Club", year: 1999, duration: 81, description: 'Some freak guy messing around'}
];


var MoviesBox = React.createClass({
    handleMovieSubmit: function (movie) {
        moviesObject.push(movie);
        this.setState({movies: moviesObject});

    },
    deleteMovie: function (movieTitle) {
        for (var i = 0; i < moviesObject.length; i++) {
            if (moviesObject[i].title === movieTitle) {
                var movieSelected = moviesObject[i];
            }
        }

        var index = moviesObject.indexOf(movieSelected);
        moviesObject.splice(index, 1);
        this.setState({movies: moviesObject});
    },
    render: function () {
        return (
            <div className="moviesBox">
                <MoviesList del={this.deleteMovie} movies={this.props.movies}/>
                <MoviesForm onMovieSubmit={this.handleMovieSubmit}/>
            </div>
        );
    }
});

var MoviesList = React.createClass({
    handleDelete: function (movieTile) {
        return this.props.del(movieTile);
    },
    render: function () {
        var moviesNodes = this.props.movies.map(function (movie) {
            return (
                <Movie onDelete={this.handleDelete} title={movie.title} key={movie.id} year={movie.year}
                       duration={movie.duration}>
                    {movie.description}
                </Movie>
            );
        }, this);

        return (
            <div className="moviesList">
                {moviesNodes}
            </div>
        );
    }
});

var MoviesForm = React.createClass({
    getInitialState: function () {
        return {title: '', description: '', year: '', duration: ''};
    },
    handleTitleChange: function (e) {
        this.setState({title: e.target.value.substr(0, 30)});
    },
    handleDescriptionChange: function (e) {
        this.setState({description: e.target.value.substr(0, 50)});
    },
    handleYearChange: function (e) {
        this.setState({year: e.target.value.substr(0, 4)});
    },
    handleDurationChange: function (e) {
        this.setState({duration: e.target.value.substr(0, 3)});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var description = this.state.description.trim();
        var year = this.state.year.trim();
        var duration = this.state.duration.trim();
        if (!description || !title || !year || !duration) {
            alert('Please complete all the fields!')
            return;
        }

        this.props.onMovieSubmit({title: title, description: description, year: year, duration: duration});
        this.setState({title: '', description: '', year: '', duration: ''});
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
                    type="number"
                    placeholder="Release year..."
                    value={this.state.year}
                    onChange={this.handleYearChange}
                />
                <input
                    type="number"
                    placeholder="Duration in min..."
                    value={this.state.duration}
                    onChange={this.handleDurationChange}
                />
                <input
                    type="text"
                    placeholder="Brief description..."
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                />
                <input type="submit" value="Add!"/>
            </form>

        );
    }
});

var Movie = React.createClass({
    handleClick: function (e) {
        e.preventDefault();
        var movieTitle = this.props.title;
        return this.props.onDelete(movieTitle);
    },

    render: function () {
        return (
            <div className="moviesList">
                <ul>
                    <li>
                        <b>{this.props.title}</b> - {this.props.year} - {this.props.children} - {this.props.duration}min
                        <button className="removeButton" onClick={this.handleClick}>remove</button>
                    </li>
                </ul>
            </div>
        );
    }
});


ReactDOM.render(<MoviesBox movies={moviesObject}/>, document.getElementById('content'));
