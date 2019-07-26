import React from 'react';
import {Container} from "semantic-ui-react";
import Header from "./Header";
import { Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoute from "./PrivateRoute";
import Cart from "../views/Cart/Cart";
import Spinner from "./Spinner";
import Checkout from "../views/Checkout/Checkout";
import Store from "../views/Store/Store";

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
                    <Route path='/store' exact isSignedIn={this.props.isSignedIn} component={Store}/>
                    <Route path='/checkout' exact isSignedIn={this.props.isSignedIn} component={Checkout}/>
                </Switch>
            </Container>
        );
    }
}

const mapStateToProp = (state) =>{
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProp)(App)

