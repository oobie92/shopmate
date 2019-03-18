import React from 'react'
import './PageButton.css'

const PageButton = (props) => {
    return(
        <div className='page-button'>
            {props.pageNumber}
        </div>
    )
}

export default PageButton