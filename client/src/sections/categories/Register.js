import React from 'react'
import Button from '../../widgets/button/Button'
import './Register.css'

const Register = (props) => {
    return(
        <section className='register'>
            <div className='categories-side'>
                <div className='seasonal'>
                    test
                </div>
                <div className='nature'>
                    men
                </div>
            </div>
            <div className='register-side'>
                <div className='register-img' />
                <div className='register-layer'>
                    <h1>Let the game begin</h1>
                    <p>Login is on - get ready for the open</p>
                    <Button 
                        clickHandle={props.loginHandle}
                        size={'medium'}
                        name={'Login'}
                        type={'submit'} 
                        color={'#ffffff'}
                        background={'#f62f5e'}
                    />
                </div>
            </div>
        </section>
    )
}

export default Register