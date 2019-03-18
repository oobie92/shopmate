import React, {Component} from 'react'

class Color extends Component {

    constructor(props){
        super(props)
    }

    render(){
        const {attributes} = this.props
        return(
            <form>
                {
                    attributes !==undefined
                    ? attributes.map((attribute, index) => {
                        if(attribute.attribute_name ==='Color'){
                            return (
                                <label>
                                  <input 
                                    id={attribute.attribute_value} 
                                    key={index} 
                                    type='radio' 
                                    name={attribute.attribute_name} />
                                  {attribute.attribute_value}
                                </label>
                                )
                        }
                    })
                    : ''
                }
            </form>

        )

    }
}

export default Color