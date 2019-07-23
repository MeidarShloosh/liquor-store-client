import React from 'react';
import {signIn} from '../../actions/authActions'
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {NavLink} from "react-router-dom";
import {Button, Form, Grid, Header, Image, Message, Segment, Container, Checkbox} from 'semantic-ui-react'
import liquorStoreApi from "../../apis/liquorStoreApi";
import './Registration.css'
import history from "../../history";

class Registration extends React.Component{
    state={username: "", password: "", confirmPass: "", errMessage: "", rememberMe: true};
    toggle = () => this.setState(prevState => ({ rememberMe: !prevState.rememberMe }));
    componentDidMount() {
        document.getElementsByTagName('body')[0].classList.add('login-wrapper')
    }
    componentWillUnmount() {
        document.getElementsByTagName('body')[0].classList.remove('login-wrapper')

    }

    confirmPass(){
        return this.state.password !== this.state.confirmPass;
    }
    register = async ()=>{
        const {username, password, confirmPass, rememberMe} = this.state;
        liquorStoreApi.defaults.withCredentials = true;
        if(!username || !password){
            this.setState({errMessage: "Please Fill Up All Of The Fields."});
            return;
        }

        if(confirmPass !== password){
            return;
        }

        try{
            const response = await liquorStoreApi.post('/registration',
                {username, password, rememberMe,withCredentials: true, headers: { crossDomain: true}});

            this.props.signIn();
            history.push('/');
        }
        catch (e) {
            this.setState({errMessage: e.response.data});
        }
    };

    render() {
       return(
           <Container>
               <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
               <Grid.Column style={{ maxWidth: 450 }}>
                   <Form size='large' error>
                       <Segment stacked>
                           <Header as='h2' color='orange' textAlign='center'>
                               Registration
                           </Header>
                           <Form.Input
                               name="username"
                               fluid
                               icon='user'
                               iconPosition='left'
                               placeholder='User name'
                               onChange={e => this.setState({username:e.target.value})}
                               value={this.state.username}
                           />
                           <Form.Input
                               name="password"
                               fluid
                               icon='lock'
                               iconPosition='left'
                               placeholder='Password'
                               type='password'
                               onChange={e => this.setState({password:e.target.value})}
                               value={this.state.password}
                           />
                           <Form.Input
                               name="confirmPassword"
                               fluid
                               icon='lock'
                               iconPosition='left'
                               placeholder='Confirm Password'
                               type='password'
                               error={this.confirmPass() && "Password doesn't match"}
                               onChange={e => this.setState({confirmPass:e.target.value})}
                               value={this.state.confirmPass}
                           />



                           <div style={{textAlign: "left", marginBottom:"15px"}}>
                               <Checkbox label='Remember Me' onChange={this.toggle} checked={this.state.rememberMe}  />
                           </div>

                           {this.state.errMessage &&
                           <Message
                               error
                               content={this.state.errMessage}
                           />
                           }

                           <Button onClick={this.register} color='orange' fluid size='large'>
                               Register
                           </Button>
                       </Segment>

                   </Form>
                    </Grid.Column>
                </Grid>
            </Container>
       )
    }

}

export default connect(null, {signIn})(withCookies(Registration))
