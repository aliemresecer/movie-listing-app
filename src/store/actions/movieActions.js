import { 
    fetchMoviesBegin, 
    fetchMoviesSuccess, 
    fetchMoviesFailure, 
    fetchMovieGenres 
} from '../actions';
import { config } from '../../config';


export function fetchMovies() {
    return dispatch => {
        dispatch(fetchMoviesBegin())
        return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=' + config.key)
        .then(handleErrors)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch(fetchMoviesSuccess(data.results))
        }).catch(error => dispatch(fetchMoviesFailure(error)))
    }
}

export function fetchGenres() {
    return dispatch => {
        return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + config.key)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch(fetchMovieGenres(data.genres))
        })
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}