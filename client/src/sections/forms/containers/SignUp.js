import React, {Component} from 'react'

class SignUp extends Component {
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <h1>Sign Up</h1>
                <input placeholder='Email' type='text' value={this.setNicknameRef} />
                <input placeholder='Password' type='text' value={this.setNicknameRef} />
                <input placeholder='Re-type password' type='text' value={this.setNicknameRef} />
                <input type="submit" value="Sign Up" />
            </form>
        )
    }
}

export default SignUp