import React from 'react';
import {Container} from "semantic-ui-react";
import Header from "./Header";
import { Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoute from "./PrivateRoute";
import Cart from "../views/Cart/Cart";
import Spinner from "./Spinner";

class App extends React.Component{

    renderSpinner(){
        if(this.props.isSignedIn === null){
            return <Spinner/>
        }
        else
            return null;
    }
    render(){

        return (
            <Container>
                <Header/>
                {this.renderSpinner()}
                <Switch>
                    <Route path='/cart' exact isSignedIn={this.props.isSignedIn} component={Cart}/>
                    <Route path='/cart' exact isSignedIn={this.props.isSignedIn} component={Cart}/>
                </Switch>
            </Container>
        );
    }
}

const mapStateToProp = (state) =>{
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProp)(App)

