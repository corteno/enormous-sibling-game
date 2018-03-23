import React from 'react';
import ReactDOM from 'react-dom';
import {isLoggedIn} from './utils/AuthService';

import './index.css';
import Login from './components/login';
import Rooms from './components/rooms';
import Room from './components/room';

import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            {isLoggedIn()
                ?<Switch>
                    <Route path='/:id' component={Room}/>
                    <Route path='/' component={Rooms}/>
                </Switch>

                :<Switch>
                    <Route path='/' component={Login}/>
                </Switch>
            }


        </BrowserRouter>
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
