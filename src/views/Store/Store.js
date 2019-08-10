import React from 'react'
import {connect} from "react-redux";
import {addItemToCart} from "../../actions/cartActions";
import {fetchStore} from "../../actions/storeActions";
import SearchableCardDec from "../../components/SearchableCardDec";
import {Button, Card} from "semantic-ui-react";
import history from '../../history'
import './Store.css'
import _ from 'lodash'

class Store extends React.Component{
    state = {isLoading: true}

    componentDidMount(){
        if(this.props.store.length === 0){
            this.props.fetchStore();
        }
        this.setState({isLoading: false})

    };

    onAddItemToCart(item){
        this.props.addItemToCart(item, 1)
        history.push('/cart')
    };
    renderExtra(item){
        if(!this.props.isSignedIn) return null;
        return (
            <div>

                    <Button size="tiny" onClick={() => this.onAddItemToCart(item)} color="green" icon="cart"
                    content='Add to Cart' floated="right"/>

            </div>
        );
    };

    renderItem = (item)=>{
        return  <Card
            key={item.itemId}
            image={item.image}
            header={item.name}
            meta={item.category}
            description={`Price: ${item.price} NIS`}
            extra={this.renderExtra(item)}
            />
    };

    render() {
        return <SearchableCardDec
            isLoading={this.state.isLoading}
            renderItem={this.renderItem}
            loadingMessage="Loading Store"
            items={_.sortBy(this.props.store, ["category"])}
            itemsPerRow={5}
            noItemsMessage="No Items Found."
        />
    }
}

const mapStateToProp = (state) =>{
    return { store: state.store,
            user:state.auth.profileDetails,
            isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProp, {addItemToCart, fetchStore})(Store)