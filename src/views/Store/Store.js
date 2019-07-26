import React from 'react'
import {connect} from "react-redux";
import {addItemToCart} from "../../actions/cartActions";
import {fetchStore} from "../../actions/storeActions";
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
            image={item.image}
            header={item.name}
            meta={item.category}
            description={item.description}
            extra={<Button onClick={()=>this.props.addItemToCart(item, 1)} icon="cart" content='Add Item to Cart' floated="right" />}
            />
    };

    render() {
        <SearchableCardDec
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
    return { store: state.store}
};

export default connect(mapStateToProp, {addItemToCart, fetchStore})(Store)