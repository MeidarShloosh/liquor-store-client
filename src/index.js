import React from'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware,compose} from "redux";
import reduxThunk from 'redux-thunk'
import App from'./components/App'
import reducers from './reducers'
import {CookiesProvider} from "react-cookie";
import 'semantic-ui-css/semantic.min.css'
import AppRouter from "./components/AppRouter";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);
document.querySelector('#root')
ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </CookiesProvider>,
    document.querySelector('#root')
);

