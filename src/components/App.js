import React from 'react';
import {Container} from "semantic-ui-react";
import Header from "./Header";
import {Switch} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoute from "./PrivateRoute";
import Cart from "../views/Cart/Cart";
import Spinner from "./Spinner";
import Checkout from "../views/Checkout/Checkout";
import Store from "../views/Store/Store";
import Admin from "../views/Admin/Admin";

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
                    <PrivateRoute path='/cart' exact isSignedIn={this.props.isSignedIn} component={Cart}/>
                    <PrivateRoute path='/store' exact isSignedIn={this.props.isSignedIn} component={Store}/>
                    <PrivateRoute path='/cocktails' exact isSignedIn={this.props.isSignedIn} component={Store}/>
                    <PrivateRoute path='/checkout' exact isSignedIn={this.props.isSignedIn} component={Checkout}/>
                    <PrivateRoute path='/admin' exact isSignedIn={this.props.isSignedIn} component={Admin}/>
                </Switch>
            </Container>
        );
    }
}

const mapStateToProp = (state) =>{
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProp)(App)

