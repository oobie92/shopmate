import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {CardElement, injectStripe} from 'react-stripe-elements';
import * as actions from '../../../_actions/stripe.action'

class StripeForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

async submit(ev) {
    ev.preventDefault()
    let {token} = await this.props.stripe.createToken({name: "Name"});
    this.props.actions.sendPayment(token)
    
}
  

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

function mapStateToProps(state, props){

    const modal = state.get('modal').get('visible')
    return {
 
    }
  }
  
  function mapDispatchToProps(dispatch){
    return {
      actions : bindActionCreators(actions, dispatch),
    }
  }
  
  export default injectStripe(connect(mapStateToProps,mapDispatchToProps)(StripeForm));
