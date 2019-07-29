import React from 'react'
import history from '../../history'
import {connect} from "react-redux";
import {List, Header, Button, Grid} from "semantic-ui-react";
import liquorStoreApi from "../../apis/liquorStoreApi";

class Admin extends React.Component{
    state = {logs:[], currentBatch:-1, searchText:""};
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
                    <List.Icon size='large' verticalAlign='middle' name="user circle"/>
                    <List.Content>
                        <List.Header>
                            {log.username}
                        </List.Header>
                        <List.Description>
                            <Grid divided='vertically'>
                                <Grid.Row>
                                    <Grid.Column width={12}>
                                        {log.description}
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        {log.time}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </List.Description>
                    </List.Content>
                </List.Item>
            )
        });

    }

    render() {
        if(this.state.logs.length === 0){
            return(
                <div style={{marginTop: "30vh"}}>
                    <Header as='h2'  textAlign='center'>
                        <Header.Content>No logs Found.</Header.Content>
                    </Header>
                </div>
            )
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
            <List divided>
                {this.renderList()}
            </List>
            <Button floated='right' onClick={this.fetchNextLogsBatch} color="green" labelPosition='right' icon='right chevron'>Next</Button>
        </div>
        );
    }
}

const mapStateToProp = (state)=>{
    return {user: state.auth.profileDetails}
};

export default connect(mapStateToProp)(Admin);