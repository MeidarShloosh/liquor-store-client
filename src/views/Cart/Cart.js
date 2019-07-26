import React from 'react'
import {Button, Header, Icon, Table, Image, Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {addItemToCart, removeItemFromCart, updateCartItemQuantity, fetchCart, checkout} from "../../actions/cartActions";
import {Link} from "react-router-dom";

class Cart extends React.Component{
    total = 0;
    componentDidMount() {
        this.props.fetchCart();
    }

    renderCartRows(){
        return this.props.cart.map(({itemId, name, image, category, price, quantity})=> {
            this.total += price * quantity;

            return <Table.Row>
                <Table.Cell>
                    <Image src={image} size="small"/>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    {name}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    {category}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Input type="number" value={quantity}
                           onChange={e => this.props.updateCartItemQuantity(itemId, e.target.value)} max="19" min="0"/>
                </Table.Cell>
                <Table.Cell>
                    {quantity * price}
                </Table.Cell>

                <Table.Cell textAlign='center'>
                    <Button negative onClick={() => this.props.removeItemFromCart(itemId)}>Remove Item</Button>
                </Table.Cell>
            </Table.Row>
        });

    }

    render() {
        return (
            <div>
                <Header as="h2">Shopping Cart</Header>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>Item Image</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Item Name</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Remove Item</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderCartRows()}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>
                                <span style={{float:"right"}}>
                                    <strong>
                                        Total: {this.total} NIS
                                    </strong>
                                </span>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>
                                <Link to='/checkout' floated='right' color="green"  icon labelPosition='left'  size='small'>
                                    <Icon name='shopping cart' /> Checkout
                                </Link>
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