import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../_actions/products.action'
import * as actionCart from '../../../_actions/shopingCart.action'
import ProductsLayout from '../components/ProductsLayout';
import Catalog from '../../../sections/catalog/Catalog';

class ProductsByDepartment extends Component {
    constructor(props){
        super(props)
        this.itemClickHandle = this.itemClickHandle.bind(this)
        this.next = this.next.bind(this)
    }

    componentDidMount(){
        const { id } = this.props.match.params
        this.props.actions.getByDepartment(id)
    }

    next(e, page){
        e.preventDefault()
        this.props.actions.getByDepartment(page)
        this.props.history.push(
            {
                pathname: '/products/inDepartments',
                search: `?page=${page}`,
            }
        )
    }

    itemClickHandle(e , idPage){
        e.preventDefault()
        this.props.history.push(`/products/${idPage}`)
    }

    render(){
        const {products, total, pages} = this.props
        return(
            <ProductsLayout>
                {
                    Object.keys(products).length!=0 ?
                    <Catalog 
                        total={total}
                        pages={pages}
                        next={this.next}
                        itemClickHandle={this.itemClickHandle} 
                        items={products} />
                    : <div>Loading</div>
                }
            </ProductsLayout>
        )
    }

}

function mapStateToProps(state, props){
    const products = state.get('products').get('products')
    const total = state.get('products').get('total')
    const pages = state.get('products').get('pages')
    return{
        products,
        total,
        pages
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(actions,dispatch),
        actionCart : bindActionCreators(actionCart, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsByDepartment))