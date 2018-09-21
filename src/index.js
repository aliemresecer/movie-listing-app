import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Screen from './screen';

export default class EntryPoint extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <Screen />
            </Provider>
        )
    }
}