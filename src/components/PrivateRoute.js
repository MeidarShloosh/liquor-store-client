import React from "react";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({ component: Component,isSignedIn, ...rest }) => {
    if(isSignedIn === null)
        return null;
    const render = props =>  isSignedIn ?
        <Component {...props} /> :
        <Redirect to={{pathname:'/login', state:{from:props.location}}}/>;

    return <Route render={render} {...rest} />;
};


export default PrivateRoute