import React from 'react'
import Button from '../../widgets/button/Button'
import './AllProducts.css'

const AllProducts = (props) => {
    return(
        <section className="all-products">
            <div>
                <h1>Background and development</h1>
                <p>Convergent the dictates of the consumer: background and development</p>
                <Button 
                    clickHandle={props.viewAllHandle}
                    size={'medium'}
                    name={'View all'}
                    type={'submit'} 
                    color={'#F62F5E'}
                    background={'#FFFFFF'}
                />                
            </div>
        </section>  
    )
    
}

export default AllProducts