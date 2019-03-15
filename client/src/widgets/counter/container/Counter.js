import React, {Component} from 'react'
import CounterLayout from '../components/CounterLayout'
import CounterButton from '../components/CounterButton'
import CounterValue from '../components/CounterValue'

class Counter extends Component {
    constructor(props){
        super(props)

        this.setRef = this.setRef.bind(this)
    }

    setRef = e => {
        this.counter = e
    }

    render(){
        return(
            <CounterLayout>
                <CounterButton
                    value='-'
                />
                <CounterValue
                    setRef={this.setRef}
                />
                <CounterButton
                    value='+'
                />
            </CounterLayout>
        )
    }
}

export default Counter