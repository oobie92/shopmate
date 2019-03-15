import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../_actions/shopingCart.action'
import ShoppingCartMainLayout from '../component/ShoppingCartMainLayout'
import Button from '../../../widgets/button/Button';

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
        console.log(this.props)
        const {cartItems} = this.props
        return(
            <ShoppingCartMainLayout>
                {
                    cartItems.length > 0
                    ? cartItems.map((item, index) => (
                        <div key={index}>
                            {item.thumbnail}
                            {index}    
                            <Button
                                target={item}
                                clickHandle={this.removeItemShoppingCart}
                                type='button'
                                name='remove' />
                        </div>
                    ))
                    : <div>Still not have items</div>
                }
            </ShoppingCartMainLayout>
        )
    }
}

function mapStateToProps(state, props){

}

function mapDispacthToProps(dispatch){
    return{
        actions : bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(ShoppingCartMain)