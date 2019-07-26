import React from 'react'
import {Icon, Image, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Auth from './Auth'
import logo from '../assets/images/logo.jpg'
import {connect} from "react-redux";

const Header = (props)=>{
    //console.log(props);
    return(
        <Menu pointing secondary>
            <Menu.Item style={{padding:0}}>
                <Image size="tiny" src={logo}/>
            </Menu.Item>
            <Menu.Item>
                {props.username &&  `Hello, ${props.username}` }
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item >
                    <Link to="/store">
                        <Icon name="shopping basket"/>
                        Store
                    </Link>
                    <Link to="/cocktails">
                        <Icon name="cocktail"/>
                        Cocktails
                    </Link>
                    <Link to="/cart">
                        <Icon name="shopping cart"/>
                        Cart
                    </Link>

                </Menu.Item>
                <Menu.Item>
                    <Auth/>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

const mapStateToProps = ({auth})=>{

    if(auth.isSignedIn)
        return {username: auth.profileDetails.username};
    else
        return {};
};
export default connect(mapStateToProps)(Header);