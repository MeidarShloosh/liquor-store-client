import React from 'react';
import {Container} from "semantic-ui-react";
import Header from "./Header";
import {withCookies} from "react-cookie";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions/authActions";

class App extends React.Component{

    render(){
        return (
            <Container>
                <Header/>
                <Switch>

                </Switch>
            </Container>
        );
    }
}

const mapStateToProp = (state) =>{
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProp)(App)

