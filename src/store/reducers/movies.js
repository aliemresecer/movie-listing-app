
import {
    GET_MOVIES_BEGIN,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_FAILURE,
    GET_MOVIE_GENRES
} from '../actions';

const initialState = {
    movies: [],
    genres: [],
    loading: false,
    error: null
}

export default function moviesReducer(state = initialState, action){
    switch(action.type){
        case GET_MOVIES_BEGIN: {
            return state = {
                ...state,
                loading: true,
                error: null
            }
        }
        case GET_MOVIES_SUCCESS: {
            return state = {
                ...state,
                loading: false,
                error: null,
                movies: action.payload
            }
        }
        case GET_MOVIES_FAILURE: {
            return state = {
                ...state,
                loading: false,
                error: action.payload,
                movies: []
            }
        }
        case GET_MOVIE_GENRES: {
            return state = {
                ...state,
                genres: action.payload
            }
        }
        default:
            return state
    }
}

