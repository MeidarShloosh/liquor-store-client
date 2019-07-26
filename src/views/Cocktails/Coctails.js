import React from 'react'
import {connect} from "react-redux";
import {fetchCocktails, addCocktailToCart } from "../../actions/cocktailActions";
import SearchableCardDec from "../../components/SearchableCardDec";
import {Button, Card} from "semantic-ui-react";

class Store extends React.Component{
    state = {isLoading: true}

    componentDidMount(){
        if(this.props.cocktails.length == 0){
            this.props.fetchCocktails();
        }
        this.setState({isLoading: false})

    };

    renderCocktail = (cocktail)=>{
        return  <Card
            key={cocktail.cocktailId}
            image={cocktail.image}
            header={cocktail.name}
            meta="Cocktails"
            description={
                <div>
                    <p>
                    cocktail.description
                    </p>
                    <strong>Price: {cocktail.price} NIS</strong>
                </div>
            }
            extra={
                <div>
                    <Button onClick={()=>this.props.addCocktailToCart(cocktail)} color="green" icon="cart" content='Add cocktail to Cart' floated="right" />
                </div>
            }
        />
    };

    render() {
        <SearchableCardDec
            isLoading={this.state.isLoading}
            itemRender={this.renderCocktail}
            loadingMessage="Loading cocktails"
            items={this.props.cocktails}
            itemsPerRow={5}
            noItemsMessage="No Items Found."
        />
    }
}

const mapStateToProp = (state) =>{
    return { cocktails: state.cocktails,
        user:state.auth.profileDetails
    }
};

export default connect(mapStateToProp, {addCocktailToCart, fetchCocktails})(Store)