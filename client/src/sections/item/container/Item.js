import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../_actions/products.action'
import * as actionsCart from '../../../_actions/shopingCart.action'
import * as actionsReview from '../../../_actions/review.action'
import ItemBackground from '../components/ItemBackground'
import ItemLayout from '../components/ItemLayout'
import ImageLayout from '../components/ImageLayout'
import DescriptionLayout from '../components/DescriptionLayout'
import ItemCover from '../components/ItemCover';
import ReviewLayout from '../../reviews/component/ReviewLayout'
import Review from '../../forms/containers/Review'

class Item extends Component {

    constructor(props){
        super(props)
        this.addToCart = this.addToCart.bind(this)
        this.focus = this.focus.bind(this)
        this.change = this.change.bind(this)
        
    }
    
    componentDidMount(){
        const {id} = this.props.match.params
        this.props.actions.getById(id)
        this.props.actions.getAttributes(id)
        this.props.actionsReview.getReviews(id)
        // console.log(this)
    }

    change(e) {
        // console.log(e.currentTarget.value)
    }

    addToCart(e, item){
        e.preventDefault()
        console.log(item)
        item.quantity += 1
        console.log(item)
        this.props.actionsCart.addItem(item)
    }

    focus(e, src){
        e.preventDefault()
        this.props.actions.changeSrc(src)
    }

    render(){
        const {reviews, product, src, attributes} = this.props
        return(
            <ItemBackground>
                <ItemLayout>
                    {
                        product === undefined
                        ?
                            <div>Loading</div>
                            
                        :   
                            <ItemCover>
                                <ImageLayout
                                    src={src !== undefined ? src : product.image}
                                    focus={this.focus}
                                    product={product} />
                                <DescriptionLayout
                                    change={this.change}
                                    attributes={attributes}
                                    addToCart={this.addToCart}
                                    product={product} 
                                    priceStyle='price'
                                    discountStyle={
                                        product.discounted_price !== "0.00" 
                                        ? 'dicounted' 
                                        : 'none'
                                    }
                                    />
                            </ItemCover>
                            
                    }             
                </ItemLayout>
                <ReviewLayout>
                    <h2>Product reviews</h2>
                    {
                        reviews.length > 0 
                        ? <div>Product still has not a review</div>
                        : <div>Product still has not a review</div>
                    }
                    <Review />
                </ReviewLayout>
            </ItemBackground>
        )
    }
}

function mapStateToProps(state, props){
    const isFetching = state.get('products').get('isFetching')
    const product = state.get('products').get('item')
    const src = state.get('products').get('src')
    const attributes = state.get('products').get('attributes')
    const reviews = state.get('reviews').get('reviews')
    return {
        isFetching,
        product,
        reviews,
        src,
        attributes
    }
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(actions, dispatch),
        actionsCart : bindActionCreators(actionsCart, dispatch),
        actionsReview : bindActionCreators(actionsReview, dispatch) 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Item))