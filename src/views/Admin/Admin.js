import React from 'react'
import history from '../../history'
import {connect} from "react-redux";

class Admin extends React.Component{

    render() {
        <div>admin page</div>
    }
}

const mapStateToProp = (state)=>{
    return {user: state.auth.profileDetails}
};

export default connect(mapStateToProp)(Admin);