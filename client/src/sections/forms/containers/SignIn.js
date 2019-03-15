import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import * as actions from '../../../_actions/authentication.action'
import Button from '../../../widgets/button/Button'

class SignIn extends Component {

    constructor(props){
        super(props)
        this.loginHandle = this.loginHandle.bind(this)
    }

    setEmail = (val) => {
        this.email = val
    }

    setPass = (val) => {
        this.pass = val
    }

    loginHandle(e, user, pass){
        e.preventDefault()
        this.props.actions.login(user, pass)
    }

    render(){
        if(localStorage.getItem('user')){
            window.location.reload()
        }
        return(
            <form onSubmit={this.handleSubmit}>
                <h1>Sign In</h1>
                <input placeholder='Email' required type='text' ref={this.setEmail} />
                <input placeholder='password' required type='text' ref={this.setPass} />
                <input type='checkbox' value={this.setNicknameRef} />Remember
                <input type='button' value='login' onClick={(e) => {
                    this.loginHandle(e, this.email.value, this.pass.value)
                }} />
            </form>
        )
    }
}

function mapStateToProps(state, props){
    const user = state.get('user')
    return{
        user
    }
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(actions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn))