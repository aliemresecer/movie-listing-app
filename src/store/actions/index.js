export const GET_MOVIES_BEGIN = 'GET_MOVIES_BEGIN';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE';
export const GET_MOVIE_GENRES = 'GET_MOVIE_GENRES';

export const fetchMoviesBegin = () => ({
    type: GET_MOVIES_BEGIN
});

export const fetchMoviesSuccess = movies => ({
    type: GET_MOVIES_SUCCESS,
    payload: movies
});

export const fetchMoviesFailure = error => ({
    type: GET_MOVIES_FAILURE,
    payload: error
});

export const fetchMovieGenres = genres => ({
    type: GET_MOVIE_GENRES,
    payload: genres
})
