import React from 'react';
import {Container} from "semantic-ui-react";
import Header from "./Header";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoute from "./PrivateRoute";
import Cart from "../views/Cart/Cart";
import Spinner from "./Spinner";
import Checkout from "../views/Checkout/Checkout";
import Store from "../views/Store/Store";
import Admin from "../views/Admin/Admin";
import Accessories from "../views/Accessories/Accessories";
import Snacks from "../views/Snacks/Snacks";
import Cocktails from "../views/Cocktails/Cocktails";

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
                    <Route path='/store' exact component={Store}/>
                    <Route path='/accessories' exact component={Accessories}/>
                    <Route path='/snacks' exact component={Snacks}/>
                    <Route path='/cocktails' exact component={Cocktails}/>
                    <PrivateRoute path='/checkout' exact isSignedIn={this.props.isSignedIn} component={Checkout}/>
                    <PrivateRoute path='/admin' exact isSignedIn={this.props.isSignedIn} component={Admin}/>
                    <Route path='/' exact  component={Store}/>

                </Switch>
            </Container>
        );
    }
}

const mapStateToProp = (state) =>{
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProp)(App)

