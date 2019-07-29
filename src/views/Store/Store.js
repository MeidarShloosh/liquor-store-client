import React from 'react'
import {connect} from "react-redux";
import {addItemToCart} from "../../actions/cartActions";
import {fetchStore, removeItemFromStore} from "../../actions/storeActions";
import SearchableCardDec from "../../components/SearchableCardDec";
import {Button, Card} from "semantic-ui-react";

class Store extends React.Component{
    state = {isLoading: true}

    componentDidMount(){
        if(this.props.store.length === 0){
            this.props.fetchStore();
        }
        this.setState({isLoading: false})

    };

    renderExtra(item){
        if(!this.props.isSignedIn) return null;
        return (
            <div>
                {
                    this.props.user.isAdmin &&
                        <Button size="tiny" onClick={() => this.props.removeItemFromStore(item.itemId)} color="red"
                                icon="trash"
                                content='Delete Item' floated="left"/>
                }

                    <Button size="tiny" onClick={() => this.props.addItemToCart(item, 1)} color="green" icon="cart"
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
            items={this.props.store}
            itemsPerRow={4}
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

export default connect(mapStateToProp, {addItemToCart, fetchStore, removeItemFromStore})(Store)