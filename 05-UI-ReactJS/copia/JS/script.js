var moviesObject = [
    {id: 1, title: "Titanic", year: 1997, duration: 142, description: 'A gigant boat that sinks in the ocean'},
    {id: 2, title: "Toy Story", year: 1995, duration: 154, description: 'Some toys playing around'},
    {id: 3, title: "Inglourious Basterds", year: 2009, duration: 139, description: 'A group of americans killing nazis'},
    {id: 4, title: "Fight Club", year: 1999, duration: 81, description: 'Some freak guy messing around'}
];

/**
 *
 * MoviesBox Component
 *
 */
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
    handleMovieUpdate: function (movie) {
        console.log(movie);
    },

    render: function () {
        return (
            <div className="moviesBox">
                <MoviesList onMovieUpdate={this.handleMovieUpdate} del={this.deleteMovie} movies={this.props.movies}/>
                <MoviesForm onMovieSubmit={this.handleMovieSubmit}/>
            </div>
        );
    }
});
/**
 *
 * MoviesList Component
 *
 */
var MoviesList = React.createClass({
    handleDelete: function (movieTile) {
        return this.props.del(movieTile);
    },

    handleUpdate: function (movie) {
        this.props.onMovieUpdate(movie)

    },

    render: function () {
        var moviesNodes = this.props.movies.map(function (movie) {
            var handle_update = this.handleUpdate.bind(this, movie);
            return (
                <Movie onDelete={this.handleDelete} onMovieUpdate={handle_update} title={movie.title} key={movie.id}
                       year={movie.year}
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
/**
 *
 * Movie Component
 *
 */
var Movie = React.createClass({
    getInitialState: function () {
        return {isEditing: false};
    },


    handleClick: function (e) {
        e.preventDefault();
        var movieTitle = this.props.title;
        return this.props.onDelete(movieTitle);
    },

    handleUpdate: function (e) {
        e.preventDefault();
        var movie = this.props;
        this.props.onMovieUpdate(movie);
        this.setState({isEditing: !this.state.isEditing});
    },

    toggleEditing: function (e) {
        e.preventDefault();
        this.setState({isEditing: !this.state.isEditing});
    },
    renderEditSection(){
        if (this.state.isEditing) {
            return (
                <div className={ this.state.isEditing ?  '' : 'hidden'}>
                    <form className="commentForm" onSubmit={this.handleUpdate}>
                        <input type="text" defaultValue={ this.props.title }/>
                        <input type="text" defaultValue={ this.props.year }/>
                        <input type="text" defaultValue={ this.props.children }/>
                        <input type="text" defaultValue={ this.props.duration }/>
                        <input  className="buttonAdd" type="submit" value="Save"/>
                    </form>
                </div>
            )
        }
    },

    render: function () {
        return (
            <div className="moviesList">
                <ul>
                    <li className="item">
                        <b>{this.props.title}</b> - {this.props.year} - {this.props.children} - <i>{this.props.duration}min</i>
                        <div id="buttons" className={ this.state.isEditing ?  'hidden':'' }>
                            <button className="removeButton" onClick={this.handleClick}>X</button>
                            <button className="editButton" onClick={this.toggleEditing}>Edit</button>
                            {this.renderEditSection()}
                        </div>
                    </li>
                </ul>

            </div>


        );
    }
});
/**
 *
 * MoviesForm Component
 *
 */
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
                <input className="buttonAdd" type="submit" value="Add!"/>
            </form>

        );
    }
});


ReactDOM.render(<MoviesBox movies={moviesObject}/>, document.getElementById('content'));
