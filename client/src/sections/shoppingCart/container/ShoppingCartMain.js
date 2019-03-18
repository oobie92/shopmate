import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../_actions/shopingCart.action'
import ShoppingCartMainLayout from '../component/ShoppingCartMainLayout'
import Button from '../../../widgets/button/Button';
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeForm from '../../forms/containers/StripeForm';

class ShoppingCartMain extends Component {
    
    constructor(props) {
        super(props)

        this.removeItemShoppingCart = this.removeItemShoppingCart.bind(this)
    }

    removeItemShoppingCart(e, target) {
        e.preventDefault()
        this.props.actions.deleteItem(target)
    }
    
    render(){
        const {cartItems} = this.props
        return(
            <ShoppingCartMainLayout>
                {/* <StripeProvider apiKey="pk_test_A8jtA9H7qJJvGpCNrQEhHOK7">
                    <div className="example">
                    <h1>React Stripe Elements Example</h1>
                    <Elements>
                        <StripeForm />
                    </Elements>
                    </div>
                </StripeProvider> */}
                {
                    cartItems.length > 0
                    ? cartItems.map((item, index) => (
                        <div className='item' key={index}>
                            <img src={item.thumbnail} width='100px' height='100px' />
                            <div>
                                <h4>{item.name}</h4>
                                <Button
                                    target={item}
                                    clickHandle={this.removeItemShoppingCart}
                                    size='small'
                                    color={'#F62F5E'}
                                    background={'#FFFFFF'}
                                    type='button'
                                    name='remove' />
                            </div>
                            <h4 className='quantity'>{item.quantity}</h4>
                            <h4 className='price'>{item.price}</h4>
                        </div>
                    ))
                    : <div>Still not have items</div>
                }
            </ShoppingCartMainLayout>
        )
    }
}

function mapStateToProps(state, props){
    return {}
}

function mapDispacthToProps(dispatch){
    return{
        actions : bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(ShoppingCartMain)