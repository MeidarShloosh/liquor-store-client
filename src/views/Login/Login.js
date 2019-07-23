import React from 'react';
import {signIn} from '../../actions/authActions'
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {NavLink} from "react-router-dom";
import {Button, Form, Grid, Header, Image, Message, Segment, Container, Checkbox} from 'semantic-ui-react'
import liquorStoreApi from "../../apis/liquorStoreApi";
import './login.css'

class Login extends React.Component{
    state={username: "", password: "", rememberMe: true, errMessage: ""};

    toggle = () => this.setState(prevState => ({ rememberMe: !prevState.rememberMe }));

    componentDidMount() {
        document.getElementsByTagName('body')[0].classList.add('login-wrapper')
    }
    componentWillUnmount() {
        document.getElementsByTagName('body')[0].classList.remove('login-wrapper')

    }

    login = async ()=>{
        const {username, password, rememberMe} = this.state;
        liquorStoreApi.defaults.withCredentials = true;
        if(!username || !password){
            this.setState({errMessage: "Please Fill Up All Of The Fields."});
            return;
        }
        try{
            const response = await liquorStoreApi.post('/login',
                {username, password, rememberMe,withCredentials: true, headers: { crossDomain: true}});

            this.props.signIn();
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
                               Log-in to your account
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

                           <div style={{textAlign: "left", marginBottom:"15px"}}>
                               <Checkbox  label='Remember Me' onChange={this.toggle} checked={this.state.rememberMe}  />
                           </div>

                           {this.state.errMessage &&
                               <Message
                                   error
                                   content={this.state.errMessage}
                               />
                           }

                           <Button onClick={this.login} color='orange' fluid size='large'>
                               Login
                           </Button>
                       </Segment>
                   </Form>

                   <Message>
                       New to us? <NavLink to="/registration">Sign Up</NavLink>
                   </Message>
                    </Grid.Column>
                </Grid>
            </Container>
       )
    }

}

export default connect(null, {signIn})(withCookies(Login))
