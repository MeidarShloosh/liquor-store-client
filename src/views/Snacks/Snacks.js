import React from 'react'
import {connect} from "react-redux";
import {addItemToCart} from "../../actions/cartActions";
import SearchableCardDec from "../../components/SearchableCardDec";
import {Button, Card} from "semantic-ui-react";
import {fetchSnacks} from "../../actions/snacksActions";
import history from "../../history";
import liquorStoreApi from "../../apis/liquorStoreApi";

class Snacks extends React.Component{
    state = {isLoading: true}

    componentDidMount(){
        if(this.props.snacks.length === 0){
            this.props.fetchSnacks();
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

                    <Button  size="tiny" onClick={() => this.onAddItemToCart(item)} color="green" icon="cart"
                    content='Add to Cart' floated="right"/>

            </div>
        );
    };

    renderItem = (item)=>{
        return  <Card
            key={item.itemId}
            image={liquorStoreApi.defaults.baseURL + "/" +item.image}
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
            items={this.props.snacks}
            itemsPerRow={4}
            noItemsMessage="No Snacks Found."
        />
    }
}

const mapStateToProp = (state) =>{
    return { snacks: state.snacks,
            user:state.auth.profileDetails,
            isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProp, {addItemToCart, fetchSnacks})(Snacks)