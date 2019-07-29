import React from 'react'
import {connect} from "react-redux";
import {fetchCocktails, addCocktailToCart } from "../../actions/cocktailActions";
import SearchableCardDec from "../../components/SearchableCardDec";
import {Button, Card} from "semantic-ui-react";

class Cocktails extends React.Component{
    state = {isLoading: true}

    componentDidMount(){
        if(this.props.cocktails.length == 0){
            this.props.fetchCocktails();
        }
        this.setState({isLoading: false})

    };

    renderExtra(cocktail){
        if(!this.props.isSignedIn) return null;

        return (
            <div>
                {
                    this.props.user.isAdmin &&
                    <Button  size="tiny" onClick={() => this.props.removeItemFromStore(cocktail.itemId)} color="red"
                             icon="trash"
                             content='Delete Item' floated="left"/>
                }
                <Button size="tiny" onClick={() => this.props.addCocktailToCart(cocktail)} color="green" icon="cart"
                        content='Add to Cart' floated="right"/>
            </div>
        );
    }

    renderCocktail = (cocktail)=>{
        return  <Card
            key={cocktail.itemId}
            image={cocktail.image}
            header={cocktail.name}
            meta="Cocktails"
            description={
                <div>
                    <p>
                        {cocktail.description}
                    </p>
                    <strong>Price: {cocktail.price} NIS</strong>
                </div>
            }
            extra={this.renderExtra(cocktail)}
        />
    };

    render() {
        return <SearchableCardDec
            isLoading={this.state.isLoading}
            renderItem={this.renderCocktail}
            loadingMessage="Loading cocktails"
            items={this.props.cocktails}
            itemsPerRow={4}
            noItemsMessage="No Items Found."
        />
    }
}

const mapStateToProp = (state) =>{
    return { cocktails: state.cocktails,
        user:state.auth.profileDetails,
        isSignedIn:state.auth.isSignedIn,
    }
};

export default connect(mapStateToProp, {addCocktailToCart, fetchCocktails})(Cocktails)