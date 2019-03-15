import React from 'react'
import './Search.css'
import Icon from '../../icon/Icon';

const Search = (props) => {
    return(
        <form className='search' action=''  >
            <div className='search-container'> 
                <input className='search-input' type='text' placeholder='' name='search'  />
                <div className='search-hover'>
                    <Icon iconName='icon-search' />
                </div>
            </div> 
        </form>
    )
}

export default Search