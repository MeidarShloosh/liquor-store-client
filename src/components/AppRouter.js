import React from 'react'
import {Router, Route, Switch} from "react-router-dom";
import history from '../history'
import App from "./App";
import Login from "../views/Login/Login";
import Registration from "../views/Registration/Registration";

const AppRouter = () =>{
    return (
        <Router history={history}>
            <div >
                <Switch>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/registration' exact component={Registration}/>
                    <Route path='/' render={props => <App {...props} />}/>
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter
