import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from './reducers/movies';

const store = createStore(
    moviesReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

export default store;