import React, from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, path, ...rest }) => {


    const render = props => <Component {...props} />;

    return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;