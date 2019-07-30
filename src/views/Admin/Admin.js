import React from 'react'
import history from '../../history'
import {connect} from "react-redux";
import {List, Header, Button, Grid} from "semantic-ui-react";
import liquorStoreApi from "../../apis/liquorStoreApi";
import Spinner from "../../components/Spinner";
import _ from 'lodash'

class Admin extends React.Component{
    state = {logs:{}, currentBatch:0, searchText:""};
    componentDidMount() {
        if(!this.props.user.isAdmin){
            history.push('/')
        }

        this.fetchNextLogsBatch(0);
        this.fetchNextLogsBatch(1);
    }

    fetchNextLogsBatch = async (batchNum) => {
        const response = await liquorStoreApi.get(`/logs/${batchNum}`);

        this.setState(
            {
                    logs: {...this.state.logs,[batchNum]:response.data}
            })
    };

    nextLogBatch = ()=>{
        const {logs, currentBatch} = this.state;

        if(logs[currentBatch + 1].length > 0)
        {
            this.fetchNextLogsBatch(currentBatch + 2);
            this.setState({currentBatch: currentBatch +1})
        }
    };

    previousLogBatch = ()=>{
        const {currentBatch} = this.state;
        if(currentBatch > 0){
            this.setState({currentBatch:currentBatch - 1});
        }
    };


    renderItem(log){
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
    }

    renderList() {
        const {searchText, logs, currentBatch} = this.state;
        let logsToShow = [];
        if(searchText === "")
            return logs[currentBatch].map(log => this.renderItem(log));
        else{
            for(const [key, value] of Object.entries(logs)){
                logsToShow = logsToShow.concat(_.filter(value, log => log.username.includes(searchText)))
            }
            logsToShow = logsToShow.slice(currentBatch*20, (currentBatch + 1) * 20);

            return logsToShow.map(log => this.renderItem(log));
        }
    }

    render() {
        const {logs, currentBatch} = this.state;
        let showNextButton = false, showPreviousButton = false;

        if(!logs[0] || !logs[1])
            return <Spinner/>

        if(!logs[0] || logs[0].length === 0){
            return(
                <div style={{marginTop: "30vh"}}>
                    <Header as='h2'  textAlign='center'>
                        <Header.Content>No logs Found.</Header.Content>
                    </Header>
                </div>
            )
        }

        if(logs[currentBatch].length > 0 && logs[currentBatch + 1] && logs[currentBatch + 1].length > 0 && !this.state.showNextButton){
            showNextButton = true;
        }
        if(currentBatch > 0)
            showPreviousButton = true;

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
                {showPreviousButton && <Button floated='left' onClick={this.previousLogBatch} color="blue" labelPosition='left' icon='left chevron'>Previous</Button>}

                {showNextButton && <Button floated='right' onClick={this.nextLogBatch} color="blue" labelPosition='right' icon='right chevron'>Next</Button>}
        </div>
        );
    }
}

const mapStateToProp = (state)=>{
    return {user: state.auth.profileDetails}
};

export default connect(mapStateToProp)(Admin);