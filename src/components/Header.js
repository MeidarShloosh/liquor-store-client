import React from 'react'
import {Image, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import GoogleAuth from './GoogleAuth'
import logo from '../assets/images/logo.jpg'
const Header = ()=>{
    return(
        <Menu pointing secondary>
            <Link to='/' className="item">
                <Image src={logo}/>
            </Link>
            <Menu.Menu position='right'>
                <Link to="/" className="item">Streamer</Link>
                <GoogleAuth/>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;