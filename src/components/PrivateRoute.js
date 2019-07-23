import React from "react";
import { Route } from "react-router-dom";
import {connect} from "react-redux";
import Login from "../views/Login/Login";
import history from '../history'

const PrivateRoute = ({ component: Component, path,isSignedIn, ...rest }) => {
    console.log(isSignedIn)
    let render = props => <Component {...props} />;

    if(!isSignedIn)
        render = () => history.push('/login');

    return <Route path={path} render={render} {...rest} />;
};


export default PrivateRoute