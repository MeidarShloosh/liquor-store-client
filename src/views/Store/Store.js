import React from 'react'
import {connect} from "react-redux";
import {addItemToCart} from "../../actions/cartActions";
import {fetchStore, removeItemFromStore} from "../../actions/storeActions";
import SearchableCardDec from "../../components/SearchableCardDec";
import {Button, Card} from "semantic-ui-react";

class Store extends React.Component{
    state = {isLoading: true}

    componentDidMount(){
        if(this.props.store.length == 0){
            this.props.fetchStore();
        }
        this.setState({isLoading: false})

    };

    renderItem = (item)=>{
        return  <Card
            key={item.itemId}
            image={item.image}
            header={item.name}
            meta={item.category}
            description={`Price: ${item.price} NIS`}
            extra={
                <div>
                    {this.props.user.isAdmin &&
                            <Button onClick={()=>this.props.removeItemFromStore(item.itemId)} color="red" icon="trash" content='Delete Item' floated="left" />
                    }

                    <Button onClick={()=>this.props.addItemToCart(item, 1)} color="green" icon="cart" content='Add Item to Cart' floated="right" />
                </div>
            }
            />
    };

    render() {
        return <SearchableCardDec
            isLoading={this.state.isLoading}
            itemRender={this.renderItem}
            loadingMessage="Loading Store"
            items={this.props.store}
            itemsPerRow={5}
            noItemsMessage="No Items Found."
        />
    }
}

const mapStateToProp = (state) =>{
    return { store: state.store,
            user:state.auth.profileDetails
    }
};

export default connect(mapStateToProp, {addItemToCart, fetchStore, removeItemFromStore})(Store)