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
                {props.user.username &&  `Hello, ${props.user.username}` }
            </Menu.Item>
            <Menu.Menu position='right'>
                {props.user.isAdmin &&
                    <Menu.Item>
                        <Link to="/admin" style={{color: "black"}}>
                            Admin Panel
                        </Link>
                    </Menu.Item>
                }
                <Menu.Item >
                    <Link to="/store" style={{color:"black"}}>
                        <Icon name="shopping basket"/>
                        Store
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/cocktails" style={{color:"black"}}>
                        <Icon name="cocktail"/>
                        Cocktails
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/cart" style={{color:"black"}}>
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
        return {user: auth.profileDetails};
    else
        return {user:{}};
};
export default connect(mapStateToProps)(Header);