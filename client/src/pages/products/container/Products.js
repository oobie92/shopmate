import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import * as actions from '../../../_actions/products.action'
import * as actionCart from '../../../_actions/shopingCart.action'
import ProductsLayout from '../components/ProductsLayout';
import Catalog from '../../../sections/catalog/Catalog';

class Products extends Component {
    constructor(props){
        super(props)
        this.itemClickHandle = this.itemClickHandle.bind(this)
        this.next = this.next.bind(this)
    }

    componentDidUpdate(prevProps) {
        // if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
        //   const { dispatch, selectedSubreddit } = this.props
        //   dispatch(fetchPostsIfNeeded(selectedSubreddit))
        // }
      }

    // UNSAFE_componentWillUpdate(nextProps, nextState){
    //     const { page } = this.props.match.params
    //     return nextProps.params.page === page

    // }

    componentDidMount(){
        const { page } = this.props.match.params
        this.props.actions.getAll()
    }

    next(e, page){
        e.preventDefault()
        this.props.actions.getAll(page)
        this.props.history.push(
            {
                pathname: '/products',
                search: `?page=${page}`,
            }
        )
    }

    itemClickHandle(e , id){
        e.preventDefault()
        this.props.history.push(`/products/${id}`)
    }

    render(){
        const {products} = this.props
        return(
            <ProductsLayout>
                {
                    Object.keys(products).length!=0 ?
                    <Catalog 
                        itemClickHandle={this.itemClickHandle} 
                        items={products} />
                    : ''
                }
                {/* <NavLink to={
                    {
                        pathname: "/products",
                        search: "?page=2"
                    }}>2</NavLink> */}

                <div onClick={(e) => this.next(e, 1)}>1</div>
                <div onClick={(e) => this.next(e, 2)}>2</div>
                <div onClick={(e) => this.next(e, 3)}>3</div>
                <div onClick={(e) => this.next(e, 4)}>4</div>
            </ProductsLayout>
        )
    }

}

function mapStateToProps(state, props){
    const products = state.get('products').get('products')
    return{
        products
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(actions,dispatch),
        actionCart : bindActionCreators(actionCart, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products))