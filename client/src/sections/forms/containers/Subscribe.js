import React, {Component} from 'react'
import SubscribeLayout from '../components/SubscribeLayout';
import Button from '../../../widgets/button/Button'

class Subscribe extends Component {
    render(){
        return(
            <SubscribeLayout>
                <form onSubmit={this.handleSubmit}>
                    <h3>Stay connected</h3>
                    <h1>Receive exciting features, new & special offers</h1>
                    <input placeholder='Your e-mail here' type='text' value={this.setNicknameRef} />                    
                    <Button 
                        type={'submit'} 
                        name={'subscribe'}
                        color={'#ffffff'}
                        size={'small'}
                        background={'#f62f5e'}
                    />
                </form>
            </SubscribeLayout>
        )
    }
}

export default Subscribe