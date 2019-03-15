import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Map as map} from 'immutable'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './_reducers/index'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function logger_({getState, dispatch}) {
    return (next) => {
        return (action) => {
            console.log('this action will be dispathed', action)
            const value = next(action)
            console.log('this is my new state', getState().toJS())
            return value
        }
    }
}

const store = createStore(
    reducer,
    map(),
    composeWithDevTools(
        applyMiddleware(
            logger,
            thunk
        )
    )
)

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));    

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
