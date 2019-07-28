import React from 'react'
import {connect} from "react-redux";
import {addItemToCart} from "../../actions/cartActions";
import {removeItemFromStore} from "../../actions/storeActions";
import SearchableCardDec from "../../components/SearchableCardDec";
import {Button, Card} from "semantic-ui-react";
import {fetchAccessories} from "../../actions/accessoriesActions";

class Accessories extends React.Component{
    state = {isLoading: true};

    componentDidMount(){
        if(this.props.accessories.length === 0){
            this.props.fetchAccessories();
        }
        this.setState({isLoading: false})

    };

    renderExtra(item){
        if(!this.props.isSignedIn) return null;
        return (
            <div>
                {
                    this.props.user.isAdmin &&
                        <Button onClick={() => this.props.removeItemFromStore(item.itemId)} color="red"
                                icon="trash"
                                content='Delete Item' floated="left"/>
                }

                    <Button onClick={() => this.props.addItemToCart(item, 1)} color="green" icon="cart"
                    content='Add Item to Cart' floated="right"/>
                }
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
            itemRender={this.renderItem}
            loadingMessage="Loading Store"
            items={this.props.accessories}
            itemsPerRow={5}
            noItemsMessage="No Accessories Found."
        />
    }
}

const mapStateToProp = (state) =>{
    return { accessories: state.accessories,
            user:state.auth.profileDetails,
            isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProp, {addItemToCart, fetchAccessories, removeItemFromStore})(Accessories)