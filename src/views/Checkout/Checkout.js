import React from 'react'
import {Button, Header, Icon, Table, Image, Message} from "semantic-ui-react";
import {connect} from "react-redux";
import {fetchCart, checkout} from "../../actions/cartActions";
import history from '../../history'

class Checkout extends React.Component{
    state = {checkedOut: false};
    total = 0;

    componentDidMount() {
        if(!this.props.cart)
            this.props.fetchCart();
    }

    renderCartRows(){
        this.total = 0;
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
                <Table.Cell>
                    {quantity}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    {price * quantity}
                </Table.Cell>

            </Table.Row>
        });

    }
    onCheckout = ()=>{
      this.props.checkout();
      this.setState({checkedOut: true});
      setTimeout(()=> history.push('/cart'), 2000)
    };

    render() {
        if(this.props.cart && this.props.cart.length === 0 &&!this.state.checkedOut)
            history.push('/cart')
        return (
            <div>
                <Header as="h2">Checkout</Header>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>Item Image</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Item Name</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
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
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='5' textAlign='center'>
                                <Button   floated='right' color="green" onClick={this.onCheckout} icon labelPosition='left'  size='large'>
                                    <Icon name='shopping cart' /> Confirm Checkout
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                {
                    this.state.checkedOut &&
                    <Message success header='Checkout Completed' content="Your checkout was completed successfully" />
                }
            </div>
        )
    }
}

const mapStateToProp = (state) =>{
    return {cart: state.cart};
};

export default connect(mapStateToProp, {fetchCart, checkout})(Checkout);