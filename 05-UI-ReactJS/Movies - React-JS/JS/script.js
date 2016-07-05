var moviesObject = [
    {title: "Titanic", year: 1997, duration: 142, description: 'A gigant boat that sinks in the ocean', image:'http://images.allposters.com/images/59/003_titanicrip.jpg'},
    {title: "Toy Story", year: 1995, duration: 154, description: 'Some toys playing around', image:'http://vignette4.wikia.nocookie.net/pixar/images/c/ca/Toy_story_ver1_xlg.jpg/revision/latest?cb=20110515142143'},
    {title: "Inglourious Basterds", year: 2009, duration: 139, description: 'A group of americans killing nazis', image:'http://vignette4.wikia.nocookie.net/inglouriousbasterds/images/c/c3/Inglourious_Basterds_poster.jpg/revision/latest?cb=20131226131149'},
    {title: "Fight Club", year: 1999, duration: 81, description: 'Some freak guy messing around', image:'https://resizing.flixster.com/B1JE8gOaEMBpDRJznHrlr8LiDQk=/799x1066/v1.bTsxMTM3MjQ0ODtqOzE3MDU0OzIwNDg7MTE5MTsxNTg4'}
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
    handleMovieUpdate: function (movieToUpdate, movieOld) {
        for (var i = 0; i < moviesObject.length; i++) {
            if (moviesObject[i].title === movieOld.title) {
                var movieSelected = moviesObject[i];
            }
        }

        var index = moviesObject.indexOf(movieSelected);
        moviesObject.splice(index, 1, movieToUpdate);
        this.setState({movies: moviesObject});
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

    handleUpdate: function (movieUp, movieOld) {
        this.props.onMovieUpdate(movieUp, movieOld)

    },

    render: function () {
        var moviesNodes = this.props.movies.map(function (movie, i) {
            return (
                <Movie onDelete={this.handleDelete} onMovieUpdate={this.handleUpdate} title={movie.title} key={i}
                       year={movie.year} duration={movie.duration} image={movie.image}>
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
        return {
            title: this.props.title,
            description: this.props.children,
            year: this.props.year,
            duration: this.props.duration,
            image: this.props.image
        };
    },

    handleDelete: function (e) {
        e.preventDefault();
        var movieTitle = this.props.title;
        return this.props.onDelete(movieTitle);
    },

    handleUpdate: function (e) {
        e.preventDefault();
        var movieOld = {
            title: this.props.title,
            description: this.props.children,
            year: this.props.year,
            duration: this.props.duration,
            image: this.props.image
        };
        var movieUp = {
            title: this.state.title,
            description: this.state.description,
            year: this.state.year,
            duration: this.state.duration,
            image: this.state.image
        };
        this.props.onMovieUpdate(movieUp, movieOld);
        this.setState({isEditing: !this.state.isEditing});
    },

    toggleEditing: function (e) {
        e.preventDefault();
        this.setState({isEditing: !this.state.isEditing});
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
    handleImageChange: function (e) {
        this.setState({image: e.target.value});
    },
    renderEditSection(){
        if (this.state.isEditing) {
            return (
                <div className={ this.state.isEditing ?  '' : 'hidden'}>
                    <form className="commentForm" onSubmit={this.handleUpdate}>
                        <input type="text" defaultValue={ this.props.title } onChange={this.handleTitleChange}/>
                        <input className="inputNumber" type="number" defaultValue={ this.props.year }
                               onChange={this.handleYearChange}/>
                        <input type="text" defaultValue={ this.props.children }
                               onChange={this.handleDescriptionChange}/>
                        <input className="inputNumber" type="number" defaultValue={ this.props.duration }
                               onChange={this.handleDurationChange}/>
                        <input className="inputNumber" type="text" defaultValue={ this.props.image }
                               onChange={this.handleImageChange}/>
                        <input className="buttonAdd" type="submit" value="Save"/>
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
                        <b>{this.props.title}</b> - {this.props.year} - {this.props.children} -
                        <i>{this.props.duration}min</i>
                        <button className="removeButton" onClick={this.handleDelete}>X</button>
                        <button className="editButton" onClick={this.toggleEditing}>Edit</button>
                        {this.renderEditSection()}
                        <img className="movieImage" src={this.props.image}/>
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
        return {title: '', description: '', year: '', duration: '', image: ''};
    },
    handleTitleChange: function (e) {
        this.setState({title: e.target.value.substr(0, 30)});
    },
    handleDescriptionChange: function (e) {
        this.setState({description: e.target.value.substr(0, 45)});
    },
    handleYearChange: function (e) {
        this.setState({year: e.target.value.substr(0, 4)});
    },
    handleDurationChange: function (e) {
        this.setState({duration: e.target.value.substr(0, 3)});
    },
    handleImageChange: function (e) {
        this.setState({image: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var description = this.state.description.trim();
        var year = this.state.year.trim();
        var duration = this.state.duration.trim();
        var image = this.state.image.trim();
        if (!description || !title || !year || !duration) {
            alert('Please complete all the fields!')
            return;
        }

        this.props.onMovieSubmit({
            title: title,
            description: description,
            year: year,
            duration: duration,
            image: image
        });
        this.setState({title: '', description: '', year: '', duration: '', image: ''});
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
                    className="inputNumber"
                    type="number"
                    placeholder="Release year..."
                    value={this.state.year}
                    onChange={this.handleYearChange}
                />
                <input
                    className="inputNumber"
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

                <input
                    type="text"
                    placeholder="Image url..."
                    value={this.state.image}
                    onChange={this.handleImageChange}
                />
                <input className="buttonAdd" type="submit" value="Add!"/>
            </form>

        );
    }
});


ReactDOM.render(<MoviesBox movies={moviesObject}/>, document.getElementById('content'));
