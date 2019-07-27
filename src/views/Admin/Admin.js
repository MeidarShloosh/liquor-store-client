import React from 'react'
import history from '../../history'
import {connect} from "react-redux";
import {Icon, List, Header, Button} from "semantic-ui-react";
import liquorStoreApi from "../../apis/liquorStoreApi";

class Admin extends React.Component{
    state = {logs:[], currentBatch:0, searchText:""};
    componentDidMount() {
        if(!this.props.user.isAdmin){
            history.push('/')
        }

        this.fetchNextLogsBatch();
    }

    fetchNextLogsBatch = async () => {
        const {currentBatch} = this.state;
        const response = await liquorStoreApi.get(`/logs/${this.state.currentBatch + 1}`);
        this.setState({logs: response.data, currentBatch:currentBatch + 1})
    };


    renderList() {
        return this.state.logs.map(log => {

            if(!log.username.includes(this.state.searchText)) return null;

            return(
                <List.Item>
                    <List.Icon name="user circle"/>
                    <List.Content>
                        <List.Header>
                            {log.username}
                            <Header.Subheader>{new Date(log.time).toString()}</Header.Subheader>
                        </List.Header>
                        <List.Description>
                            {log.description}
                        </List.Description>
                    </List.Content>
                </List.Item>
            )
        });

    }

    render() {
        if(this.props.state.length == 0){
            return  <Header as='h2'  textAlign='center'>
                        <Header.Content>No Logs Found.</Header.Content>
                    </Header>
        }

        return (
            <div>
            <div className="ui fluid icon input" style={{marginBottom: "30px"}}>
                <input
                    tabIndex="0"
                    autoComplete="off"
                    className="prompt"
                    type="text"
                    onChange={e => this.setState({searchText: e.target.value})}
                    value={this.state.searchText}
                    placeholder="Search by username"
                />
                <i aria-hidden="true" className="search icon"></i>
            </div>
            <List>
                {this.renderList()}
            </List>
            <Button floated='right' onClick={this.fetchNextLogsBatch} color="green" labelPosition='right' icon='right chevron'>Next</Button>
        </div>);
    }
}

const mapStateToProp = (state)=>{
    return {user: state.auth.profileDetails}
};

export default connect(mapStateToProp)(Admin);