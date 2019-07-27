import  React,{Component} from 'react'

import {Card, Grid, Header} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Spinner from "./Spinner";

class SearchableCardDec extends Component{
    state = { searchText: ""};

    searchFilter(item){
        const {searchText} = this.state;

        if(!searchText) return true;

        for (const [key, value] of Object.entries(item)) {
            if(value.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
                return true;
        }
        return false;
    }

    renderList(){
        return this.props.items.map( item =>{
            if(!this.searchFilter(item))
                return null;
            return this.props.renderItem(item)
        });
    }

    render(){
        if(this.props.isLoading){
            return <Spinner text={this.props.loadingMessage} style={{height: "100vh"}}/>
        }

        if(this.props.items.length === 0){
            return (
                <div style={{marginTop: "30vh"}}>
                    <Header as='h2'  textAlign='center'>
                        <Header.Content>{this.props.noItemsMessage}</Header.Content>
                    </Header>
                </div>
            );
        }
        return (
            <>
                <div className="ui fluid icon input" style={{marginBottom: "30px"}}>
                    <input
                        tabIndex="0"
                        autoComplete="off"
                        className="prompt"
                        type="text"
                        onChange={e => this.setState({searchText: e.target.value})}
                        value={this.state.searchText}
                    />
                    <i aria-hidden="true" className="search icon"></i>
                </div>

                <Card.Group itemsPerRow={this.props.itemsPerRow}>
                    {this.renderList()}
                </Card.Group>
            </>
        );
    }
}



export default SearchableCardDec