import React from 'react'
import {Button, Header, Icon, Table, Image, Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {addItemToCart, removeItemFromCart, updateCartItemQuantity, fetchCart, checkout} from "../../actions/cartActions";

class Cart extends React.Component{
    componentDidMount() {
        this.props.fetchCart();
    }

    renderCartRows(){
        return this.props.map(({itemId, image, category, description,quantity})=>(
            <Table.Row>
                <Table.Cell>
                    <Image src={image} size="small"/>
                </Table.Cell>
                <Table.Cell>
                    {name}
                </Table.Cell>
                <Table.Cell>
                    {category}
                </Table.Cell>
                <Table.Cell>
                    {description}
                </Table.Cell>
                <Table.Cell>
                    <Input type="number" value={quantity} onChange={e=> this.props.updateCartItemQuantity(itemId, e.target.value)} max="19" min="0"/>
                </Table.Cell>
                <Table.Cell>
                    <Button negative onClick={()=>this.props.removeItemFromCart(itemId)}>Remove Item</Button>
                </Table.Cell>
            </Table.Row>
        ));

    }

    render() {
        return (
            <div>
                <Header as="h2">Shopping Cart</Header>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>Item Image</Table.HeaderCell>
                            <Table.HeaderCell>Item Name</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderCartRows()}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='4'>
                                <Button floated='right' color="green" onClick={this.props.checkout()} icon labelPosition='left'  size='small'>
                                    <Icon name='shopping cart' /> To Checkout
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}

const mapStateToProp= (state) =>{
    return {cart: state.cart};
};

export default connect(mapStateToProp, {addItemToCart, removeItemFromCart, updateCartItemQuantity, fetchCart, checkout})(Cart);