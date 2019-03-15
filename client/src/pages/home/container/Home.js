import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import AllProducts from '../../../sections/categories/AllProducts'
import Subscribe from '../../../sections/forms/containers/Subscribe'
import HomeLayout from '../component/HomeLayout';
import Register from '../../../sections/categories/Register';

class Home extends Component {

    constructor(props){
        super(props)
        this.viewAllHandle = this.viewAllHandle.bind(this)
        this.loginHandle = this.loginHandle.bind(this)
    }

    loginHandle(e){
        e.preventDefault()
        this.props.history.push('/login')
    }

    viewAllHandle(e){
        e.preventDefault()
        this.props.history.push('/products')

    }

    render(){
        return(
            <HomeLayout>
                <AllProducts viewAllHandle={this.viewAllHandle} />
                <Register loginHandle={this.loginHandle} />
                <Subscribe />
            </HomeLayout>
        )
    }
}

export default withRouter(Home)