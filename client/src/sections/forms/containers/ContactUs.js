import React, {Component} from 'react'

class ContactUs extends Component {
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <h1>Contact Us</h1>
                <input placeholder='Name' type='text' value={this.setNicknameRef} />
                <input placeholder='Email' type='text' value={this.setNicknameRef} />
                <textarea value={this.setTextRef} />
                <input type="submit" value="Send" />
            </form>
        )
    }
}

export default ContactUs