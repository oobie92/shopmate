import React, {Component} from 'react'

class Size extends Component {

    constructor(props){
        super(props)
        // this.change = this.change.bind(this)
    }

    // change(e) {
    //     console.log('HOLAAAA')
    //     console.log(e.currentTarget.value)
    // }

    render(){
        const {attributes} = this.props
        return(
            <form>
                {
                    attributes !==undefined
                    ? attributes.map((attribute, index) => {
                        if(attribute.attribute_name ==='Size'){
                            return (
                                <label>
                                  <input onClick={this.props.change}
                                    id={attribute.attribute_value} 
                                    key={index} 
                                    value={attribute.attribute_value}
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

export default Size