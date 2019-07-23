import React from 'react'
import {connect} from "react-redux";
import {signIn, signOut} from '../actions/authActions'
import {withCookies} from "react-cookie";
import history from'../history'
import Button from "semantic-ui-react/dist/commonjs/elements/Button";


class Auth extends React.Component{
    componentDidMount() {
        const {cookies} = this.props;
        const session = cookies.get('session');

        if(session !== undefined){
            this.props.signIn();
        }else{
            this.props.signOut();
        }
    }

    renderAuthButton(){
        if(this.props.isSignedIn)
            return (
                <Button color="red" onClick={this.props.signOut}>
                    Sign Out
                </Button>
            );
        else
            return (
                <Button color="blue" onClick={()=>history.push('/login')} >
                    Sign In
                </Button>
            );
    }

    render(){
        return this.renderAuthButton();
    }


}

const mapStateToProp = (state) =>{
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProp, {signIn, signOut})(withCookies(Auth))

